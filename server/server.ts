/* ================================
    TL;DR  -->  express app + routes + error handler
================================ */

import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';
import type {  ApiLocals,  AnalyzeTextResponseBody,  SummarizeTextResponseBody,  ServerError, } from '../types.ts';
import { parseTextBody, analyzeText, summarizeWithOpenAi } from './controllers.ts';


const app = express();


/* ---------- middleware ---------- 
    - keep payloads small to control costs  -->  will see more in the future with LLM/RAG tie ins */

app.use(express.json({ limit: '200kb' }));


app.use(cors());  // so vite client can call api (frontend connected to backend)





/* ---------- health ---------- */

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    hasOpenAiKey: Boolean(process.env.OPEN_AI_KEY),
  });
});




/* ---------- no-ai mvp ---------- 
    - parse  -->  analyze  -->  respond
*/

app.post('/api/analyze-text',
  parseTextBody,
  analyzeText,
  (_req, res) => {
    const locals = res.locals as ApiLocals;

    const topWords = locals.topWords ?? [];
    const cleanedWords = locals.cleanedWords ?? [];

    const payload: AnalyzeTextResponseBody = {
      topWords,
      totalWords: cleanedWords.length,
      uniqueWords: new Set(cleanedWords).size,
    };

    res.status(200).json(payload);
  }
);





/* ---------- ai prompt mvp ---------- 
    - parse  -->  analyze  -->  summarize  -->  respond
*/

app.post('/api/summarize-text',
  parseTextBody,
  analyzeText,
  summarizeWithOpenAi,
  (_req, res) => {
    const locals = res.locals as ApiLocals;

    const topWords = locals.topWords ?? [];
    const summaryResult = locals.summaryResult;

    if (!summaryResult) {
      return res.status(500).json({ err: 'server pipeline error' });
    }

    const payload: SummarizeTextResponseBody = {
      summary: summaryResult.summary,
      keyTakeaways: summaryResult.keyTakeaways,
      nextSteps: summaryResult.nextSteps,
      topWords,
    };

    res.status(200).json(payload);
  }
);




/* ----------  global error handler  ---------- */

const errorHandler: ErrorRequestHandler = (err: ServerError, _req, res, _next) => {
  const defaultErr: ServerError = {
    log: 'errorHandler: unknown middleware error',
    status: 500,
    message: { err: 'an error occurred' },
  };

  const errorObj = { ...defaultErr, ...err };

  console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);




/* ----------  entry point  ---------- */

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
