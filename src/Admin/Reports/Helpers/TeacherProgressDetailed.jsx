import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {openNotificationWithIcon,getCurrentUser} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch,useSelector} from 'react-redux';
import Select from './Select';
import DoughnutChart from './DoughnutChart';
import axios from 'axios';
import '../reports.scss';

const TeacherProgressDetailed = () => {

    const [district, setdistrict] = React.useState('');
    const [reportsData, setReportsData] = useState([]);
    const [showTable, setShowTable] = useState([]);
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector((state) => state?.studentRegistration?.dists);

    const doughnutChartData = {
        data: {
            labels: ['Male','Female'],
            datasets: [
                {
                    data:[60,40],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                }
            ],
        },
    };

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const handleDownload = (item) => {
        setMsg(item);
        const url = item === 'Mentor Details' ? `/reports/mentordeatilscsv` : '';
        //const token = currentUser?.data[0]?.token;
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200 && item === 'Mentor Details') {
                    setReportsData(response?.data?.data);
                    setShowTable(true);
                    openNotificationWithIcon('success', 'Teacher Progress Detailed Report Downloaded Successfully');
                }
                const element = document.getElementById('CSVBtn');
                element.click();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchData = (item) => {
        const url = item === 'Mentor Details' ? `/reports/mentordeatilscsv` : '';

        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setReportsData(response?.data?.data);
                    setShowTable(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <Layout>
                <Container className="RegReports mt-3 mb-10 userlist">
                    <Row className="mt-0 pt-2">
                        <Col><h2>TEACHER PROGRESS DETAILED REPORT</h2></Col>
                        <Col className="text-right mb-1">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() => history.push('/admin/reports')}
                            />
                        </Col>
                        <div className="reports-data p-5 mt-5 bg-white">
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setdistrict}
                                            placeHolder={'Select District'}
                                            value={district}
                                        />
                                    </div>
                                </Col>
                                {/* <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={}
                                            setValue={}
                                            placeHolder={'Select category'}
                                            value={}
                                        />
                                    </div>
                                </Col> */}
                                <Col md={3} className="d-flex align-items-center justify-content-center">   
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() =>
                                            fetchData('Mentor Details')
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />
                                    <Button
                                        onClick={() =>
                                            handleDownload('Mentor Details')
                                        }
                                        label={'Download Report'}
                                        btnClass="primary mx-3"
                                        size={'small'}
                                        shape="btn-square"
                                        type="submit"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Row>

                    {showTable && (
                        <Row className="mt-5">
                            <Col md={8}>
                                <div
                                    className="table-wrapper"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '20px',
                                        overflowY: 'auto'
                                    }}
                                >
                                    <h2>OVERVIEW</h2>
                                    <Table className="table table-striped table-bordered responsive">
                                        <thead
                                            style={{
                                                position: 'sticky',
                                                top: '0',
                                                zIndex: '1',
                                                background: 'white'
                                            }}
                                        >
                                            <tr>
                                                <th>Organization_code</th>
                                                <th>District</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.organization_code}</td>
                                                        <td>{item.district}</td>
                                                        <td>{item.full_name}</td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col md={4}>
                                {/* Place your doughnut chart component here */}
                                {/* For example: */}
                                <DoughnutChart chartConfig={doughnutChartData} />
                            </Col>
                        </Row>
                    )}
                </Container>
            </Layout>
            <div className="m-3 common-flex">
                <CSVLink
                    style={{ display: 'none' }}
                    id="CSVBtn"
                    data={reportsData}
                    filename={
                        msg === 'Mentor Details'
                            ? 'Teacher Progress Detailed List.csv'
                            : 'Report.csv'
                    }
                />
            </div>
        </>
    );
};

export default TeacherProgressDetailed;

