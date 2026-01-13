/* ================================
  TL;DR  -->  middleware for api routes

     - validates inputs and calls services / KB functions
     - builds prompts in the skill builder style  -->  role / task / requirements / output 
================================ */


import OpenAI from "openai";

import type { AnalyzeTextRequest, AnalyzeTextResponse, RagSummarizeTextRequest, RagSummarizeTextResponse, SummarizeTextRequest, SummarizeTextResponse, LlmProvider } from "../types";

import { getTopWords } from "./services";
import { ensureKbSeeded, searchKb } from "./KB";




// ----------  env + defaults  ----------

const maxTopLimit = Number(process.env.MAX_TOP_LIMIT ?? "12");  // clamp for topLimit
const maxInputChars = Number(process.env.MAX_INPUT_CHARS ?? "20000");  // char cap for user text

const llmProvider = (process.env.LLM_PROVIDER ?? "openai") as LlmProvider;

// OpenAI config
const openAiKey = process.env.OPENAI_API_KEY ?? "";
const openAiModel = process.env.OPENAI_MODEL ?? "gpt-5-nano";

// OpenRouter config (openai-compatible)
const openRouterKey = process.env.OPENROUTER_API_KEY ?? "";
const openRouterModel = process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free";
const openRouterBaseUrl = process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";

// avoid server crash at startup  -->  create the client lazily so missing keys
let cachedClient: OpenAI | null = null;
let cachedProvider: LlmProvider | null = null;




// ----------  validation helpers  ----------

// request.body can be null, array, string, etc.
function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (!value) return false;  // rejects null / undefined
    if (Array.isArray(value)) return false;  // rejects arrays
    return typeof value === "object";  // accepts objects
}


// clamp user requested topLimit into the safe range
function clampTopLimit(value: unknown): number {
    
    if (typeof value !== "number" || Number.isNaN(value)) return 3;  // default if missing

    const floored = Math.floor(value);  // floor to avoid decimals

    const atLeastOne = Math.max(1, floored);  // minimum 1

    return Math.min(atLeastOne, maxTopLimit);  // maximum MAX_TOP_LIMIT
}


// protect the server from huge paste inputs during MVP
function clampText(raw: unknown): string {
    if (typeof raw !== "string") return "";
    if (raw.length <= maxInputChars) return raw;
    return raw.slice(0, maxInputChars);
}


// get the active LLM client based on provider
function getLlmClient(): { client: OpenAI; model: string } {
    // if provider changed between runs (dev vs dev:free), rebuild
    if (!cachedClient || cachedProvider !== llmProvider) {
        if (llmProvider === "openrouter") {  // OpenRouter uses OpenAI SDK with baseURL + its own key
            cachedClient = new OpenAI({
                apiKey: openRouterKey,
                baseURL: openRouterBaseUrl,
            });
            cachedProvider = "openrouter";
            return { client: cachedClient, model: openRouterModel };
        }

        // default  -->  OpenAI
        cachedClient = new OpenAI({ apiKey: openAiKey });
        cachedProvider = "openai";
        return { client: cachedClient, model: openAiModel };
    }

    // cached
    const model = llmProvider === "openrouter" ? openRouterModel : openAiModel;
    return { client: cachedClient, model };
}


// build prompts like in the skill builder
function buildPrompt(args: {
    text: string;
    topWords: string[];
    ragContext?: string;
}): string {
    const role = "You are a concise workplace assistant for a media and movie company.";

    const task = "Your job is to summarize the user's text and produce actionable next steps.";

    // shapes the LLM's behavior
    const requirements = "Requirements: " +
        "1) Write a short summary (1-2 sentences). " +
        "2) List 1 key takeaway as a bullet." +
        "3) List 1 next step as a bullet."
        "4) Use the provided top keywords as signals for emphasis, but do not invent facts. " +
        "5) If the text is ambiguous, explicitly say what is missing. Skip all fluff and jargon";

    const steering = `Top keywords (emphasis signals): ${args.topWords.join(", ") || "(none)"}`;

    // RAG ?  -->  inject context here (capped in KB.ts)
    const contextBlock = args.ragContext  ?  `Company context (retrieved via RAG):\n${args.ragContext}`  :  "";

    const outputFormat =
        "Output format:\n" +
        "Summary:\n<one paragraph>\n\n" +
        "Key takeaways:\n- ...\n- ...\n- ...\n\n" +
        "Next steps:\n- ...\n- ...\n- ...\n";

    // final prompt structured as role / task / requirements / format
    return [
        role,
        task,
        requirements,
        steering,
        contextBlock,
        "User text:",
        args.text,
        outputFormat,
    ]
        .filter((part) => part.trim().length > 0)
        .join("\n\n");
}




// ----------  handlers used by server.ts routes  ----------

export async function analyzeText(rawBody: unknown): Promise<AnalyzeTextResponse> {
    
    if (!isPlainObject(rawBody)) throw new Error("request body must be a json object");
    const body = rawBody as AnalyzeTextRequest;

    const text = clampText(body.text);
    if (!text)  throw new Error("text is required");

    const topLimit = clampTopLimit(body.topLimit);

    const result = getTopWords(text, topLimit);

    return {
        topWords: result.topWords,
        topLimit,
        totalWords: result.totalWords,
        uniqueWords: result.uniqueWords,
    };
}


export async function summarizeText(rawBody: unknown): Promise<SummarizeTextResponse> {
    
    if (!isPlainObject(rawBody)) throw new Error("request body must be a json object");
    const body = rawBody as SummarizeTextRequest;

    const text = clampText(body.text);
    if (!text)  throw new Error("text is required");

    const topLimit = clampTopLimit(body.topLimit);
    const { topWords } = getTopWords(text, topLimit);

    const prompt = buildPrompt({
        text,
        topWords: topWords.map((item) => item.word),
    });

    const { client, model } = getLlmClient();

    const response = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        // keep output bounded for cost + predictability
        max_tokens: 450,
        temperature: 0.2,
    });

    const summary = response.choices[0]?.message?.content ?? "";

    return {
        summary,
        topWords,
        topLimit,
    };
}


export async function ragSummarizeText(rawBody: unknown): Promise<RagSummarizeTextResponse> {

    if (!isPlainObject(rawBody)) throw new Error("request body must be a json object");
    const body = rawBody as RagSummarizeTextRequest;

    const text = clampText(body.text);
    if (!text)  throw new Error("text is required");

    const topLimit = clampTopLimit(body.topLimit);
    const { topWords } = getTopWords(text, topLimit);

    // ensure KB is upserted before searching  -->  only runs once per server process
    await ensureKbSeeded();

    // retrieve context from pinecone using embeddings similarity
    const rag = await searchKb(text, 5);

    const prompt = buildPrompt({
        text,
        topWords: topWords.map((item) => item.word),
        ragContext: rag.contextText,
    });

    const { client, model } = getLlmClient();

    const response = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.2,
    });

    const summary = response.choices[0]?.message?.content ?? "";

    return {
        summary,
        topWords,
        topLimit,
        contextChars: rag.contextChars,
        matches: rag.matches,
    };
}
