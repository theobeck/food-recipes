import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './index';
import { vi } from 'vitest';

describe('SearchBar Component', () => {
  vi.useFakeTimers();

  it('renders correctly', () => {
    const setSearchTerm = vi.fn();
    render(<SearchBar setSearchTerm={setSearchTerm} />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('updates input value on change', async () => {
    const setSearchTerm = vi.fn();
    render(<SearchBar setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText('Search');
    userEvent.type(input, 'pasta');
    await vi.waitFor(() => expect(input).toHaveValue('pasta'));
  });

  // Clean up
  afterAll(() => {
    vi.useRealTimers();
  });
});
