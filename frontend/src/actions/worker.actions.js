import { workerConstants} from "../constants";
import { workerApi } from '../api';

export const workerActions = {
    getAll,
    deleteWorker,
    createWorker,
};

export function getAll() {
    return (dispatch) => {
        dispatch({type: workerConstants.LOADING});
        return workerApi.getAll().then(workers => {
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
        return workerApi.create(worker).then(() => {
            dispatch(createWorkerSuccess(worker));
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