import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import initialstore from './initialstore';

export default function configureStore(){


    const middleWare = applyMiddleware(thunk,reduxImmutableStateInvariant());

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

    //add support for redux devtools...
    return createStore(
        rootReducer,
        initialstore,
        composeEnhancers(middleWare)
        );
}
