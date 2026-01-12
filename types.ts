// suggestions from ai tutor



/* ================================
  TL;DR  -->  SHARED API TYPES  (imported by both)

      - server code (express handlers)
      - client code (fetch + rendering)
================================ */

/* ---------- errors ---------- */

export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};


/* ---------- analyze ---------- */

export type AnalyzeTextRequestBody = {
  text: string;
  topLimit?: number;
};

export type WordCount = {
  word: string;
  count: number;
};

export type AnalyzeTextResponseBody = {
  topWords: WordCount[];
  totalWords: number;
  uniqueWords: number;
};



/* ---------- summarize (prompt-only) ---------- */

export type SummarizeTextRequestBody = {
  text: string;
  topLimit?: number;
};

export type SummarizeTextResponseBody = {
  summary: string;
  keyTakeaways: string[];
  nextSteps: string[];
  topWords: WordCount[];
};


/* ---------- rag (future hook) ---------- */

export type RagSummarizeTextRequestBody = {
  text: string;
  topLimit?: number;
  topContext?: number;
};

export type RagContextChunk = {
  id: string;
  title: string;
  text: string;
};

export type RagSummarizeTextResponseBody = {
  summary: string;
  keyTakeaways: string[];
  nextSteps: string[];
  topWords: WordCount[];
  contextUsed: RagContextChunk[];
};


/* ---------- express locals ---------- */

export type ApiLocals = {
  rawText?: string;
  topLimit?: number;

  cleanedWords?: string[];
  topWords?: WordCount[];

  summaryResult?: {
    summary: string;
    keyTakeaways: string[];
    nextSteps: string[];
  };

  /* rag hook */
  queryEmbedding?: number[];
  contextUsed?: RagContextChunk[];
};
