import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from './MovieCard';

const mockProps = {
  posterSrc: 'flow.jpg',
  title: 'Flow',
  year: 2024,
  rating: '7.9',
  id: '238',
};

describe('MovieCard component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <MovieCard {...mockProps} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
