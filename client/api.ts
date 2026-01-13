import type {
  AnalyzeTextRequest,
  AnalyzeTextResponse,
  SummarizeTextRequest,
  SummarizeTextResponse,
  RagSummarizeTextRequest,
  RagSummarizeTextResponse,
} from '../types.ts';
//import text input from app.tsx


//ANALYZE TEXT ROUTE API -- #1 Mission
//Sending input data to backend for processing
export const fetchAnalyzedText = async (
  textInput: AnalyzeTextRequest
): Promise<AnalyzeTextResponse> => {
  const res = await fetch('/api/analyze-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(textInput),
  });

  if (!res.ok) {
    const errorPayload = await res.json();
    throw new Error(errorPayload.error);
  } else {
    return res.json();
  }
};

//AI SUMMARIZE TEXT ROUTE API -- #2 Mission
export const fetchSummarizedText = async (
  textInput: SummarizeTextRequest
): Promise<SummarizeTextResponse> => {
  const res = await fetch('/api/summarize-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(textInput),
  });

  if (!res.ok) {
    const errorPayload = await res.json();
    throw new Error(errorPayload.error);
  } else {
    return res.json();
  }
};

//RAG SUMMARIZE TEXT API -- Stretch Goal
export const ragSummarizeText = async (
  textInput: RagSummarizeTextRequest
): Promise<RagSummarizeTextResponse> => {
  const res = await fetch('/api/rag-summarize-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(textInput),
  });

  if (!res.ok) {
    const errorPayload = await res.json();
    throw new Error(errorPayload.error);
  } else {
    return res.json();
  }
};
