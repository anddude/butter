import { useState } from 'react'
import './styles.css';
import {Button, InputText, TextResults, RouteSelector} from './components';
import type { AnalyzeTextResponse, SummarizeTextResponse, RagSummarizeTextResponse } from '../types';
import type { ButterMode, ButterResults } from './frontendtypes';
import { fetchAnalyzedText, fetchSummarizedText, ragSummarizeText } from './api'

function App() {
  // store raw text user inputs
  const [inputText, setInputText] = useState("");
  
  // store the most recent sever response
  const [results, setResults] = useState<ButterResults | null>(null);
  
  // boolean flag to show we're still gathering the server response
  const [isLoading, setIsLoading] = useState(false);
  
  // track which endpoint / behavior the user wants
  const [currentMode, setCurrentMode] = useState <ButterMode>("analyze");
  
  // readable errors for the UI
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleClarify = async () => {
    // edge case  -->  empty string or whitespace only
    if (!inputText.trim()) {
      return;
    }

    // clear out old UI state before a new request
    setIsLoading(true);
    setErrorMessage(null);

    try {
      let data: ButterResults;
      // clarify 1  -->  no ai keyword extraction
      if (currentMode === "analyze") {
        data = await fetchAnalyzedText( {text: inputText});
      // clarify 2  -->  ai prompt summary (no rag)
      } else if (currentMode === "summarize") {
        data= await fetchSummarizedText ( {text: inputText});
      // clarify 3  -->  rag summary (kb context injected)
      } else{
        data = await ragSummarizeText( {text: inputText});
      }
      setResults(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error occurred';
      console.error("Failed to fetch clarified text:", error);
      setErrorMessage(message);
      setResults(null);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <InputText
        placeholder="Enter text to be clarified here..."
        value={inputText}
        onChange={setInputText}
      />
      <RouteSelector 
        currentMode={currentMode}
        onModeChange={setCurrentMode}
      />
      <Button 
        onClick={handleClarify} 
        label="Get Clarified"
        isLoading={isLoading} 
      />

      {/* error output if exists */}
      {errorMessage && (
                <div className="error-area">
                    <p>{errorMessage}</p>
                </div>
            )}

      <TextResults 
        // summary exists for summarize + rag  but not analyze
        summary={'summary' in (results ?? {}) ? results?.summary : undefined}

        // all 3 routes return topWords
        topWords={results?.topWords || []}

        // matches only exist for rag
        matches={'matches' in (results ?? {}) ? (results as RagSummarizeTextResponse).matches : undefined}
      />
      
    </div>
  )
}

export default App
