/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Layout from '../Layout';
import { Container, Row, Card, CardBody, CardText, Col } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import DoughnutChart from '../../Teachers/Dashboard/DoughnutChart';
import { Button } from '../../stories/Button';
import axios from 'axios';
import { getCurrentUser } from '../../helpers/Utils';

const ViewMore = () => {
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');

    const orgDaTa = JSON.parse(localStorage.getItem('orgData'));
    const [course, setCourse] = useState([]);
    // where orgDaTa = orgnization details //
    // we can see all orgnization , mentor details //
    const headingDetails = {
        title: 'View More Details',
        options: []
    };
    var teamId = [];
    teamId.push({ mentor_id: orgDaTa.mentor.mentor_id });

    const handleBack = () => {
        history.push({
            pathname: '/admin/teacher/dashboard'
        });
        localStorage.setItem(
            'organization_code',
            JSON.stringify(orgDaTa.organization_code)
        );
    };

    useEffect(() => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/quizscores?user_id=${orgDaTa.mentor.user_id}&role=MENTOR`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setCourse(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const percentageBWNumbers = (a, b) => {
        // here a = all_topics_count ; b= topics_completed_count //
        return (((a - b) / a) * 100).toFixed(2);
    };
    return (
        <Layout>
            <Container className="mt-5 pt-5 dynamic-form">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <BreadcrumbTwo {...headingDetails} />
                    <Button
                        label="Back"
                        btnClass="primary"
                        size="small"
                        onClick={handleBack}
                    />
                </div>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Organization Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b>principal Name :</b>
                                </span>
                                <b>{orgDaTa.principal_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>principal Email :</b>
                                </span>
                                <b>{orgDaTa.principal_email}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>organization Name :</b>
                                </span>
                                <b>{orgDaTa.organization_name}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>organization Code :</b>
                                </span>
                                <b>{orgDaTa.organization_code}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Category :</b>
                                </span>
                                <b>{orgDaTa.category}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>City :</b>
                                </span>
                                <b>{orgDaTa.city}</b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>District :</b>
                                </span>
                                <b>{orgDaTa.district}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>state :</b>
                                </span>
                                <b>{orgDaTa.state}</b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Country :</b>
                                </span>
                                <b>{orgDaTa.country}</b>
                            </CardText>
                        </CardBody>
                    </Card>
                    <Row className="py-5">
                        <Card className="py-5">
                            <CardBody>
                                <h2 className="mb-4">Mentor Details</h2>
                                <CardText>
                                    <span className="mx-3">
                                        <b>Title :</b>
                                    </span>
                                    <b>{orgDaTa.mentor.title}</b>
                                </CardText>

                                <CardText>
                                    <span className="mx-3">
                                        <b>Mentor Name :</b>
                                    </span>
                                    <b>{orgDaTa.mentor.full_name}</b>
                                </CardText>
                                <CardText>
                                    <span className="mx-3">
                                        <b>Gender :</b>
                                    </span>
                                    <b>{orgDaTa.mentor.gender}</b>
                                </CardText>
                                <CardText>
                                    <span className="mx-3">
                                        <b>Mentor Id :</b>
                                    </span>
                                    <b>{orgDaTa.mentor.mentor_id}</b>
                                </CardText>
                                <CardText>
                                    <span className="mx-3">
                                        <b>Mobile No :</b>
                                    </span>
                                    <b>{orgDaTa.mentor.user.username}</b>
                                </CardText>
                                <CardText>
                                    <span className="mx-3">
                                        <b>WhatsApp No :</b>
                                    </span>
                                    <b>{orgDaTa.mentor.whatapp_mobile}</b>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Row>
                    <Row className="teacher-statistics bg-white p-5">
                        <Row className="">
                            <Col>
                                <div className="d-flex flex-wrap">
                                    <DoughnutChart
                                        user={teamId}
                                        dashBoard={'Admin'}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Row>
                    <Row className="py-5">
                        <Card className="py-5">
                            <CardBody>
                                <h2 className="mb-4">Mentor Course Details</h2>
                                <CardText>
                                    <span className="mx-3">
                                        <b> Quiz Score :</b>
                                    </span>
                                    <b>
                                        {course[0]?.scores[0]?.score
                                            ? course[0]?.scores[0]?.score +
                                              '/15'
                                            : 0}
                                    </b>
                                </CardText>
                                <CardText>
                                    <span className="mx-3">
                                        <b>Course Progress :</b>
                                    </span>
                                    <b>
                                        {course[0]?.currentProgress !==
                                        undefined
                                            ? `${
                                                  Math.round(
                                                      (course[0]
                                                          ?.currentProgress /
                                                          course[0]
                                                              ?.totalProgress) *
                                                          100
                                                  ) + '%'
                                              }`
                                            : 0}
                                    </b>{' '}
                                </CardText>
                            </CardBody>
                        </Card>
                    </Row>
                </Row>
            </Container>
        </Layout>
    );
};
export default withRouter(ViewMore);
