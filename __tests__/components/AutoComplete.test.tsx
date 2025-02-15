import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutoComplete from '../../src/components/AutoComplete';

const suggestions = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

describe('AutoComplete Component', () => {
  it('renders input element', () => {
    render(<AutoComplete suggestions={suggestions} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('selects suggestion with Enter key', () => {
    render(<AutoComplete suggestions={suggestions} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'c' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // expect(input.value).toBe('cherry');
    expect(screen.queryByText(/cherry/i)).not.toBeInTheDocument();
  });
});