import { renderHook, waitFor } from '@testing-library/react';
import useFetchData from '../../src/hooks/useFetchData';

describe('useFetchData', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ title: 'Test Post 1' }, { title: 'Test Post 2' }]),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  
  it('should fetch data and update suggestions', async () => {
    const { result } = renderHook(() => useFetchData());

    await waitFor(() => {
      expect(result.current.suggestions).toEqual(['Test Post 1', 'Test Post 2']);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down')) as jest.Mock;

    const { result } = renderHook(() => useFetchData());

    await waitFor(() => {
      expect(result.current.suggestions).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch data');
    });
  });
});
