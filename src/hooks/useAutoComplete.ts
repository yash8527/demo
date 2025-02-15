import { useState, useEffect } from 'react';

const useAutoComplete = (data: string[]) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to filter suggestions asynchronously
    const fetchSuggestions = async (input: string) => {
        setLoading(true);
        // Simulating an API call with a timeout
        return new Promise<string[]>((resolve) => {
            setTimeout(() => {
                const filteredSuggestions = data.filter(item =>
                    item.toLowerCase().includes(input.toLowerCase())
                );
                resolve(filteredSuggestions);
            }, 300);
        });
    };

    useEffect(() => {
        if (inputValue) {
            const loadSuggestions = async () => {
                const results = await fetchSuggestions(inputValue);
                setSuggestions(results);
                setLoading(false);
            };
            loadSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [inputValue, data]);

    return {
        inputValue,
        setInputValue,
        suggestions,
        loading,
    };
};

export default useAutoComplete;