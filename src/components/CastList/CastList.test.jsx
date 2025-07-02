import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import CastList from './CastList';

const mockCasts = [
  {
    id: 1,
    name: 'Maia Kealoha',
    character: 'Lilo',
    profilePicture:
      'https://media.themoviedb.org/t/p/w138_and_h175_face/jqsKbBF28V2Oq5tKPR5USkNufwC.jpg',
  },
  {
    id: 2,
    name: 'Sydney Agudong',
    character: 'Nani',
    profilePicture:
      'https://media.themoviedb.org/t/p/w138_and_h175_face/3K5hJ3meeClHWsPKetqd9qgyveJ.jpg',
  },
  {
    id: 3,
    name: 'Chris Sanders',
    character: 'Stitch (voice)',
    profilePicture:
      'https://media.themoviedb.org/t/p/w138_and_h175_face/6CtrIOCxggJ5eIAWeFQqd4Hs9FP.jpg',
  },
];

describe('CastList component', () => {
  it('should render to match snapshot', () => {
    const { container } = render(<CastList casts={mockCasts} />);

    expect(container).toMatchSnapshot();
  });
});
