import React from 'react'
import { Router, Route} from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'

export default function renderWithRouterMatch
            (ui, { 
                   path = "/",
                   route = "/",
                   history = createMemoryHistory({ initialEntries: [route] })
                 } = {})
{
//console.log(`path ${path}`);
//console.log(`route ${route}`);

  return {
    ...render(
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>
    )
  };
}
