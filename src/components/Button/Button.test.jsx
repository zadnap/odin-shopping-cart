import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import styles from './Button.module.scss';

describe('Button component', () => {
  it('should render with children', () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByRole('button').textContent).toMatch('Click Me');
  });

  it('should apply round class when round prop is true', () => {
    render(<Button round>Round Button</Button>);
    const button = screen.getByRole('button');

    expect(button.classList.contains(styles.round)).toBe(true);
  });

  it('should apply square class when square prop is true', () => {
    render(<Button square>Square Button</Button>);
    const button = screen.getByRole('button');

    expect(button.classList.contains(styles.square)).toBe(true);
  });

  it('should call onClick handler when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the onClick function when it isn't clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
