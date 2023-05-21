/* eslint-disable indent */
import React, { useEffect } from 'react';
import './dashboard.scss';
import Layout from '../Pages/Layout';
import { Card, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { KEY, URL } from '../../../constants/defaultValues';
import { getNormalHeaders } from '../../../helpers/Utils';
import axios from 'axios';

const eadmindashboard = () => {
    const [dateCount, setdateCount] = useState({});

    useEffect(() => {
        handlecountvalue();
    }, []);

    async function handlecountvalue() {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(`${URL.gettotalcount}`, axiosConfig)
            .then(function (response) {
                if (response.status === 200) {
                    setdateCount(
                        response.data &&
                            response.data.data[0] &&
                            response.data.data[0]
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Layout>
            <div className="container dashboard-wrapper mt-5 mb-50">
                <h2 className="mb-5">Dashboard</h2>
                <div className="dashboard">
                    <Container>
                        <Row className="mb-5">
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/listofideas?status=SUBMITTED&title=Submitted&level0=L0">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-primary">
                                            SUBMITTED CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.submitted_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/listofideas?status=DRAFT&title=Drafted&level0=L0">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-secondary">
                                            DRAFT CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.draft_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={4} md={4}>
                                <Link to="/eadmin/listofideas?evaluation_status=SELECTEDROUND1&title=Accepted&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            ACCEPTED CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.selected_round_one_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={4} md={4}>
                                <Link to="/eadmin/listofideas?evaluation_status=REJECTEDROUND1&title=Rejected&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-danger">
                                            REJECTED CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.rejected_round_one_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={4} md={4}>
                                <Link to="/eadmin/listofideas?title=L1 - Yet to Processed&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-warning">
                                            L1 - YET TO PROCESSED CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.l1_yet_to_process}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/listofideas?title=L2 - Processed&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            L2 - PROCESSED CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.l2_processed}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/listofideas?title=L2 - Yet to Processed&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-warning">
                                            L2 - YET TO PROCESSED CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.l2_yet_to_processed}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={6}>
                                <Link to="/eadmin/listofFinalideas?title=0&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-warning">
                                            FINAL EVALUATION CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {
                                                dateCount.final_evaluation_challenge
                                            }
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col md={6}>
                                <Link to="/eadmin/listofFinalideas?title=1&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            FINAL WINNERS CHALLENGES
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount.final_evaluation_final}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default eadmindashboard;
