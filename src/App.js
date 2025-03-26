import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const customDictionary = {
    teh: 'the',
    wrok: 'work',
    fot: 'for',
    exampl: 'example',
  };

  useEffect(() => {
    if (!text.trim()) {
      setSuggestion('');
      return;
    }

    const words = text.split(/\s+/);
    for (let word of words) {
      const lowerWord = word.toLowerCase();
      if (customDictionary.hasOwnProperty(lowerWord)) {
        const correctedWord = customDictionary[lowerWord];
        setSuggestion(`Did you mean: ${correctedWord}?`);
        return;
      }
    }

    setSuggestion('');
  }, [text]); // Only depends on text

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <h1>Spell Check and Auto-Correction</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text..."
      />
      {suggestion && <p>{suggestion}</p>}
    </div>
  );
}

export default App;