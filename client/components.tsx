import type { TopWord, RagMatch } from '../types';
import './styles.css';
import type { ButterMode, ButterResults } from './frontendtypes';

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
  topWords: TopWord[]; //based off of types.ts from Elijah
  matches?: RagMatch[]; //meant to show RAG matches per types.ts
  summary?: string; //meant to show summary text
}

interface RouteSelectorProps {
  currentMode: string;
  onModeChange: (newMode: 'analyze' | 'summarize' | 'rag') => void;
}

export function Button({ onClick, label, isLoading }: ButtonProps) {
  return (
    <div className="clarified-button">
      <button onClick={onClick} disabled={isLoading}>
        {isLoading ? 'churning butter ...' : label}
      </button>
    </div>
  );
}


export function InputText({ placeholder, value, onChange }: InputTextProps) {
  return (
    <div className="input-container">
      <div className="title-area">
        <h1>Butter.</h1>
      </div>
      <div>
        <textarea
          className="text-input"
          placeholder="Enter text to be clarified here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export function TextResults({ summary, topWords, matches }: TextResultsProps) {
  return (
    <div className="results-area">
      {/* summary  -->  only shows for summarize + rag */}
      {summary && (
        <div className="summary-section">
          <h3>The Gist (AI):</h3>
          <p className="summary-text">{summary}</p>
        </div>
      )}

      {/* top keywords  -->  shows for all 3 routes */}
      <h3>Top Keywords:</h3>

      {topWords.length === 0 ? (
        <p className="muted-text">
          No keywords yet. Paste text and click Get Clarified.
        </p>
      ) : (
        <ul className="keyword-list">
          {topWords.map((item) => (
            <li key={item.word} className="keyword-item">
              <span className="words">{item.word} was mentioned </span>
              <span className="count">{item.count}x.</span>
            </li>
          ))}
        </ul>
      )}

      {/* rag matches  -->  only shows when the rag route returns matches */}
      {matches && matches.length > 0 && (
        <div className="matches-section">
          <h3>RAG Matches (Knowledge Base):</h3>
          <ul className="matches-list">
            {matches.map((match) => (
              <li key={match.id} className="match-item">
                <div className="match-title">{match.title}</div>
                <div className="match-snippet">{match.snippet}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function RouteSelector({
  currentMode,
  onModeChange,
}: RouteSelectorProps) {
  return (
    <div className="selector-container">
      <label htmlFor="route-select">
        <h2>Choose Analysis Type:</h2>
        </label>
      <select
        id="route-select"
        value={currentMode}
        className="dropdown-menu"
        onChange={(e) => onModeChange(e.target.value as ButterMode)}
      >
        <option value="analyze">Basic Keywords</option>
        <option value="summarize">AI Summary</option>
        <option value="rag">RAG Summary</option>
      </select>
    </div>
  );
}
