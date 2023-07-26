import axios from 'axios';

import {
    SCHOOL_LOGIN_USER,
    SCHOOL_LOGIN_USER_SUCCESS,
    SCHOOL_LOGIN_USER_ERROR
} from '../../../redux/actions.js';
import { URL, KEY } from '../../../constants/defaultValues.js';
import {
    setCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils.js';
export const schoolLoginUserSuccess = (user) => async (dispatch) => {
    dispatch({
        type: SCHOOL_LOGIN_USER_SUCCESS,
        payload: user
    });
};
export const schoolLoginUserError = (message) => async (dispatch) => {
    dispatch({
        type: SCHOOL_LOGIN_USER_ERROR,
        payload: { message }
    });
};
export const schoolLoginUser = (data, history, module) => async (dispatch) => {
    try {
        const loginData = {
            ...data
        };
        dispatch({ type: SCHOOL_LOGIN_USER });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);

        const result = await axios
            .post(`${URL.schoolLogin}`, loginData, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const item = result.data;
            setCurrentUser(item);
            localStorage.setItem('module', module);
            dispatch(schoolLoginUserSuccess(result));
            history.push('/school/dashboard');
        } else {
            if (result && result.status === 200) {
                openNotificationWithIcon(
                    'error',
                    'Enter the correct credentials'
                );
            } else {
                openNotificationWithIcon(
                    'error',
                    'User is ditected as inactive'
                );
            }
        }
    } catch (error) {
        console.log(error);
        dispatch(schoolLoginUserError({}));
    }
};

export const schoolLoginUserLogOut = (history) => async () => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(`${URL.schoolLogOut}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            setCurrentUser();
            localStorage.removeItem('headerOption');
            history.push('/school');
        }
    } catch (error) {
        console.log('error');
    }
};
