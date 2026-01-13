import { useState } from 'react'
import './styles.css';
import {Button, InputText, TextResults, RouteSelector} from './components.tsx';
import type { AnalyzeTextResponse, SummarizeTextResponse, RagSummarizeTextResponse } from '../types.ts';
import {fetchAnalyzedText, fetchSummarizedText, ragSummarizeText } from './api'

// modes supported by the backend routes
type ButterMode = "analyze" | "summarize" | "rag";
// results have a different shape denpending on the route
type ButterResults = AnalyzeTextResponse | SummarizeTextResponse | RagSummarizeTextResponse;


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
      if (currentMode === "analyze") {
        let data = await fetchAnalyzedText( {text: inputText});
        setResults(data)
      } else if (currentMode === "summarize") {
        let data= await fetchSummarizedText ( {text: inputText});
        setResults(data)
      } else{
        let data = await ragSummarizeText( {text: inputText});
        setResults(data)
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <InputText
        value={inputText}
        onChange={setInputText}
      />
      <RouteSelector 
        
      />
      <Button 
        onClick={handleClarify} 
<<<<<<< Updated upstream
        label="Get Clarified"
=======
        label="Get clarified"
>>>>>>> Stashed changes
        isLoading={isLoading} 
      />
      <TextResults 
        summary={results?.summary}
        value={results?.topWords || []}
      />
    </div>
  )
}

export default App
