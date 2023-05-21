export const adminRoot = '/admin';

export const UserRole = {
    // USER ROLE //
};

export const URL = {
    // Post //
    login: process.env.REACT_APP_API_BASE_URL + '/students/login',
    adminLogin: process.env.REACT_APP_API_BASE_URL + '/admins/login',
    eadminLogin:
        process.env.REACT_APP_API_BASE_URL + '/admins/login?eAdmin=true',
    adminRegister: process.env.REACT_APP_API_BASE_URL + '/admins/register',
    evaluatorLogin: process.env.REACT_APP_API_BASE_URL + '/evaluators/login',
    evaluatorRegister: `${process.env.REACT_APP_API_BASE_URL}/evaluators/register`,
    teacherLogin: process.env.REACT_APP_API_BASE_URL + '/mentors/login',
    addMentor: process.env.REACT_APP_API_BASE_URL + '/mentors/create',
    addAdminCourses: process.env.REACT_APP_API_BASE_URL + '/course',
    submitChallengeResponse:
        process.env.REACT_APP_API_BASE_URL +
        '/challenge_response?challenge_id=1&',
    initiateChallenge:
        process.env.REACT_APP_API_BASE_URL +
        '/challenge_response/1/initiate?team_id=',
    postAdminRefQuizResponce:
        process.env.REACT_APP_API_BASE_URL + '/reflectiveQuiz/',
    createMentorSupportTickets:
        process.env.REACT_APP_API_BASE_URL + '/supportTickets',
    createMentorSupportTicketResponse:
        process.env.REACT_APP_API_BASE_URL + '/supportTicketsReply',
    createOrganization:
        process.env.REACT_APP_API_BASE_URL + '/organizations/createOrg',
    createEvalProcess:
        process.env.REACT_APP_API_BASE_URL + '/evaluationProcess',
    updateOrganization: process.env.REACT_APP_API_BASE_URL + '/organizations/',
    updateEvalProcess:
        process.env.REACT_APP_API_BASE_URL + '/evaluationProcess/',

    createMultiStudent:
        process.env.REACT_APP_API_BASE_URL + '/students/bulkCreateStudent',
    uploadFile:
        process.env.REACT_APP_API_BASE_URL +
        '/challenge_response/fileUpload?team_id=',
    updatepromote:
        process.env.REACT_APP_API_BASE_URL + '/challenge_response/updateEntry/',

    //Put//
    changePassword: process.env.REACT_APP_API_BASE_URL + '/auth/changePassword',
    studentResetPwd:
        process.env.REACT_APP_API_BASE_URL + '/students/resetPassword',
    updatePassword:
        process.env.REACT_APP_API_BASE_URL + '/mentors/updatePassword',
    updateMobile: process.env.REACT_APP_API_BASE_URL + '/mentors/updateMobile',
    updateMentor: process.env.REACT_APP_API_BASE_URL + '/mentors/update',
    updateMentorStatus: process.env.REACT_APP_API_BASE_URL + '/mentors',
    updateAdminStatus: process.env.REACT_APP_API_BASE_URL + '/admins',
    updateStudentStatus: process.env.REACT_APP_API_BASE_URL + '/students',
    putAdminQuizResponce: process.env.REACT_APP_API_BASE_URL + '/quiz/',
    //
    putResetPassword:
        process.env.REACT_APP_API_BASE_URL + '/mentors/resetPassword',

    updateSupportTicketResponse:
        process.env.REACT_APP_API_BASE_URL + '/supportTickets',

    //Delete//
    deleteMentor: process.env.REACT_APP_API_BASE_URL + '/mentor/delete',
    deleteTempMentor: process.env.REACT_APP_API_BASE_URL + '/mentors/',

    //Get//
    logOut: process.env.REACT_APP_API_BASE_URL + '/auth/logout',
    adminLogOut: process.env.REACT_APP_API_BASE_URL + '/auth/logout',
    teacherLogOut: process.env.REACT_APP_API_BASE_URL + '/auth/logout',
    getMentors: process.env.REACT_APP_API_BASE_URL + '/mentors',
    getModules: process.env.REACT_APP_API_BASE_URL + '/modules/list',
    getAdminCouses: process.env.REACT_APP_API_BASE_URL + '/courses',
    getAdminCousesDetails: process.env.REACT_APP_API_BASE_URL + '/courses/',
    getAdminEvaluator: process.env.REACT_APP_API_BASE_URL + '/evaluators',
    getNotificationsList:
        process.env.REACT_APP_API_BASE_URL + '/notifications/tome',
    getAdminQstList: process.env.REACT_APP_API_BASE_URL + '/quiz/',
    getAdminRefQizList: process.env.REACT_APP_API_BASE_URL + '/reflectiveQuiz/',
    getSchoolRegistrationBulkupload:
        process.env.REACT_APP_API_BASE_URL + '/organizations',
    getFaqCategoryList: `${process.env.REACT_APP_API_BASE_URL}/faqCategories`,
    getFaqByCategoryId: `${process.env.REACT_APP_API_BASE_URL}/faqCategories`,
    getFaqList: `${process.env.REACT_APP_API_BASE_URL}/faqs`,
    checkOrg: `${process.env.REACT_APP_API_BASE_URL}/organizations/checkOrg`,
    mentorRegister: `${process.env.REACT_APP_API_BASE_URL}/mentors/register`,
    mentorOTP: `${process.env.REACT_APP_API_BASE_URL}/mentors/validateOtp`,
    mentorChangePwd: `${process.env.REACT_APP_API_BASE_URL}/mentors/changePassword`,
    getTeamsList: `${process.env.REACT_APP_API_BASE_URL}/teams`,
    getTeamMembersList: `${process.env.REACT_APP_API_BASE_URL}/teams/`,
    getReportsView: `${process.env.REACT_APP_API_BASE_URL}/reports/challengesDistrictCount`,
    getPreSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys`,
    getStudentPreSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys/2`,
    getPostSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys`,
    getStudentPostSurveyList: `${process.env.REACT_APP_API_BASE_URL}/quizSurveys/4`,
    getTeacherCousesDetails:
        process.env.REACT_APP_API_BASE_URL + '/mentorCourses/',
    getStudents: process.env.REACT_APP_API_BASE_URL + '/students',
    getDistrictsOnly:
        process.env.REACT_APP_API_BASE_URL + '/organizations/districts',
    getStudentBadges: process.env.REACT_APP_API_BASE_URL + '/students/',
    getStudentById: process.env.REACT_APP_API_BASE_URL + '/students/',
    getAdmin: process.env.REACT_APP_API_BASE_URL + '/admins/',
    getChallengeList: `${process.env.REACT_APP_API_BASE_URL}/challenge_response/customFilter`,

    getStudentDashboardStatusCommonById:
        process.env.REACT_APP_API_BASE_URL + '/dashboard/studentStats/',
    getTeacherById: process.env.REACT_APP_API_BASE_URL + '/mentors/',
    getTeacherDashboardStatesById:
        process.env.REACT_APP_API_BASE_URL + '/dashboard/mentorStats/',
    getChallengeQuestions: process.env.REACT_APP_API_BASE_URL + '/challenge',
    getChallengeSubmittedResponse:
        process.env.REACT_APP_API_BASE_URL +
        '/challenge_response/submittedDetails?team_id=',
    getMentorSupportTickets:
        process.env.REACT_APP_API_BASE_URL + '/supportTickets',
    getMentorSupportTicketsById:
        process.env.REACT_APP_API_BASE_URL + '/supportTickets/',
    getMentorSupportTicketResponsesById:
        process.env.REACT_APP_API_BASE_URL + '/supportTicketsReply',
    getMentorAttachments:
        process.env.REACT_APP_API_BASE_URL + '/mentorAttachments',
    getDistricts: process.env.REACT_APP_API_BASE_URL + '/dashboard/mapStats',
    // getDistrictsLive:
    //     process.env.REACT_APP_API_BASE_URL + '/dashboard/refreshMapStatsLive',
    getScheduleDates: process.env.REACT_APP_API_BASE_URL + '/auth/roadMap',
    getAdminReports: process.env.REACT_APP_API_BASE_URL + '/quizSurveys/',
    getAdminMentorRegStatusReports:
        process.env.REACT_APP_API_BASE_URL + '/mentors/regStatus',
    getAdminMentorReports:
        process.env.REACT_APP_API_BASE_URL + '/reports/allMentorReports',
    getTeamMemberStatusEndpoint:
        process.env.REACT_APP_API_BASE_URL + '/dashboard/teamStats/',
    getidealist: process.env.REACT_APP_API_BASE_URL + '/challenge_response?',
    getidealistfinal:
        process.env.REACT_APP_API_BASE_URL +
        '/challenge_response/evaluationResult',
    getFinalEvaluation:
        process.env.REACT_APP_API_BASE_URL +
        '/challenge_response/finalEvaluation',
    gettotalcount:
        process.env.REACT_APP_API_BASE_URL + '/dashboard/evaluatorStats',
    getlogout: process.env.REACT_APP_API_BASE_URL + '/students/logout'
};
const API = 'O10ZPA0jZS38wP7cO9EhI3jaDf24WmKX62nWw870';

export const KEY = {
    User_API_Key: API
};

export const isAuthGuardActive = true;
