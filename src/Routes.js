/* eslint-disable no-unused-vars */
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

// import StudentResources from './Student/Resources';
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
// import AdminResources from './Admin/Resources/index';
// import AdminCreateResource from './Admin/Resources/createResource';
// import AdminEditResource from './Admin/Resources/editResource';
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
// TEACHER ROUTES
import TeacherLogin from './Teachers/LoginNew';
import TeacherDashboard from './Teachers/Dashboard/index';
import ForgotPasswordNew from './Teachers/ForgotPasswordNew';

import TeacherFaqPage from './Teachers/HelpPages/FaqPage';
// import TeacherResources from './Teachers/Resources/index';
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
import CourseStatus from './Admin/Reports/Helpers/CourseStatus';
//import ChallengesReport from './Admin/Reports/Helpers/ChallengesReport';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import RegisterNew from './Register/RegisterNew';
import SuccessPage from './Register/SuccessPage';
import LoginSchool from './School/LoginSchool';
import DashboardSchool from './School/Dashboard';
import SchoolChangePSWModal from './School/ChangePSWModal';

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
                        path="/school"
                        render={() => <LoginSchool />}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/school/dashboard"
                        component={DashboardSchool}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/school-changePassword"
                        component={SchoolChangePSWModal}
                    />

                    <ProtectedRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <ProtectedRoute exact path="/about" component={Dashboard} />
                    <ProtectedRoute
                        exact
                        path="/challenges"
                        component={IdeasPageNew}
                    />
                    <ProtectedRoute
                        exact
                        path="/challenge-initiation"
                        component={SDG}
                    />
                    <ProtectedRoute
                        exact
                        path="/badges"
                        component={BadgesComp}
                    />
                    <ProtectedRoute
                        exact
                        path="/playCourse/:id"
                        component={PlayVideoCourses}
                    />
                    <ProtectedRoute
                        exact
                        path="/notification"
                        component={Notification}
                    />
                    {/* <ProtectedRoute
                        exact
                        path="/student/Resources/index"
                        component={StudentResources}
                    /> */}
                    <ProtectedRoute exact path="/faq" component={FaqPage} />
                    <ProtectedRoute
                        exact
                        path="/my-profile"
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
                        path="/admin/dashboard"
                        component={AdminDashboard}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/my-profile"
                        component={AdminMyProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/badges"
                        component={AdminChallengesComp}
                    />
                    <Route
                        exact={true}
                        path="/admin/password"
                        component={AdminForgotPassword}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/userlist"
                        component={AdminUserList}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/userprofile"
                        component={CommonUserProfile}
                    />
                    {/* CommonUserProfileEdit */}
                    <ProtectedRoute
                        exact={true}
                        path="/admin/edit-user-profile"
                        component={CommonUserProfileEdit}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/faq"
                        component={AdminFaqByCategory}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/New-faq"
                        component={AddNewFaq}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/edit-faq/:faqid"
                        component={EditFaq}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/all-tickets"
                        component={AdminTickets}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/tickets"
                        component={AdminTickets}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/registered-schools"
                        component={AdminAllSchools}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/View-More-details"
                        component={ViewMore}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/register-new-schools"
                        component={AddNewSchool}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/challenges"
                        component={AdminChallenges}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/admin/evaluationStatus"
                        component={AdminEvaluation}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/admin/evaluationStatus/viewlist"
                        component={Selectedlist}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/evaluationStatus/viewfinallist"
                        component={Selectedfinallist}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/evaluationProcess"
                        component={AdminEvaluationProcess}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/reports"
                        component={Reports}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/selected-report"
                        component={IndividualReport}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/reports-view"
                        component={ReportsView}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/reports-registration"
                        component={ReportsRegistration}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/SurveyStatus"
                        component={SurveyStatus}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/CourseStatus"
                        component={CourseStatus}
                    />
                    {/*<ProtectedRoute
                        exact={true}
                        path="/admin/ChallengesReport"
                        component={ChallengesReport}
                />*/}

                    {/* <ProtectedRoute
                        exact={true}
                        path="/admin/Resources/index"
                        component={AdminResources}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/Resources/createResource"
                        component={AdminCreateResource}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/Resources/editResource"
                        component={AdminEditResource}
                    /> */}

                    <ProtectedRoute
                        exact={true}
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
                        component={TeacherDashboard}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/teacher/faq"
                        component={TeacherFaqPage}
                    />
                    <Route
                        exact={true}
                        path="/teacher/forgotpassword"
                        component={ForgotPasswordNew}
                    />

                    {/* <ProtectedRoute
                        exact={true}
                        path="/teacher/Resources/index"
                        component={TeacherResources}
                    /> */}
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/teamlist"
                        component={TeacherTeamList}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/create-team"
                        component={TeacherCreateTeam}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/pre-survey"
                        component={TeacherPreservey}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/edit-team"
                        component={TeacherEditTeam}
                    />
                    {/* Team member */}
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/view-team-member"
                        component={TeacherViewTeamMember}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/create-team-member/:id/:count"
                        component={TeacherTeamMember}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/edit-team-member"
                        component={TeacherEditTeamMember}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/playvideo/:id"
                        component={TeacherPlayVideo}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/EditTeacherProfile"
                        component={TeacherEditProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/my-profile"
                        component={TeacherMyProfile}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/change-password"
                        component={ChangePSWModal}
                    />
                    {/* support journey */}
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/support-journey"
                        component={TeacherSupport}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/support-journey/add-ticket"
                        component={TeacherSupportAdd}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/teacher/support-journey/ans-ticket"
                        component={TeacherSupportAnswer}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/support-journey/ans-ticket"
                        component={TicketResView}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/student/pre-survey"
                        component={StudentPreservey}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/student/post-survey"
                        component={StudentPostservey}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/teacher/post-survey"
                        component={TeacherPostservey}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/teacher/my-certificate"
                        component={MyCertificate}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/student/my-certificate"
                        component={StudentCertificate}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/register-edit-schools"
                        component={EditSchool}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/translation"
                        component={Translation}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/create-evaluationProcess"
                        component={CreateEvalProcess}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/edit-evaluationProcess"
                        component={EditEvalProcess}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/selectingDistricts-evaluationProcess"
                        component={SelDistricts}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/edit-translation"
                        component={EditTranslation}
                    />
                    <ProtectedRoute
                        exact={true}
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
                        path="/evaluator/dashboard"
                        component={EvaluatorDashboard}
                    />
                    <ProtectedRoute
                        exact={true}
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
                        path="/evaluator/submitted-ideas"
                        component={EvaluatorIdeaList}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/evaluator/instructions"
                        component={EvaluatorInstructions}
                    />

                    <ProtectedRoute
                        exact={true}
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
                        path="/eadmin/dashboard"
                        component={Eadmindashboard}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/eadmin/change-password"
                        component={EadminChangePassword}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/eadmin/listofideas"
                        component={ListOfIdeas}
                    />
                    <ProtectedRoute
                        exact={true}
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
