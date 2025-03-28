import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import AppRouter from './AppRouter';
import { AppRoute, TitlePageAppRoute } from '../../constant';
import { mockTests } from '../../../mocks/mocks';

const mockDataTests = {
  tests: mockTests,
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

  it('should render ResultsPage', async () => {
    const arrayPath = [`${AppRoute.Main}`];
    renderWithRouter(arrayPath);
    fireEvent.click(screen.getAllByText(TitlePageAppRoute.Results)[0]);
    screen.getByRole('heading', { name: TitlePageAppRoute.Results });
  });

  it('should render FinalizePage', () => {
    const arrayPath = [`${AppRoute.Main}`];
    renderWithRouter(arrayPath);
    fireEvent.click(screen.getAllByText(TitlePageAppRoute.Finalize)[0]);
    screen.getByRole('heading', { name: TitlePageAppRoute.Finalize });
  });

  it('should render NotFound page when user navigate to non-existent route', async () => {
    const arrayPath = ['/non-existent-route'];
    renderWithRouter(arrayPath);
    await screen.findByText(/404/); // Assuming ErrorPage has "Error 404" text
  });
});
