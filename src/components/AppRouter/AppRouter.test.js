import React from 'react';
import { render, screen } from '@testing-library/react';
import AppRouter from './AppRouter';
import { AppRoute, TitlePageAppRoute } from '../../constant';
import { MemoryRouter } from 'react-router-dom';
import { mockTests } from '../../../mocks/mocks';

const mockDataTests = {
  tests: [],
};

jest.mock('../../hooks/useGetData', () => ({
  useGetData: () => mockDataTests,
}));

describe('Router tests', () => {
  // Helper function to render the router with given path
  const renderWithRouter = (arrayPath) => {
    return {
      ...render(
        <MemoryRouter
          initialEntries={arrayPath}
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <AppRouter />
        </MemoryRouter>,
      ),
    };
  };

  it('should render DashboardPage for the main path with data table', () => {
    const arrayPath = [`${AppRoute.Main}`];
    renderWithRouter(arrayPath);
    expect(screen.getByText(TitlePageAppRoute.Main)).toBeInTheDocument(); // Assuming "Dashboard" text is in the DashboardPage component
  });

  it('should render ResultsPage for the path with testId', () => {
    const testId = mockTests[0].id;
    const arrayPath = [`${AppRoute.ResultsTestId}/${testId}`];
    renderWithRouter(arrayPath);

    expect(screen.getByText(TitlePageAppRoute.Results)).toBeInTheDocument(); // Assuming your ResultsPage shows the testId
  });

  it('should render FinalizePage for the path with testId', () => {
    const testId = mockTests[1].id;
    const arrayPath = [`${AppRoute.FinalizeTestId}/${testId}`];
    renderWithRouter(arrayPath);

    expect(screen.getByText(TitlePageAppRoute.Finalize)).toBeInTheDocument(); // Assuming FinalizePage shows testId
  });

  it('should render NotFound page when user navigate to non-existent route', async () => {
    const arrayPath = ['/non-existent-route'];
    renderWithRouter(arrayPath);

    await screen.findByText(/404/); // Assuming ErrorPage has "Error 404" text
  });
});
