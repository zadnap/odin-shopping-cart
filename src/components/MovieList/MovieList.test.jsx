import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './MovieList';

describe('MovieList component', () => {
  it('should render to match snapshot', () => {
    const mockMovies = [
      {
        id: 1,
        posterSrc: 'flow.jpg',
        title: 'Flow',
        year: 2024,
        rating: 7.9,
      },
      {
        id: 2,
        posterSrc: 'liloandstitch.jpg',
        title: 'Lilo & Stitch',
        year: 2025,
        rating: 7.2,
      },
      {
        id: 3,
        posterSrc: 'mufasa.jpg',
        title: 'Mufasa: The Lion King',
        year: 2024,
        rating: 6.6,
      },
    ];

    const { container } = render(
      <MemoryRouter>
        <MovieList movies={mockMovies} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
