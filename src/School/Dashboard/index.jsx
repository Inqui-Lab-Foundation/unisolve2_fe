/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Layout from '../Layout';
import './dashboard.scss';
import { Col, Container, Row, CardBody, CardText } from 'reactstrap';
import axios from 'axios';
import { getCurrentUser, getNormalHeaders } from '../../helpers/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolByID } from '../../School/store/school/actions';
import { useHistory } from 'react-router-dom';
import { URL, KEY } from '../../constants/defaultValues';

import { Card } from 'react-bootstrap';
import TeacherLatestScroll from './TeacherLatestScroll';
import StudentLatestScroll from './StudentLatestScroll';

import DoughnutChart from '../../Teachers/Dashboard/DoughnutChart';

const DashboardSchool = (props) => {
    const [orgData, setOrgData] = useState({});
    const [mentorId, setMentorId] = useState('');
    const [userId, setUserId] = useState('');
    const [mentorTeam, setMentorTeam] = useState([]);
    const [mentorArrayId, setMentorArrayId] = useState([]);
    const [teamsCount, setTeamsCount] = useState('-');
    const [ideaCount, setIdeaCount] = useState('-');
    const [studentCount, setStudentCount] = useState('-');
    const [coursepercentage, setCoursepercentage] = useState('-');
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const school = useSelector((state) => state.school);
    // console.log(userId);
    // console.log(orgData);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (currentUser?.data[0]?.organization_id) {
            dispatch(getSchoolByID(currentUser?.data[0]?.organization_id));
        }
    }, [currentUser?.data[0]?.organization_id]);

    useEffect(() => {
        if (school.school.organization_code) {
            const body = JSON.stringify({
                organization_code: school.school.organization_code
            });
            var config = {
                method: 'post',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    '/organizations/checkOrg',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            };

            axios(config)
                .then(function (response) {
                    if (response.status == 200) {
                        setOrgData(response?.data?.data[0]);
                        setMentorId(response?.data?.data[0]?.mentor.mentor_id);
                        setUserId(response?.data?.data[0]?.mentor.user_id);
                        var array = [];
                        array.push({
                            mentor_id: response?.data?.data[0]?.mentor.mentor_id
                        });
                        setMentorArrayId(array);
                    }
                })
                .catch(function (error) {});
        }
    }, [school.school.organization_code]);

    useEffect(() => {
        if (mentorId) {
            mentorTeamsCount();
            mentorIdeaCount();
            mentorStudentCount();
            // mentorcoursepercentage();
        }
    }, [mentorId]);
    useEffect(() => {
        if (userId) {
            mentorcoursepercentage();
        }
    }, [userId]);

    const mentorTeamsCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/teamCount?mentor_id=${mentorId}`,
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
                `/dashboard/ideaCount?mentor_id=${mentorId}`,
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
                `/dashboard/studentCount?mentor_id=${mentorId}`,
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
                `/dashboard/mentorpercentage?user_id=${userId}`,
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

    // console.log(mentorArrayId);

    const hi = false;
    return (
        <Layout>
            <Container>
                <h2 className="mb-5  text-center mt-5">
                    <strong> School Dashboard</strong>
                </h2>
                <Row>
                    <Col style={{ paddingRight: '20px' }}>
                        <Row>
                            <Card
                                bg="light"
                                text="dark"
                                // className="mb-4"
                                className="md-3 xs-12 mb-4 "
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
                                // className="mb-4 card"
                                className="md-3 xs-12 mb-4 card"
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
                                        {coursepercentage + '%'}
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
                                // className="mb-4"
                                style={{ width: '350px' }}
                                className="md-3 xs-12 mb-4 "
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
                                // className="mb-4"
                                style={{ width: '350px' }}
                                className="md-3 xs-12 mb-4 "
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
                        <Card
                            bg="light"
                            text="dark"
                            className="md-3 xs-12 mb-5"
                        >
                            <Card.Body style={{ overflowX: 'auto' }}>
                                <TeacherLatestScroll
                                    usersdata={currentUser?.data}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            bg="light"
                            text="dark"
                            className=" md-3 xs-12 mb-5"
                        >
                            <Card.Body style={{ overflowX: 'auto' }}>
                                <StudentLatestScroll
                                    usersdata={currentUser?.data}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="teacher-statistics">
                    {' '}
                    <Row className="">
                        <Col>
                            <div className="d-flex flex-wrap">
                                {mentorArrayId.length > 0 && (
                                    <DoughnutChart user={mentorArrayId} />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};

export default DashboardSchool;
