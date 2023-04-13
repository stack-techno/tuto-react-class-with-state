import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Todos as TodoList} from "./pages/Todos"
import NotFound from "./pages/NotFound"
import './index.css'
import Login from './pages/Login'
import { NextUIProvider } from '@nextui-org/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from './pages/Contact'
import Counter from './components/Counter'
import Navbar from './components/Navbar'
import TodoDetail from './pages/TodoDetail'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/todos',
    element: <TodoList/>
  },
  {
    path:'/todo/:id',
    element: <TodoDetail/>
  },
  {
    path:'/about',
    element: <Counter/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
