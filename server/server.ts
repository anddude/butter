/* ================================
  TL;DR  -->  express entrypoint

      - defines routes and connects them to controller functions
      - defines the global error handler
================================ */




// load .env once for the whole app
import "dotenv/config";  // load first so middleware has access to the api keys


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
});


// POST /api/rag-summarize-text  body: { text: string, topLimit?: number }
app.post("/api/rag-summarize-text", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await ragSummarizeText(request.body);
        response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});




// ----------  global error handler  ----------

const errorHandler: ErrorRequestHandler = (error: unknown, request: Request, response: Response, next: NextFunction) => {

    console.error("[server error]", error);  // log for dev debugging

    // use a safe message (avoid leaking secrets)
    const message = error instanceof Error  ?  error.message  :  "unknown middleware error";

    response.status(400).json({
        ok: false,
        error: message,
    });
};


// must be last
app.use(errorHandler);


// start server
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
    console.log(`health: http://localhost:${port}/api/health`);
});
