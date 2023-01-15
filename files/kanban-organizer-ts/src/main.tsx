import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles/main.sass"

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


/* PAGES */
import Home from "./components/pages/home/Home"
import ProjectsPage from './components/pages/projectsPage/ProjectsPage'
import Calendar from './components/pages/calendar/Calendar'
import Contact from './components/pages/contact/Contact'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/projects",
        element: <ProjectsPage />
      },
      {
        path: "/calendar",
        element: <Calendar />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
