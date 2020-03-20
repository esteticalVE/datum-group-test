import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { MapPage, WelcomePage } from './pages'

export const useRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <WelcomePage />
      </Route>
      <Route path='/map' exact>
        <MapPage />
      </Route>
    </Switch>
  )
}
