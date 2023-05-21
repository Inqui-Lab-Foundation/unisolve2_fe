import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
    // useHistory
} from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { createBrowserHistory, createHashHistory } from "history";

import { ProtectedRoute } from './helpers/authHelper';

import Dashboard from './Student/Pages/Dashboard/index';
import BadgesComp from './Student/Pages/Badges/Badges';
import Ideas from './Student/Pages/Ideas';
import StudenetChangePSWModal from './Student/Pages/ChangePS';
import './i18n';
// import SignUpNew from './Student/Pages/SignUpNew';
import LoginNew from './Student/Pages/LoginNew';
import CreateNewPassword from './Student/Pages/CreateNewPassword';
import PasswordEmailConfirmation from './Student/Pages/PasswordEmailConfirmation';
import ForgotPassword from './Student/Pages/ForgotPassword';

import MySettings from './Student/Pages/MySettings';
import EditPersonalDetails from './Student/Pages/EditPersonalDetails';
import MyProfile from './Student/Pages/MyProfile';
// import { getCurrentUser } from './helpers/Utils';
import Courses from './Student/Pages/Courses';
import CourseView from './Student/Pages/Courses/coursesView';
import PlayVideoCourses from './Student/Pages/Courses/PlayVideo';
import Notification from './Student/Pages/Notification';
import SampleCourseList from './Student/Pages/SampleCourseList';
import FaqPage from './Student/Pages/HelpPages/FaqPage';
import TicketsPage from './Student/Pages/HelpPages/Ticket';
import NewTicket from './Student/Pages/HelpPages/NewTicket';
import DiscussionForum from './Student/Pages/DiscussionForum';
import QuerySection from './Student/Pages/DiscussionForum/QuerySection';
import TeamMentorsPage from './Student/Pages/TeamsMentors';
import TeamMemberPage from './Student/Pages/TeamsMentors/TeamMember';
import AddNewMember from './Student/Pages/TeamsMentors/AddNewMember';
import EditMember from './Student/Pages/TeamsMentors/EditMember';
// import IdeasPage from './Student/Pages/Ideas/IdeasPage';
import IdeasPageNew from './Student/Pages/Ideas/IdeaSubmission';
import SDG from './Student/Pages/Ideas/SDG';
import SubmittedIdeas from './Student/Pages/Ideas/SubmittedIdeas';
import TicketViewDetails from './Student/Pages/HelpPages/TicketViewDetails';
// ADMIN ROUTES
import AdminLogin from './Admin/LoginNew';
import AdminDashboard from './Admin/Dashboard/index';
import ViewMore from './Admin/Dashboard/ViewMore';
import AdminMyProfile from './Admin/MyProfile';
import AdminMySettings from './Admin/MySettings';
import AdminChallenges from './Admin/Challenges/ViewSelectedChallenges';
import AdminEvaluation from './Admin/Evaluation/index';
import AdminEvaluationProcess from './Admin/EvalProcess/index';
import Selectedlist from './Admin/Evaluation/ViewSelectedIdea/ViewSelectedideas';
import Selectedfinallist from './Admin/Evaluation/FinalResults/ViewFinalSelectedideas';
import AdminForgotPassword from './Admin/ForgotPassword';
import AdminNotification from './Admin/Notification';
import AdminUserList from './Admin/UserList/Ticket';
import AdminAddMentor from './Admin/UserList/AddNewMentor';
import CommonUserProfile from './Admin/UserList/CommonUserProfile';
import CommonUserProfileEdit from './Admin/UserList/EditProfile';
import AdminEvaluator from './Admin/UserList/AddNewEvaluator';
import EditEvaluator from './Admin/UserList/EditNewEvaluator';
import AdminEditPersonalDetails from './Admin/EditPersonalDetails';
import AdminFaqByCategory from './Admin/FAQ/FaqByCategory';
import AddNewFaq from './Admin/FAQ/AddNewFaq';
import EditFaq from './Admin/FAQ/EditFaq';
import EditFaqCate from './Admin/FAQ/EditFaqCategory';
import AddNewFaqCategory from './Admin/FAQ/AddNewFaqCategory';
import AdminTickets from './Admin/Tickets/Ticket';
// import AdminTicketsViewDetails from "./Admin/Tickets/TicketsCard";
import AdminAllSchools from './Admin/Schools/Ticket';
import AddNewSchool from './Admin/Schools/AddNewSchool';
import Reports from './Admin/Reports';
import IndividualReport from './Admin/Reports/ReportFilter';
import StudentSignup from './Admin/StudentSignup';
// import Home from './home/home';
// import Terms from './home/termsandconditions';
import AdminChallengesComp from './Admin/Badges/Badges';
import StudentPostservey from './Student/PostSurvey/PostSurvey';
import TeacherPostservey from './Teachers/PostSurvey/PostSurvey';
// import TeacherPostservey from './Teachers/PostSurvey/PostSurveyStatic';
// const hashHistory = createHashHistory();.

// TEACHER ROUTES
import TeacherLogin from './Teachers/LoginNew';
import TeacherDashboard from './Teachers/Dashboard/index';
import TeacherMySettings from './Teachers/MySettings';

import TeacherFaqPage from './Teachers/HelpPages/FaqPage';

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
//import IdeasubmissionunderCOn from './Student/Ideasubsaticundercon';
// import DummyStuMyCer from './Student/DummyStudentMyCertificate';

import EditSchool from './Admin/Schools/EditSchool';

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
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Routers = () => {
    // const history = useHistory();
    // const currentUser = getCurrentUser('current_user');
    // if (currentUser && currentUser?.data[0]?.role === 'ADMIN') {
    //     history.push('/admin/dashboard');
    // } else if (currentUser && currentUser?.data[0]?.role === 'STUDENT') {
    //     history.push('/dashboard');
    // } else if (currentUser && currentUser?.data[0]?.role === 'TEACHER') {
    //     history.push('/teacher/dashboard');
    // }
    // if (currentUser) {
    //   // history.push("/admin/dashboard");
    //   // } else {
    //   //   history.push("/admin");
    // }

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
                        path="/forgotpassword"
                        render={() => <ForgotPassword />}
                    />
                    <Route
                        exact
                        path="/create-password"
                        render={() => <CreateNewPassword />}
                    />
                    <Route
                        exact
                        path="/confirm-password"
                        render={() => <PasswordEmailConfirmation />}
                    />
                    <Route
                        exact
                        path="/verifypassword"
                        render={() => <PasswordEmailConfirmation />}
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
                        //component={IdeasubmissionunderCOn}
                    />
                    <ProtectedRoute
                        exact
                        path="/challenge-initiation"
                        component={SDG}
                    />
                    <ProtectedRoute path="/ideasPage" component={Ideas} />
                    <ProtectedRoute
                        path="/submittedIdeas"
                        component={SubmittedIdeas}
                    />
                    <ProtectedRoute
                        exact
                        path="/badges"
                        component={BadgesComp}
                    />
                    <ProtectedRoute
                        exact
                        path="/teams"
                        component={TeamMentorsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/teams/member"
                        component={TeamMemberPage}
                    />
                    <ProtectedRoute exact path="/courses" component={Courses} />
                    <ProtectedRoute
                        exact
                        path="/coursesView"
                        component={CourseView}
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
                    <ProtectedRoute
                        exact
                        path="/settings"
                        component={MySettings}
                    />
                    <ProtectedRoute exact path="/faq" component={FaqPage} />
                    <ProtectedRoute
                        exact
                        path="/tickets"
                        component={TicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/viewTicketDetails"
                        component={TicketViewDetails}
                    />
                    <ProtectedRoute path="/NewTicket" component={NewTicket} />
                    <ProtectedRoute
                        path="/discussionForum"
                        component={DiscussionForum}
                    />
                    <ProtectedRoute
                        path="/querySection"
                        component={QuerySection}
                    />
                    <ProtectedRoute
                        path="/addNewMember"
                        component={AddNewMember}
                    />
                    <ProtectedRoute path="/editMember" component={EditMember} />

                    <ProtectedRoute
                        exact
                        path="/my-profile"
                        component={MyProfile}
                    />
                    <ProtectedRoute
                        exact
                        path="/edit-details"
                        component={EditPersonalDetails}
                    />
                    <Route
                        exact
                        path="/samplelist"
                        component={SampleCourseList}
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
                        path="/admin/edit-profile"
                        component={AdminEditPersonalDetails}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/settings"
                        component={AdminMySettings}
                    />

                    {/* <Route
            exact={true}
            path='/admin/tickets'
            component={AdminTicketsPage}
          /> */}
                    <ProtectedRoute
                        exact={true}
                        path="/admin/badges"
                        component={AdminChallengesComp}
                    />
                    <Route
                        exact={true}
                        path="/admin/forgotpassword"
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
                        path="/admin/notifications"
                        component={AdminNotification}
                    />

                    <ProtectedRoute
                        exact={true}
                        path="/admin/add-mentor"
                        component={AdminAddMentor}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/add-evaluator"
                        component={AdminEvaluator}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/edit-evaluator"
                        component={EditEvaluator}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/faq"
                        // component={AdminFaq}
                        component={AdminFaqByCategory}
                    />
                    {/* <ProtectedRoute
                        exact={true}
                        path="/admin/faq-by-category"
                        component={AdminFaqByCategory}
                    /> */}
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
                        path="/admin/edit-faqcategory"
                        component={EditFaqCate}
                    />
                    <ProtectedRoute
                        exact={true}
                        path="/admin/add-new-faq-category"
                        component={AddNewFaqCategory}
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
                        path="/admin/signup"
                        component={StudentSignup}
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
                        path="/teacher/settings"
                        component={TeacherMySettings}
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
