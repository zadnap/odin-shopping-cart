import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation component', () => {
  beforeAll(() => {
    vi.mock('@/components/NavItem/NavItem', () => ({
      default: ({ to, children }) => <a href={to}>{children}</a>,
    }));
  });

  vi.mock('@/components/TrailerPreview/TrailerPreview', () => ({
    default: ({ title }) => <div data-testid="trailer-preview">{title}</div>,
  }));

  beforeEach(() => {
    const mockPopularMovies = {
      results: [
        {
          id: 1,
          title: 'Movie One',
          release_date: '2025-01-01',
          vote_average: 7.5,
          backdrop_path: '/backdrop1.jpg',
        },
      ],
    };

    const mockVideos = {
      results: [
        {
          type: 'Trailer',
          site: 'YouTube',
          key: 'abc123',
        },
      ],
    };

    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => mockPopularMovies,
      })
      .mockResolvedValueOnce({
        json: async () => mockVideos,
      });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });

  it('should render navigation items', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favourites')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Watching Trailers')).toBeInTheDocument();
  });

  it('should fetch and render trailer previews', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('trailer-preview')).toBeInTheDocument();
    });
  });
});
