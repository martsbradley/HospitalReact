import React from 'react'
import {Router, Route} from 'react-router-dom'
import {render} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducerInitialState from './redux/initialstore'
import reducer from './redux/reducers'
import PropTypes from 'prop-types';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function renderWithRouterMatch
            (ui, { 
                   path = "/",
                   route = "/",
                   history = createMemoryHistory({initialEntries: [route]}),
                   initialState = reducerInitialState,
                   store = createStore(reducer, initialState,applyMiddleware(thunk,reduxImmutableStateInvariant())),
                 } = {})
{
    Wrapper.propTypes = {
        children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), 
                                        PropTypes.node]).isRequired
    }
 
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
 
    return {
      ...render(<Router history={history}>
                    <Route path={path} component={ui} />
                </Router>,
          { wrapper: Wrapper})
    };
}
