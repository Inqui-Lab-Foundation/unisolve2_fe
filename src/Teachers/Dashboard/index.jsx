/* eslint-disable indent */
import React, { useEffect, useLayoutEffect } from 'react';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
//import VerticalLinearStepper from './StepperComponent';
// import Charts from './Chart';
// import BarChart from './BarChart';
import { getCurrentUser } from '../../helpers/Utils';
import institutions from '../../assets/media/img/university.png';
import districtImg from '../../assets/media/img/building.png';
import idea from '../../assets/media/img/idea.png';
import people from '../../assets/media/img/people.png';
import Layout from '../Layout';
import { useDispatch } from 'react-redux';
import { getDashboardStates } from '../store/dashboard/actions';
import DoubleBounce from '../../components/Loaders/DoubleBounce';
import DoughnutChart from './DoughnutChart';

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
        dispatch(getDashboardStates(currentUser?.data[0]?.user_id));
    }, [dispatch, currentUser?.data[0]?.user_id]);
    // here in  Dashboard we can see all details of teacher //
    // like  school name , district , no of ideas , no of teams //
    return (
        <Layout>
            <Container className="dashboard pb-5 my-5 px-5">
                <h2 className="mb-5">Dashboard </h2>
                <Row className="teacher-statistics bg-white p-5 mb-5">
                    <Row className="">
                        {!dashboardStates ? (
                            <div style={{ width: '10rem', margin: 'auto' }}>
                                <DoubleBounce />
                            </div>
                        ) : (
                            <div className="card-wrapper">
                                <div className="row row-gap">
                                    <div className="card border-top-blue col-md-3">
                                        <div className="d-flex">
                                            <img
                                                src={institutions}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <p className="color-blue fs-600 my-0 text-wrapped">
                                                    {dashboardStates &&
                                                    dashboardStates?.organization
                                                        ? dashboardStates
                                                              ?.organization
                                                              ?.organization_name
                                                        : '-'}
                                                </p>
                                                <small>School Name</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-top-green col-md-3">
                                        <div className="d-flex">
                                            <img
                                                src={districtImg}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <span className="color-green fs-600">
                                                    {dashboardStates &&
                                                    dashboardStates?.organization
                                                        ? dashboardStates
                                                              ?.organization
                                                              ?.district
                                                        : '-'}
                                                </span>
                                                <small>District</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-top-yellow col-md-3  ">
                                        <div className="d-flex">
                                            <img
                                                src={idea}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <span className="color-yellow fs-700">
                                                    {dashboardStates &&
                                                    dashboardStates?.ideas_count
                                                        ? dashboardStates?.ideas_count
                                                        : 0}
                                                </span>
                                                <small>Number Of Ideas</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border-top-dark-blue col-md-3  ">
                                        <div className="d-flex">
                                            <img
                                                src={people}
                                                alt="institutions"
                                                className="mx-4"
                                            />
                                            <div className="common-flex flex-column">
                                                <span className="color-dark-blue fs-700">
                                                    {dashboardStates &&
                                                    dashboardStates?.teams_count
                                                        ? dashboardStates?.teams_count
                                                        : 0}
                                                </span>
                                                <small>Number Of Teams</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Row>
                </Row>
                <Row className="teacher-statistics bg-white p-5">
                    <Row className="">
                        <Col>
                            <div className="d-flex flex-wrap">
                                <DoughnutChart user={currentUser?.data} />
                                {/* <BarChart /> */}
                            </div>
                        </Col>
                        {/* <Col> */}
                        {/* <div className="teacher-progress">
                                teacher progress{' '}
                            </div> */}
                        {/* <div className="stepper">
                                <h2 className='mb-5'>Teacher Roadmap</h2>
                                <VerticalLinearStepper />
                            </div> */}
                        {/* </Col> */}
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};

export default Dashboard;
