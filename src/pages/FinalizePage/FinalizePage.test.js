import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { TitlePageAppRoute } from '../../constant';
import FinalizePage from './FinalizePage';

const mockDataTests = {
  tests: [
    {
      'id': 2,
      'name': 'Dark theme test',
      'type': 'MVT',
      'status': 'DRAFT',
      'siteId': 3,
    },
  ],
};

jest.mock('../../hooks/useGetData', () => ({
  useGetData: () => mockDataTests,
}));

describe('FinalizePage tests', () => {
  it('should render FinalizePage for the path with testId', async () => {
    const view = render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <FinalizePage />
      </MemoryRouter>,
    );
    screen.getByRole('heading', { name: TitlePageAppRoute.Finalize });
    expect(view).toMatchSnapshot();
  });
});
