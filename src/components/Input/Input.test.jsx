import { vi, describe, expect, it, beforeAll } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

beforeAll(() => {
  vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="fa-icon" />,
  }));
});

describe('Input component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <Input type="text" value="Hi" onChange={() => {}} />
    );

    expect(container).toMatchSnapshot();
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
