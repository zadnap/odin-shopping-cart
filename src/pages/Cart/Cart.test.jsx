import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  vi,
  afterEach,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Cart from './Cart';
import { MemoryRouter } from 'react-router-dom';

let receivedSummary;
let receivedPaymentMethods;

describe('Cart component', () => {
  const mockItems = [
    {
      id: 1,
      backdrop_path: '/backdrop-1.jpg',
      title: 'Movie 1',
      release_date: '2025-01-01',
      vote_average: 8.1,
    },
    {
      id: 2,
      backdrop_path: '/backdrop-2.jpg',
      title: 'Movie 2',
      release_date: '2025-01-01',
      vote_average: 7.1,
    },
  ];

  beforeAll(() => {
    vi.mock('@/components/ProductItem/ProductItem', () => ({
      default: ({ title }) => <div data-testid="product-item">{title}</div>,
    }));

    vi.mock('@/components/CheckoutForm/CheckoutForm', () => ({
      default: (props) => {
        receivedSummary = props.summary;
        receivedPaymentMethods = props.paymentMethods;
        return <div data-testid="checkout-form" />;
      },
    }));
  });

  beforeEach(() => {
    // mock localStorage
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(
      (key) => {
        if (key === 'rents') {
          return JSON.stringify([1, 2]);
        }
        return null;
      }
    );

    // mock fetch for both /movie/:id and /release_dates
    global.fetch = vi.fn((url) => {
      if (url.includes('/release_dates')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              results: [
                {
                  iso_3166_1: 'US',
                  release_dates: [{ certification: 'PG' }],
                },
              ],
            }),
        });
      }

      const id = url.match(/movie\/(\d+)/)?.[1];
      const item = mockItems.find((m) => m.id === Number(id));
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(item),
      });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a list of products', async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Movie (2)' })
      ).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Rent' })).toBeInTheDocument();
      mockItems.forEach((item) =>
        expect(screen.getByText(item.title)).toBeInTheDocument()
      );
    });
  });

  it('should render a footer to direct user to trending and homepage', async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/No movies match your search/i)
      ).toBeInTheDocument();

      const trendingLink = screen.getByRole('link', { name: /trending/i });
      expect(trendingLink).toBeInTheDocument();
      expect(trendingLink).toHaveAttribute('href', '/trending');

      const homepageLink = screen.getByRole('link', {
        name: /go back to homepage/i,
      });
      expect(homepageLink).toBeInTheDocument();
      expect(homepageLink).toHaveAttribute('href', '/');
    });
  });

  it('should render a CheckoutForm with correct props', async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('checkout-form')).toBeInTheDocument();

      expect(receivedSummary).toEqual([
        { title: 'Rent', value: 9.98, isPositive: true },
        { title: 'VAT', value: 0.9980000000000001, isPositive: true },
        { title: 'Discount', value: 0, isPositive: false },
      ]);

      expect(receivedPaymentMethods).toEqual([
        { name: 'Paypal', icon: expect.any(Object) },
        { name: 'Stripe', icon: expect.any(Object) },
        { name: 'Mastercard', icon: expect.any(Object) },
        { name: 'Bitcoin', icon: expect.any(Object) },
      ]);
    });
  });
});
