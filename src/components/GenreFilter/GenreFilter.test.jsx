import { vi, describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenreFilter from './GenreFilter';

const mockProps = {
  onChangeGenreId: vi.fn(),
  currentId: 3,
  genres: [
    {
      id: 1,
      name: 'Fantasy',
    },
    {
      id: 2,
      name: 'Adventure',
    },
    {
      id: 3,
      name: 'Animation',
    },
    {
      id: 4,
      name: 'Family',
    },
  ],
};

let user;
let rerender;

describe('GenreFilter component', () => {
  beforeEach(() => {
    ({ rerender } = render(<GenreFilter {...mockProps} />));
    user = userEvent.setup();
  });

  it('should render a semantic list', () => {
    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });

  it('should render correct number of genre buttons', () => {
    mockProps.genres.forEach((genre) => {
      const genreButton = screen.getByRole('button', { name: genre.name });

      expect(genreButton).toBeInTheDocument();
    });
  });

  it('should render view previous and next genre buttons', () => {
    const prevButton = screen.getByRole('button', {
      name: 'View Previous Genre',
    });
    const nextButton = screen.getByRole('button', {
      name: 'View Next Genre',
    });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should call onChangeGenreId when a genre button is clicked', async () => {
    const familyButton = screen.getByText('Family');

    await user.click(familyButton);

    expect(mockProps.onChangeGenreId).toHaveBeenCalledWith(4);
  });

  it('should call onChangeGenreId when view previous button is clicked', async () => {
    const prevButton = screen.getByRole('button', {
      name: 'View Previous Genre',
    });
    await user.click(prevButton);

    expect(mockProps.onChangeGenreId).toHaveBeenCalledWith(2);
  });

  it('should call onChangeGenreId when view next button is clicked', async () => {
    const nextButton = screen.getByRole('button', {
      name: 'View Next Genre',
    });
    await user.click(nextButton);

    expect(mockProps.onChangeGenreId).toHaveBeenCalledWith(4);
  });

  it('should disable previous button if the first button is active', async () => {
    rerender(<GenreFilter {...mockProps} currentId={1} />);
    const prevButton = screen.getByRole('button', {
      name: 'View Previous Genre',
    });

    expect(prevButton).toBeDisabled();
  });

  it('should disable next button if the last button is active', async () => {
    rerender(<GenreFilter {...mockProps} currentId={4} />);
    const nextButton = screen.getByRole('button', {
      name: 'View Next Genre',
    });

    expect(nextButton).toBeDisabled();
  });
});
