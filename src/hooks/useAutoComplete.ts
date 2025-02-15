import { useState, useEffect } from 'react';

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

const useAutoComplete = (allData: string[]) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const debouncedInputValue = useDebounce(inputValue, 300);

    useEffect(() => {
        const fetchFilteredSuggestions = async () => {
            if (debouncedInputValue) {
                // Simulate an asynchronous operation
                const filtered = await new Promise<string[]>((resolve) => {
                    setTimeout(() => {
                        const result = allData.filter(title =>
                            title.toLowerCase().includes(debouncedInputValue.toLowerCase())
                        );
                        resolve(result);
                    }, 100);
                });
                setFilteredSuggestions(filtered);
            } else {
                setFilteredSuggestions([]);
            }
        };

        fetchFilteredSuggestions();
    }, [debouncedInputValue, allData]);

    return {
        inputValue,
        setInputValue,
        filteredSuggestions,
    };
};

export default useAutoComplete;