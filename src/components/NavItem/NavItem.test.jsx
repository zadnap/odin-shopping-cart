import { vi, describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavItem from './NavItem';

beforeAll(() => {
  vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="fa-icon" />,
  }));
});

describe('NavItem component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <NavItem to="/movies">Movies</NavItem>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
