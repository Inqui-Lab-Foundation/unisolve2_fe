import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './SupportingSCSS/Ideas/style.scss'
import './SupportingSCSS/Ideas.scss'
import './SupportingSCSS/TeamsMentors/style.scss'
import './SupportingSCSS/Courses/style.scss'
import { ProtectedRoute } from './helpers/authHelper'

import Dashboard from './Student/Pages/Dashboard/index'
import BadgesComp from './Student/Pages/Badges/Badges'
import StudenetChangePSWModal from './Student/Pages/ChangePS'
import './i18n'
import LoginNew from './Student/Pages/LoginNew'
import MyProfile from './Student/Pages/MyProfile'
import PlayVideoCourses from './Student/Pages/Courses/PlayVideo'
import FaqPage from './Student/Pages/HelpPages/FaqPage'
import IdeasPageNew from './Student/Pages/Ideas/IdeaSubmission'
import SDG from './Student/Pages/Ideas/SDG'
// ADMIN ROUTES
import AdminLogin from './Admin/LoginNew'
import AdminDashboard from './Admin/Dashboard/index'
import ViewMore from './Admin/Dashboard/ViewMore'
import AdminMyProfile from './Admin/MyProfile'
import AdminChallenges from './Admin/Challenges/ViewSelectedChallenges'
import AdminEvaluation from './Admin/Evaluation/index'
import AdminEvaluationProcess from './Admin/EvalProcess/index'
import Selectedlist from './Admin/Evaluation/ViewSelectedIdea/ViewSelectedideas'
import Selectedfinallist from './Admin/Evaluation/FinalResults/ViewFinalSelectedideas'
import AdminForgotPassword from './Admin/ForgotPassword'
import AdminUserList from './Admin/UserList/Ticket'
import CommonUserProfile from './Admin/UserList/CommonUserProfile'
import CommonUserProfileEdit from './Admin/UserList/EditProfile'
import AdminFaqByCategory from './Admin/FAQ/FaqByCategory'
import AddNewFaq from './Admin/FAQ/AddNewFaq'
import EditFaq from './Admin/FAQ/EditFaq'
import AdminTickets from './Admin/Tickets/Ticket'
import AdminAllSchools from './Admin/Schools/Ticket'
import AddNewSchool from './Admin/Schools/AddNewSchool'
import Reports from './Admin/Reports'
import IndividualReport from './Admin/Reports/ReportFilter'
import AdminChallengesComp from './Admin/Badges/Badges'
import StudentPostservey from './Student/PostSurvey/PostSurvey'
import TeacherPostservey from './Teachers/PostSurvey/PostSurvey'

// TEACHER ROUTES
import TeacherLogin from './Teachers/LoginNew'
import TeacherDashboard from './Teachers/Dashboard/index'

import TeacherFaqPage from './Teachers/HelpPages/FaqPage'

import TeacherTeamList from './Teachers/Teams/Ticket'
import TeacherCreateTeam from './Teachers/Teams/CreateTeam'
import TeacherPreservey from './Teachers/PreSurvey/PreSurvey'
import StudentPreservey from './Student/PreSurvey/PreSurvey'
import StudentCertificate from './Student/Pages/Certificate/MyCertificate'
import TeacherEditTeam from './Teachers/Teams/EditTeam'
import TeacherTeamMember from './Teachers/Teams/CreateTeamMember'
import TeacherViewTeamMember from './Teachers/Teams/ViewTeamMember'
import TeacherEditTeamMember from './Teachers/Teams/EditTeamMember'
import TeacherPlayVideo from './Teachers/Courses/TeacherPlayVideo'
import TeacherMyProfile from './Teachers/MyProfile'

import TeacherSupport from './Teachers/SupportJourney/Ticket'
import TeacherSupportAdd from './Teachers/SupportJourney/AddNewTicket'
import TeacherSupportAnswer from './Teachers/SupportJourney/TicketResponse'
import MyCertificate from './Teachers/Certificate/MyCertificate'
import PageNotFound from '../src/PageNotFound'
import ChangePSWModal from './Teachers/ChangePSWModal'
import Translation from './Admin/Translation/Translation'
import EditTranslation from './Admin/Translation/EditTranslation'
import CreateTranslation from './Admin/Translation/CreateTranslation'

import EditSchool from './Admin/Schools/EditSchool'

// evaluator routes
import LoginEvaluator from './Evaluator/LoginEvaluator'
import EvaluatorDashboard from './Evaluator/Dashboard/index'
import EvaluatorChangePassword from './Evaluator/ChangePSWModal'
import EvaluatorForgotPassword from './Evaluator/ForgotPassword'
import EvaluatorIdeaList from './Evaluator/IdeaList/IdeaList'

import EvaluatorInstructions from './Evaluator/Instructions/Instructions'
import EvaluatedIdea from './Evaluator/EvaluatedIdea/EvaluatedIdea'

import EvalutorAdminLogins from './Evaluator/Admin/EvaluatorAdminLogin'
import Eadmindashboard from './Evaluator/Admin/Dashboard/EAdminDashboard'
import EadminChangePassword from './Evaluator/Admin/Pages/ChangePSWModal'
import ListOfIdeas from './Evaluator/Admin/ViewTable/ViewSelectedIdea'
import ListOfFinalIdeas from './Evaluator/Admin/FinalResulteadmin/ViewFinalSelectedideas'
import TicketResView from './Admin/Tickets/TicketResView'
import EditEvalProcess from './Admin/EvalProcess/EditEvalProcess'
import SelDistricts from './Admin/EvalProcess/SelectingDistricts'
import CreateEvalProcess from './Admin/EvalProcess/CreateEvalProcess'
import ReportsView from './Admin/Reports/Helpers/ReportsView'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const Routers = () => {
  return (
    <>
      <Router>
        <Switch>
          <Redirect exact from='/' to='/teacher' />
          {/* <Routes> */}
          <Route exact path='/login' render={() => <LoginNew />} />
          <ProtectedRoute
            exact
            path='/dashboard'
            component={Dashboard}
          />
          <ProtectedRoute exact path='/about' component={Dashboard} />
          <ProtectedRoute
            exact
            path='/challenges'
            component={IdeasPageNew}
          />
          <ProtectedRoute
            exact
            path='/challenge-initiation'
            component={SDG}
          />
          <ProtectedRoute
            exact
            path='/badges'
            component={BadgesComp}
          />
          <ProtectedRoute
            exact
            path='/playCourse/:id'
            component={PlayVideoCourses}
          />
          <ProtectedRoute
            exact
            path='/notification'
            component={Notification}
          />
          <ProtectedRoute exact path='/faq' component={FaqPage} />
          <ProtectedRoute
            exact
            path='/my-profile'
            component={MyProfile}
          />
          {/* ADMIN ROUTES */}
          <Route exact path='/admin' render={() => <AdminLogin />} />
          <ProtectedRoute
            exact
            path='/admin/dashboard'
            component={AdminDashboard}
          />
          <ProtectedRoute
            exact
            path='/admin/my-profile'
            component={AdminMyProfile}
          />
          <ProtectedRoute
            exact
            path='/admin/badges'
            component={AdminChallengesComp}
          />
          <Route
            exact
            path='/admin/forgotpassword'
            component={AdminForgotPassword}
          />
          <ProtectedRoute
            exact
            path='/admin/userlist'
            component={AdminUserList}
          />
          <ProtectedRoute
            exact
            path='/admin/userprofile'
            component={CommonUserProfile}
          />
          {/* CommonUserProfileEdit */}
          <ProtectedRoute
            exact
            path='/admin/edit-user-profile'
            component={CommonUserProfileEdit}
          />
          <ProtectedRoute
            exact
            path='/admin/faq'
            component={AdminFaqByCategory}
          />
          <ProtectedRoute
            exact
            path='/admin/New-faq'
            component={AddNewFaq}
          />
          <ProtectedRoute
            exact
            path='/admin/edit-faq/:faqid'
            component={EditFaq}
          />
          <ProtectedRoute
            exact
            path='/admin/all-tickets'
            component={AdminTickets}
          />
          <ProtectedRoute
            exact
            path='/admin/tickets'
            component={AdminTickets}
          />
          <ProtectedRoute
            exact
            path='/admin/registered-schools'
            component={AdminAllSchools}
          />
          <ProtectedRoute
            exact
            path='/admin/View-More-details'
            component={ViewMore}
          />
          <ProtectedRoute
            exact
            path='/admin/register-new-schools'
            component={AddNewSchool}
          />
          <ProtectedRoute
            exact
            path='/admin/challenges'
            component={AdminChallenges}
          />

          <ProtectedRoute
            exact
            path='/admin/evaluationStatus'
            component={AdminEvaluation}
          />

          <ProtectedRoute
            exact
            path='/admin/evaluationStatus/viewlist'
            component={Selectedlist}
          />
          <ProtectedRoute
            exact
            path='/admin/evaluationStatus/viewfinallist'
            component={Selectedfinallist}
          />
          <ProtectedRoute
            exact
            path='/admin/evaluationProcess'
            component={AdminEvaluationProcess}
          />
          <ProtectedRoute
            exact
            path='/admin/reports'
            component={Reports}
          />
          <ProtectedRoute
            exact
            path='/admin/selected-report'
            component={IndividualReport}
          />
          <ProtectedRoute
            exact
            path='/admin/reports-view'
            component={ReportsView}
          />

          <ProtectedRoute
            exact
            path='/change-password'
            component={StudenetChangePSWModal}
          />

          {/* TEACHERS ROUTES */}
          <Route
            exact
            path='/teacher'
            render={() => <TeacherLogin />}
          />
          <ProtectedRoute
            exact
            path='/teacher/dashboard'
            component={TeacherDashboard}
          />

          <ProtectedRoute
            exact
            path='/teacher/faq'
            component={TeacherFaqPage}
          />
          <ProtectedRoute
            exact
            path='/teacher/teamlist'
            component={TeacherTeamList}
          />
          <ProtectedRoute
            exact
            path='/teacher/create-team'
            component={TeacherCreateTeam}
          />
          <ProtectedRoute
            exact
            path='/teacher/pre-survey'
            component={TeacherPreservey}
          />
          <ProtectedRoute
            exact
            path='/teacher/edit-team'
            component={TeacherEditTeam}
          />
          {/* Team member */}
          <ProtectedRoute
            exact
            path='/teacher/view-team-member'
            component={TeacherViewTeamMember}
          />
          <ProtectedRoute
            exact
            path='/teacher/create-team-member/:id/:count'
            component={TeacherTeamMember}
          />
          <ProtectedRoute
            exact
            path='/teacher/edit-team-member'
            component={TeacherEditTeamMember}
          />
          <ProtectedRoute
            exact
            path='/teacher/playvideo/:id'
            component={TeacherPlayVideo}
          />
          <ProtectedRoute
            exact
            path='/teacher/my-profile'
            component={TeacherMyProfile}
          />
          <ProtectedRoute
            exact
            path='/teacher/change-password'
            component={ChangePSWModal}
          />
          {/* support journey */}
          <ProtectedRoute
            exact
            path='/teacher/support-journey'
            component={TeacherSupport}
          />
          <ProtectedRoute
            exact
            path='/teacher/support-journey/add-ticket'
            component={TeacherSupportAdd}
          />

          <ProtectedRoute
            exact
            path='/teacher/support-journey/ans-ticket'
            component={TeacherSupportAnswer}
          />
          <ProtectedRoute
            exact
            path='/admin/support-journey/ans-ticket'
            component={TicketResView}
          />

          <ProtectedRoute
            exact
            path='/student/pre-survey'
            component={StudentPreservey}
          />

          <ProtectedRoute
            exact
            path='/student/post-survey'
            component={StudentPostservey}
          />

          <ProtectedRoute
            exact
            path='/teacher/post-survey'
            component={TeacherPostservey}
          />
          <ProtectedRoute
            exact
            path='/teacher/my-certificate'
            component={MyCertificate}
          />

          <ProtectedRoute
            exact
            path='/student/my-certificate'
            component={StudentCertificate}
          />
          <ProtectedRoute
            exact
            path='/admin/register-edit-schools'
            component={EditSchool}
          />
          <ProtectedRoute
            exact
            path='/admin/translation'
            component={Translation}
          />
          <ProtectedRoute
            exact
            path='/admin/create-evaluationProcess'
            component={CreateEvalProcess}
          />
          <ProtectedRoute
            exact
            path='/admin/edit-evaluationProcess'
            component={EditEvalProcess}
          />
          <ProtectedRoute
            exact
            path='/admin/selectingDistricts-evaluationProcess'
            component={SelDistricts}
          />
          <ProtectedRoute
            exact
            path='/admin/edit-translation'
            component={EditTranslation}
          />
          <ProtectedRoute
            exact
            path='/admin/create-translation'
            component={CreateTranslation}
          />

          {/* evaluator routes */}
          <Route
            exact
            path='/evaluator'
            render={() => <LoginEvaluator />}
          />
          <ProtectedRoute
            exact
            path='/evaluator/dashboard'
            component={EvaluatorDashboard}
          />
          <ProtectedRoute
            exact
            path='/evaluator/change-password'
            component={EvaluatorChangePassword}
          />
          <Route
            exact
            path='/evaluator/forgotpassword'
            component={EvaluatorForgotPassword}
          />
          <ProtectedRoute
            exact
            path='/evaluator/submitted-ideas'
            component={EvaluatorIdeaList}
          />

          <ProtectedRoute
            exact
            path='/evaluator/instructions'
            component={EvaluatorInstructions}
          />

          <ProtectedRoute
            exact
            path='/evaluator/evaluated-ideas'
            component={EvaluatedIdea}
          />
          <Route
            exact
            path='/eadmin'
            render={() => <EvalutorAdminLogins />}
          />
          <ProtectedRoute
            exact
            path='/eadmin/dashboard'
            component={Eadmindashboard}
          />
          <ProtectedRoute
            exact
            path='/eadmin/change-password'
            component={EadminChangePassword}
          />
          <ProtectedRoute
            exact
            path='/eadmin/listofideas'
            component={ListOfIdeas}
          />
          <ProtectedRoute
            exact
            path='/eadmin/listofFinalideas'
            component={ListOfFinalIdeas}
          />
          <Route component={PageNotFound} path='*' />
        </Switch>
      </Router>
    </>
  )
}

export default Routers
