import type { TopWord, RagMatch } from '../types';
import './styles.css';

//Adding Types here
interface ButtonProps {
  onClick: () => void;
  label: string;
  isLoading: boolean; //used to disable button when loading
}

interface InputTextProps {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

interface TextResultsProps {
  values: Array<{ word: string; count: number }>; //not sure that we need this anymore since we want it to fill in with the bottom but leaving it in case
  topWords: TopWord[]; //based off of types.ts from Elijah
  matches?: RagMatch[]; //meant to show RAG matches per types.ts
  summary?: string; //meant to show summary text
}
interface RouteSelectorProps {
  currentMode: string;
  onModeChange: (newMode: 'analyze' |'summarize' | 'rag') => void;
}

export function Button({ onClick, label, isLoading }: ButtonProps) {
  return (
    <div className="clarified-button">
      <button 
        onClick={onClick} 
        disabled={isLoading}>
          {isLoading ? 'churning butter ...' : label}
      </button>
    </div>
  );
}

export function InputText({ placeholder, value, onChange }: InputTextProps) {
  return (
    <div className="input-container">
      <div>
        <h1>Butter.</h1>
      </div>
      <div>
        <textarea
          className="text-input"
          placeholder="Enter text to be clarified here..."
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export function TextResults({ summary, values }: TextResultsProps) {
  return (
    <div className="results-area">
      {summary && (
        <div className="summary-section">
          <h3>The Gist (AI + Knowledge Base):</h3>
          <p className="summary-text">{summary}</p>
        </div>
      )}
      <h3>Top Keywords:</h3>
      {/* ^ This is going to change to "SUMMARY for AI implementation" */}
      <span className="words">....Top words</span>
      {/* ^ this is going to get removed in AI implementation */}
      <span className="count"> ....Count</span>
    </div>
  );
}

export function RouteSelector({currentMode, onModeChange }: RouteSelectorProps) {
  return (
    <div className="selector-container">
      <label htmlFor='route-select'>Choose Analysis Type:
      </label>
      <select id='route-select' value={currentMode}
      className="dropdown-menu">
        <option value="analyze">Basic Keywords</option>
        <option value="summarize">AI Summary</option>
        <option value="rag">RAG Summary</option>
      </select>
    </div>
  );
}
//do we need to export anything else ... do we need a summary box? Am I overthinking this?