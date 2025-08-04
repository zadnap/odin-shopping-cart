import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import { MemoryRouter } from 'react-router-dom';

let receivedSummary;
let receivedPaymentMethods;

describe('Cart component', () => {
  const mockItems = [
    {
      id: 1,
      title: 'Movie 1',
      rating: 8.1,
      year: 2025,
      certification: 'PG',
      backdropSrc: '/backdrop-1.jpg',
      rent: 4.99,
    },
    {
      id: 2,
      title: 'Movie 2',
      rating: 7.1,
      year: 2025,
      certification: 'R',
      backdropSrc: '/backdrop-1.jpg',
      rent: 4.99,
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
    render(
      <MemoryRouter>
        <Cart items={mockItems} />
      </MemoryRouter>
    );
  });

  it('should render a list of products', () => {
    expect(
      screen.getByRole('heading', { name: `Movie (${mockItems.length})` })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rent' })).toBeInTheDocument();
    mockItems.forEach((item) =>
      expect(screen.getByText(item.title)).toBeInTheDocument()
    );
  });

  it('should render a footer to direct user to trending and homepage', () => {
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

  it('should render a CheckoutForm with correct props', () => {
    expect(screen.getByTestId('checkout-form')).toBeInTheDocument();

    expect(receivedSummary).toEqual([
      { title: 'Rent', value: '9.98', isPositive: true },
      { title: 'VAT', value: '1.00', isPositive: true },
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
