import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavItem from './NavItem';

describe('NavItem component', () => {
  it('should render with correct props', () => {
    render(
      <MemoryRouter>
        <NavItem to="/movies">Movies</NavItem>
      </MemoryRouter>
    );

    const navItem = screen.getByRole('link');
    const navIcon = screen.getByTestId('fa-icon');

    expect(navItem).toBeInTheDocument();
    expect(navIcon).toBeInTheDocument();
    expect(navItem.textContent).toMatch(/Movies/);
    expect(navItem).toHaveAttribute('href', '/movies');
  });
});
