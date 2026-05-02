import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Divider from './Divider';

describe('Divider component', () => {
  it('renders default text "OR"', () => {
    render(<Divider />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('renders custom text', () => {
    render(<Divider text="Hoặc" />);
    expect(screen.getByText('Hoặc')).toBeInTheDocument();
  });

  it('does not render text when text is empty', () => {
    render(<Divider text="" />);
    expect(screen.queryByText('OR')).not.toBeInTheDocument();
  });

  it('renders two divider lines', () => {
    const { container } = render(<Divider />);
    const lines = container.querySelectorAll('span');
    expect(lines.length).toBe(3);
  });
});
