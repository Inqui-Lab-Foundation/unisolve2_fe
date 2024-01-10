/* eslint-disable indent */
import React, { useEffect } from 'react';
import './index.scss';
import Layout from '../Pages/Layout';
import { Card, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { KEY, URL } from '../../../constants/defaultValues';
import axios from 'axios';
import { getNormalHeaders } from '../../../helpers/Utils';

const Eadmindashboard = () => {
    // here we can see all  the Challenges  and count //

    const [dateCount, setdateCount] = useState({});
    useEffect(async() => {
        await handlecountvalue();
    }, []);

    async function handlecountvalue() {
        //  handlecountvalue Api where we  can see all challenges list //
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
            <div className="container dashboard-wrapper mt-5 mb-5">
                <h2 className="mb-5">Evaluation</h2>
                <div className="dashboard">
                    <Container>
                        <Row className="mb-5">
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/dashboard?status=SUBMITTED">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-primary">
                                            SUBMITTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount?.submitted_count}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/dashboard?status=DRAFT">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-secondary">
                                            DRAFT IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount?.draft_count || 0}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={4} md={4}>
                                <Link to="/eadmin/evaluationStatus/viewlist?evaluation_status=SELECTEDROUND1&title=L1 Accepted&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            L1 ACCEPTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {
                                                dateCount?.selected_round_one_count
                                            }
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={4} md={4}>
                                <Link to="/eadmin/evaluationStatus/viewlist?evaluation_status=REJECTEDROUND1&title=L1 Rejected&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-danger">
                                            L1 REJECTED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {
                                                dateCount?.rejected_round_one_count
                                            }
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={4} md={4}>
                                <Link to="/eadmin/evaluationStatus/viewlist?title=L1 - Yet to be Processed&level=L1">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-warning">
                                            L1 - YET TO BE PROCESSED
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount?.l1_yet_to_process}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/evaluationStatus/viewlist?title=L2 - Processed&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            L2 - PROCESSED IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount?.l2_processed}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/evaluationStatus/viewlist?title=L2 - Yet to be Processed&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-warning">
                                            L2 - YET TO BE PROCESSED
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount?.l2_yet_to_processed}
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={6}>
                                <Link to="/eadmin/evaluationStatus/viewfinallist?title=0&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-warning">
                                            SHORTLISTED FOR BOOTCAMP
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {
                                                dateCount?.final_evaluation_challenge
                                            }
                                        </h3>
                                    </Card>
                                </Link>
                            </Col>
                            <Col md={6}>
                                <Link to="/eadmin/evaluationStatus/viewfinallist?title=1&level=L2">
                                    <Card className="p-4 text-center card-effect mb-3">
                                        <b className="text-success">
                                            FINAL IDEAS
                                        </b>
                                        <h3 className="display-5 bold m-2">
                                            {dateCount?.final_evaluation_final}
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

export default Eadmindashboard;
