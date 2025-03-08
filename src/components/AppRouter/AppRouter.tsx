import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constant';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import ResultsPage from '../../pages/ResultsPage/ResultsPage';
import FinalizePage from '../../pages/FinalizePage/FinalizePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<DashboardPage />} />
      <Route
        path={`${AppRoute.ResultsTestId}/:testId`}
        element={<ResultsPage />}
      />
      <Route
        path={`${AppRoute.FinalizeTestId}/:testId`}
        element={<FinalizePage />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
