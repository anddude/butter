/* ================================
  TL;DR  -->  RAG knowledge base pipeline

     1.  chunk kbSeed entries into smaller pieces
     2.  embed chunks locally (hugging face transformers.js)
     3.  upsert vectors into pinecone
     4.  query pinecone for similar context
     5.  build a capped context string (MAX_CONTEXT_CHARS) for prompt injection
================================ */

import { pipeline } from '@xenova/transformers'; // local embedding model runner
import type { FeatureExtractionPipeline, Tensor } from '@xenova/transformers'; // strong types for embeddings + tensor output

import { Pinecone } from '@pinecone-database/pinecone'; // vector database client

import type { KbChunk, KbEntry, RagMatch } from '../types';
import { kbSeed } from './kbSeed';

// ----------  env parsing  ----------

// embedding model id for transformers.js
const embedModel = process.env.EMBED_MODEL ?? 'Xenova/all-MiniLM-L6-v2';

// pinecone config
const pineconeKey = process.env.PINECONE_API_KEY ?? '';
const pineconeIndexName = process.env.PINECONE_INDEX ?? 'butter-kb';
const pineconeNamespace = process.env.PINECONE_NAMESPACE ?? 'dev';

//env flag for clearing kb in development
const pineconeReset = process.env.RESET_PINECONE_KB ?? '';

// context cap  -->  control cost + reliability
const maxContextChars = Number(process.env.MAX_CONTEXT_CHARS ?? '3500');

// ----------  lazy singletons  -->  create once and avoid reloading per request  ----------

// embedder pipeline is expensive / heavy
let embedderPromise: Promise<FeatureExtractionPipeline> | null = null;
// connect to pinecone
let pineconeClient: Pinecone | null = null;
// track if upsert to pincone was already occured
let kbSeeded = false;

// ----------  embeddings (local HF)  ----------

// get or create the embedding pipeline  -->  stores the in-flight pipeline load  ;  avoids duplicate loads from parallel requests
async function getEmbedder(): Promise<FeatureExtractionPipeline> {
  // outputs Tensor embeddings
  if (!embedderPromise)
    embedderPromise = pipeline('feature-extraction', embedModel);

  return embedderPromise;
}

// convert raw text into a pinecone-ready vector (number[])
async function embedText(text: string): Promise<number[]> {
  const embedder = await getEmbedder(); // call FeatureExtractionPipeline

  // feature-extraction returns a Tensor
  const output: Tensor = await embedder(text, {
    pooling: 'mean', // collapse token embeddings into one sentence/document vector
    normalize: true, // makes cosine similarity behave more consistently
  });

  // pinecone expects a plain number[]  -->  Tensor.data is a typed array (Float32Array)
  return Array.from(output.data as Float32Array);
}

// ----------  chunking  ----------

// pinecone works best with chunking because retrieval becomes more precise   -->  e.g. finds the relevant paragraph instead of whole doc
function chunkEntry(entry: KbEntry): KbChunk[] {
  const maxChunkSize = 900; // chars per chunk
  const chunks: KbChunk[] = [];

  // strategy  -->  split on periods + newlines  ;  then pack into chunks until we hit maxChunkSize
  const parts = entry.text
    .replace(/\n+/g, '\n')
    .split(/(?<=[.?!])\s+|\n+/g)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  let buffer = '';
  let chunkIndex = 0;

  for (const part of parts) {
    // avoid awkward splits / half baked ideas  -->  if adding this part would overflow, flush (output) current buffer (what was collected so far)
    if ((buffer + ' ' + part).trim().length > maxChunkSize) {
      const chunkText = buffer.trim();
      if (chunkText.length > 0) {
        chunks.push({
          chunkId: `${entry.id}-c${chunkIndex}`,
          entryId: entry.id,
          title: entry.title,
          text: chunkText,
        });
        chunkIndex += 1;
      }
      buffer = part;
    } else {
      buffer = (buffer + ' ' + part).trim();
    }
  }

  // flush remainder  -->  text that didn't fit into the last full buffer / chunk but still needs to be processed or added to the next chunk
  const last = buffer.trim();
  if (last.length > 0) {
    chunks.push({
      chunkId: `${entry.id}-c${chunkIndex}`,
      entryId: entry.id,
      title: entry.title,
      text: last,
    });
  }

  return chunks;
}

// convert kbSeed entries into chunks
function buildChunks(): KbChunk[] {
  const allChunks: KbChunk[] = [];
  for (const entry of kbSeed) {
    allChunks.push(...chunkEntry(entry));
  }
  return allChunks;
}

// ----------  pinecone helpers  ----------

function getPinecone(): Pinecone | null {
  // rag route will still work, but it will have 0 matches
  if (!pineconeKey) return null;

  if (!pineconeClient) pineconeClient = new Pinecone({ apiKey: pineconeKey });

  return pineconeClient;
}

async function resetPineconeNamespace(): Promise<void> {
  const pinecone = getPinecone();
  if(!pinecone) return;

   console.warn(
    `[RAG:init] RESET_PINECONE_KB enabled — clearing namespace "${pineconeNamespace}"`
  );

  await pinecone
    .index(pineconeIndexName)
    .namespace(pineconeNamespace)
    .deleteAll();
}

// ensure the KB is upserted into pinecone exactly once
export async function ensureKbSeeded(): Promise<void> {
  if (kbSeeded) return;

  const pinecone = getPinecone();
  // mark seeded to avoid repeated work when pinecone is missing
  if (!pinecone) {
     console.warn(
    '[RAG:init] Pinecone client unavailable. ' +
    'KB seeding disabled for this runtime. ' +
    'Set PINECONE_API_KEY to enable retrieval.'
  );
    kbSeeded = true;
    return;
  }

   if (process.env.RESET_PINECONE_KB === 'true') {
    await resetPineconeNamespace();
  }

  const index = pinecone.index(pineconeIndexName).namespace(pineconeNamespace);

  const chunks = buildChunks();

  // embed + upsert each chunk (sequentially for MVP)
  for (const chunk of chunks) {
    const values = await embedText(chunk.text);

    await index.upsert([
      {
        id: chunk.chunkId,
        values,
        metadata: {
          entryId: chunk.entryId,
          title: chunk.title,
          text: chunk.text,
        },
      },
    ]);
  }

  kbSeeded = true;
}

// query pinecone for similar context
export async function searchKb(
  queryText: string,
  topK: number
): Promise<{ matches: RagMatch[]; contextText: string; contextChars: number }> {
  const pinecone = getPinecone();

  // if pinecone isn't configured, return empty RAG context
  if (!pinecone) return { matches: [], contextText: '', contextChars: 0 };

  const index = pinecone.index(pineconeIndexName).namespace(pineconeNamespace);

  const queryVector = await embedText(queryText);

  const result = await index.query({
    vector: queryVector,
    topK,
    includeMetadata: true,
  });

  // normalize matches for UI / debugging
  const matches: RagMatch[] = (result.matches ?? []).map((match) => {
    const title = String(match.metadata?.title ?? 'untitled');
    const text = String(match.metadata?.text ?? '');

    return {
      id: match.id,
      score: match.score ?? 0,
      title,
      snippet: text.slice(0, 220),
    };
  });

  // build the injected context string (what goes into the prompt)  -->  keep prompts cheap with cap by MAX_CONTEXT_CHARS
  let contextText = '';
  let usedChars = 0;

  for (const match of result.matches ?? []) {
    const title = String(match.metadata?.title ?? 'untitled');
    const text = String(match.metadata?.text ?? '');

    const block =
      `\n[context: ${title} | id=${match.id} | score=${match.score ?? 0}]\n` +
      `${text}\n`;

    // stop if adding this block would exceed the cap
    if (usedChars + block.length > maxContextChars) {
      const remaining = maxContextChars - usedChars;
      if (remaining > 0) {
        contextText += block.slice(0, remaining);
        usedChars += remaining;
      }
      break;
    }

    contextText += block;
    usedChars += block.length;
  }

  return {
    matches,
    contextText,
    contextChars: usedChars,
  };
}
