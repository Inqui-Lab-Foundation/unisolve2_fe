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
    console.log('1');
    try {
        const loginData = {
            ...data
            // passwordConfirmation: data.password
        };
        dispatch({ type: SCHOOL_LOGIN_USER });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);

        const result = await axios
            .post(`${URL.schoolLogin}`, loginData, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        console.log(result);
        if (result && result.status === 200) {
            const item = result.data;
            setCurrentUser(item);
            localStorage.setItem('module', module);
            dispatch(schoolLoginUserSuccess(result));
            history.push('/school/dashboard');
        } else {
            // dispatch(schoolLoginUserError(result.statusText));
            openNotificationWithIcon('error', 'Enter the correct credentials');
        }
    } catch (error) {
        console.log(error);
        dispatch(schoolLoginUserError({}));
        // NotificationManager.error(
        //   "Server down! Please try again later.",
        //   "Error",
        //   3000
        // );
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
