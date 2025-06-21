import { vi, describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input component', () => {
  it('should render with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should render with an icon', () => {
    render(<Input />);
    const icon = screen.getByTestId('inputIcon');

    expect(icon).toBeInTheDocument();
  });

  it('should render with customized props', () => {
    const placeholder = 'Search me';
    const value = 'Foo Bar Baz';
    render(
      <Input placeholder={placeholder} value={value} onChange={() => {}} />
    );
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', value);
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('should call onChange handler when typed in', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={onChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Hi');

    expect(onChange).toHaveBeenCalled();
  });
});
