/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Container, Row, CardBody, CardText } from 'reactstrap';
import { getCurrentUser } from '../../helpers/Utils';
import Layout from '../Layout';
import DoughnutChart from './DoughnutChart';
import LatestNewsNew from './LatestNewsNew';
import { Card } from 'react-bootstrap';
import axios from 'axios';
const Dashboard = () => {
    // here we can see teacher details //
    // details like school name ,district ,no of ideas , no of teams //
    const currentUser = getCurrentUser('current_user');
    const presurveyStatus = useSelector(
        (state) => state?.mentors.teacherPresurveyStatus
    );
    const history = useHistory();
    useLayoutEffect(() => {
        if (presurveyStatus !== 'COMPLETED')
            history.push('/teacher/pre-survey');
    }, []);

    useEffect(() => {
        if (currentUser?.data[0]?.user_id) {
            mentorTeamsCount();
            mentorIdeaCount();
            mentorStudentCount();
            mentorcoursepercentage();
        }
    }, [currentUser?.data[0]?.user_id]);
    // here in  Dashboard we can see all details of teacher //
    // like  school name , district , no of ideas , no of teams //
    const [teamsCount, setTeamsCount] = useState('-');
    const [ideaCount, setIdeaCount] = useState('-');
    const [studentCount, setStudentCount] = useState('-');
    const [coursepercentage, setCoursepercentage] = useState('-');

    const mentorTeamsCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/teamCount?mentor_id=${currentUser?.data[0]?.mentor_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamsCount(response.data.data[0].teams_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorIdeaCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/ideaCount?mentor_id=${currentUser?.data[0]?.mentor_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIdeaCount(response.data.data[0].idea_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorStudentCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/studentCount?mentor_id=${currentUser?.data[0]?.mentor_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setStudentCount(response.data.data[0].student_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const mentorcoursepercentage = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/mentorpercentage?user_id=${currentUser?.data[0]?.user_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    const per = Math.round(
                        (response.data.data[0].currentProgress /
                            response.data.data[0].totalProgress) *
                            100
                    );
                    setCoursepercentage(per);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const hi = false;
    return (
        <Layout>
            <Container>
                <h2 className="mb-5 ">
                    <strong>Dashboard</strong>
                </h2>

                <Row>
                    <Col style={{ paddingRight: '20px' }}>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
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
                                        {teamsCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4 card"
                                style={{ width: '350px' }}
                            >
                                <Card.Body>
                                    <label htmlFor="teams" className="cardbody">
                                        Course Complete
                                    </label>
                                    <Card.Text
                                        className="cardtext"
                                        style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {coursepercentage+'%'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
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
                                        {studentCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                className="mb-4"
                                style={{ width: '350px' }}
                            >
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
                                        {ideaCount}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>

                    <Col>
                        <Card bg="light" text="dark" className=" md-3 xs-12 ">
                            <Card.Body style={{ overflowX: 'auto' }}>
                                <LatestNewsNew usersdata={currentUser?.data} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

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
