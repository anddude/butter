import type {
  AnalyzeTextRequest,
  AnalyzeTextResponse,
  SummarizeTextRequest,
  SummarizeTextResponse,
  RagSummarizeTextRequest,
  RagSummarizeTextResponse,
} from '../types';
//import text input from app.tsx

//generic error handler to reduce repetition & keep it DRY
const handleJson = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? 'Request failed');
  }
  return res.json();
};

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

  return handleJson<AnalyzeTextResponse>(res);
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

return handleJson<SummarizeTextResponse>(res);
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

return handleJson<RagSummarizeTextResponse>(res);

};
