import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ProductItem from './ProductItem';
import { MemoryRouter } from 'react-router-dom';

const mockProps = {
  id: 1,
  title: 'Lilo & Stitch',
  overview:
    'The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.',
  rating: 7.1,
  year: 2025,
  certification: 'PG',
  posterSrc:
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7c5VBuCbjZOk7lSfj9sMpmDIaKX.jpg',
  rent: 4.99,
};

describe('ProductItem component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductItem {...mockProps} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
