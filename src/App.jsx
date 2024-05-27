import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './views/Login.jsx';
import ProtectedRoute from './views/ProtectedRoute.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './views/Dashboard.jsx';
import Register from './views/Register.jsx';
import Home from './views/Home.jsx';
import Clients from './views/Clients.jsx';
import ClientService from './views/ClientService.jsx';
import { useEffect } from 'react';
import AddClient from './views/AddClient.jsx';
import AddService from './views/AddService.jsx';
import AddRecord from './views/AddRecord.jsx';
import AllServices from './views/AllServices.jsx';
import AddAccount from './views/AddAccount.jsx';
import Profile from './views/Profile.jsx';
import AddAccounts from './views/AddAccounts.jsx';

const queryClient = new QueryClient();
function App() {

    setTimeout(function() {
      localStorage.removeItem('auth');
    }, 3600000);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/registrate",
    element: <Register/>
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/Inicio",
        element: <Home/>
      },
      {
        path: "/clientes",
        element: <Clients/>
      },
      {
        path: "/agregar-cliente",
        element: <AddClient/>
      },
      {
        path: "/agregar-cuentas",
        element: <AddAccounts/>
      },
      {
        path: "/servicios",
        element: <AllServices/>
      },
      {
        path: "/agregar-servicio",
        element: <AddService/>
      },
      {
        path: "/cliente-servicio/:id",
        element: <ClientService/>
      },
      {
        path: "/agregar-registro/:idService",
        element: <AddRecord/>
      },
      {
        path: "/agregar-cuenta",
        element: <AddAccount/>
      },
      {
        path: "/perfil",
        element: <Profile/>
      },
      {
        path: "/menu",
        element: <Dashboard/>
      }
    ]
  }
]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>
    </QueryClientProvider>
  )

  }

export default App
