import React from 'react';
import {Card,Col, Container, Row } from 'reactstrap';
import Layout from '../Layout';
//import Cards from './Helpers/Cards';
import { Link } from 'react-router-dom';
import './reports.scss';

/*const Reports = () => {
    // here we can see all reports //
    const survey = [
        'Download Students Report'
        // 'Students Download'
        // 'Download Teachers Report',
        // 'Registered Teachers List',
        // 'Not Registered Teachers List',
        // 'Teachers Pre Survey',
        // 'Teachers Course Completion'
    ];
    const teacherReports = [
        'Registered Teachers List',
        'Not Registered Teachers List',
        'Teachers Pre Survey Completed List',
        'Teachers Pre Survey Not Completed List',
        'Teachers Course Completion List',
        'Download Teachers Report'
    ];
    const districtReports = [
        'Submitted Challenges',
        'Draft Challenges',
        'Accepted Challenges',
        'Rejected Challenges',
        'L1 - Yet to Processed Challenges',
        'L2 - Processed Challenges',
        'L2 - Yet to  Processed Challenges',
        'Final Evaluation Challenges',
        'Final Winner Challenges'
    ];
    return(
        <Layout>
            <Container className="mt-5 report-wrapper mb-5 pb-5">
                <h2>Reports</h2>
                <Row>
                    <Col md={12}>
                        <Cards
                            list={survey}
                            reports={teacherReports}
                            distList={districtReports}
                        />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
export default Reports;
*/
const Reports = () => {
    return (
        <Layout>
            <Container className="mt-5 report-wrapper mb-5 pb-5">
                <h2>Reports</h2>
                <div className="reports-data p-3 bg-gray">
                    <Row className="mb-3">
                        <Col lg={6} md={6}>
                            <Link to="/admin/reports-registration">
                                <Card className="p-4 text-center card-effect mb-3">
                                    <b className="text-secondary">
                                       REGISTRATION REPORTS
                                    </b>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6} md={6}>
                            <Link to="/admin/SurveyStatus">
                                <Card className="p-4 text-center card-effect mb-3">
                                    <b className="text-secondary">
                                       SURVEY STATUS REPORTS
                                    </b>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6} md={6}>
                            <Link to="/admin/CourseStatus">
                                <Card className="p-4 text-center card-effect mb-3">
                                    <b className="text-secondary">
                                        COURSE STATUS
                                    </b>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                    
                    <Row className="mb-3">
                        <Col lg={6} md={6}>
                            <Link to="/admin/ChallengesReport">
                                <Card className="p-4 text-center card-effect mb-3">
                                    <b className="text-secondary">
                                        CHALLENGES REPORTS
                                    </b>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={6} md={6}>
                            <Link to="/admin/">
                                <Card className="p-4 text-center card-effect mb-3">
                                    <b className="text-secondary">
                                        STUDENT AND TEAM STATUS
                                    </b>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                    
                    <Row className="mb-3">
                        <Col lg={6} md={6}>
                            <Link to="/admin/">
                                <Card className="p-4 text-center card-effect mb-3">
                                    <b className="text-secondary">
                                        CERTIFICATES
                                    </b>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Layout>
    );
};
export default Reports;       