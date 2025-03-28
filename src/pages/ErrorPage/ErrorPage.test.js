import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { TitlePageAppRoute } from '../../constant';
import ErrorPage from './ErrorPage';

describe('ErrorPage tests', () => {
  it('should render ErrorPag', async () => {
    const view = render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <ErrorPage />
      </MemoryRouter>,
    );
    screen.getByRole('heading', { name: TitlePageAppRoute.Error });
    expect(view).toMatchSnapshot();
  });
});
