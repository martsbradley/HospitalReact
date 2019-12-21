import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import initialstore from './initialstore';

export default function configureStore(){
    //const initialStore  = {"count": 0};

    const composeEnhancers =
     window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
    //add support for redux devtools...
    return createStore(
        rootReducer,
        initialstore,
        composeEnhancers(applyMiddleware(thunk,reduxImmutableStateInvariant()))
        );
}

// redux middleware is a way to enhance the redux behaviour
//step-4: one store in redux