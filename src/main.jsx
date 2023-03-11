import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './hooks/App'
import './index.css'
import Login from './pages/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
