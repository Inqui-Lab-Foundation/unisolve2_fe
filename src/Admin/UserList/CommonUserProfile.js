/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Layout from '../../Admin/Layout';
import { useHistory, withRouter } from 'react-router-dom';
import { Container, Row, Card, CardBody, CardText } from 'reactstrap';
// import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../stories/Button';
import { useDispatch } from 'react-redux';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    getStudentDashboardStatus,
    getStudentDashboardTeamProgressStatus
} from '../../redux/studentRegistration/actions';
const CommonUserProfile = (props) => {
    const history = useHistory();

    const currentUser = getCurrentUser('current_user');

    // const studentId = localStorage.getItem('studentId');

    const StudentsDaTa = JSON.parse(localStorage.getItem('studentData'));
    console.log(StudentsDaTa);
    const [course, setCourse] = useState([]);
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const dashboardStatus = useSelector(
        (state) => state?.studentRegistration.dashboardStatus
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser) {
            dispatch(getStudentDashboardStatus(StudentsDaTa.user_id, language));
            dispatch(
                getStudentDashboardTeamProgressStatus(
                    currentUser?.data[0]?.user_id,
                    language
                )
            );
        }
    }, [currentUser?.data[0]?.user_id, language]);
    useEffect(() => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/quizscores?user_id=${StudentsDaTa.user_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setCourse(response.data.data[0]?.scores);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const dashboardTeamProgressStatus = useSelector(
        (state) => state?.studentRegistration.dashboardTeamProgressStatus
    );
    const handleViewBack = () => {
        history.push({
            pathname: '/admin/userlist'
        });
        localStorage.setItem('dist', props.location.dist);
        localStorage.setItem('num', props.location.num);
    };

    const handleReset = () => {
        // where we can reset the password  as diesCode //

        const body = JSON.stringify({
            organization_code:
                StudentsDaTa?.team?.mentor?.organization.organization_code,
            mentor_id: StudentsDaTa?.team?.mentor.mentor_id,
            otp: false
        });
        var config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + '/mentors/resetPassword',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status === 202) {
                    openNotificationWithIcon(
                        'success',
                        'Reset Password Successfully Update!',
                        ''
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // const handleEdit = () => {
    //     // where we can edit  the users data //
    //     history.push({
    //         pathname: '/admin/student/edit-user-profile',
    //         data: {
    //             username: props.location.data && props.location.data.username,
    //             full_name: props.location.data && props.location.data.full_name,
    //             organization_code:
    //                 props.location.data &&
    //                 props.location.data?.organization_code,
    //             mentor_id: props.location.data && props.location.data.mentor_id
    //         }
    //     });
    // };
    const handleEdit = () => {
        history.push({
            pathname: '/admin/student/edit-user-profile',
            data: {
                Age: StudentsDaTa.Age,
                Gender: StudentsDaTa.Gender,
                Grade: StudentsDaTa.Grade,
                student_id: StudentsDaTa.student_id,
                team_id: StudentsDaTa?.team.team_id,
                full_name: StudentsDaTa.full_name
            }
        });
    };
    const CourseData = {
        data: course && course.length > 0 ? course : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                // sortable: true,
                width: '10rem'
            },
            {
                name: 'Quiz',
                // selector: 'level_name',
                // sortable: true,
                selector: (row) => row.quiz_id,
                sortable: true,
                width: '10rem'
            },

            {
                name: 'Attempts',
                // selector: 'level_name',
                // sortable: true,
                selector: (row) => row.attempts,
                sortable: true,
                width: '15rem'
            },
            {
                name: 'Score',
                // selector: 'eval_schema',
                selector: (row) => (row.score ? row.score : '-'),

                width: '20rem'
            }
        ]
    };
    return (
        <Layout>
            <Container className="mt-5 pt-5 dynamic-form">
                <Row>
                    <div className="col-6">
                        {/* <BreadcrumbTwo {...headingDetails} /> */}
                        <h3 className="mt-5"> User List Details</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Button
                            btnClass="btn btn-primary"
                            size="small"
                            label="Edit"
                            onClick={handleEdit}
                        />
                        <Button
                            btnClass="btn btn-success"
                            size="small"
                            label="Reset"
                            onClick={handleReset}
                        />
                        <Button
                            btnClass={'primary'}
                            size="small"
                            label="Back"
                            onClick={handleViewBack}
                        />
                    </div>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            <CardText>
                                <span className="mx-3">
                                    <b>Name :</b>
                                </span>
                                <b>
                                    {StudentsDaTa.full_name}
                                    {/* {props.location.data &&
                                    props.location.data.full_name
                                        ? props.location.data &&
                                          props.location.data.full_name
                                        : '-'}{' '} */}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Class :</b>
                                </span>
                                <b>{StudentsDaTa.Grade}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b> Gender :</b>
                                </span>
                                <b>{StudentsDaTa.Gender}</b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Age :</b>
                                </span>
                                <b>{StudentsDaTa.Age}</b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Mentor Name :</b>
                                </span>
                                <b>{StudentsDaTa.team?.mentor.full_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Team Name :</b>
                                </span>
                                <b>{StudentsDaTa?.team.team_name}</b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
                <Row className="my-5">
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Institution Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b>UDISCE Code :</b>
                                </span>

                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .organization_code
                                    }
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>School Name :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .organization_name
                                    }
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>District :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .district
                                    }
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Category :</b>
                                </span>
                                <b>
                                    {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .category
                                    }
                                    {/* {props.location.data &&
                                    props.location.data.team &&
                                    props.location.data.team.mentor &&
                                    props.location.data.team.mentor.organization
                                        .category
                                        ? props.location.data &&
                                          props.location.data.team &&
                                          props.location.data.team.mentor &&
                                          props.location.data.team.mentor
                                              .organization.category
                                        : '-'} */}
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Course Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b>Completed Videos :</b>
                                </span>
                                <b>
                                    {dashboardStatus &&
                                    dashboardStatus?.videos_completed_count
                                        ? dashboardStatus?.videos_completed_count
                                        : '-'}
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Completed Quiz :</b>
                                </span>
                                <b>
                                    {dashboardStatus &&
                                    dashboardStatus?.quiz_completed_count
                                        ? dashboardStatus?.quiz_completed_count
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Course Completion :</b>
                                </span>
                                <b>
                                    {dashboardStatus?.topics_completed_count !==
                                    undefined
                                        ? `${
                                              Math.round(
                                                  (dashboardStatus?.topics_completed_count /
                                                      dashboardStatus?.all_topics_count) *
                                                      100
                                              ) + '%'
                                          }`
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Earned Badges :</b>
                                </span>
                                <b>
                                    {dashboardStatus &&
                                    dashboardStatus?.badges_earned_count
                                        ? dashboardStatus?.badges_earned_count
                                        : '-'}
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Quiz Details Table Format</h2>
                        </CardBody>
                        <div className="my-2">
                            <DataTableExtensions
                                {...CourseData}
                                exportHeaders
                                print={false}
                            >
                                <DataTable
                                    data={setCourse}
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

export default withRouter(CommonUserProfile);
