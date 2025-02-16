import { renderHook, act, waitFor } from '@testing-library/react';
import useAutoComplete from '../../src/hooks/useAutoComplete';

describe('useAutoComplete', () => {
  const allData = ['apple', 'banana', 'grape', 'orange', 'pineapple'];

  it('should initialize with empty inputValue and filteredSuggestions', () => {
    const { result } = renderHook(() => useAutoComplete(allData));
    expect(result.current.inputValue).toBe('');
    expect(result.current.filteredSuggestions).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should update inputValue when setInputValue is called', () => {
    const { result } = renderHook(() => useAutoComplete(allData));
    act(() => {
      result.current.setInputValue('app');
    });
    expect(result.current.inputValue).toBe('app');
  });

  it('should filter suggestions based on inputValue', async () => {
    const { result } = renderHook(() => useAutoComplete(allData));
    act(() => {
      result.current.setInputValue('app');
    });

    await waitFor(() => {
      expect(result.current.filteredSuggestions).toEqual(['apple', 'pineapple']);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should handle empty inputValue correctly', async () => {
    const { result } = renderHook(() => useAutoComplete(allData));
    act(() => {
      result.current.setInputValue('');
    });

    await waitFor(() => {
      expect(result.current.filteredSuggestions).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
