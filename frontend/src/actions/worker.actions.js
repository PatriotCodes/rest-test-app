import { workerConstants} from "../constants";
import { workerApi } from '../api';

export const workerActions = {
    getAll,
    deleteWorker,
    createWorker,
    updateWorker,
    searchWorker,
};

export function getAll(pageNo, size) {
    return (dispatch) => {
        dispatch({type: workerConstants.LOADING});
        return workerApi.getAll(pageNo,size).then(workers => {
            dispatch(getAllSuccess(workers));
        }).catch(error => {
            throw(error);
        });
    };
}

function getAllSuccess(workers) {
    return (dispatch) => {
        dispatch({type: workerConstants.GET_ALL, workers: workers});
    };
}

export function deleteWorker(id) {
    return (dispatch) => {
        dispatch({type: workerConstants.LOADING});
        return workerApi.deleteByID(id).then(() => {
            dispatch(deleteWorkerSuccess(id));
        }).catch(error => {
            throw(error);
        });
    };
}

function deleteWorkerSuccess(id) {
    return (dispatch) => {
        dispatch({type: workerConstants.DELETE_WORKER, id: id});
    };
}

export function createWorker(worker) {
    return (dispatch) => {
        dispatch({type: workerConstants.LOADING});
        return workerApi.create(worker).then((response) => {
            dispatch(createWorkerSuccess(response));
        }).catch(error => {
            throw(error);
        });
    };
}

function createWorkerSuccess(worker) {
    return (dispatch) => {
        dispatch({type: workerConstants.CREATE_WORKER, worker: worker});
    };
}

export function updateWorker(worker) {
    return (dispatch) => {
        dispatch({type: workerConstants.LOADING});
        return workerApi.update(worker).then((response) => {
            dispatch(updateWorkerSuccess(response));
        }).catch(error => {
            throw(error);
        });
    };
}

function updateWorkerSuccess(worker) {
    return (dispatch) => {
        dispatch({type: workerConstants.UPDATE_WORKER, worker: worker});
    };
}

export function searchWorker(query) {
    return (dispatch) => {
        dispatch({type: workerConstants.LOADING});
        return workerApi.search(query).then((response) => {
            dispatch(searchWorkerSuccess(response));
        }).catch(error => {
            throw(error);
        });
    };
}

function searchWorkerSuccess(workers) {
    return (dispatch) => {
        dispatch({type: workerConstants.SEARCH_WORKER, workers: workers});
    };
}