import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header component', () => {
  it('should render a logo, a search bar and a cart button', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByRole('link');
    const searchBar = screen.getByRole('textbox');
    const cartButton = screen.getByRole('button');

    expect(logo).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });
});
