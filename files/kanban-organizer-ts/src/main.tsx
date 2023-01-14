import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles/main.sass"

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


/* PAGES */


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
