import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal component', () => {
  let user;
  let onClose;

  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    user = userEvent.setup();
    onClose = vi.fn();

    render(
      <Modal title="Test title" onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );
  });

  afterEach(() => {
    document.getElementById('modal-root').remove();
  });

  it('should render with correct title and content', () => {
    const title = screen.getByRole('heading', { name: 'Test title' });
    const content = screen.getByText('Modal content');
    const closeBtn = screen.getByRole('button', { name: 'Close modal' });

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  });

  it('should call onClose when clicking the overlay', async () => {
    const overlay = screen.getByRole('presentation');
    await user.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when clicking the close button', async () => {
    const closeBtn = screen.getByRole('button', { name: 'Close modal' });

    await user.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
  });

  it('should not call onClose when clicking the dialog', async () => {
    const dialog = screen.getByRole('dialog');

    await user.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });
});
