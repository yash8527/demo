import React, { useState } from 'react';
import useAutoComplete from '../hooks/useAutoComplete';
import '../styles/AutoComplete.css';

interface AutoCompleteProps {
  suggestions: string[];
  loading: boolean;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions, loading }) => {
  const { inputValue, setInputValue, filteredSuggestions } = useAutoComplete(suggestions);
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
    switch (e.key) {
      case 'Enter':
        setInputValue(filteredSuggestions[activeSuggestionIndex]);
        setShowSuggestions(false);
        break;
      case 'ArrowUp':
        if (activeSuggestionIndex > 0) {
          setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        break;
      case 'ArrowDown':
        if (activeSuggestionIndex < filteredSuggestions.length - 1) {
          setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
        break;
      default:
        break;
    }
  };

  const highlightText = (fullText: string, searchText: string) => {
    const searchRegex = new RegExp(`(${searchText})`, 'gi');
    return (
      <span>
        {fullText.split(searchRegex).map((segment, idx) =>
          searchRegex.test(segment) ? (
            <span key={idx} className="highlight">
              {segment}
            </span>
          ) : (
            segment
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
          {filteredSuggestions.length ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={index === activeSuggestionIndex ? 'suggestion-active' : ''}
                onClick={() => handleClick(suggestion)}
              >
                {highlightText(suggestion, inputValue)}
              </li>
            ))
          ) : (
            <li className="no-match-found">No match found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;