/* ================================
  TL;DR  -->  FRONT-END ONLY TYPES
      - ButterMode for toggling response mode types
      - ButterResults for shaping results depending on mode
================================ */

import type { AnalyzeTextResponse, SummarizeTextResponse, RagSummarizeTextResponse } from '../types';

// ----------  primitives  ----------

// modes supported by the backend routes
export type ButterMode = "analyze" | "summarize" | "rag";

// results have a different shape denpending on the route
export type ButterResults = AnalyzeTextResponse | SummarizeTextResponse | RagSummarizeTextResponse;
