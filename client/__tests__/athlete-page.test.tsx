/**
 * @jest-environment jsdom
 */

import React from 'react';
import { getByText, render, screen } from '@testing-library/react';

import { intl } from 'src/components';
import AthletePage from 'src/pages/athletes/[id]/[name]';
import athleteResponse from './athlete-response.json';

describe('AthletePage', () => {
  it('renders details of Athlete', async () => {
    render(intl(
      <AthletePage
        serverAthlete={athleteResponse as any}
      />,
    ));

    const headings = await screen.findAllByText(/Arianna Fontana/i);

    expect(headings.length).toBeGreaterThan(0);
  });
});
