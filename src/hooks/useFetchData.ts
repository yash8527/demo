import { useState, useEffect } from 'react';
import { Post } from '../types';

const useFetchData = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data: Post[] = await response.json();
      const allTitles = data.map((item) => item.title.substring(0, 30));
      setSuggestions(allTitles);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return { suggestions, loading, error };
};

export default useFetchData;