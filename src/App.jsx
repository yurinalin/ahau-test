import React, { useState, useEffect } from 'react';
import { processInput } from './scripts';

import './App.css';

const reader = new FileReader();

function buildOutput(snapshot = [], index = 0) {
  return (
    <li key={index} className="snapshot">
      {snapshot?.length ? snapshot.map(str => <p key={Math.random()}>{str}</p>) : <></>}
    </li>);
}

function App() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);

  /**
   * Handles file selection for input element.
   * @param {*} e onChange event object
   */
  const handleFileSelection = (e) => {
    const file = e.target?.files?.[0];

    try {
      reader.readAsText(file);
    } catch (error) {
      setFile(null);
    }
  }

  /**
   * Sets file content to state.
   * @param {*} e onLoad event object
   */
  const handleLoadFile = (e) => {
    const fileContent = e.target?.result;
    setFile(fileContent);
  }

  useEffect(() => {
    // Add eventListener to FileReader when component mounts
    reader.addEventListener('load', handleLoadFile);

    // Cleanup eventlistener when component unmounts
    return () => { reader.removeEventListener('load', handleLoadFile) }
  });

  useEffect(() => {
    // TODO: Process one command at a time
    // Process input after state refresh
    setOutput(processInput(file));
  }, [file]);

  return (
    <div className="App">
      <div className="app-input pt-3">
        <input className="form-control custom-file-input" type="file" name="fileInput" id="fileInput" accept=".txt" onChange={handleFileSelection} />
      </div>
      <div className="app-output pt-3">
        {/* Switch from text to image output (future feature) */}
        <div className="form-switch switch-box">
          <input className="form-check-input custom-check-input" type="checkbox" disabled id="flexSwitchCheckDefault" />
          <label className="form-check-label check-label-left" htmlFor="flexSwitchCheckDefault">Text</label>
          <label className="form-check-label check-label-right" htmlFor="flexSwitchCheckDefault">Image</label>
        </div>
        <div className="output-display">
          {file ? <span className="label-span">INPUT: </span> : <></>}
          {file ? <ol>{file.split('\n').map((str, index) => <li key={str.replace(/\W/, '') + index}>{str.toString()}</li>)}</ol> : ""}
          <br />
          {output ? <span className="label-span">OUTPUT: </span> : <></>}
          {output ? <ol className="snapshot-list">{output.map((str, index) => buildOutput(str, index))}</ol> : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
