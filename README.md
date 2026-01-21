# Butter 🧈

**A progressive text analysis and summarization tool**

Butter is a developer-focused project that explores how increasingly sophisticated text analysis pipelines can be built—from deterministic parsing to AI-assisted summarization and retrieval-augmented generation (RAG). The goal is to make it easier to extract *what matters* from raw text while maintaining transparency and control at each step.

---

## Problem

Developers and teams often need to quickly understand long or unstructured text (emails, notes, documentation, transcripts), but existing tools either:

* Rely entirely on opaque AI outputs
* Skip foundational analysis that helps explain *why* a summary exists
* Provide limited insight into how emphasis, frequency, or context influence results

Butter addresses this by starting with **ground-truth text analysis** and layering AI capabilities on top—so outputs remain inspectable, explainable, and iterative.

---

## Solution Overview

Butter is built in three progressive modes:

### 1. **Analyze (Non-AI MVP)**

* Parses plain text input
* Normalizes and tokenizes words
* Produces a frequency map (JSON) of word usage
* Surfaces the most significant terms as a proxy for importance

This mode establishes a deterministic baseline and ensures the system understands the text *before* any AI is introduced.

### 2. **Summarize (Prompt-Driven AI MVP)**

* Uses the analyzed word frequency data to guide an LLM prompt
* Generates a concise paragraph summary
* Emphasizes repeated or contextually important terms

This step demonstrates controlled prompt engineering grounded in real data rather than raw text alone.

### 3. **RAG Summarize (AI + Vector Search MVP)**

* Stores text embeddings in a vector database
* Retrieves the most relevant context chunks at query time
* Produces more precise and context-aware summaries using RAG

This mode focuses on improving accuracy, relevance, and scalability for larger or repeated inputs.

---

## Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Backend:** Node.js, TypeScript
* **AI:** OpenAI API
* **Vector Database:** Pinecone
* **Data Handling:** JSON-based analysis pipeline

---

## Project Structure (High-Level)

* `client/` – React UI and user interaction
* `server/` – API routes and processing logic
* `analysis/` – Text normalization and frequency extraction
* `ai/` – Prompt logic and RAG orchestration
* `db/` – Vector storage and retrieval logic

---

## Key Features

* Deterministic word frequency analysis
* Explainable transition from raw text → summary
* Prompting guided by actual text metrics
* Optional RAG pipeline for improved precision
* Modular architecture to support future extensions

---

## Why Butter?

Butter is intentionally scoped as a **learning-driven developer tool** rather than a production SaaS. It demonstrates:

* Clear separation between non-AI and AI logic
* Thoughtful prompt design grounded in data
* Practical application of RAG concepts
* An emphasis on explainability over “magic”

The project is designed to be understandable, extensible, and discussion-worthy for engineers reviewing architecture decisions.

---

## Future Improvements

* UI visualization of word frequency and weighting
* Confidence or relevance scoring on summaries
* Support for larger documents via chunking
* Comparison between AI-only vs RAG-assisted outputs
* Exportable analysis results

---

## Getting Started

```bash
# install dependencies
npm install

# run frontend + backend concurrently
npm run dev
```

Environment variables are required for AI and vector database integrations.

---

## Status

Butter is an MVP-level exploratory project built to demonstrate progressive system design, not a finished product.
