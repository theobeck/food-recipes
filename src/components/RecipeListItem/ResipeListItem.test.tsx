import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import RecipeListItem from './index';
import { JSX } from 'react/jsx-runtime';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    
    return render(ui, { wrapper: BrowserRouter });
    }

describe('RecipeListItem', () => {
  it('renders recipe information', () => {
    const mockRecipe = {
      id: 1,
      name: 'Chocolate Cake',
      imageUrl: 'http://example.com/cake.jpg',
      reviews: [
        { rating: 5, comment: 'Delicious!' },
        { rating: 4, comment: 'Pretty good, but a bit sweet.' }
      ]
    };

    renderWithRouter(<RecipeListItem recipe={mockRecipe} />);

    // Check that image, name, and link are rendered
    expect(screen.getByRole('img', { name: 'Chocolate Cake' })).toHaveAttribute('src', 'http://example.com/cake.jpg');
    expect(screen.getByRole('link')).toHaveAttribute('href', `${import.meta.env.BASE_URL}/recipe/1`);
    expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
  });

  it('calculates and displays average rating', () => {
    const mockRecipeWithRatings = {
      id: 2,
      name: 'Apple Pie',
      imageUrl: 'http://example.com/pie.jpg',
      reviews: [
        { rating: 5, comment: 'Amazing!' },
        { rating: 3, comment: 'It is okay.' },
        { rating: 4, comment: 'Tasty, but I have had better.' }
      ]
    };

    renderWithRouter(<RecipeListItem recipe={mockRecipeWithRatings} />);

    // Calculate expected average rating
    const expectedAverage = ((5 + 3 + 4) / 3).toFixed(1);
    expect(screen.getByText(expectedAverage)).toBeInTheDocument();
  });

  it('displays "No reviews" when there are no reviews', () => {
    const mockRecipeWithoutRatings = {
      id: 3,
      name: 'Banana Bread',
      imageUrl: 'http://example.com/bread.jpg',
      reviews: []
    };

    renderWithRouter(<RecipeListItem recipe={mockRecipeWithoutRatings} />);

    expect(screen.getByText('No reviews')).toBeInTheDocument();
  });
});
