import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import { PageLayout } from './components/PageLayout'
import { FoundUser } from './components/FoundUser'
import { NotFoundPage } from './components/NotFoundPage'

const router = createBrowserRouter([{
  path:'/:username',
  element:
  (
    <PageLayout>
      <FoundUser/>
    </PageLayout>
  ),
  errorElement: <NotFoundPage />
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
