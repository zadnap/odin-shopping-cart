import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MovieDetail from './MovieDetail';

const mockProps = {
  title: 'Lilo & Stitch',
  posterSrc:
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7c5VBuCbjZOk7lSfj9sMpmDIaKX.jpg',
  backdropSrc:
    'https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg',
  certification: 'PG',
  releaseDate: '05/23/2025',
  duration: '1h 48m',
  overview:
    'The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.',
  genres: [
    { id: 1, name: 'Family' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'Fiction' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Adventure' },
  ],
  rating: 7.1,
  language: 'English',
  directors: ['Dean Fleischer Camp'],
  writers: ['Chris Kekaniokalani Bright', 'Mike Van Waes'],
  rent: '$4.99',
};

describe('MovieDetail component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(<MovieDetail {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
