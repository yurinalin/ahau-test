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
      <div className="app-input">
        <input type="file" name="fileInput" id="fileInput" onChange={handleFileSelection} />
      </div>
      <div className="app-output">
        {`Current file selected: ${file}`}
      </div>
    </div>
  );
}

export default App;
