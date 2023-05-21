// Foulders Reducers //
import {
    ADMIN_TEAMS_LIST,
    ADMIN_TEAMS_LIST_SUCCESS,
    ADMIN_TEAMS_LIST_ERROR,
    ADMIN_TEAMS_MEMBERS_LIST,
    ADMIN_TEAMS_MEMBERS_LIST_SUCCESS,
    ADMIN_TEAMS_MEMBERS_LIST_ERROR,
    TEAM_MEMBER_STATUS,
    TEAM_MEMBER_STATUS_ERROR
} from '../../../redux/actions.js';

const INIT_STATE = {
    teamsList: [],
    teamsMembersList: [],
    teamsMembersStatus: [],
    teamsMembersStatusErr: '',
};

export default (state = INIT_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
    case ADMIN_TEAMS_LIST:
        return { ...state, loading: true, error: '' };
    case ADMIN_TEAMS_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            teamsList: action.payload,
            error: ''
        };
    case ADMIN_TEAMS_LIST_ERROR:
        return {
            ...state,
            loading: false,
            teamsList: [],
            error: action.payload.message
        };
    case ADMIN_TEAMS_MEMBERS_LIST:
        return { ...state, loading: true, error: '' };
    case ADMIN_TEAMS_MEMBERS_LIST_SUCCESS:
        return {
            ...state,
            loading: false,
            teamsMembersList: action.payload,
            error: ''
        };
    case ADMIN_TEAMS_MEMBERS_LIST_ERROR:
        return {
            ...state,
            loading: false,
            teamsMembersList: [],
            error: action.payload.message
        };
    case TEAM_MEMBER_STATUS:
        return {
            ...state,
            loading: false,
            teamsMembersStatus: action.payload,
            error: ''
        };
    case TEAM_MEMBER_STATUS_ERROR:
        return {
            ...state,
            loading: false,
            teamsMembersStatus: [],
            teamsMembersStatusErr: action.payload,
            error: ''
        };
    default:
        return newState;
    }
};
