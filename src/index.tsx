import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter/AppRouter';
import 'normalize.css';
import './styles/index.scss';
import Layout from './components/Layout/Layout';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);
root.render(
  <Router
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
  >
    <React.StrictMode>
      <Layout>
        <AppRouter />
      </Layout>
    </React.StrictMode>
  </Router>,
);
