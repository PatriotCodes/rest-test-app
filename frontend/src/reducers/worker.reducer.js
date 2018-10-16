import { workerConstants } from '../constants/worker.constants';

let initialState = { workers: [], loading: true, totalPages: 0 };
// TODO: fix EDIT_WORKER reducer

export function workerReducer(state = initialState, action) {
    switch (action.type) {
        case workerConstants.LOADING:
            return {
                ...state,
                loading: false
            };
        case workerConstants.GET_ALL:
            state = Object.assign({}, state, {
                workers: action.workers.message,
                loading: false,
                totalPages: action.workers.pages
            });
            return state;
        case workerConstants.DELETE_WORKER:
            return {
                ...state,
                workers: state.workers.filter((item) => item._id !== action.id)
            };
        case workerConstants.CREATE_WORKER:
            return Object.assign({}, state, {
                workers: [
                    ...state.workers,
                    {
                        _id: action.worker._id,
                        fullName: action.worker.fullName,
                        gender: action.worker.gender,
                        contactInfo: action.worker.contactInfo,
                        dateCreate: action.worker.dateCreate,
                        salary: action.worker.salary,
                        position: action.worker.position,
                    }
                ],
                loading: false
            });
        case workerConstants.UPDATE_WORKER:
            return {
                ...state,
                workers: updateObjectInArray(state.workers, action.worker)
            };
        case workerConstants.SEARCH_WORKER:
            state = Object.assign({}, state, {workers: action.workers, loading: false});
            return state;
        default:
            return state
    }
}

function updateObjectInArray(array, action) {
    return array.map((item, index) => {
        if (item._id !== action._id) {
            return item;
        }
        return {
            _id: action._id,
            fullName: action.fullName,
            gender: action.gender,
            contactInfo: action.contactInfo,
            dateCreate: action.dateCreate,
            salary: action.salary,
            position: action.position,
        };
    });
}