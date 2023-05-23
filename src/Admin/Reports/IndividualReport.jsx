import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Button } from '../../stories/Button';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const IndividualReport = () => {
    const history = useHistory();
    const queryParams = new URLSearchParams(window.location.search);
    const report = queryParams.get('report');

    const StudentsData = {
        data: [],
        columns: [
            {
                name: 'S.No.',
                selector: 'student_id',
                width: '10%'
            },
            {
                name: 'Team Code',
                selector: 'team_id',

                width: '20%'
            },
            {
                name: 'Student Name',
                selector: 'full_name',
                width: '21%'
            },
            {
                name: 'Institute',
                selector: 'institute_name',
                width: '20%'
            },
            {
                name: 'Qualification',
                selector: 'qualification',
                width: '15%'
            },
            {
                name: 'Action',
                selector: 'Action',
                width: '12%'
            }
        ]
    };

    return (
        <Layout>
            <Container className="mt-5 individual-report-wrapper mb-5 pb-5">
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
                <Row>
                    <DataTableExtensions
                        print={false}
                        export={false}
                        filter={false}
                        {...StudentsData}
                    >
                        <DataTable
                            data={StudentsData}
                            defaultSortField="id"
                            defaultSortAsc={false}
                            pagination={false}
                            highlightOnHover
                            fixedHeader
                            subHeaderAlign={Alignment.Center}
                        />
                    </DataTableExtensions>
                </Row>
            </Container>
        </Layout>
    );
};

export default IndividualReport;
