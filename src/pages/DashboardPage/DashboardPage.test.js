import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import { mockTests } from '../../../mocks/mocks';

const mockDataTests = {
  tests: mockTests,
  loading: false,
};

jest.mock('../../hooks/useGetData', () => ({
  useGetData: () => mockDataTests,
}));

describe('Router tests', () => {
  const renderWithRouter = () => {
    return {
      ...render(
        <MemoryRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <DashboardPage />
        </MemoryRouter>,
      ),
    };
  };

  it('should render Loader for DashboardPage', () => {
    mockDataTests.loading = true;
    renderWithRouter();
    const divs = screen.getAllByRole('generic');
    expect(divs[1].classList.contains('loading-container')).toBe(true);
  });

  it('should render DashboardPage for the main path with data table', () => {
    mockDataTests.loading = false;
    renderWithRouter();
    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(mockTests.length + 1);
  });

  it('should render DashboardPage for the main path without data table', () => {
    mockDataTests.tests = [];
    renderWithRouter();
    expect(
      screen.getByText(/Your search did not match any results./i),
    ).toBeInTheDocument();
  });
});
