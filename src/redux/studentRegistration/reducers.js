// Foulders Reducers //
import { languageOptions } from '../../constants/languageOptions';
import {
    GET_CHALLENGE_QUESTIONS,
    GET_CHALLENGE_SUBMITTED_DATA,
    GET_STUDENT,
    GET_STUDENTS,
    GET_STUDENTS_LANGUAGE,
    GET_STUDENTS_LIST_ERROR,
    GET_STUDENTS_LIST_SUCCESS,
    GET_STUDENT_BADGES,
    GET_STUDENT_DASHBOARD_STATUS,
    GET_STUDENT_DASHBOARD_CHALLENGES_STATUS,
    GET_STUDENT_DASHBOARD_TEAMPROGRESS,
    GET_STUDENT_DASHBOARD_TUTORIALS,
    SET_PRESURVEY_STATUS,
    SET_POSTSURVEY_STATUS,
    SET_FILE_SUCCESS,
    GET_DISTRICTS
} from '../actions';

const localLang = JSON.parse(localStorage.getItem("s_language"));

const INIT_STATE = {
    loading: false,
    error: '',
    successMessage: '',
    studentList: [],
    teamMember:{},
    challengeQuestions:[],
    challengesSubmittedResponse:[],
    studentLanguage:localLang ? localLang :languageOptions[0],
    badges:"",
    dashboardStatus:null,
    dashboardChallengesStatus:null,
    dashboardTeamProgressStatus:null,
    dashboardTutorials:null,
    preSurveyList:[],
    quizSurveyId:0,
    presuveyStatusGl :null,
    postSurveyStatusGl :null,
    ideaSubmissionStatus:null,
    fileResponse:null,
    dists:[]
};

export default (state = INIT_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
    case GET_STUDENTS:
        return { ...state, loading: true, error: '' };
    case GET_STUDENT:
        return {
            ...state,
            loading: false,
            teamMember: action.payload,
            error: '',
        };
    case GET_STUDENTS_LIST_SUCCESS: 
        return {
            ...state,
            loading: false,
            studentList: action.payload,
            error: '',
        };
    case GET_STUDENTS_LIST_ERROR:
        return {
            ...state,
            loading: false,
            studentList: [],
            error: action.payload.message,
        };
    case GET_STUDENTS_LANGUAGE:
        return {
            ...state,
            studentLanguage:action.payload
        };
    case GET_CHALLENGE_QUESTIONS:
        return {
            ...state,
            challengeQuestions:action.payload
        };
    case GET_CHALLENGE_SUBMITTED_DATA:
        var status = action.payload[0]?.status;
        return {
            ...state,
            challengesSubmittedResponse:action.payload,
            ideaSubmissionStatus:status
        };
    case GET_STUDENT_BADGES:
        return {
            ...state,
            badges:action.payload
        };
    case GET_STUDENT_DASHBOARD_STATUS:
        return {
            ...state,
            dashboardStatus:action.payload
        };
    case GET_STUDENT_DASHBOARD_CHALLENGES_STATUS:
        return {
            ...state,
            dashboardChallengesStatus:action.payload
        };
    case GET_STUDENT_DASHBOARD_TEAMPROGRESS:
        return {
            ...state,
            dashboardTeamProgressStatus:action.payload
        };
    case GET_STUDENT_DASHBOARD_TUTORIALS:
        return {
            ...state,
            dashboardTutorials:action.payload
        };
    case SET_PRESURVEY_STATUS:
        return {
            ...state,
            presuveyStatusGl:action.payload?.progress,
            preSurveyList:action.payload?.quiz_survey_questions,
            quizSurveyId:action.payload?.quiz_survey_id
        };
    case SET_POSTSURVEY_STATUS:
        return {
            ...state,
            postSurveyStatusGl:action.payload
        };
    case SET_FILE_SUCCESS:
        return {
            ...state,
            fileResponse:action.payload
        };
    case GET_DISTRICTS:
        return {
            ...state,
            dists:action.payload
        };
    default:
        return newState;
    }
};
