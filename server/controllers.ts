/* ================================
  TL;DR  -->  express middleware for api routes
================================ */

import type { RequestHandler } from 'express';
import OpenAI from 'openai';
import type {  ApiLocals,  AnalyzeTextRequestBody,  SummarizeTextRequestBody,  ServerError, } from '../types.ts';
import { normalizeText, countWordFrequency, getTopWords } from './services.ts';





/* ---------- openai client ---------- */
/* note: official sdk supports responses + embeddings :contentReference[oaicite:1]{index=1} */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



/* ---------- shared helpers ---------- */

const buildServerError = (log: string, status: number, errText: string): ServerError => {
  return {
    log,
    status,
    message: { err: errText },
  };
};


/* ---------- middleware  -->  parse body ---------- */

export const parseTextBody: RequestHandler = (req, res, next) => {
  const body = req.body as AnalyzeTextRequestBody | SummarizeTextRequestBody;

  if (!body || typeof body.text !== 'string') {
    return next(buildServerError('parseTextBody: missing text', 400, 'text is required'));
  }

  const rawText = body.text.trim();
  if (!rawText) {
    return next(buildServerError('parseTextBody: empty text', 400, 'text cannot be empty'));
  }

  // keep inputs small  (keep it cheap)
  const maxTextChars = Number(process.env.MAX_TEXT_CHARS ?? 15000);
  if (rawText.length > maxTextChars) {
    return next(buildServerError('parseTextBody: text too large', 413, `text too large (max ${maxTextChars} chars)`));
  }

  const topLimitRaw = (body as any).topLimit;
  const topLimit = typeof topLimitRaw === 'number' && topLimitRaw > 0 ? topLimitRaw : 12;

  const locals = res.locals as ApiLocals;
  locals.rawText = rawText;
  locals.topLimit = topLimit;

  return next();
};


/* ---------- middleware  -->  analyze text ---------- */

export const analyzeText: RequestHandler = (_req, res, next) => {
  const locals = res.locals as ApiLocals;

  if (!locals.rawText || !locals.topLimit) {
    return next(buildServerError('analyzeText: missing locals', 500, 'server pipeline error'));
  }

  const cleanedWords = normalizeText(locals.rawText);
  const frequencyMap = countWordFrequency(cleanedWords);
  const topWords = getTopWords(frequencyMap, locals.topLimit);

  locals.cleanedWords = cleanedWords;
  locals.topWords = topWords;

  return next();
};


/* ---------- middleware  -->  openai summarize ---------- */

export const summarizeWithOpenAi: RequestHandler = async (_req, res, next) => {
  const locals = res.locals as ApiLocals;

  if (!locals.rawText || !locals.topWords) {
    return next(buildServerError('summarizeWithOpenAi: missing locals', 500, 'server pipeline error'));
  }

  if (!process.env.OPENAI_API_KEY) {
    return next(buildServerError('summarizeWithOpenAi: missing OPENAI_API_KEY', 500, 'OPENAI_API_KEY not set'));
  }

  const modelName = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  // limit tokens to keep thing cheap
  const maxOutputTokens = Number(process.env.MAX_OUTPUT_TOKENS ?? 300);

  const keywordLine = locals.topWords.map((w) => `${w.word}(${w.count})`).join(', ');

  const prompt = [
    'you are a helpful assistant that summarizes workplace text.',
    '',
    `top keywords (frequency): ${keywordLine}`,
    '',
    'task:',
    '1) write a 2-4 sentence summary',
    '2) list 3-6 key takeaways',
    '3) list 2-5 next steps (concrete, simple)',
    '',
    'output rules:',
    '- return strict json only',
    '- json keys: summary, keyTakeaways, nextSteps',
    '- keyTakeaways and nextSteps must be arrays of strings',
    '',
    'text:',
    locals.rawText,
  ].join('\n');

    
  try {
    // responses api (recommended interface)
    const response = await openai.responses.create({
      model: modelName,
      input: prompt,
      max_output_tokens: maxOutputTokens,
      temperature: 0.2,
    });

    const rawOutput = response.output_text?.trim();
    if (!rawOutput) {
      return next(buildServerError('summarizeWithOpenAi: empty model output', 502, 'model returned empty output'));
    }

    // strict json parse with a fallback
    let parsed: any = null;
    try {
      parsed = JSON.parse(rawOutput);
    } catch {
      parsed = null;
    }

    if (
      !parsed ||
      typeof parsed.summary !== 'string' ||
      !Array.isArray(parsed.keyTakeaways) ||
      !Array.isArray(parsed.nextSteps)
    ) {
      return next(buildServerError('summarizeWithOpenAi: invalid json format', 502, 'model returned invalid json'));
    }

    locals.summaryResult = {
      summary: parsed.summary,
      keyTakeaways: parsed.keyTakeaways,
      nextSteps: parsed.nextSteps,
    };

    return next();
  } catch (err) {
    return next(buildServerError(`summarizeWithOpenAi: ${String(err)}`, 502, 'error while querying openai'));
  }
};
