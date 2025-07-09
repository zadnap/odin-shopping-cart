import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home page', () => {
  beforeAll(() => {
    vi.mock('@/components/Showcase/Showcase', () => ({
      default: () => <div data-testid="showcase"></div>,
    }));
    vi.mock('@/components/MovieList/MovieList', () => ({
      default: () => <div data-testid="movie-list"></div>,
    }));
  });

  it('should render Showcase and MovieList component', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const showcase = await screen.findByTestId('showcase');
    const movieList = await screen.findByTestId('movie-list');

    expect(showcase).toBeInTheDocument();
    expect(movieList).toBeInTheDocument();
  });
});
