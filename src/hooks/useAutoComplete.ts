import { useState, useMemo } from 'react';
import useDebounce from './useDebounce';

const useAutoComplete = (allData: string[]) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debouncedInputValue = useDebounce(inputValue, 300);

    const fetchFilteredSuggestions = async (debouncedInputValue: string) => {
        if (debouncedInputValue) {
            setIsLoading(true);
            // Simulate an asynchronous operation as mentioned in the instructions.
            const filtered = await new Promise<string[]>((resolve) => {
                setTimeout(() => {
                    const result = allData.filter(title =>
                        title.toLowerCase().includes(debouncedInputValue.toLowerCase())
                    );
                    resolve(result);
                }, 200);
            });
            setFilteredSuggestions(filtered);
            setIsLoading(false);
        } else {
            setFilteredSuggestions([]);
            setIsLoading(false);
        }
    };

    useMemo(() => {
        fetchFilteredSuggestions(debouncedInputValue);
    }, [debouncedInputValue, allData]);

    return {
        inputValue,
        setInputValue,
        filteredSuggestions,
        isLoading,
    };
};

export default useAutoComplete;