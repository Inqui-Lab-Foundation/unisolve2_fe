/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useLayoutEffect } from 'react';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row, CardBody, CardText } from 'reactstrap';
import { getCurrentUser } from '../../helpers/Utils';
//import institutions from '../../assets/media/img/university.png';
import districtImg from '../../assets/media/img/building.png';
import idea from '../../assets/media/img/idea.png';
import people from '../../assets/media/img/people.png';
import Layout from '../Layout';
import { useDispatch } from 'react-redux';
import { getDashboardStates } from '../store/dashboard/actions';
import DoubleBounce from '../../components/Loaders/DoubleBounce';
import DoughnutChart from './DoughnutChart';
import LatestNewsNew from './LatestNewsNew';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Card } from 'react-bootstrap';
const Dashboard = () => {
    // here we can see teacher details //
    // details like school name ,district ,no of ideas , no of teams //
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const { dashboardStates } = useSelector((state) => state.teacherDashBoard);
    // here dashboardStates = {students_count, ideas_count, teams_count,organization_name,students_count,district,teams_count} //
    const presurveyStatus = useSelector(
        (state) => state?.mentors.teacherPresurveyStatus
    );
    const history = useHistory();
    useLayoutEffect(() => {
        if (presurveyStatus !== 'COMPLETED')
            history.push('/teacher/pre-survey');
    }, []);

    useEffect(() => {
        if(currentUser?.data[0]?.user_id){
            dispatch(getDashboardStates(currentUser?.data[0]?.user_id));
        }
    }, [dispatch, currentUser?.data[0]?.user_id]);
    // here in  Dashboard we can see all details of teacher //
    // like  school name , district , no of ideas , no of teams //

    //     return (
    //         <Layout>
    //             <Container className="dashboard pb-5 my-5 px-5">
    //             <h2 className="mb-5 "><strong>Dashboard</strong></h2>
    //                 <Row className="teacher-statistics p-5 mb-5">
    //                     {!dashboardStates ? (
    //                         <div style={{ width: '10rem', margin: 'auto' }}>
    //                             <DoubleBounce />
    //                         </div>
    //                     ) : (
    //                         <div className="card-wrapper">
    //                             <div style={{paddingRight:'2rem'}}>
    //                             <Col md="3">
    //                                <Row>
    //                                 <div>
    //                                 <div className="card border mb-4 mr-2">
    //                                         {/* <img
    //                                                 src={people}
    //                                                 alt="institutions"
    //                                                 className="mx-4"
    //                                             /> */}
    //                                         {/* <div className="common-flex flex-column"> */}
    //                                             <big>
    //                                                 {' '}
    //                                                 <b>Number Of Teams</b>
    //                                             </big>
    //                                             <p
    //                                                 style={{
    //                                                     fontSize: '48px',
    //                                                     fontWeight: 'bold',
    //                                                     marginTop: '10px',
    //                                                     marginBottom: '20px'
    //                                                 }}
    //                                             >
    //                                                 {dashboardStates &&
    //                                                 dashboardStates?.teams_count
    //                                                     ? dashboardStates?.teams_count
    //                                                     : 0}
    //                                             </p>
    //                                         {/* </div> */}
    //                                     </div>
    //                                </div>
    //                                <div>
    //                                 <div className="card border mb-4 mr-2">
    //                                         {/* <img
    //                                                     src={CourseCompletedIcon}
    //                                                     alt="CoursesCompleted"
    //                                                     className="mx-4"
    //                                                 /> */}
    //                                         {/* <div className="common-flex flex-column"> */}
    //                                             <big>
    //                                                 {' '}
    //                                                 <b>Course Complete</b>
    //                                             </big>
    //                                             <p
    //                                                 style={{
    //                                                     fontSize: '48px',
    //                                                     fontWeight: 'bold',
    //                                                     marginTop: '10px',
    //                                                    // marginBottom: '20px'
    //                                                 }}
    //                                             >
    //                                                 {dashboardStates &&
    //                                                 dashboardStates?.course_completed_count !==
    //                                                     undefined
    //                                                     ? `${
    //                                                           (dashboardStates?.course_completed_count /
    //                                                               8) *
    //                                                           100
    //                                                       }%`
    //                                                     : '-'}
    //                                             </p>
    //                                         {/* </div> */}
    //                                     </div>
    //                                     </div>
    //                                 </Row>
    //                                 </Col>
    //                                 </div>
    //                                 <div>
    //                                 <Col md="3">
    //                                 <Row >
    //                                     <div>
    //                                 <div className="card border mb-4 mr-2">
    //                                         {/* <img
    //                                                 src={districtImg}
    //                                                 alt="institutions"
    //                                                 className="mx-4"
    //                                             /> */}
    //                                         {/* <div className="common-flex flex-column"> */}
    //                                             <big>
    //                                                 {' '}
    //                                                 <b>Total no of Students</b>
    //                                             </big>
    //                                             <p
    //                                                 style={{
    //                                                     fontSize: '48px',
    //                                                     fontWeight: 'bold',
    //                                                     marginTop: '10px',
    //                                                     marginBottom: '20px'
    //                                                 }}
    //                                             >
    //                                                 {dashboardStates &&
    //                                                 dashboardStates.students_count
    //                                                     ? dashboardStates.students_count
    //                                                     : '-'}
    //                                             </p>
    //                                         {/* </div> */}
    //                                     </div>
    //                                </div>
    //                                <div>
    //                                 <div className="card border mb-4 mr-2">
    //                                         {/* <img
    //                                                 src={idea}
    //                                                 alt="institutions"
    //                                                 className="mx-4"
    //                                             /> */}
    //                                         {/* <div className="common-flex flex-column"> */}
    //                                             <big>
    //                                                 {' '}
    //                                                 <b>Number Of Ideas</b>
    //                                             </big>
    //                                             <p
    //                                             className="left-aligned"
    //                                                 style={{
    //                                                     fontSize: '48px',
    //                                                     fontWeight: 'bold',
    //                                                     marginTop: '10px',
    //                                                     marginBottom: '20px'
    //                                                 }}
    //                                             >
    //                                                 {dashboardStates &&
    //                                                 dashboardStates?.ideas_count
    //                                                     ? dashboardStates?.ideas_count
    //                                                     : 0}
    //                                             </p>
    //                                         {/* </div> */}
    //                                     </div>
    //                                     </div>
    //                                 </Row>
    //                             </Col>
    //                             </div>
    //                             <div>

    //                             <Row md="6" style={{}}>

    //                                 <LatestNewsNew usersdata={currentUser?.data} />

    //                                 </Row>

    //                             </div>
    //                             </div>
    //           )}
    //                 </Row>
    //                 <Row className="teacher-statistics">
    //                     <Row className="">
    //                         <Col>
    //                             <div className="d-flex flex-wrap">
    //                                 <DoughnutChart user={currentUser?.data} />
    //                             </div>
    //                         </Col>
    //                     </Row>
    //                 </Row>
    //             </Container>
    //         </Layout>
    //     );
    // };
    return (
        <Layout>
            <Container>
                <h2 className="mb-5 ">
                    <strong>Dashboard</strong>
                </h2>
                {!dashboardStates ? (
                    <div style={{ width: '10rem', margin: 'auto' }}>
                        <DoubleBounce />
                    </div>
                ) : (
                    <Row>
                        <Col style={{ paddingRight: '20px' }}>
                            <Row>
                                <Card bg="light" text="dark" className="mb-4">
                                    <Card.Body>
                                        <label htmlFor="teams" className="">
                                            Number of Teams
                                        </label>

                                        <Card.Text
                                            style={{
                                                fontSize: '48px',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {dashboardStates &&
                                            dashboardStates?.teams_count
                                                ? dashboardStates?.teams_count
                                                : 0}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Card bg="light" text="dark" className="mb-4">
                                    <Card.Body>
                                        <label htmlFor="teams" className="">
                                            Course Complete
                                        </label>
                                        <Card.Text
                                            style={{
                                                fontSize: '48px',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {dashboardStates &&
                                            dashboardStates?.course_completed_count !==
                                                undefined
                                                ? `${
                                                      (dashboardStates?.course_completed_count /
                                                      dashboardStates?.Total_course_count) *
                                                      100
                                                  }%`
                                                : '-'}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Card bg="light" text="dark" className="mb-4">
                                    <Card.Body>
                                        <label htmlFor="teams" className="">
                                            Total Students
                                        </label>
                                        <Card.Text
                                            style={{
                                                fontSize: '48px',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {dashboardStates &&
                                            dashboardStates.students_count
                                                ? dashboardStates.students_count
                                                : '-'}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row>
                                <Card bg="light" text="dark" className="mb-4">
                                    <Card.Body>
                                        <label htmlFor="teams" className="">
                                            Number of Ideas
                                        </label>

                                        <Card.Text
                                            className="left-aligned"
                                            style={{
                                                fontSize: '48px',
                                                fontWeight: 'bold',
                                                marginTop: '10px',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {dashboardStates &&
                                            dashboardStates?.ideas_count
                                                ? dashboardStates?.ideas_count
                                                : 0}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>

                        <Col>
                            <Card bg="light" text="dark" className=" md-3 xs-12 ">
                                <Card.Body style={{ overflowX: 'auto' }}>
                                    <LatestNewsNew
                                        usersdata={currentUser?.data}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                <Row className="teacher-statistics">
                    {' '}
                    <Row className="">
                        <Col>
                            <div className="d-flex flex-wrap">
                                <DoughnutChart user={currentUser?.data} />
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};
export default Dashboard;
