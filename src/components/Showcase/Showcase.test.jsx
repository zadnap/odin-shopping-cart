import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Showcase from './Showcase';

const mockProps = {
  id: 1,
  title: 'How to Train Your Dragon',
  backdropSrc:
    'https://image.tmdb.org/t/p/original/7HqLLVjdjhXS0Qoz1SgZofhkIpE.jpg',
  tags: ['Action', 'Movie', '2025', '6+'],
  desc: 'On the rugged isle of Berk, where Vikings',
};

beforeEach(() => {
  render(
    <MemoryRouter>
      <Showcase {...mockProps} />
    </MemoryRouter>
  );
});

describe('Showcase component', () => {
  it('should have the correct background image', () => {
    const article = screen.getByRole('article');

    expect(article).toHaveStyle(
      `background-image: url(${mockProps.backdropSrc})`
    );
  });

  it('should render a title', () => {
    const title = screen.getByRole('heading', {
      name: /How to Train Your Dragon/,
    });

    expect(title).toBeInTheDocument();
  });

  it('should render a description', () => {
    const desc = screen.getByText('On the rugged isle of Berk, where Vikings');

    expect(desc).toBeInTheDocument();
  });

  it('should render a see more link with correct href', () => {
    const seeMore = screen.getByRole('link', { name: /see more/i });

    expect(seeMore).toBeInTheDocument();
    expect(seeMore).toHaveAttribute('href', `/movies/${mockProps.id}`);
  });

  it('should render all tags', () => {
    mockProps.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });
});
