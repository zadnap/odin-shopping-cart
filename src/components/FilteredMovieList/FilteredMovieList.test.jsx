import { vi, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FilteredMovieList from './FilteredMovieList';

vi.mock('@/components/MovieCard/MovieCard', () => {
  return {
    default: (props) => <div data-testid="movie-card">{props.title}</div>,
  };
});

const mockMovies = [
  {
    posterSrc:
      'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    title: 'The Godfather',
    year: 1972,
    rating: 8.7,
    id: 238,
  },
  {
    posterSrc:
      'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    title: 'The Shawshank Redemption',
    year: 1994,
    rating: 8.7,
    id: 278,
  },
  {
    posterSrc:
      'https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
    title: 'The Godfather Part II',
    year: 1974,
    rating: 8.6,
    id: 240,
  },
];

describe('FilteredMovieList component', () => {
  it('should render a semantic list', () => {
    render(<FilteredMovieList movies={mockMovies} />);
    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });

  it('should not render anything inside list when prop movies is empty', () => {
    render(<FilteredMovieList movies={[]} />);

    expect(screen.queryByTestId('movie-card')).not.toBeInTheDocument();
  });

  it('should render correct number of items', () => {
    render(<FilteredMovieList movies={mockMovies} />);
    const movieCards = screen.getAllByTestId('movie-card');

    expect(movieCards).toHaveLength(mockMovies.length);
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });
});
