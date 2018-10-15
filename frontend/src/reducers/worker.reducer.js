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
        case workerConstants.CREATE_WORKER:
            return Object.assign({}, state, {
                workers: [
                    ...state.workers,
                    {
                        _id: action.response._id,
                        fullName: action.response.fullName,
                        gender: action.response.gender,
                        contactInfo: action.response.contactInfo,
                        dateCreate: action.response.dateCreate,
                        salary: action.response.salary,
                        position: action.response.position,
                    }
                ],
                loading: false
            });
        default:
            return state
    }
}