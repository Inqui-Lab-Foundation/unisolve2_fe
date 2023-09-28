import axios from 'axios';

import {
    COORDINATOR_LOGIN_USER,
    COORDINATOR_LOGIN_USER_SUCCESS,
    COORDINATOR_LOGIN_USER_ERROR
} from '../../../redux/actions.js';
import { URL, KEY } from '../../../constants/defaultValues.js';
import {
    setCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils.js';
export const coordinatorLoginUserSuccess = (user) => async (dispatch) => {
    dispatch({
        type: COORDINATOR_LOGIN_USER_SUCCESS,
        payload: user
    });
};
export const coordinatorLoginUserError = (message) => async (dispatch) => {
    dispatch({
        type: COORDINATOR_LOGIN_USER_ERROR,
        payload: { message }
    });
};

export const coordinatorLoginUser =
    (data, history, module) => async (dispatch) => {
        try {
            const loginData = {
                ...data
            };
            dispatch({ type: COORDINATOR_LOGIN_USER });
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            const result = await axios
                .post(`${URL.coordinatorLogin}`, loginData, axiosConfig)
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const item = result.data;
                setCurrentUser(item);
                localStorage.setItem('module', module);
                localStorage.setItem('time', new Date().toString());

                dispatch(coordinatorLoginUserSuccess(result));
                history.push('/coordinator/dashboard');
            } else {
                openNotificationWithIcon(
                    'error',
                    'Enter the correct credentials'
                );
                dispatch(coordinatorLoginUserError(result.statusText));
            }
        } catch (error) {
            dispatch(coordinatorLoginUserError({}));
        }
    };

export const coordinatorLoginUserLogOut = (history) => async () => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(`${URL.coordinatorLogOut}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            setCurrentUser();
            localStorage.removeItem('headerOption');
            history.push('/coordinator');
        }
    } catch (error) {
        console.log('error');
    }
};
