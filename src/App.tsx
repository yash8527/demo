import React from 'react';
import AutoComplete from './components/AutoComplete';
import useFetchData from './hooks/useFetchData';

const App: React.FC = () => {
  const { suggestions, loading, error } = useFetchData();

  return (
    <div className="App">
      <h1>Autocomplete Suggestion</h1>
      {error && <div>{error}</div>}
      {loading && <div>Fetching Data</div>}
      <AutoComplete suggestions={suggestions} />
    </div>
  );
};

export default App;