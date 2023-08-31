/* eslint-disable indent */
import {
    REPORT_LOGIN_USER,
    REPORT_LOGIN_USER_SUCCESS,
    REPORT_LOGIN_USER_ERROR
} from '../../../redux/actions.js';
const INIT_STATE = {
    currentUser: {},
    loading: false,
    error: ''
};
export default (state = INIT_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
        case REPORT_LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case REPORT_LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                error: ''
            };
        case REPORT_LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                currentUser: null,
                error: action.payload.message
            };
        default:
            return newState;
    }
};
