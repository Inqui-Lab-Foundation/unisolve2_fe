import axios from 'axios';

import { GET_MENTOR_REPORT, GET_MRNTOR_REG_STATUS_REPORT, GET_SURVEY_REPORT } from '../actions';
import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';

export const getSurveyReportSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_SURVEY_REPORT,
        payload: data
    });
};
export const getMentorRegStatusReportSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_MRNTOR_REG_STATUS_REPORT,
        payload: data
    });
};
export const getSurveyReport = (surveyId, role, status) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            // /quizSurveys/1/surveyStatus?role=MENTOR&quizSurveyStatus=INCOMPLETE
            .get(`${URL.getAdminReports}${surveyId}/surveyStatus?role=${role}&quizSurveyStatus=${status}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data.data && result.data.data.length > 0 ? result.data.data : [];
            dispatch(getSurveyReportSuccess(data));
            openNotificationWithIcon("success", "Survey fetched successfully");
        }
    } catch (error) {
        dispatch(getSurveyReportSuccess([]));
        openNotificationWithIcon("error", "Survey fetched failed");
    }
};

export const getMentorReportSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_MENTOR_REPORT,
        payload: data
    });
};

const flattenObj = (ob) => {
 
    // The object which contains the
    // final result
    let result = {};
 
    // loop through the object "ob"
    for (const i in ob) {
 
        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {
 
                // Store temp in result
                result[j] = temp[j];
            }
        }
 
        // Else store ob[i] in result directly
        else {
            result[i] = ob[i];
        }
    }
    return result;
};
 
export const getMentorReport = (queryParams) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axiosConfig['params'] = queryParams;
        const result = await axios
            .get(`${URL.getAdminMentorReports}`,axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data.data && result.data.data.length > 0 ? result.data.data.map(item=>flattenObj(item)) : [];
            dispatch(getMentorReportSuccess(data));
            openNotificationWithIcon("success", "Mentor report fetched successfully");
        }
    } catch (error) {
        dispatch(getMentorReportSuccess([]));
        openNotificationWithIcon("error", "Mentor report fetched failed");
    }
};
export const getMentorRegStatusReport = (surveyId, role, status) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            // /quizSurveys/1/surveyStatus?role=MENTOR&quizSurveyStatus=INCOMPLETE
            .get(`${URL.getAdminReports}${surveyId}/surveyStatus?role=${role}&quizSurveyStatus=${status}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data.data && result.data.data.length > 0 ? result.data.data : [];
            dispatch(getMentorRegStatusReportSuccess(data));
            openNotificationWithIcon("success", "Teacher data fetched successfully");
        }
    } catch (error) {
        dispatch(getSurveyReportSuccess([]));
        openNotificationWithIcon("error", "Teacher data fetched failed");
    }
};
