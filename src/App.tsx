import React, { useState, useEffect, useCallback } from 'react';
import AutoComplete from './components/AutoComplete';

const App: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data = await response.json();
      const allTitles = data.map((item: { title: string }) => item.title.substring(0, 30));
      setSuggestions(allTitles);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className="App">
      <h1>Autocomplete</h1>
      <p>Search for solutions that deal provides.</p>
      {error && <div>{error}</div>}
      <AutoComplete suggestions={suggestions} loading={loading} />
    </div>
  );
};

export default App;