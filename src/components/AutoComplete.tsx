import React, { useState } from 'react';
import useAutoComplete from '../hooks/useAutoComplete';
import '../styles/AutoComplete.css';
import { AutoCompleteProps } from '../types';

const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions }) => {
  const { inputValue, setInputValue, filteredSuggestions, isLoading } = useAutoComplete(suggestions);
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

  // To handle keyboard navigation and selection of suggestions using arrow keys and Enter key //
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

  const handleClear = () => {
    setInputValue('');
    setShowSuggestions(false);
  };

  // To highlight the matching text in the suggestions //
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
      <div className="input-wrapper">
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          className="autocomplete-input"
          placeholder='Search for lorem'
          role="combobox"
          aria-expanded={showSuggestions}
        />
        {inputValue && (
          <button
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClear();
              }
            }}
          >
            &times;
          </button>
        )}
      </div>
      {(isLoading && showSuggestions) && <div className="loader">Loading...</div>}
      {showSuggestions && inputValue && (
        <ul className="suggestions" role="listbox">
          {filteredSuggestions.length ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={index === activeSuggestionIndex ? 'suggestion-active' : ''}
                onClick={() => handleClick(suggestion)}
                role="option"
              >
                {highlightText(suggestion, inputValue)}
              </li>
            ))
          ) : (
            !isLoading && <li className="no-match-found">No match found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;