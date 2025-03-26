import React, { useState, useEffect, useCallback } from 'react';
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

  const checkSpelling = useCallback(
    (inputText) => {
      if (!inputText.trim()) {
        setSuggestion('');
        return;
      }

      const words = inputText.split(/\s+/);
      for (let word of words) {
        const lowerWord = word.toLowerCase();
        if (customDictionary.hasOwnProperty(lowerWord)) {
          const correctedWord = customDictionary[lowerWord];
          setSuggestion(`Did you mean: ${correctedWord}?`);
          return;
        }
      }

      setSuggestion('');
    },
    [setSuggestion] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    checkSpelling(text);
  }, [text, checkSpelling]);

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