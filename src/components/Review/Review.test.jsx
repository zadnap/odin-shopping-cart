import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Review from './Review';

const mockProps = {
  profileImageSrc:
    'https://secure.gravatar.com/avatar/bf3b87ecb40599290d764e6d73c86319.jpg?s=45',
  name: 'Chris Sawin',
  releaseDate: 'June 1, 2025',
  rating: 60,
  detail: 'While watching Disney',
};

describe('Review component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(<Review {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
