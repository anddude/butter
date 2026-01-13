/* ================================
  TL;DR  -->  SHARED API TYPES  (imported by both)
      - server code (express handlers)
      - client code (fetch + rendering)
      - every api request body and response payload should match one of these types
================================ */


// ----------  shared primitives  ----------

// we return top words as an array of these objects
export type TopWord = {
    word: string;  // the normalized token  -->  e.g. "budget"
    count: number;  // how many times it appeared
};

// used by /api/health so the frontend can confirm the api is reachable
export type HealthPayload = {
    ok: true;  // we hardcode ok=true when the server is alive
    hasOpenAiKey: boolean;  // true if OPENAI_API_KEY exists (not validating correctness, just presence)
    hasOpenRouterKey: boolean;  // true if OPENROUTER_API_KEY exists
    llmProvider: LlmProvider;  // which provider the server will use right now
};




// ----------  llm provider selection  ----------

export type LlmProvider = "openai" | "openrouter";  // supports switching between the paid and free models




// ----------  route  -->  analyze-text (word frequency) ----------

// request body for POST /api/analyze-text
export type AnalyzeTextRequest = {
    text: string;  // raw user text  -->  e.g. email paste, doc paste, etc.
    topLimit?: number;  // optional  -->  how many top words to return (server clamps it)
};

// response body for POST /api/analyze-text
export type AnalyzeTextResponse = {
    topWords: TopWord[];  // sorted from highest count -> lowest
    topLimit: number;  // the final limit after server clamping
    totalWords: number;  // how many tokens we processed (after normalization rules)
    uniqueWords: number;  // how many unique tokens we saw
};




// ----------  route  -->  summarize-text (prompt-only)  ----------

// request body for POST /api/summarize-text
export type SummarizeTextRequest = {
    text: string;  // raw user text
    topLimit?: number;  // optional  -->  top words used to steer the summary prompt
};

// response body for POST /api/summarize-text
export type SummarizeTextResponse = {
    summary: string;  // one output string containing summary + key takeaways + next steps
    topWords: TopWord[];  // the steering words we injected into the prompt
    topLimit: number;  // final server-clamped limit
};




// ----------  route  -->  RAG summarize  ----------

// we'll inject retrieved "company context" into the prompt  -->  mirrors summarize-text for easy endpoint swap in the frontend
export type RagSummarizeTextRequest = {
    text: string;  // raw user text we want to summarize
    topLimit?: number;   // optional  -->  top words used to steer
};

// highlight the RAG vs prompt difference  -->  show each retrieved match so the UI can explain what context was used
export type RagMatch = {
    id: string;  // the pinecone vector id (chunk id)
    score: number;  // similarity score from pinecone
    title: string;  // human readable label for the context
    snippet: string;  // short preview  -->  avoid dumping huge text to the ui
};

// response body for POST /api/rag-summarize-text
export type RagSummarizeTextResponse = {
    summary: string;  // summary output from the llm
    topWords: TopWord[];  // steering words  -->  same idea as prompt-only mode
    topLimit: number;  // final clamped limit

    // rag debug fields
    contextChars: number;  // how many characters of retrieved context we injected (capped)
    matches: RagMatch[];  // the specific items pinecone returned (top-k)
};




// ----------  knowledge base (kb)  ----------

// a KB entry is 1 document  -->  e.g. policy memo, project brief, competitor analysis, etc.
export type KbEntry = {
    id: string;  // stable id so we can upsert safely
    title: string;  // name shown in UI + metadata
    text: string;  // main content  -->  what we embed + store
    tags?: string[];  // optional  -->  helpful for filtering later but not required for MVP
};

// pinecone stores vectors as chunks (smaller pieces)  -->  keeps retrieval is more precise  ;  we're keeping it small to avoid hitting the metadata limits
export type KbChunk = {
    chunkId: string;  // unique id per chunk  -->  entryId + chunk number
    entryId: string;  // parent doc id
    title: string;  // parent doc title
    text: string;  // chunk text
};