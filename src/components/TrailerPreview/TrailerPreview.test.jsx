import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TrailerPreview from './TrailerPreview';

const mockProps = {
  trailerKey: 'abc-123',
  title: 'League of Legends: Arcane',
  year: 2025,
  duration: '2:45',
  rating: 9.0,
  backdropSrc:
    'https://image.tmdb.org/t/p/original/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg',
};

describe('TrailerPreview component', () => {
  beforeAll(() => {
    vi.mock('@/components/Modal/Modal', () => ({
      default: ({ children }) => <div role="presentation">{children}</div>,
    }));

    vi.mock('@/components/VideoPlayer/VideoPlayer', () => ({
      default: ({ movieTitle }) => <iframe title={`${movieTitle}'s trailer`} />,
    }));
  });

  beforeEach(() => {
    render(
      <MemoryRouter>
        <TrailerPreview {...mockProps} />
      </MemoryRouter>
    );
  });

  it('should render with correct content', () => {
    const title = screen.getByRole('heading', { name: mockProps.title });
    const year = screen.getByText(mockProps.year);
    const rating = screen.getByText(mockProps.rating);
    const starIcon = screen.getByTestId('star-icon');
    const playIcon = screen.getByTestId('play-icon');

    expect(title).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(starIcon).toBeInTheDocument();
    expect(playIcon).toBeInTheDocument();
  });

  it('should open modal when clicking the trailer preview', async () => {
    const user = userEvent.setup();
    const trailerPreview = screen.getByRole('button');

    await user.click(trailerPreview);

    const iframe = screen.getByTitle(`${mockProps.title}'s trailer`);
    expect(iframe).toBeInTheDocument();
  });
});
