//import {createStore, applyMiddleware, compose} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import initialstore from './initialstore';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(){


    const middleWare = applyMiddleware(thunk,reduxImmutableStateInvariant());

    //const composeEnhancers = composeWithDevTools({
      // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    //});

    const store = createStore(rootReducer,
                              initialstore,
                              composeWithDevTools(middleWare));

    // eslint-disable-next-line no-undef
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))

    return store;
}
