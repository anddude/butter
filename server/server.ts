/* ================================
    TL;DR  -->  express app + routes + error handler
================================ */




 // load once and first so middleware have access to the api keys
import "dotenv/config"; 
// verify api key exists
console.log("[env] openrouter key present:", Boolean(process.env.OPENROUTER_API_KEY));
console.log("[env] llm provider:", process.env.LLM_PROVIDER);


import express from "express";
import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";

import type { HealthPayload, LlmProvider } from "../types";
import { analyzeText, summarizeText, ragSummarizeText } from "./controllers";


// server config
const port = Number(process.env.PORT ?? "3000");
const llmProvider = (process.env.LLM_PROVIDER ?? "openai") as LlmProvider;

const hasOpenAiKey = Boolean(process.env.OPENAI_API_KEY);
const hasOpenRouterKey = Boolean(process.env.OPENROUTER_API_KEY);


const app = express();  // create the express app


// middleware
app.use(cors());
app.use(express.json());




// ----------  routes  ----------

// GET /api/health  -->  just confirms the server is alive
app.get("/api/health", (request: Request, response: Response) => {
    const payload: HealthPayload = {
        ok: true,
        hasOpenAiKey,
        hasOpenRouterKey,
        llmProvider,
    };

    response.status(200).json(payload);
});


// POST /api/analyze-text  -->  body: { text: string, topLimit?: number }
app.post("/api/analyze-text", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await analyzeText(request.body);
        response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


// POST /api/summarize-text  -->  body: { text: string, topLimit?: number }
app.post("/api/summarize-text", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await summarizeText(request.body);
        response.status(200).json(result);
    } catch (error) {
        next(error);
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
