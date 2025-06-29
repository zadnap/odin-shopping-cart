import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(<ErrorMessage />);

    expect(container).toMatchSnapshot();
  });
});
