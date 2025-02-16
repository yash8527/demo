import React from 'react';
import AutoComplete from './components/AutoComplete';
import useFetchData from './hooks/useFetchData';

const App: React.FC = () => {
  const { suggestions, loading, error } = useFetchData();

  return (
    <div className="App">
      <h2>Auto complete Suggestion</h2>
      {error && <div>{error}</div>}
      {loading && <div>Fetching Data</div>}
      <AutoComplete suggestions={suggestions} />
    </div>
  );
};

export default App;