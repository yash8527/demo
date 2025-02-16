import { renderHook, waitFor } from '@testing-library/react';
import useDebounce from '../../src/hooks/useDebounce';

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the specified delay', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    rerender({ value: 'updated', delay: 500 });

    await waitFor(() => {
      expect(result.current).toBe('updated');
    }, { timeout: 600 });
  });

  it('should clean up the timeout on unmount', async () => {
    const { result, unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    unmount();

    await waitFor(() => {
      expect(result.current).toBe('initial');
    }, { timeout: 600 });
  });
});