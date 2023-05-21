import axios from 'axios';

import {
    EVALUATOR_LOGIN_USER,
    EVALUATOR_LOGIN_USER_SUCCESS,
    EVALUATOR_LOGIN_USER_ERROR,
    GET_SUBMITTED_IDEA_LIST,
    GET_INSTRUCTIONS,
    GET_L1_EVALUATED_IDEA,
    EVALUATOR_ADMIN_LOGIN_USER,
    EVALUATOR_ADMIN_LOGIN_USER_SUCCESS,
    EVALUATOR_ADMIN_LOGIN_USER_ERROR,
    UPDATAE_EVALUATOR
} from '../../../redux/actions.js';
import { URL, KEY } from '../../../constants/defaultValues.js';
import {
    setCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils.js';
import { getCurrentUser } from '../../../helpers/Utils.js';


//------login---
export const evaluatorLoginUserSuccess = (user) => async (dispatch) => {
    dispatch({
        type: EVALUATOR_LOGIN_USER_SUCCESS,
        payload: user
    });
};


export const evaluatorLoginUserError = (message) => async (dispatch) => {
    dispatch({
        type: EVALUATOR_LOGIN_USER_ERROR,
        payload: { message }
    });
};

export const evaluatorLoginUser = (data, history,module) => async (dispatch) => {
    try {
        const loginData = {
            ...data,
            passwordConfirmation: data.password
        };
        dispatch({ type: EVALUATOR_LOGIN_USER });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .post(`${URL.evaluatorLogin}`, loginData, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const item = result.data;
            setCurrentUser(item);
            localStorage.setItem("module",module);
            dispatch(evaluatorLoginUserSuccess(result));

            history.push('/evaluator/instructions');
        } else {
            openNotificationWithIcon('error', 'Enter the correct credentials');
            dispatch(evaluatorLoginUserError(result.statusText));
        }
    } catch (error) {
        dispatch(evaluatorLoginUserError({}));
    } 
};

//Evaluator Admin login
export const evaluatorAdminLoginUserSuccess = (user) => async (dispatch) => {
    dispatch({
        type: EVALUATOR_ADMIN_LOGIN_USER_SUCCESS,
        payload: user
    });
};


export const evaluatorAdminLoginUserError = (message) => async (dispatch) => {
    dispatch({
        type: EVALUATOR_ADMIN_LOGIN_USER_ERROR,
        payload: { message }
    });
};
export const evaluatorAdminLoginUser = (data, history,module) => async (dispatch) => {
    try {
        const loginData = {
            ...data,
            passwordConfirmation: data.password
        };
        dispatch({ type: EVALUATOR_ADMIN_LOGIN_USER });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .post(`${URL.eadminLogin}`, loginData, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const item = result.data;
            setCurrentUser(item);
            localStorage.setItem("module",module);
            dispatch(evaluatorAdminLoginUserSuccess(result));

            history.push('/eadmin/dashboard');
        } else {
            openNotificationWithIcon('error', 'Enter the correct credentials');
            dispatch(evaluatorAdminLoginUserError(result.statusText));
        }
    } catch (error) {
        dispatch(evaluatorAdminLoginUserError({}));
    } 
};

//---get submitted idea list--
export const getSubmittedIdeaListSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_SUBMITTED_IDEA_LIST,
        payload: data
    });
};
export const getSubmittedIdeaList = () => async (dispatch) => {
    const currentUser = getCurrentUser('current_user');
    const level=currentUser?.data[0]?.level_name;
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${process.env.REACT_APP_API_BASE_URL + '/challenge_response/fetchRandomChallenge?evaluator_user_id='+currentUser?.data[0]?.user_id +'&level='+level}`,
                axiosConfig
            )
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =result?.data?.data[0];
            dispatch(getSubmittedIdeaListSuccess(data));
        } else {
            dispatch(getSubmittedIdeaListSuccess(null));
        }
    } catch (error) {
        dispatch(getSubmittedIdeaListSuccess(null));
    }
};

//---get instructions list--
export const getInstructionsSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_INSTRUCTIONS,
        payload: data
    });
};
export const getInstructions = () => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${process.env.REACT_APP_API_BASE_URL + '/instructions/1'}`,
                axiosConfig
            )
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =result?.data?.data[0];
            dispatch(getInstructionsSuccess(data));
        } else {
            dispatch(getInstructionsSuccess(null));
        }
    } catch (error) {
        dispatch(getInstructionsSuccess(null));
    }
};


//---get evaluated idea of L1 round--
export const getL1EvaluatedIdeaSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_L1_EVALUATED_IDEA,
        payload: data
    });
};
export const getL1EvaluatedIdea = (params,setshowspin) => async (dispatch) => {
    const currentUser = getCurrentUser('current_user');
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${process.env.REACT_APP_API_BASE_URL + '/challenge_response/evaluated/'+currentUser?.data[0]?.user_id+params}`,
                axiosConfig
            )
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =result?.data?.data;
            dispatch(getL1EvaluatedIdeaSuccess(data));
            setshowspin(false);
        } else {
            dispatch(getL1EvaluatedIdeaSuccess(null));
            setshowspin(false);
        }
    } catch (error) {
        dispatch(getL1EvaluatedIdeaSuccess(null));
        setshowspin(false);
    }
};      

//---update evaluator list--
export const updateEvaluatorSuccess = (data) => async (dispatch) => {
    dispatch({
        type: UPDATAE_EVALUATOR,
        payload: data
    });
};
export const updateEvaluator = (params,id) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .put(
                `${process.env.REACT_APP_API_BASE_URL + '/evaluators/'+id}`,params,axiosConfig

            )
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =result?.data?.data[0];
            dispatch(updateEvaluatorSuccess(data));
        } else {
            dispatch(updateEvaluatorSuccess(null));
        }
    } catch (error) {
        dispatch(updateEvaluatorSuccess(null));

    }
};