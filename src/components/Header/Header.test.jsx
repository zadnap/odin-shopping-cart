import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
