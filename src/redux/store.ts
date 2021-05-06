import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const configStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configStore;
