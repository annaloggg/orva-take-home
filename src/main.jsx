/* eslint-disable react/react-in-jsx-scope */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import { FoundUser } from './components/FoundUser';
import { NotFoundPage } from './components/NotFoundPage';
import './index.css';

const router = createBrowserRouter([{
  path: '/:username',
  element:
    (
      <FoundUser />
    ),
  errorElement: <NotFoundPage />
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
