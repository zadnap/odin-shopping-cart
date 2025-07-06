import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './MovieList';

describe('MovieList component', () => {
  const mockGenres = {
    genres: [
      {
        id: 1,
        name: 'Adventure',
      },
      {
        id: 2,
        name: 'Action',
      },
    ],
  };

  const mockMovies = {
    results: [
      {
        id: 1,
        title: 'Movie One',
        year: '2025',
        rating: 7.1,
        posterSrc: `poster-1.jpg`,
      },
      {
        id: 2,
        title: 'Movie Two',
        year: '2024',
        rating: 8.1,
        posterSrc: `poster-2.jpg`,
      },
    ],
  };

  beforeAll(() => {
    vi.mock('@/components/ErrorMessage/ErrorMessage', () => ({
      default: ({ message }) => (
        <div data-testid="error-message">{message}</div>
      ),
    }));

    vi.mock('@/components/GenreFilter/GenreFilter', () => ({
      default: ({ genres }) => (
        <ul data-testid="genre-filter">
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      ),
    }));

    vi.mock('@/components/FilteredMovieList/FilteredMovieList', () => ({
      default: ({ movies }) => (
        <ul data-testid="filtered-movies">
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ),
    }));
  });

  it('should render a genre filter', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockGenres })
      .mockResolvedValueOnce({ ok: true, json: async () => mockMovies });

    render(
      <MemoryRouter>
        <MovieList />
      </MemoryRouter>
    );

    const genreFilter = await screen.findByTestId('genre-filter');

    expect(genreFilter).toBeInTheDocument();
    expect(genreFilter).toHaveTextContent('Adventure');
    expect(genreFilter).toHaveTextContent('Action');
  });

  it('should render filtered movie list', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockGenres })
      .mockResolvedValueOnce({ ok: true, json: async () => mockMovies });

    render(
      <MemoryRouter>
        <MovieList />
      </MemoryRouter>
    );

    const moviesList = await screen.findByTestId('filtered-movies');

    expect(moviesList).toBeInTheDocument();
    expect(moviesList).toHaveTextContent('Movie One');
    expect(moviesList).toHaveTextContent('Movie Two');
  });

  it('should display error message when genre fetch fails', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: true, json: async () => mockMovies });

    render(
      <MemoryRouter>
        <MovieList />
      </MemoryRouter>
    );

    const error = await screen.findByTestId('error-message');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(
      'Could not find a list of genre. Please try again later.'
    );
  });

  it('should display error message when movie fetch fails', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockGenres })
      .mockResolvedValueOnce({ ok: false, status: 500 });

    render(
      <MemoryRouter>
        <MovieList />
      </MemoryRouter>
    );

    const error = await screen.findByTestId('error-message');

    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(
      'Something went wrong while fetching movie data. Please try again later.'
    );
  });
});
