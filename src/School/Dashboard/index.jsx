/* eslint-disable indent */
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
// import './style.css';
import DoughnutChart from '../../Teachers/Dashboard/DoughnutChart';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { array } from 'prop-types';
const DashboardSchool = (props) => {
    const [orgData, setOrgData] = useState({});
    const [mentorId, setMentorId] = useState('');
    const [userId, setUserId] = useState('');
    const [mentorTeam, setMentorTeam] = useState([]);
    const [mentorArrayId, setMentorArrayId] = useState([]);
    const [mentorData, setMentorData] = useState({});
    const [userData, setUserData] = useState({});
    const [course, setCourse] = useState([]);
    const [multiOrgData, setMultiOrgData] = useState({});
    const [table, setTable] = useState(false);

    const [teamsCount, setTeamsCount] = useState('-');
    const [ideaCount, setIdeaCount] = useState('-');
    const [count, setCount] = useState('-');
    const [studentCount, setStudentCount] = useState('-');
    const [coursepercentage, setCoursepercentage] = useState('-');
    const [score, setScore] = useState('-');
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const school = useSelector((state) => state.school);
    // console.log(school, 'school');
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (currentUser?.data[0]?.organization_id) {
            dispatch(getSchoolByID(currentUser?.data[0]?.organization_id));
        }
    }, [currentUser?.data[0]?.organization_id]);

    var teamId = [];
    teamId.push({
        mentor_id: mentorId,
        user_id: userId
    });
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

                        setCount(
                            response?.data?.data[0].mentor === null
                                ? 0
                                : response?.data?.data.length
                        );
                      
                        setMultiOrgData(response?.data?.data);
                        setMentorId(response?.data?.data?.mentor.mentor_id);

                        // setMentorData(response?.data?.data?.mentor);
                        // setUserData(response?.data?.data?.mentor?.user);
                        // setUserId(response?.data?.data?.mentor.user_id);
                        // var array = [];
                        // array.push({
                        //     mentor_id: response?.data?.data?.mentor.mentor_id,
                        //     user_id: response?.data?.data?.mentor.user_id
                        // });
                        // setMentorArrayId(array);
                    }
                })
                .catch(function (error) {});
        }
    }, [school.school.organization_code]);

    // console.log(userId, 'id');

    useEffect(() => {
        if (school.school.organization_code) {
            mentorTeamsCount();
            mentorIdeaCount();
            mentorStudentCount();
            // mentorcoursepercentage();
        }
    }, [school.school.organization_code]);
    // useEffect(() => {
    //     if (userId) {
    //         mentorcoursepercentage();
    //         mentorScore();
    //     }
    // }, [userId]);
    const handelSelectentor = (data) => {
        setOrgData(data);
        setMentorId(data.mentor.mentor_id);
        setUserId(data.mentor.user_id);
        setTable(true);
        mentorScore(data.mentor.user_id);
        mentorcoursepercentage(data.mentor.user_id);
        // teamId();
        // if (data.mentor.mentor_id) {
        //     mentorArrayId(array);
        //     // getMentorIdApi(data.mentor.mentor_id);
        // }
    };
    const MultipleMentorsData = {
        data: multiOrgData,
        columns: [
            {
                name: 'Mentor Name',
                selector: (row) => row?.mentor?.full_name,
                center: true
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div
                            key={params}
                            onClick={() => handelSelectentor(params)}
                        >
                            <div className="btn btn-primary btn-lg mr-5 mx-2">
                                view
                            </div>
                        </div>
                    ];
                },
                center: true
            }
        ]
    };
    const mentorTeamsCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/SchoolteamCount?organization_code=${school.school.organization_code}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamsCount(response.data.data[0].teamCount);
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
                `/dashboard/SchoolideaCount?organization_code=${school.school.organization_code}`,
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
                `/dashboard/SchoolStudentCount?organization_code=${school.school.organization_code}`,
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
    const mentorcoursepercentage = (id) => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/mentorpercentage?user_id=${id}`,
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
    // useEffect(() => {
    const mentorScore = (id) => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/quizscores?user_id=${id}&role=MENTOR`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    // setCourse(response.data.data);
                    console.log(
                        response?.data?.data[0]?.scores[0]?.score !== undefined
                            ? response?.data?.data[0]?.scores[0]?.score
                            : 0
                    );

                    setScore(
                        response?.data?.data[0]?.scores[0]?.score !== undefined
                            ? response?.data?.data[0]?.scores[0]?.score
                            : 0
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // }, []);
    const hi = false;
    return (
        <Layout>
            <Container>
                <h2 className="mb-5  text-center mt-5">
                    <strong> School Dashboard</strong>
                </h2>
                <Row className="p-3">
                    <Col className="md-5 ">
                        <Col>
                            <Card
                                bg="light"
                                text="dark"
                                // style={{ height: '200px' }}

                                // style={{ hight: '5rem' }}
                                // className="md-3 xs-12 mb-5"
                                // className="mt-10"
                            >
                                <Card.Body style={{ overflowX: 'auto' }}>
                                    <TeacherLatestScroll
                                        usersdata={currentUser?.data}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Col>
                    <Col className="md-5">
                        <Col>
                            <Card
                                bg="light"
                                text="dark"
                                // className=" md-3 xs-12 mb-5"
                            >
                                <Card.Body style={{ overflowX: 'auto' }}>
                                    <StudentLatestScroll
                                        usersdata={currentUser?.data}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Card
                            bg="light"
                            text="dark"
                            className="p-2"
                            // className="md-3 xs-12 mb-4 "
                            // style={{ width: '350px' }}
                            style={{ height: '16rem' }}
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
                    </Col>
                    <Col md={3}>
                        <Card
                            bg="light"
                            text="dark"
                            className="p-2"
                            // style={{ height: '200px' }}
                            // className="md-3 xs-12 mb-4 "
                            style={{ height: '16rem' }}
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
                    </Col>
                    <Col md={3}>
                        <Card
                            bg="light"
                            text="dark"
                            className="p-2"
                            // style={{ width: '350px' }}
                            // className="md-3 xs-12 mb-4 "
                            style={{ height: '16rem' }}
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
                    </Col>
                    <Col md={3}>
                        <Card
                            bg="light"
                            text="dark"
                            className="p-2"
                            // style={{ width: '350px' }}
                            // className="md-3 xs-12 mb-4 "
                            style={{ height: '16rem' }}
                        >
                            <Card.Body>
                                <label htmlFor="teams" className="">
                                    Registered Teachers
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
                                    {/* {ideaCount} */}
                                    {count}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="p-3">
                    {/* <Row> */}
                    <Col md={6}>
                        {multiOrgData.length !== undefined &&
                            multiOrgData.length !== 0 &&
                            multiOrgData[0]?.mentor !== null && (
                                <DataTableExtensions
                                    print={false}
                                    export={false}
                                    {...MultipleMentorsData}
                                >
                                    <DataTable
                                        data={multiOrgData}
                                        noHeader
                                        highlightOnHover
                                    />
                                </DataTableExtensions>
                            )}
                    </Col>
                    {/* </Row> */}
                    <Col md={6}>
                        {table === true && (
                            // <Row className="p-3">
                            <Col>
                                <Card
                                    bg="light"
                                    text="dark"
                                    // className="mb-4"
                                    // style={{ width: '350px' }}
                                    // className="md-3 xs-12 mb-4 "
                                    style={{
                                        height: '18rem',
                                        marginTop: '5rem'
                                    }}
                                >
                                    <Card.Body>
                                        <label
                                            htmlFor="teams"
                                            className=""
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '24px'
                                            }}
                                        >
                                            Guide Teacher Details
                                        </label>

                                        <Card.Text
                                            className="left-aligned"
                                            style={{
                                                // fontSize: '48px',
                                                // fontWeight: 'bold',
                                                marginTop: '10px',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            <span className="mx-3">
                                                <b>Teacher Name :</b>
                                            </span>
                                            <b>{orgData?.mentor?.full_name}</b>
                                            <br />
                                            <span className="mx-3">
                                                <b>Teacher Mobile No : </b>
                                            </span>
                                            <b>
                                                {
                                                    orgData?.mentor?.user
                                                        ?.username
                                                }
                                            </b>
                                            <br />
                                            <span className="mx-3">
                                                <b>Course Completion : </b>
                                            </span>
                                            <b> {coursepercentage + '%'}</b>
                                            <br />
                                            <span className="mx-3">
                                                <b> Quiz Score :</b>
                                            </span>
                                            <b>
                                                {score ? score : 0 + '/15'}
                                                {/* {course[0]?.scores[0]?.score
                                                    ? course[0]?.scores[0]
                                                          ?.score + '/15'
                                                    : '-'}{' '} */}
                                            </b>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            // </Row>
                        )}
                    </Col>
                </Row>
                {/* <p>Teacher Name :{orgData.mentor.full_name}</p> */}
                {/* <Col>
                    <Card bg="light" text="dark" className="md-3 xs-12 mb-5">
                        <Card.Body style={{ overflowX: 'auto' }}>
                            <TeacherLatestScroll
                                usersdata={currentUser?.data}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="light" text="dark" className=" md-3 xs-12 mb-5">
                        <Card.Body style={{ overflowX: 'auto' }}>
                            <StudentLatestScroll
                                usersdata={currentUser?.data}
                            />
                        </Card.Body>
                    </Card>
                </Col> */}
                <Row className="teacher-statistics p-3">
                    {' '}
                    <Row className="">
                        <Col>
                            <div className="d-flex flex-wrap">
                                {table === true && (
                                    <DoughnutChart
                                        user={teamId}
                                        dashBoard={'School'}
                                    />
                                    // ) : (
                                    //     ''
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
