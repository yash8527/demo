import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutoComplete from '../../src/components/AutoComplete';
import renderer from 'react-test-renderer';

const suggestions = ['Football', 'Cricket', 'Foosball', 'Basketball'];

describe('AutoComplete Component', () => {
  beforeEach(() => {
    render(<AutoComplete suggestions={suggestions} />);
  });

  it('renders input element', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Search for lorem');
  });

  it('shows "No match found" when no suggestions match', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'xyz' } });
    expect(screen.getByText(/no match found/i)).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(<AutoComplete suggestions={suggestions} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});