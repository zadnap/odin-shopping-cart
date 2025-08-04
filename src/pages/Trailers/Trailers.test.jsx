import { describe, it, expect, vi, beforeAll } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import Trailers from './Trailers';
import { MemoryRouter } from 'react-router-dom';

describe('Trailers page', () => {
  beforeAll(() => {
    vi.mock('@/components/TrailerPreview/TrailerPreview', () => ({
      default: ({ title }) => <div data-testid="trailer-preview">{title}</div>,
    }));

    vi.mock('@/components/Loader/Loader', () => ({
      default: () => <div>Loading...</div>,
    }));

    vi.mock('@/components/ErrorMessage/ErrorMessage', () => ({
      default: ({ message }) => <div>{message}</div>,
    }));
  });

  it('should render a list of trailer preview', async () => {
    const mockMovies = {
      results: [
        {
          id: 1,
          title: 'Mock Movie',
          release_date: '2021-01-01',
          vote_average: 8.1,
          backdrop_path: '/backdrop.jpg',
        },
      ],
    };

    const mockTrailers = {
      results: [
        {
          type: 'Trailer',
          site: 'YouTube',
          key: 'mockKey123',
        },
      ],
    };

    globalThis.fetch = vi
      .fn()
      .mockReturnValueOnce({ json: () => Promise.resolve(mockMovies) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockTrailers) });

    render(
      <MemoryRouter>
        <Trailers />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('trailer-preview')).toBeInTheDocument();
      expect(screen.getByText('Mock Movie')).toBeInTheDocument();
    });
  });

  it('should render an error message when there is no trailer available', async () => {
    const mockMovies = {
      results: [
        {
          id: 1,
          title: 'Mock Movie',
          release_date: '2021-01-01',
          vote_average: 8.1,
          backdrop_path: '/backdrop.jpg',
        },
      ],
    };

    const mockTrailers = {
      results: [],
    };

    globalThis.fetch = vi
      .fn()
      .mockReturnValueOnce({ json: () => Promise.resolve(mockMovies) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockTrailers) });

    render(
      <MemoryRouter>
        <Trailers />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no trailer available/i)).toBeInTheDocument();
    });
  });
});
