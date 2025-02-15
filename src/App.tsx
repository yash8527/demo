import React from 'react';
import AutoComplete from './components/AutoComplete';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Autocomplete</h1>
      <p>Search for solutions that deal provides.</p>
      <AutoComplete />
    </div>
  );
};

export default App;