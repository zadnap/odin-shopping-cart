import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Movie from './Movie';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('@/components/MovieDetail/MovieDetail', () => ({
  default: ({ movie }) => <div data-testid="movie-detail">{movie?.title}</div>,
}));
vi.mock('@/components/CastList/CastList', () => ({
  default: ({ casts }) => <div data-testid="cast-list">{casts?.length}</div>,
}));
vi.mock('@/components/Review/Review', () => ({
  default: ({ currentReview }) => (
    <div data-testid="review">{currentReview?.author}</div>
  ),
}));
vi.mock('@/components/ErrorMessage/ErrorMessage', () => ({
  default: ({ message }) => <div data-testid="error">{message}</div>,
}));
vi.mock('@/components/Loader/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

const mockMovieRes = {
  ok: true,
  json: async () => ({
    title: 'Test Movie',
    poster_path: '/poster.jpg',
    backdrop_path: '/backdrop.jpg',
    release_date: '2020-01-01',
    runtime: 120,
    overview: 'Test overview',
    genres: [{ id: 1, name: 'Action' }],
    vote_average: 8.5,
    spoken_languages: [{ iso_639_1: 'en', english_name: 'English' }],
  }),
};

const mockCreditsRes = {
  ok: true,
  json: async () => ({
    crew: [{ job: 'Director', name: 'John Doe' }],
    cast: [{ id: 1, name: 'Actor A', character: 'Hero', profile_path: null }],
  }),
};

const mockReleaseRes = {
  ok: true,
  json: async () => ({
    results: [
      {
        iso_3166_1: 'US',
        release_dates: [{ certification: 'PG-13' }],
      },
    ],
  }),
};

const mockVideoRes = {
  ok: true,
  json: async () => ({
    results: [
      {
        site: 'YouTube',
        type: 'Trailer',
        official: true,
        key: 'abc123',
      },
    ],
  }),
};

const mockReviewRes = {
  ok: true,
  json: async () => ({
    results: [
      {
        id: '1',
        author: 'Reviewer',
        content: 'Great movie!',
        created_at: '2021-01-01',
        author_details: { rating: 8, avatar_path: null },
      },
    ],
  }),
};

beforeEach(() => {
  globalThis.fetch = vi.fn((url) => {
    if (url.includes('/credits')) return Promise.resolve(mockCreditsRes);
    if (url.includes('/release_dates')) return Promise.resolve(mockReleaseRes);
    if (url.includes('/videos')) return Promise.resolve(mockVideoRes);
    if (url.includes('/reviews')) return Promise.resolve(mockReviewRes);
    return Promise.resolve(mockMovieRes);
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

const renderMoviePage = (id = '123') => {
  render(
    <MemoryRouter initialEntries={[`/movies/${id}`]}>
      <Routes>
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </MemoryRouter>
  );
};

// Tests
describe('Movie page', () => {
  it('should render a movie detail banner', async () => {
    renderMoviePage();
    await waitFor(() =>
      expect(screen.getByTestId('movie-detail')).toBeInTheDocument()
    );
    expect(screen.getByTestId('movie-detail')).toHaveTextContent('Test Movie');
  });

  it('should render a cast list', async () => {
    renderMoviePage();
    await waitFor(() =>
      expect(screen.getByTestId('cast-list')).toBeInTheDocument()
    );
    expect(screen.getByTestId('cast-list')).toHaveTextContent('1'); // 1 cast
  });

  it('should render a review section', async () => {
    renderMoviePage();
    await waitFor(() =>
      expect(screen.getByTestId('review')).toBeInTheDocument()
    );
    expect(screen.getByTestId('review')).toHaveTextContent('Reviewer');
  });

  it('should render a fallback error message when there is an invalid movie provided', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    renderMoviePage('invalid-id');
    await waitFor(() =>
      expect(screen.getByTestId('error')).toBeInTheDocument()
    );
    expect(screen.getByTestId('error')).toHaveTextContent(
      'Could not find this movie'
    );
  });
});
