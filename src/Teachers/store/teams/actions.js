import axios from 'axios';

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
import { URL, KEY } from '../../../constants/defaultValues.js';
import { getNormalHeaders } from '../../../helpers/Utils.js';

export const getAdminTeamsListSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_TEAMS_LIST_SUCCESS,
        payload: user
    });
};

export const getAdminTeamsListError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_TEAMS_LIST_ERROR,
        payload: { message }
    });
};

export const getAdminTeamsList = (item) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TEAMS_LIST });
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axiosConfig['params'] = {
            mentor_id: item,
            status: 'ACTIVE'
        };
        const result = await axios
            .get(URL.getTeamsList, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =
                result.data &&
                result.data.data[0] &&
                result.data.data[0].dataValues;
            dispatch(getAdminTeamsListSuccess(data));
        } else {
            dispatch(getAdminTeamsListError(result.statusText));
        }
    } catch (error) {
        dispatch(getAdminTeamsListError({}));
    }
};

export const getAdminTeamMembersListSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_TEAMS_MEMBERS_LIST_SUCCESS,
        payload: user
    });
};

export const getAdminTeamMembersListError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_TEAMS_MEMBERS_LIST_ERROR,
        payload: { message }
    });
};

export const getAdminTeamMembersList = (teamId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_TEAMS_MEMBERS_LIST });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${URL.getTeamMembersList +
                teamId +
                '/members' +
                '?status=ACTIVE'
                }`,
                axiosConfig
            )
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data && result.data.data;
            dispatch(getAdminTeamMembersListSuccess(data));
            // history.push("/teams");
        } else {
            dispatch(getAdminTeamMembersListError(result.statusText));
        }
    } catch (error) {
        dispatch(getAdminTeamMembersListError({}));
    }
};


export const getTeamMemberStatusSuccess = (user) => async (dispatch) => {
    dispatch({
        type: TEAM_MEMBER_STATUS,
        payload: user
    });
};
export const getTeamMemberStatusError = (msg) => async (dispatch) => {
    dispatch({
        type: TEAM_MEMBER_STATUS_ERROR,
        payload: msg
    });
};
export const getTeamMemberStatus = (teamId,setShowDefault) => async (dispatch) => {
    if (teamId) {
        try {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .get(
                    `${URL.getTeamMemberStatusEndpoint +
                    teamId
                    }`,
                    axiosConfig
                )
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data = result.data && result.data.data;
                if(data.length > 0){
                    dispatch(getTeamMemberStatusSuccess(data));
                }else{
                    dispatch(getTeamMemberStatusError("Yet to add Students"));
                }
            } else {
                dispatch(getTeamMemberStatusSuccess(result.statusText));
                dispatch(getTeamMemberStatusError("Yet to add Students"));
            }
            setShowDefault(false);
        } catch (error) {
            dispatch(getTeamMemberStatusSuccess([]));
            dispatch(getTeamMemberStatusError("Yet to add Students"));
            setShowDefault(false);
        }
    }
};
