import { GET_SURVEY_REPORT, GET_MRNTOR_REG_STATUS_REPORT, GET_MENTOR_REPORT } from '../actions';

const INIT_STATE = {
    surveyData: [],
    mentorRegStatus: [],
    mentorReport: []
};

export default (state = INIT_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
    case GET_SURVEY_REPORT:
        return { ...state, surveyData: action.payload };
    case GET_MRNTOR_REG_STATUS_REPORT:
        return {
            ...state,
            mentorRegStatus: action.payload
        };
    case GET_MENTOR_REPORT:
        return {
            ...state,
            mentorReport: action.payload
        };
    default:
        return newState;
    }
};
