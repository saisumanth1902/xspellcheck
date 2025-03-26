import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  // State for the text entered in the textarea
  const [text, setText] = useState('');
  // State for the correction suggestion
  const [suggestion, setSuggestion] = useState('');

  // Custom dictionary for spell-checking
  const customDictionary = {
    teh: 'the',
    wrok: 'work',
    fot: 'for',
    exampl: 'example',
  };

  // Memoize the checkSpelling function to prevent re-creation on every render
  const checkSpelling = useCallback((inputText) => {
    if (!inputText.trim()) {
      setSuggestion(''); // Clear suggestion if textarea is empty
      return;
    }

    // Split the input text into words
    const words = inputText.split(/\s+/);

    // Check each word against the dictionary (case-insensitive)
    for (let word of words) {
      const lowerWord = word.toLowerCase();
      if (customDictionary.hasOwnProperty(lowerWord)) {
        const correctedWord = customDictionary[lowerWord];
        setSuggestion(`Did you mean: ${correctedWord}?`);
        return; // Stop after finding the first misspelling
      }
    }

    // If no misspellings are found, clear the suggestion
    setSuggestion('');
  }, [setSuggestion]); // Dependency: setSuggestion (stable, provided by React)

  // Use useEffect to check spelling whenever the text changes
  useEffect(() => {
    checkSpelling(text);
  }, [text, checkSpelling]); // Include checkSpelling in the dependency array

  // Handle text change in the textarea
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