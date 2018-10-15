import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { alert } from './alert.reducer';
import { workerReducer } from './worker.reducer';

const rootReducer = combineReducers({
    authentication,
    alert,
    workerReducer,
});

export default rootReducer;