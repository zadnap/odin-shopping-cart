import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './Logo.jsx';

describe('Logo component', () => {
  it('should render logo to match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render logo image and title', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(getByAltText('Homepage')).toBeInTheDocument();
    expect(getByText('Cinemart')).toBeInTheDocument();
  });

  it('should link to the homepage', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    const link = getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });
});
