import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Upcoming from './Upcoming';
import { MemoryRouter } from 'react-router-dom';

describe('Upcoming page', () => {
  it('should render a list of upcoming movie', async () => {
    const mockMovies = {
      results: [
        {
          id: 1,
          poster_path: '/poster.jpg',
          title: 'Test Movie',
          release_date: '02/02/2025',
          vote_average: 8.3,
        },
      ],
    };
    globalThis.fetch = vi
      .fn()
      .mockReturnValueOnce({ json: () => Promise.resolve(mockMovies) });

    vi.mock('@/components/FilteredMovieList/FilteredMovieList', () => ({
      default: ({ title }) => <div data-testid="filtered-movies">{title}</div>,
    }));

    render(
      <MemoryRouter>
        <Upcoming />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Upcoming' })
      ).toBeInTheDocument();
      expect(screen.getByTestId('filtered-movies')).toBeInTheDocument();
    });
  });
});
