import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer component', () => {
  it('should render an iframe with correct title, src, aria-label and loading attributes', () => {
    const mockProps = {
      movieTitle: 'Test movie',
      videoKey: 'abc-123',
    };

    render(<VideoPlayer {...mockProps} />);

    const iframe = screen.getByTitle(`Test movie's trailer`);

    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/abc-123?controls=1&cc_load_policy=1'
    );
    expect(iframe).toHaveAttribute(
      'aria-label',
      'YouTube trailer for Test movie'
    );
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('should render fallback when there is no videoKey provided', () => {
    const mockProps = {
      movieTitle: 'Test movie',
      videoKey: undefined,
    };

    render(<VideoPlayer {...mockProps} />);

    expect(screen.getByText(/Trailer unavailable/i)).toBeInTheDocument();
  });
});
