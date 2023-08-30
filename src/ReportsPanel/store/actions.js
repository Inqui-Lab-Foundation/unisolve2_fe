import axios from 'axios';

import {
    REPORT_LOGIN_USER,
    REPORT_LOGIN_USER_SUCCESS,
    REPORT_LOGIN_USER_ERROR
} from '../../redux/actions.js';
import { URL, KEY } from '../../constants/defaultValues.js';
import {
    setCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils.js';
export const reportLoginUserSuccess = (user) => async (dispatch) => {
    dispatch({
        type: REPORT_LOGIN_USER_SUCCESS,
        payload: user
    });
};
export const reportLoginUserError = (message) => async (dispatch) => {
    dispatch({
        type: REPORT_LOGIN_USER_ERROR,
        payload: { message }
    });
};
export const reportLoginUser = (data, history, module) => async (dispatch) => {
    try {
        const loginData = {
            ...data
        };
        dispatch({ type: REPORT_LOGIN_USER });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);

        const result = await axios
            .post(`${URL.reportLogin}`, loginData, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const item = result.data;
            setCurrentUser(item);
            localStorage.setItem('module', module);
            dispatch(reportLoginUserSuccess(result));
            history.push('/report/dashboard');
        } else {
            openNotificationWithIcon('error', 'Enter the correct credentials');
            dispatch(reportLoginUserError(result.statusText));
        }
    } catch (error) {
        dispatch(reportLoginUserError({}));
    }
};

export const reportLoginUserLogOut = (history) => async () => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(`${URL.reportLogOut}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            setCurrentUser();
            localStorage.removeItem('headerOption');
            history.push('/report');
        }
    } catch (error) {
        console.log('error');
    }
};
