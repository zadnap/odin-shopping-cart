import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(<Loader />);

    expect(container).toMatchSnapshot();
  });
});
