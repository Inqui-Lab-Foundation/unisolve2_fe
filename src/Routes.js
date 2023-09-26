/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './SupportingSCSS/Ideas/style.scss';
import './SupportingSCSS/Ideas.scss';
import './SupportingSCSS/TeamsMentors/style.scss';
import './SupportingSCSS/Courses/style.scss';
import { ProtectedRoute } from './helpers/authHelper';

import Dashboard from './Student/Pages/Dashboard/index';
import BadgesComp from './Student/Pages/Badges/Badges';
import StudenetChangePSWModal from './Student/Pages/ChangePS';
import './i18n';
import LoginNew from './Student/Pages/LoginNew';
import StudentResources from './Student/Resources';
import MyProfile from './Student/Pages/MyProfile';
import PlayVideoCourses from './Student/Pages/Courses/PlayVideo';
import FaqPage from './Student/Pages/HelpPages/FaqPage';
import IdeasPageNew from './Student/Pages/Ideas/IdeaSubmission';
import SDG from './Student/Pages/Ideas/SDG';
// ADMIN ROUTES
import AdminLogin from './Admin/LoginNew';
import AdminDashboard from './Admin/Dashboard/index';
import ViewMore from './Admin/Dashboard/ViewMore';
import AdminMyProfile from './Admin/MyProfile';
import AdminChallenges from './Admin/Challenges/ViewSelectedChallenges';
import AdminEvaluation from './Admin/Evaluation/index';
import AdminEvaluationProcess from './Admin/EvalProcess/index';
import AdminResources from './Admin/Resources/ResourcesList';
import AdminCreateResource from './Admin/Resources/createResource';
import AdminEditResource from './Admin/Resources/editResource';
import AdminLatestNews from './Admin/LatestNews/TeacherNews';
import AdminCreateLatestNews from './Admin/LatestNews/createLatestNews';
import AdminEditLatestNews from './Admin/LatestNews/editLatestNews';
import Selectedlist from './Admin/Evaluation/ViewSelectedIdea/ViewSelectedideas';
import Selectedfinallist from './Admin/Evaluation/FinalResults/ViewFinalSelectedideas';
import AdminForgotPassword from './Admin/ForgotPassword';
import AdminUserList from './Admin/UserList/Ticket';
import CommonUserProfile from './Admin/UserList/CommonUserProfile';
import CommonUserProfileEdit from './Admin/UserList/EditProfile';
import AdminFaqByCategory from './Admin/FAQ/FaqByCategory';
import AddNewFaq from './Admin/FAQ/AddNewFaq';
import EditFaq from './Admin/FAQ/EditFaq';
import AdminTickets from './Admin/Tickets/Ticket';
import AdminAllSchools from './Admin/Schools/Ticket';
import AddNewSchool from './Admin/Schools/AddNewSchool';
import Reports from './Admin/Reports';
import IndividualReport from './Admin/Reports/ReportFilter';
import AdminChallengesComp from './Admin/Badges/Badges';
import StudentPostservey from './Student/PostSurvey/PostSurvey';
import TeacherPostservey from './Teachers/PostSurvey/PostSurvey';
import Popup from './Admin/Popup/popup';
// TEACHER ROUTES
import TeacherLogin from './Teachers/LoginNew';
import TeacherDashboard from './Teachers/Dashboard/index';
import ForgotPasswordNew from './Teachers/ForgotPasswordNew';

import TeacherFaqPage from './Teachers/HelpPages/FaqPage';
import TeacherResources from './Teachers/Resources/index';
import TeacherTeamList from './Teachers/Teams/Ticket';
import TeacherCreateTeam from './Teachers/Teams/CreateTeam';
import TeacherPreservey from './Teachers/PreSurvey/PreSurvey';
import StudentPreservey from './Student/PreSurvey/PreSurvey';
import StudentCertificate from './Student/Pages/Certificate/MyCertificate';
import TeacherEditTeam from './Teachers/Teams/EditTeam';
import TeacherTeamMember from './Teachers/Teams/CreateTeamMember';
import TeacherViewTeamMember from './Teachers/Teams/ViewTeamMember';
import TeacherEditTeamMember from './Teachers/Teams/EditTeamMember';
import TeacherPlayVideo from './Teachers/Courses/TeacherPlayVideo';
import TeacherMyProfile from './Teachers/MyProfile';
import TeacherSupport from './Teachers/SupportJourney/Ticket';
import TeacherSupportAdd from './Teachers/SupportJourney/AddNewTicket';
import TeacherSupportAnswer from './Teachers/SupportJourney/TicketResponse';
import MyCertificate from './Teachers/Certificate/MyCertificate';
import PageNotFound from '../src/PageNotFound';
import ChangePSWModal from './Teachers/ChangePSWModal';
import Translation from './Admin/Translation/Translation';
import EditTranslation from './Admin/Translation/EditTranslation';
import CreateTranslation from './Admin/Translation/CreateTranslation';
import EditSchool from './Admin/Schools/EditSchool';
import TeacherEditProfile from './Teachers/EditTeacherProfile';

//evaluator routes
import LoginEvaluator from './Evaluator/LoginEvaluator';
import EvaluatorDashboard from './Evaluator/Dashboard/index';
import EvaluatorChangePassword from './Evaluator/ChangePSWModal';
import EvaluatorForgotPassword from './Evaluator/ForgotPassword';
import EvaluatorIdeaList from './Evaluator/IdeaList/IdeaList';
import NextLevelIdeas from './Evaluator/IdeaList/NextLevelIdeas';

import EvaluatorInstructions from './Evaluator/Instructions/Instructions';
import EvaluatedIdea from './Evaluator/EvaluatedIdea/EvaluatedIdea';

import EvalutorAdminLogins from './Evaluator/Admin/EvaluatorAdminLogin';
import Eadmindashboard from './Evaluator/Admin/Dashboard/EAdminDashboard';
import EadminChangePassword from './Evaluator/Admin/Pages/ChangePSWModal';
import ListOfIdeas from './Evaluator/Admin/ViewTable/ViewSelectedIdea';
import ListOfFinalIdeas from './Evaluator/Admin/FinalResulteadmin/ViewFinalSelectedideas';
import TicketResView from './Admin/Tickets/TicketResView';
import EditEvalProcess from './Admin/EvalProcess/EditEvalProcess';
import SelDistricts from './Admin/EvalProcess/SelectingDistricts';
import CreateEvalProcess from './Admin/EvalProcess/CreateEvalProcess';
import ReportsView from './Admin/Reports/Helpers/ReportsView';
import ReportsRegistration from './Admin/Reports/Helpers/ReportsRegistration';
import SurveyStatus from './Admin/Reports/Helpers/SurveyStatus';
import TeacherProgressDetailed from './Admin/Reports/Helpers/TeacherProgressDetailed';
import StudentsProgressReport from './Admin/Reports/Helpers/StudentsProgressReport';

import ChallengesReport from './Admin/Reports/Helpers/ChallengesReport';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import RegisterNew from './Register/RegisterNew';
import SuccessPage from './Register/SuccessPage';
import LoginSchool from './School/LoginSchool';
import DashboardSchool from './School/Dashboard';
import MySchoolProfile from './School/MySchoolProfile';

import DashboardCoordinator from './Coordinators/Dashboard';
import CoordinatorChangePswModal from './Coordinators/ChangePswModal';
import SchoolChangePSWModal from './School/ChangePSWModal';
import LogInNew from './Coordinators/LogInNew';
import LoginReport from './ReportsPanel/LoginReport';

import InstructionsPage from './Student/Pages/Ideas/InstuctionsPage';
import TeacherViewDetails from './Admin/UserList/TacherViewDetails';
import AdminTeacherDashboard from './Admin/UserList/AdminTeacherDashboard';
import MentorEditProfile from './Admin/UserList/MentorEditProfile';
import StudentEditProfile from './Admin/UserList/StudentEditProfile';
import SchoolEditProfile from './School/SchoolEditProfile';
import DashboardReport from './ReportsPanel/Dashboard';
import ViewMoreReport from './ReportsPanel/Dashboard/ViewMore';
import ReportUserEditProfile from './ReportsPanel/Dashboard/ReportUserEditProfile';
import Report from './ReportsPanel/Report';
import RegistrationReport from './ReportsPanel/Report/RegistrationReport';
import TeacherProgressReport from './ReportsPanel/Report/TeacherProgressReport';
import StudentDetailedReport from './ReportsPanel/Report/StudentDetailedReport';
import DistReports from './Coordinators/Reports';
import CoRegReport from './Coordinators/Reports/CoRegReport';
import CoTeacherDetailedReport from './Coordinators/Reports/CoTeacherDetailedReport';
import CostudentDetailedReport from './Coordinators/Reports/CostudentDetailedReport';
import CooViewMore from './Coordinators/Dashboard/CooViewMore';
import TeacherRegister from './Admin/UserList/TeacherRegister';
import SuccessTeacher from './Admin/UserList/SuccessTeacher';
import ReportUser from './ReportsPanel/UserListReports/UsersData';
import ReportCommonUserProfile from './ReportsPanel/UserListReports/CommonUserProfile';
import ReportStudentEditProfile from './ReportsPanel/UserListReports/StudentEditProfile';
import ReportTeacherDashboard from './ReportsPanel/UserListReports/ReportTeacherDashboard';
import ReportMentorEditProfile from './ReportsPanel/UserListReports/MentorEditProfile';
import ReportTeacherViewDetails from './ReportsPanel/UserListReports/TeacherViewDetails';
import ReportTeacherRegister from './ReportsPanel/UserListReports/TeacherRegister';
import ReportSuccessTeacher from './ReportsPanel/UserListReports/SuccessTeacher';
import ReportTickets from './ReportsPanel/ReportTickets/Ticket';
import ReportTicketResView from './ReportsPanel/ReportTickets/TicketResView';

const Routers = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Redirect exact={true} from="/" to="/teacher" />
                    {/* <Routes> */}
                    <Route
                        exact={true}
                        path="/login"
                        render={() => <LoginNew />}
                    />
                    <Route
                        exact={true}
                        path="/register"
                        render={() => <RegisterNew />}
                    />
                    <Route
                        exact={true}
                        path="/success"
                        render={() => <SuccessPage />}
                    />
                    <Route
                        exact={true}
                        path="/report"
                        render={() => <LoginReport />}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/dashboard"
                        component={DashboardReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/View-More-details"
                        component={ViewMoreReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/userprofile"
                        component={ReportCommonUserProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/student/edit-user-profile"
                        component={ReportStudentEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/edit-user-profile"
                        component={ReportUserEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/category"
                        component={Report}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/reports-registration"
                        component={RegistrationReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/TeacherProgressDetailed"
                        component={TeacherProgressReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/mentor/edit-user-profile"
                        component={ReportMentorEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/StudentDetailedReport"
                        component={StudentDetailedReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/success"
                        component={ReportSuccessTeacher}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/teacher/register"
                        component={ReportTeacherRegister}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/teacher/dashboard"
                        component={ReportTeacherDashboard}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/userlist"
                        component={ReportUser}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/teacher/View-More-details"
                        component={ReportTeacherViewDetails}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/tickets"
                        component={ReportTickets}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="REPORT"
                        path="/report/support-journey/ans-ticket"
                        component={ReportTicketResView}
                    />
                    <Route
                        exact={true}
                        path="/coordinator"
                        render={() => <LogInNew />}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="DISTRICT"
                        path="/coordinator/dashboard"
                        component={DashboardCoordinator}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="DISTRICT"
                        path="/coordinator/View-More-details"
                        component={CooViewMore}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="DISTRICT"
                        path="/coordinator/reports-registration"
                        component={CoRegReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="DISTRICT"
                        path="/coordinator/TeacherProgressDetailed"
                        component={CoTeacherDetailedReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="DISTRICT"
                        path="/coordinator/StudentDetailedReport"
                        component={CostudentDetailedReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="DISTRICT"
                        path="/coordinator/report"
                        component={DistReports}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="DISTRICT"
                        path="/coordinator-changePassword"
                        component={CoordinatorChangePswModal}
                    />

                    <Route
                        exact={true}
                        path="/school"
                        render={() => <LoginSchool />}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="SCHOOL"
                        path="/school/dashboard"
                        component={DashboardSchool}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="SCHOOL"
                        path="/school/my-profile"
                        component={MySchoolProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="SCHOOL"
                        path="/EditSchoolProfile"
                        component={SchoolEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="SCHOOL"
                        path="/school-changePassword"
                        component={SchoolChangePSWModal}
                    />

                    <ProtectedRoute
                        exact
                        path="/dashboard"
                        user="STUDENT"
                        component={Dashboard}
                    />
                    <ProtectedRoute
                        exact
                        path="/about"
                        user="STUDENT"
                        component={Dashboard}
                    />
                    <ProtectedRoute
                        exact
                        path="/instructions"
                        user="STUDENT"
                        component={InstructionsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/challenges"
                        user="STUDENT"
                        component={IdeasPageNew}
                    />
                    <ProtectedRoute
                        exact
                        user="STUDENT"
                        path="/challenge-initiation"
                        component={SDG}
                    />
                    <ProtectedRoute
                        exact
                        path="/badges"
                        user="STUDENT"
                        component={BadgesComp}
                    />
                    <ProtectedRoute
                        exact
                        path="/playCourse/:id"
                        user="STUDENT"
                        component={PlayVideoCourses}
                    />
                    <ProtectedRoute
                        exact
                        path="/student/Resources/index"
                        user="STUDENT"
                        component={StudentResources}
                    />
                    <ProtectedRoute
                        exact
                        path="/faq"
                        user="STUDENT"
                        component={FaqPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/my-profile"
                        user="STUDENT"
                        component={MyProfile}
                    />
                    {/* ADMIN ROUTES */}
                    <Route
                        exact={true}
                        path="/admin"
                        render={() => <AdminLogin />}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/dashboard"
                        component={AdminDashboard}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/teacher/dashboard"
                        component={AdminTeacherDashboard}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/teacher/register"
                        component={TeacherRegister}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/success"
                        component={SuccessTeacher}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/my-profile"
                        component={AdminMyProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/badges"
                        component={AdminChallengesComp}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/popup"
                        component={Popup}
                    />
                    <Route
                        exact={true}
                        path="/admin/forgotpassword"
                        component={AdminForgotPassword}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/userlist"
                        user="ADMIN"
                        component={AdminUserList}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/teacherview"
                        user="ADMIN"
                        component={TeacherViewDetails}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/userprofile"
                        component={CommonUserProfile}
                    />
                    {/* CommonUserProfileEdit */}
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/edit-user-profile"
                        component={CommonUserProfileEdit}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/mentor/edit-user-profile"
                        component={MentorEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/student/edit-user-profile"
                        component={StudentEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/faq"
                        user="ADMIN"
                        component={AdminFaqByCategory}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/New-faq"
                        user="ADMIN"
                        component={AddNewFaq}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/edit-faq/:faqid"
                        component={EditFaq}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/all-tickets"
                        component={AdminTickets}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/tickets"
                        component={AdminTickets}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/registered-schools"
                        component={AdminAllSchools}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/View-More-details"
                        component={ViewMore}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/teacher/View-More-details"
                        component={TeacherViewDetails}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/register-new-schools"
                        component={AddNewSchool}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/challenges"
                        component={AdminChallenges}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/evaluationStatus"
                        component={AdminEvaluation}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/evaluationStatus/viewlist"
                        component={Selectedlist}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/evaluationStatus/viewfinallist"
                        component={Selectedfinallist}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/evaluationProcess"
                        component={AdminEvaluationProcess}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/reports"
                        component={Reports}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/selected-report"
                        component={IndividualReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/reports-view"
                        component={ReportsView}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/reports-registration"
                        component={ReportsRegistration}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/SurveyStatus"
                        component={SurveyStatus}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/TeacherProgressDetailed"
                        component={TeacherProgressDetailed}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/StudentsProgressReport"
                        component={StudentsProgressReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/ChallengesReport"
                        component={ChallengesReport}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/Resources"
                        component={AdminResources}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/Resources/createResource"
                        component={AdminCreateResource}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/Resources/editResource"
                        component={AdminEditResource}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/LatestNews"
                        component={AdminLatestNews}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/LatestNews/createLatestNews"
                        component={AdminCreateLatestNews}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/LatestNews/editLatestNews"
                        component={AdminEditLatestNews}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="STUDENT"
                        path="/change-password"
                        component={StudenetChangePSWModal}
                    />

                    {/* TEACHERS ROUTES */}
                    <Route
                        exact={true}
                        path="/teacher"
                        render={() => <TeacherLogin />}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/dashboard"
                        user="MENTOR"
                        component={TeacherDashboard}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/teacher/faq"
                        user="MENTOR"
                        component={TeacherFaqPage}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/Resources/index"
                        component={TeacherResources}
                    />
                    <Route
                        exact={true}
                        path="/teacher/forgotpassword"
                        component={ForgotPasswordNew}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/teamlist"
                        component={TeacherTeamList}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/create-team"
                        component={TeacherCreateTeam}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/pre-survey"
                        component={TeacherPreservey}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/edit-team"
                        component={TeacherEditTeam}
                    />
                    {/* Team member */}
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/view-team-member"
                        component={TeacherViewTeamMember}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/create-team-member/:id/:count"
                        component={TeacherTeamMember}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/edit-team-member"
                        component={TeacherEditTeamMember}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/playvideo/:id"
                        component={TeacherPlayVideo}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/EditTeacherProfile"
                        component={TeacherEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/my-profile"
                        component={TeacherMyProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/change-password"
                        component={ChangePSWModal}
                    />
                    {/* support journey */}
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/support-journey"
                        component={TeacherSupport}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/support-journey/add-ticket"
                        component={TeacherSupportAdd}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/support-journey/ans-ticket"
                        component={TeacherSupportAnswer}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/support-journey/ans-ticket"
                        component={TicketResView}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="STUDENT"
                        path="/student/pre-survey"
                        component={StudentPreservey}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="STUDENT"
                        path="/student/post-survey"
                        component={StudentPostservey}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/post-survey"
                        component={TeacherPostservey}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="MENTOR"
                        path="/teacher/my-certificate"
                        component={MyCertificate}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="STUDENT"
                        path="/student/my-certificate"
                        component={StudentCertificate}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/register-edit-schools"
                        user="ADMIN"
                        component={EditSchool}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/translation"
                        component={Translation}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/create-evaluationProcess"
                        component={CreateEvalProcess}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/edit-evaluationProcess"
                        component={EditEvalProcess}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/selectingDistricts-evaluationProcess"
                        component={SelDistricts}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/edit-translation"
                        component={EditTranslation}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="ADMIN"
                        path="/admin/create-translation"
                        component={CreateTranslation}
                    />

                    {/* evaluator routes */}
                    <Route
                        exact={true}
                        path="/evaluator"
                        render={() => <LoginEvaluator />}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EVALUATOR"
                        path="/evaluator/dashboard"
                        component={EvaluatorDashboard}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EVALUATOR"
                        path="/evaluator/change-password"
                        component={EvaluatorChangePassword}
                    />
                    <Route
                        exact={true}
                        path="/evaluator/forgotpassword"
                        component={EvaluatorForgotPassword}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EVALUATOR"
                        path="/evaluator/submitted-ideas"
                        component={EvaluatorIdeaList}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EVALUATOR"
                        path="/evaluator2/submitted-ideas"
                        component={NextLevelIdeas}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="EVALUATOR"
                        path="/evaluator/instructions"
                        component={EvaluatorInstructions}
                    />

                    <ProtectedRoute
                        exact={true}
                        user="EVALUATOR"
                        path="/evaluator/evaluated-ideas"
                        component={EvaluatedIdea}
                    />
                    <Route
                        exact={true}
                        path="/eadmin"
                        render={() => <EvalutorAdminLogins />}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EADMIN"
                        path="/eadmin/dashboard"
                        component={Eadmindashboard}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EADMIN"
                        path="/eadmin/change-password"
                        component={EadminChangePassword}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EADMIN"
                        path="/eadmin/listofideas"
                        component={ListOfIdeas}
                    />
                    <ProtectedRoute
                        exact={true}
                        user="EADMIN"
                        path="/eadmin/listofFinalideas"
                        component={ListOfFinalIdeas}
                    />
                    <Route component={PageNotFound} path="*" />
                </Switch>
            </Router>
        </>
    );
};

export default Routers;
