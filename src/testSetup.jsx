import { vi, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
