import { useHistory } from 'react-router-dom';
import { Card, Col, Container, Row } from 'reactstrap';
import { Button } from '../../stories/Button';
import Layout from '../Layout';
import FilterCard from './Helpers/FilterCard';

const ReportFilter = () => {
    const history = useHistory();
    const queryParams = new URLSearchParams(window.location.search);
    const report = queryParams.get('report');
    
    return (
        <Layout>
            <Container
                className="mt-5 individual-report-wrapper mb-5 pb-5"
                style={{ minHeight: '100vh' }}
            >
                <Row className="justify-content-between">
                    <Col md={6}>
                        <h2>{report.replaceAll('-', ' ')}</h2>
                    </Col>
                    <Col md={6}>
                        <Button
                            label={`Back to Reports`}
                            btnClass="primary float-end mb-3"
                            size="small"
                            onClick={() => history.push('/admin/reports')}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center align-content-center filter-card">
                    <Col md={4}>
                        <Card>
                            <h3 className="text-muted px-3 pt-3 text-center">Teacher Report</h3>
                            <FilterCard />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ReportFilter;
