import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

describe('CheckoutForm component', () => {
  beforeAll(() => {
    vi.mock('@/components/Button/Button', () => ({
      default: ({ children }) => <button>{children}</button>,
    }));

    vi.mock('@/components/Input/Input', () => ({
      default: ({ placeholder, name }) => (
        <input type="text" placeholder={placeholder} name={name} />
      ),
    }));

    vi.mock('@fortawesome/react-fontawesome', () => ({
      FontAwesomeIcon: ({ icon }) => (
        <div data-testid="payment-icon">{icon}</div>
      ),
    }));
  });

  const mockSummary = [
    { title: 'Fee A', value: 100, isPositive: true },
    { title: 'Fee B', value: 50, isPositive: false },
    { title: 'Fee C', value: 0, isPositive: true },
  ];

  const mockPaymentMethods = [
    { name: 'Credit Card', icon: 'fa-credit-card' },
    { name: 'PayPal', icon: 'fa-paypal' },
    { name: 'Apple Pay', icon: 'fa-apple-pay' },
  ];

  beforeEach(() => {
    render(
      <CheckoutForm summary={mockSummary} paymentMethods={mockPaymentMethods} />
    );
  });

  it('should render a coupon section', () => {
    const heading = screen.getByRole('heading', { name: 'Coupon Code' });
    const input = screen.getByPlaceholderText('Enter your code');
    const button = screen.getByRole('button', { name: 'Apply Coupon' });

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should render a payment section', () => {
    const heading = screen.getByRole('heading', { name: 'Order Summary' });

    expect(heading).toBeInTheDocument();
  });

  it('renders only non-zero items with correct signs', () => {
    expect(screen.getByText('Fee A')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();

    expect(screen.getByText('Fee B')).toBeInTheDocument();
    expect(screen.getByText('-$50')).toBeInTheDocument();

    expect(screen.queryByText('Fee C')).not.toBeInTheDocument();
  });

  it('renders the correct total', () => {
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
  });

  it('should render a payment section', () => {
    const heading = screen.getByRole('heading', { name: 'Payment' });

    expect(heading).toBeInTheDocument();
  });

  it('renders all payment methods as radio buttons', () => {
    mockPaymentMethods.forEach(({ name }) => {
      const radio = screen.getByRole('radio', { name });
      expect(radio).toBeInTheDocument();
    });
  });

  it('checks the first method by default', () => {
    const first = screen.getByRole('radio', {
      name: mockPaymentMethods[0].name,
    });
    expect(first).toBeChecked();

    const others = mockPaymentMethods.slice(1);
    others.forEach(({ name }) => {
      const radio = screen.getByRole('radio', { name });
      expect(radio).not.toBeChecked();
    });
  });

  it('renders the checkout button', () => {
    const button = screen.getByRole('button', { name: /check out/i });
    expect(button).toBeInTheDocument();
  });
});
