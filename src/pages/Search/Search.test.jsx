import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Search from './Search';
import { MemoryRouter } from 'react-router-dom';

describe('Search page', () => {
  it('should render a list of search results', async () => {
    const mockMovies = {
      results: [
        {
          id: 1,
          poster_path: '/poster.jpg',
          title: 'Test Movie',
          release_date: '2025-02-02',
          vote_average: 8.3,
        },
      ],
    };

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMovies),
    });

    vi.mock('@/components/FilteredMovieList/FilteredMovieList', () => ({
      default: ({ movies }) => (
        <div data-testid="filtered-movies">{movies[0].title}</div>
      ),
    }));

    render(
      <MemoryRouter initialEntries={['/search?query=batman&page=1']}>
        <Search />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Results for: batman' })
      ).toBeInTheDocument();

      expect(screen.getByTestId('filtered-movies')).toHaveTextContent(
        'Test Movie'
      );
    });
  });
});
