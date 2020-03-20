import React from 'react'
import './App.sass'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './router'

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>{useRoutes()}</BrowserRouter>
    </div>
  )
}
