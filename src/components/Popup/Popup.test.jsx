import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Popup from './Popup';

describe('Popup component', () => {
  const mockProps = {
    isOpen: true,
    title: 'Sign Out',
    content: 'Are you sure you want to sign out?',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(<Popup {...mockProps} isOpen={false} />);
    expect(screen.queryByText(mockProps.title)).not.toBeInTheDocument();
  });

  it('should render correct title and content', () => {
    render(<Popup {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.content)).toBeInTheDocument();
  });

  it('should call onConfirm when the Confirm button is clicked', async () => {
    const user = userEvent.setup();
    render(<Popup {...mockProps} />);

    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);

    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when the Cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<Popup {...mockProps} />);

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelBtn);

    expect(mockProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when clicking on the overlay', async () => {
    const user = userEvent.setup();
    render(<Popup {...mockProps} />);

    const overlay = screen.getByTestId('popup-overlay');
    await user.click(overlay);

    expect(mockProps.onCancel).toHaveBeenCalled();
  });

  it('should NOT call onCancel when clicking inside the popup content', async () => {
    const user = userEvent.setup();
    render(<Popup {...mockProps} />);

    const popupContainer = screen.getByTestId('popup-content');
    await user.click(popupContainer);

    expect(mockProps.onCancel).not.toHaveBeenCalled();
  });
});
