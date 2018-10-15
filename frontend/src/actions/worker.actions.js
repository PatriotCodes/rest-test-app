import { workerConstants} from "../constants";
import { workerApi } from '../api';

export const workerActions = {
    getAll,
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
