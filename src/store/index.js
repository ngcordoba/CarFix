import { combineReducers, createStore, applyMiddleware } from 'redux';
import fixReducer from './fix.reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    fix: fixReducer,
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;