import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
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

describe('Showcase component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Showcase {...mockProps} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
