import { workerConstants } from '../constants/worker.constants';

let initialState = { workers: [], loading: true };

export function workerReducer(state = initialState, action) {
    switch (action.type) {
        case workerConstants.LOADING:
            return {
                loading: true,
            };
        case workerConstants.GET_ALL:
            state = Object.assign({}, state, {workers: action.workers, loading: false});
            return state;
        case workerConstants.DELETE_WORKER:
            return {
                ...state,
                workers: state.workers.filter((item, index) => action.id !== item._id)
            };
        default:
            return state
    }
}