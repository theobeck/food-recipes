import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BackButton from './index';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('BackButton', () => {
  it('renders the back button', () => {
    render(<BackButton />);
    expect(screen.getByAltText('Back Button')).toBeInTheDocument();
  });

  it('calls navigate on button click', () => {
    const mockNavigate = vi.fn();
    (useNavigate as vi.Mock).mockImplementation(() => mockNavigate);

    render(<BackButton />);
    const backButton = screen.getByAltText('Back Button');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('calls navigate on pressing Enter', () => {
    const mockNavigate = vi.fn();
    (useNavigate as vi.Mock).mockImplementation(() => mockNavigate);

    render(<BackButton />);
    const backButton = screen.getByAltText('Back Button');
    fireEvent.keyDown(backButton, { key: 'Enter' });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
