import React, { useState } from 'react';
import { AutoCompleteProps } from '../types';
import useAutoComplete from '../hooks/useAutoComplete';
import '../styles/AutoComplete.css';

const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions: initialSuggestions }) => {
  const { inputValue, setInputValue, suggestions, loading } = useAutoComplete(initialSuggestions);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setInputValue(suggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex === 0) return;
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex === suggestions.length - 1) return;
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        className="autocomplete-input"
      />
      {loading && <div>Loading...</div>}
      {showSuggestions && inputValue && (
        <ul className="suggestions">
          {suggestions.length ? (
            suggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestionIndex) {
                className = 'suggestion-active';
              }
              return (
                <li
                  key={suggestion}
                  className={className}
                  onClick={() => handleClick(suggestion)}
                >
                  {highlightText(suggestion, inputValue)}
                </li>
              );
            })
          ) : (
            <li className="no-suggestions">No suggestions</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;