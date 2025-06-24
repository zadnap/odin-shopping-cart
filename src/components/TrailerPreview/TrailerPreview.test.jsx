import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
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

describe('TrailerPreview component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <TrailerPreview {...mockProps} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
