import { useState } from 'react'
import './styles.css';
import {Button, InputText, TextResults} from './components.tsx';
//import api here

//do we input Elijah's interface here? question for another time tho- esm

function App() {
  //We'll need to manage the state of the input text and the clarified text here...other states we need to manage?
  // const [inputText, setInputText] = useState("");
  // const [results, setResults] = useState<Array<[string, number]>>([]);

  //we need async function to "fetch" from the server .. localhost:4200? whichever port Elijah decides onthe backend - esm




  return (
    <div className="container">
      <InputText />
      <Button />
      <TextResults/>
    </div>
  )
}

export default App
