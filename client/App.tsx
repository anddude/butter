import { useState } from 'react'
import './styles.css';
import {Button, InputText, TextResults, RouteSelector} from './components.tsx';
import type { RagSummarizeTextResponse } from '../types.ts';
//import api once it's ready - esm

function App() {
  //We'll need to manage the state of the input text and the clarified text here...other states we need to manage?
  //store the raw text the user pastes into the inputtext component.
  const [inputText, setInputText] = useState("");
  //should hold the response from the server. It starts as null bc we do not hav edata until the user clicks clarify
  const [results, setResults] = useState<RagSummarizeTextResponse | null>(null); //removed 
  //a standad boolean flag to show that we are "loading" the response from the server
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState < "analyze" | "summarize" | "rag">("analyze");

  //we need async function to "fetch" from the server .. localhost:4200? whichever port Elijah decides onthe backend - esm
  const handleClarify = async () => {
    //edge case - if inputText is empty, we do nothing
    if (!inputText.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/summarize-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, topLimit: 10 }), //example topLimit
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: RagSummarizeTextResponse = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch clarified text:", error);
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
        label="Get Clarified"
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
