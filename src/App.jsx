import React, { useState, useEffect } from 'react';
import './App.css';

const reader = new FileReader();

function App() {
  const [file, setFile] = useState(null);

  /**
   * Handles file selection for input element.
   * @param {*} e onChange event object
   */
  const handleFileSelection = (e) => {
    const file = e.target?.files?.[0];
    // console.log(file);

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
    setFile(e.target?.result);
  }

  useEffect(() => {
    // Add eventListener to FileReader when component mounts
    reader.addEventListener('load', handleLoadFile);

    // Cleanup eventlistener when component unmounts
    return () => { reader.removeEventListener('load', handleLoadFile) }
  });

  return (
    <div className="App">
      <div className="app-input pt-3">
        <input className="form-control custom-file-input" type="file" name="fileInput" id="fileInput" accept=".txt" onChange={handleFileSelection} />
      </div>
      <div className="app-output pt-3">
        <div className="form-switch switch-box">
          <input className="form-check-input custom-check-input" type="checkbox" disabled id="flexSwitchCheckDefault" />
          <label className="form-check-label check-label-left" htmlFor="flexSwitchCheckDefault">Text</label>
          <label className="form-check-label check-label-right" htmlFor="flexSwitchCheckDefault">Image</label>
        </div>
        <div className="output-display">
          <p>
            {`${file || ""}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
