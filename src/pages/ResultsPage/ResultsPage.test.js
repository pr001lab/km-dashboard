import React from 'react';
import { render, screen } from '@testing-library/react';
import { TitlePageAppRoute } from '../../constant';
import ResultsPage from './ResultsPage';
import { MemoryRouter } from 'react-router-dom';

const mockDataTests = {
  tests: [
    {
      'id': 1,
      'name': 'Prototype of the new map',
      'type': 'CLASSIC',
      'status': 'PAUSED',
      'siteId': 2,
    },
  ],
};

jest.mock('../../hooks/useGetData', () => ({
  useGetData: () => mockDataTests,
}));

describe('ResultsPage tests', () => {
  it('should render ResultsPage for the path with testId', async () => {
    const view = render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <ResultsPage />
      </MemoryRouter>,
    );
    screen.getByRole('heading', { name: TitlePageAppRoute.Results });
    expect(view).toMatchSnapshot();
  });
});
