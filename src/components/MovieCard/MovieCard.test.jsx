import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from './MovieCard';

describe('MovieCard component', () => {
  it('should render with correct props', () => {
    const mockProps = {
      posterSrc: 'flow.jpg',
      title: 'Flow',
      year: 2024,
      rating: '7.9',
      id: '238',
    };

    render(
      <MemoryRouter>
        <MovieCard {...mockProps} />
      </MemoryRouter>
    );

    const movieCard = screen.getByRole('link');
    const poster = screen.getByRole('img');
    const year = screen.getByText(/2024/);
    const rating = screen.getByText(/7.9/);

    expect(movieCard).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(movieCard).toHaveAttribute('href', `/movies/${mockProps.id}`);
    expect(poster).toHaveAttribute('src', mockProps.posterSrc);
    expect(poster).toHaveAttribute('alt', `${mockProps.title}'s poster`);
  });
});
