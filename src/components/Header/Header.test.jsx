import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
