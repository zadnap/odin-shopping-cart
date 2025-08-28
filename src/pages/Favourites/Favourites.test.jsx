import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Favourites from './Favourites';
import { MemoryRouter } from 'react-router-dom';

describe('Favourites page', () => {
  beforeEach(() => {
    localStorage.setItem('favourites', JSON.stringify([1]));
  });

  it('should render a list of favourite movies', async () => {
    const mockMovie = {
      id: 1,
      poster_path: '/poster.jpg',
      title: 'Test Movie',
      release_date: '2025-02-02',
      vote_average: 8.3,
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMovie),
    });

    vi.mock('@/components/FilteredMovieList/FilteredMovieList', () => ({
      default: ({ movies }) => (
        <div data-testid="filtered-movies">{movies[0].title}</div>
      ),
    }));

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Favourites' })
      ).toBeInTheDocument();
      expect(screen.getByTestId('filtered-movies')).toHaveTextContent(
        'Test Movie'
      );
    });
  });
});
