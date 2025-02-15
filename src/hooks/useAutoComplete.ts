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

const useAutoComplete = (data: string[]) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedInputValue = useDebounce(inputValue, 300);

    // Function to filter suggestions asynchronously
    const fetchSuggestions = useCallback(async (input: string) => {
        setLoading(true);
        setError(null);
        try {
            // Simulating an API call with a timeout
            const filteredSuggestions = await new Promise<string[]>((resolve) => {
                setTimeout(() => {
                    const filtered = data.filter(item =>
                        item.toLowerCase().includes(input.toLowerCase())
                    );
                    resolve(filtered);
                }, 300);
            });
            setSuggestions(filteredSuggestions);
        } catch (err) {
            setError('Failed to fetch suggestions');
        } finally {
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (debouncedInputValue) {
            fetchSuggestions(debouncedInputValue);
        } else {
            setSuggestions([]);
        }
    }, [debouncedInputValue, fetchSuggestions]);

    return {
        inputValue,
        setInputValue,
        suggestions,
        loading,
        error,
    };
};

export default useAutoComplete;