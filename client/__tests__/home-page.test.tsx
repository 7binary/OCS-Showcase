/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import { intl } from 'src/components';
import HomePage from 'src/pages';
import gamesResponse from './games-response.json';

describe('HomePage', () => {
  it('renders a list of Olympic Games with Athlete results', () => {
    render(intl(
      <HomePage
        initialGames={gamesResponse.games as any}
        initialTotal={gamesResponse.total as number}
      />,
    ));

    const heading = screen.queryByText('Olympic Athletes');
    const gameNames = screen.queryAllByText('Tokyo, 2020');
    const athleteNames = screen.queryAllByText('Arianna Fontana');

    expect(heading).toBeInTheDocument();
    expect(gameNames.length).toBeGreaterThan(0);
    expect(athleteNames.length).toBeGreaterThan(0);
  });
});
