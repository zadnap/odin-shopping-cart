import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TrailerPreview from './TrailerPreview';

const mockProps = {
  id: 1,
  title: 'League of Legends: Arcane',
  duration: '2:45',
  rating: 9.0,
  backdropSrc:
    'https://image.tmdb.org/t/p/original/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg',
};

beforeEach(() => {
  render(
    <MemoryRouter>
      <TrailerPreview {...mockProps} />
    </MemoryRouter>
  );
}, []);

describe('TrailerPreview component', () => {
  it('should render a link with correct href', () => {
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', `/trailers/${mockProps.id}`);
  });

  it('should render correct title, duration and rating', () => {
    const title = screen.getByRole('heading', { name: mockProps.title });
    const duration = screen.getByRole('paragraph', {
      name: 'Duration',
    });
    const rating = screen.getByRole('paragraph', {
      name: 'Rating',
    });

    expect(title).toBeInTheDocument();
    expect(duration).toBeInTheDocument();
    expect(duration.textContent).toMatch(mockProps.duration);
    expect(rating).toBeInTheDocument();
    expect(rating.textContent).toMatch(mockProps.rating);
  });

  it('should render a play icon and a star icon', () => {
    const starIcon = screen.getByTestId('star-icon');
    const playIcon = screen.getByTestId('play-icon');

    expect(starIcon).toBeInTheDocument();
    expect(playIcon).toBeInTheDocument();
  });
});
