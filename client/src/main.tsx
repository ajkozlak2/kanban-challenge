import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Board from './pages/Board.tsx'; // Kanban board component
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

// Create the router with the defined routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board /> // Default route
      }, 
      {
        path: 'edit', // Note: No leading slash for child routes
        element: <EditTicket />
      },
      {
        path: 'create', // Note: No leading slash for child routes
        element: <CreateTicket />
      },
      {
        path: 'login', // Note: No leading slash for child routes
        element: <Login />
      },
      {
        path: 'kanban', // Path for the Kanban board
        element: <ProtectedRoute element={<Board />} /> // Protect the Kanban board route
      }
    ]
  }
]);

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);