import './styles.css';

//Adding Types here
interface ButtonProps {
  onClick: () => void;
  label: string;
  value: string;
}

interface InputTextProps {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

interface TextResultsProps {
  values: Array<{ word: string; count: number }>;
}

export function Button({ onClick, label, value }: ButtonProps) {
  return (
    <div className="clarified-button">
      <button onClick="someFunction()">Get Clarified.</button>
    </div>
  );
}

export function InputText({ placeholder, value, onChange }: InputTextProps) {
  return (
    <>
      <div>
        <h1>Butter.</h1>
      </div>
      <div>
        <textarea
          className="text-input"
          placeholder="Enter text to be clarified here..."
        ></textarea>
      </div>
    </>
  );
}

export function TextResults({ values }: TextResultsProps) {
  return (
    <div className="results-area">
      <h3>Top Keywords:</h3> 
      {/* ^ This is going to change to "SUMMARY for AI implementation" */}
      <span className="words">....Top words</span>
      {/* ^ this is going to get removed in AI implementation */}
      <span className="count"> ....Count</span>
    </div>
  );
}
//do we need to export anything else ... do we need a summary box? Am I overthinking this?