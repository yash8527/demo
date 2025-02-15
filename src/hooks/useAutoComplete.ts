import { useState, useEffect, useCallback } from 'react';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const useAutoComplete = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [allData, setAllData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedInputValue = useDebounce(inputValue, 300);

    // Function to fetch all data from the fake REST API
    const fetchAllData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await response.json();
            const allTitles = data.map((item: { title: string }) => item.title.substring(0, 30));
            setAllData(allTitles);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    useEffect(() => {
        if (debouncedInputValue) {
            const filteredSuggestions = allData.filter(title =>
                title.toLowerCase().includes(debouncedInputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [debouncedInputValue, allData]);

    return {
        inputValue,
        setInputValue,
        suggestions,
        loading,
        error,
    };
};

export default useAutoComplete;