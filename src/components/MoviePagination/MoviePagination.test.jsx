import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MoviePagination from './MoviePagination';

describe('MoviePagination', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      page: 1,
      totalPages: 10,
      onPrev: vi.fn(),
      onNext: vi.fn(),
      onJump: vi.fn(),
    };
    return render(<MoviePagination {...defaultProps} {...props} />);
  };

  it('renders with correct page and total pages', () => {
    setup({ page: 3, totalPages: 10 });
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByText('/ 10')).toBeInTheDocument();
  });

  it('disables prev button on first page', () => {
    setup({ page: 1 });
    expect(screen.getByLabelText(/previous page/i)).toBeDisabled();
  });

  it('disables next button on last page', () => {
    setup({ page: 10, totalPages: 10 });
    expect(screen.getByLabelText(/next page/i)).toBeDisabled();
  });

  it('calls onPrev when clicking prev button', async () => {
    const user = userEvent.setup();
    const onPrev = vi.fn();
    setup({ page: 2, onPrev });
    await user.click(screen.getByLabelText(/previous page/i));
    expect(onPrev).toHaveBeenCalled();
  });

  it('calls onNext when clicking next button', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    setup({ page: 2, totalPages: 5, onNext });
    await user.click(screen.getByLabelText(/next page/i));
    expect(onNext).toHaveBeenCalled();
  });

  it('calls onJump with valid number input', async () => {
    const user = userEvent.setup();
    const onJump = vi.fn();
    setup({ page: 2, totalPages: 10, onJump });

    const input = screen.getByRole('spinbutton');
    await user.clear(input);
    await user.type(input, '5');

    fireEvent.submit(input.closest('form'));

    expect(onJump).toHaveBeenCalledWith(5);
  });

  it('resets to current page on invalid input', async () => {
    const user = userEvent.setup();
    setup({ page: 3, totalPages: 10 });

    const input = screen.getByRole('spinbutton');
    await user.clear(input);
    await user.type(input, '99');

    fireEvent.submit(input.closest('form'));

    await screen.findByDisplayValue('3');
  });
});
