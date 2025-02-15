import React from 'react';
import AutoComplete from './components/AutoComplete';

const suggestions = [
  'Hire anyone, anywhere',
  'Consolidate HR operations',
  'Automate payroll administration',
  'Improve team satisfaction',
  'Expand into markets quickly',
  'Relocate team members',
];

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Autocomplete</h1>
      <p>Search for solutions that deal provides.</p>
      <AutoComplete suggestions={suggestions} />
    </div>
  );
};

export default App;