import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Layout from '../Pages/Layout';
import { Link } from 'react-router-dom';
import '../../../Admin/Reports/reports.scss';
import PageNotFoundImg from '../../../assets/media/page-not-found.png';

const Reports = () => {
    const showPage = true;
    return (
        <Layout>
            {showPage ? (
                <Container className="mt-5 report-wrapper mb-5 pb-5">
                    <h2>Reports</h2>
                    <div className="reports-data p-5 bg-gray">
                        <Row className="mb-3">
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/l1-reports">
                                    <Card className="p-4 text-center card-effect mb-4">
                                        <b className="text-secondary">
                                            L1 - Reports
                                        </b>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/l2-reports">
                                    <Card className="p-4 text-center card-effect mb-4">
                                        <b className="text-secondary">
                                            L2 - Reports
                                        </b>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col lg={6} md={6}>
                                <Link to="/eadmin/l3-reports">
                                    <Card className="p-4 text-center card-effect mb-4">
                                        <b className="text-secondary">
                                            L3 - Reports(Final Challenges &
                                            Winners)
                                        </b>
                                    </Card>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Container>
            ) : (
                <Container className="mt-5 report-wrapper mb-5 pb-5">
                    <Card className="p-5 text-center">
                        <div>
                            <img
                                src={PageNotFoundImg}
                                alt="under construction"
                                className="img-fluid w-25"
                            />
                        </div>

                        <p>Page is under construction</p>
                    </Card>
                </Container>
            )}
        </Layout>
    );
};
export default Reports;
