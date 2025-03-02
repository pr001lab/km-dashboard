import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import FinalizePage from './pages/FinalizePage/FinalizePage';
import Layout from './components/Layout/Layout';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { AppRoute } from './constant';

const router = createBrowserRouter([
  {
    path: AppRoute.Main,
    element: <Layout />,
    children: [
      {
        path: AppRoute.Main,
        element: <DashboardPage />,
      },
      {
        path: `${AppRoute.ResultsTestId}/:testId`,
        element: <ResultsPage />,
      },
      {
        path: `${AppRoute.FinalizeTestId}/:testId`,
        element: <FinalizePage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
