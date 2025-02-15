import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

const useAutoComplete = (allData: string[]) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const debouncedInputValue = useDebounce(inputValue, 300);

    useEffect(() => {
        const fetchFilteredSuggestions = async () => {
            if (debouncedInputValue) {
                // Simulate an asynchronous operation as mentioned in the instructions. //
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