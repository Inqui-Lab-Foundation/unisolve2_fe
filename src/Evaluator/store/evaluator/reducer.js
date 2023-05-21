// Foulders Reducers //
import {
    EVALUATOR_LOGIN_USER,
    EVALUATOR_LOGIN_USER_SUCCESS,
    EVALUATOR_LOGIN_USER_ERROR,
    GET_SUBMITTED_IDEA_LIST,
    GET_INSTRUCTIONS,
    GET_L1_EVALUATED_IDEA,
    UPDATAE_EVALUATOR
} from '../../../redux/actions.js';


const INIT_STATE = {
    currentUser: {},
    loading: false,
    error: '',
    submittedIdeaList:null,
    processedRound1List:null,
    yetToProcessRound1List:null,
    instructionsData:null,
    evaluatedIdeaL1:null,
    evaluatorUpdateData:null,
};

export default (state = INIT_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
    case EVALUATOR_LOGIN_USER:
        return { ...state, loading: true, error: '' }; 
    case EVALUATOR_LOGIN_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            currentUser: action.payload, 
            error: '',
        };
    case EVALUATOR_LOGIN_USER_ERROR:
        return {
            ...state,
            loading: false,
            currentUser: null,
            error: action.payload.message,
        };
    case GET_SUBMITTED_IDEA_LIST:
        return {
            ...state,
            submittedIdeaList:action.payload,
        };
    case GET_INSTRUCTIONS:
        return {
            ...state,
            instructionsData:action.payload,
        };
    case GET_L1_EVALUATED_IDEA:
        return {
            ...state,
            evaluatedIdeaL1:action.payload,
        };
    case UPDATAE_EVALUATOR:
        return {
            ...state,
            evaluatorUpdateData:action.payload,
        };
    default:
        return newState;
    }
};
