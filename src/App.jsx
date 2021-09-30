import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  const handleFileSelection = (e) => {
    const fileName = e.target?.value;
    setFile(fileName);
  }

  return (
    <div className="App">
      <div className="app-input pt-3">
        <input className="form-control custom-file-input" type="file" name="fileInput" id="fileInput" onChange={handleFileSelection} />
      </div>
      <div className="app-output pt-3">
        <div className="form-switch switch-box">
          <input className="form-check-input custom-check-input" type="checkbox" disabled id="flexSwitchCheckDefault" />
          <label className="form-check-label check-label-left" for="flexSwitchCheckDefault">Texto</label>
          <label className="form-check-label check-label-right" for="flexSwitchCheckDefault">Imagem</label>
        </div>
        <div className="output-display">
          {`Current file selected: ${file}`}
        </div>
      </div>
    </div>
  );
}

export default App;
