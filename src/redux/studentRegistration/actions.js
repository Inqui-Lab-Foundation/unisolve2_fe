import axios from 'axios';

import {
    GET_STUDENTS,
    GET_STUDENTS_LIST_ERROR,
    GET_STUDENTS_LIST_SUCCESS,
    UPDATE_STUDENT_STATUS,
    GET_STUDENT,
    GET_STUDENTS_LANGUAGE,
    GET_CHALLENGE_QUESTIONS,
    GET_CHALLENGE_SUBMITTED_DATA,
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
import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import { getLanguage } from '../../constants/languageOptions';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/media/badge.png';

export const getStudentListSuccess = (user) => async (dispatch) => {
    dispatch({
        type: GET_STUDENTS_LIST_SUCCESS,
        payload: user
    });
};
export const getStudentGlobalLanguage = (language) => async (dispatch) => {
    dispatch({
        type: GET_STUDENTS_LANGUAGE,
        payload: language
    });
};

export const getStudentSuccess = (user) => async (dispatch) => {
    dispatch({
        type: GET_STUDENT,
        payload: user
    });
};

export const getStudentListError = (message) => async (dispatch) => {
    dispatch({
        type: GET_STUDENTS_LIST_ERROR,
        payload: { message }
    });
};

export const getStudentRegistationData = (studentType) => async (dispatch) => {
    try {
        dispatch({ type: GET_STUDENTS });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        let result;
        if (studentType && studentType === 'above') {
            result = await axios
                .get(`${URL.getStudents}?adult=${true}`, axiosConfig)
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
        } else {
            result = await axios
                .get(
                    `${URL.getStudents}?status=ALL&district=${studentType}`,
                    axiosConfig
                )
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
        }
        if (result && result.status === 200) {
            const data = result.data?.data[0]?.dataValues || [];
            data.length > 0 ? data.forEach((item, i) => (item.id = i + 1)) : [];
            dispatch(getStudentListSuccess(data));
        } else {
            dispatch(getStudentListError(result.statusText));
        }
    } catch (error) {
        dispatch(getStudentListError({}));
    }
};
export const getDistrictsSuccess = (data) => async (dispatch) => {
    // where data = all districts //
    dispatch({
        type: GET_DISTRICTS,
        payload: data
    });
};
export const getDistrictData = () => async (dispatch) => {
    // here we can see  district wise data //
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        let result;
        result = await axios
            .get(`${URL.getDistrictsOnly}`, axiosConfig)
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data.data.length > 0 ? result.data.data : [];
            dispatch(getDistrictsSuccess(data));
        } else {
            dispatch(getDistrictsSuccess([]));
        }
    } catch (error) {
        dispatch(getDistrictsSuccess([]));
    }
};
export const getStudentByIdData = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_STUDENTS });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(`${URL.getStudentById}${id}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =
                result.data && result.data.data[0] && result.data.data[0];
            dispatch(getStudentSuccess(data));
        } else {
            dispatch(getStudentListError(result.statusText));
        }
    } catch (error) {
        dispatch(getStudentListError({}));
    }
};

export const updateStudentStatus = (data, id) => async (dispatch) => {
    // here we can update the student status  //
    // here id = student id  //
    try {
        dispatch({ type: UPDATE_STUDENT_STATUS });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .put(`${URL.updateStudentStatus + '/' + id}`, data, axiosConfig)
            .then((user) => console.log(user))
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            // const data =
            //     result.data &&
            //     result.data.data[0] &&
            //     result.data.data[0].dataValues;
            // dispatch(getAdminMentorsListSuccess(data));
        } else {
            dispatch(getStudentListError(result.statusText));
        }
    } catch (error) {
        dispatch(getStudentListError({}));
    }
};

export const getChallengeQuestionsSuccess = (questions) => async (dispatch) => {
    dispatch({
        type: GET_CHALLENGE_QUESTIONS,
        payload: questions
    });
};

export const getStudentChallengeQuestions = (language) => async (dispatch) => {
    try {
        // dispatch({ type: GET_STUDENTS });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${URL.getChallengeQuestions}/1?${getLanguage(language)}`,
                axiosConfig
            )
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            // const data =
            //     result.data &&
            //     result?.data?.data[0]?.dataValues[0]?.challenge_questions.length > 0 &&
            //     result?.data?.data[0]?.dataValues[0]?.challenge_questions;
            const data =
                result.data &&
                result?.data?.data[0]?.challenge_questions.length > 0 &&
                result?.data?.data[0]?.challenge_questions;

            dispatch(getChallengeQuestionsSuccess(data));
        } else {
            dispatch(getStudentListError(result.statusText));
        }
    } catch (error) {
        dispatch(getStudentListError({}));
    }
};
export const getStudentChallengeSubmittedResponseSuccess =
    (questions) => async (dispatch) => {
        dispatch({
            type: GET_CHALLENGE_SUBMITTED_DATA,
            payload: questions
        });
    };
export const getStudentChallengeSubmittedResponse =
    (id, language) => async (dispatch) => {
        try {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .get(
                    `${URL.getChallengeSubmittedResponse}${id}&${getLanguage(
                        language
                    )}`,
                    axiosConfig
                )
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data =
                    result.data &&
                    result?.data?.data.length > 0 &&
                    result?.data?.data[0]?.dataValues;
                dispatch(getStudentChallengeSubmittedResponseSuccess(data));
            } else {
                dispatch(getStudentListError(result.statusText));
            }
        } catch (error) {
            dispatch(getStudentListError({}));
        }
    };

export const initiateIdea = async (
    id,
    language,
    history,
    data,
    setShowChallenges,
    t
) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .post(
                `${URL.initiateChallenge}${id}&${getLanguage(language)}`,
                data,
                axiosConfig
            )
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            openNotificationWithIcon('success', t('student.idea_init_succ'));
            setShowChallenges(true);
            history.push('/challenges');
        } else {
            openNotificationWithIcon(
                'error',
                `${result?.data?.data[0]?.initiated_by} Already Initiated the Idea`
            );
            // openNotificationWithIcon('error','Idea has already been initiated');
        }
    } catch (error) {
        openNotificationWithIcon(
            'error',
            `${error?.response?.data?.data[0]?.initiated_by} Already Initiated the Idea`
        );
    }
};
export const setFilesSuccess = (badges) => async (dispatch) => {
    dispatch({
        type: SET_FILE_SUCCESS,
        payload: badges
    });
};
export const uploadFiles = (data) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .post(`${URL.uploadFile}`, data, axiosConfig)
            .then((res) => res)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            dispatch(setFilesSuccess(result.data?.data[0]?.attachments));
        } else {
            openNotificationWithIcon('error', `${result?.data?.message}`);
        }
    } catch (error) {
        openNotificationWithIcon('error', `${error?.response?.data?.message}`);
    }
};

export const getStudentBadgesSuccess = (badges) => async (dispatch) => {
    dispatch({
        type: GET_STUDENT_BADGES,
        payload: badges
    });
};
export const getStudentBadges = (id, language) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${URL.getStudentBadges}${id}/badges?${getLanguage(language)}`,
                axiosConfig
            )
            .then((badges) => badges)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data && result?.data?.data;
            dispatch(getStudentBadgesSuccess(data));
        } else {
            dispatch(getStudentListError(result.statusText));
        }
    } catch (error) {
        dispatch(getStudentListError({}));
    }
};

export const updateStudentBadges =
    (data, id, language, t) => async (dispatch) => {
        try {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .post(
                    `${URL.getStudentBadges}${id}/badges?${getLanguage(
                        language
                    )}`,
                    data,
                    axiosConfig
                )
                .then(() => {
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success'
                        },
                        buttonsStyling: false
                    });

                    swalWithBootstrapButtons.fire({
                        title: t('badges.congratulations'),
                        text: t('badges.earn'),
                        // text:`You have Earned a New Badge ${data.badge_slugs[0].replace("_"," ").toUpperCase()}`,
                        imageUrl: `${logout}`,
                        showCloseButton: true,
                        confirmButtonText: t('badges.ok'),
                        showCancelButton: false,
                        reverseButtons: false
                    });
                })
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 202) {
                const data = result.data && result?.data?.data;
                dispatch(getStudentBadgesSuccess(data));
            } else {
                dispatch(getStudentListError(result.statusText));
            }
        } catch (error) {
            dispatch(getStudentListError({}));
        }
    };

export const getStudentDashboardStatusSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_STUDENT_DASHBOARD_STATUS,
        payload: data
    });
};
export const getStudentDashboardStatus = (id, language) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${URL.getStudentDashboardStatusCommonById}${id}?${getLanguage(
                    language
                )}`,
                axiosConfig
            )
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data =
                result.data && result?.data?.data && result?.data?.data[0];
            dispatch(getStudentDashboardStatusSuccess(data));
        } else {
            dispatch(getStudentDashboardStatusSuccess(null));
        }
    } catch (error) {
        dispatch(getStudentDashboardStatusSuccess(null));
    }
};
export const getStudentDashboardChallengesStatusSuccess =
    (data) => async (dispatch) => {
        dispatch({
            type: GET_STUDENT_DASHBOARD_CHALLENGES_STATUS,
            payload: data
        });
    };
export const getStudentDashboardChallengesStatus =
    (id, language) => async (dispatch) => {
        try {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .get(
                    `${
                        URL.getStudentDashboardStatusCommonById
                    }${id}/challenges?${getLanguage(language)}`,
                    axiosConfig
                )
                .then((data) => data)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data =
                    result.data && result?.data?.data && result?.data?.data[0];
                dispatch(getStudentDashboardChallengesStatusSuccess(data));
            } else {
                dispatch(getStudentDashboardChallengesStatusSuccess(null));
            }
        } catch (error) {
            dispatch(getStudentDashboardChallengesStatusSuccess(null));
        }
    };
export const getStudentDashboardTeamProgressStatusSuccess =
    (data) => async (dispatch) => {
        dispatch({
            type: GET_STUDENT_DASHBOARD_TEAMPROGRESS,
            payload: data
        });
    };
export const getStudentDashboardTeamProgressStatus =
    (id, language) => async (dispatch) => {
        try {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .get(
                    `${
                        URL.getStudentDashboardStatusCommonById
                    }${id}/teamProgress?${getLanguage(language)}`,
                    axiosConfig
                )
                .then((data) => data)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data =
                    result.data && result?.data?.data && result?.data?.data;
                dispatch(getStudentDashboardTeamProgressStatusSuccess(data));
            } else {
                dispatch(getStudentDashboardTeamProgressStatusSuccess(null));
            }
        } catch (error) {
            dispatch(getStudentDashboardTeamProgressStatusSuccess(null));
        }
    };

export const getStudentDashboardTutorialVideosSuccess =
    (data) => async (dispatch) => {
        dispatch({
            type: GET_STUDENT_DASHBOARD_TUTORIALS,
            payload: data
        });
    };
export const getStudentDashboardTutorialVideos =
    (language) => async (dispatch) => {
        try {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .get(
                    `${
                        process.env.REACT_APP_API_BASE_URL
                    }/tutorialVideos?${getLanguage(language)}`,
                    axiosConfig
                )
                .then((data) => data)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data =
                    result.data &&
                    result?.data?.data &&
                    result?.data?.data[0].dataValues;
                dispatch(getStudentDashboardTutorialVideosSuccess(data));
            } else {
                dispatch(getStudentDashboardTutorialVideosSuccess(null));
            }
        } catch (error) {
            dispatch(getStudentDashboardTutorialVideosSuccess(null));
        }
    };
export const updateStudentCertificate = async (id) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(
                `${process.env.REACT_APP_API_BASE_URL}/students/${id}/studentCertificate`,
                axiosConfig
            )
            .then((data) => data)
            .catch((err) => {
                return err.response;
            });
    } catch (error) {
        openNotificationWithIcon('error', 'Something went wrong!');
    }
};
export const studentPostSurveyCertificateSuccess =
    (data) => async (dispatch) => {
        dispatch({
            type: SET_POSTSURVEY_STATUS,
            payload: data
        });
    };
export const studentPostSurveyCertificate = (language) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(
                `${URL.getPostSurveyList}?role=STUDENT&${getLanguage(
                    language
                )}`,
                axiosConfig
            )
            .then((postSurveyRes) => {
                if (postSurveyRes?.status === 200) {
                    dispatch(
                        studentPostSurveyCertificateSuccess(
                            postSurveyRes.data.data[0].dataValues[1].progress
                        )
                    );
                }
            })
            .catch((err) => {
                return err.response;
            });
    } catch (error) {
        dispatch(studentPostSurveyCertificateSuccess(null));
    }
};
export const setPresurveyStatus = (data) => async (dispatch) => {
    dispatch({
        type: SET_PRESURVEY_STATUS,
        payload: data
    });
};
export const getPresurveyData = (language) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axios
            .get(
                `${URL.getStudentPreSurveyList}?role=STUDENT&${getLanguage(
                    language
                )}`,
                axiosConfig
            )
            .then((preSurveyRes) => {
                if (preSurveyRes?.status == 200) {
                    dispatch(
                        setPresurveyStatus(
                            preSurveyRes.data?.data[0]
                                ? preSurveyRes.data?.data[0]
                                : null
                        )
                    );
                }
            })
            .catch(() => {
                dispatch(setPresurveyStatus(null));
            });
    } catch (error) {
        dispatch(setPresurveyStatus(null));
    }
};
export const userLogout = () => async (dispatch) => {
    dispatch({
        type: 'USER_LOGOUT'
    });
};

export const getlogout = () => async () => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axios.get(`${URL.getlogout}`, axiosConfig).then((Res) => {
            if (Res?.status == 200) {
                // console.log(Res);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
