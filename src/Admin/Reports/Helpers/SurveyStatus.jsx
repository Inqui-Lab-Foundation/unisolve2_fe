import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table} from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {openNotificationWithIcon, getCurrentUser} from '../../../helpers/Utils';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from '../Helpers/Select';
import axios from 'axios';
import '../reports.scss';

const SurveyStatus = () => {
    const [TeacherPredistrict, setTeacherPredistrict] = React.useState('');
    const [TeacherPostdistrict, setTeacherPostdistrict] = React.useState('');
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [TeacherPrereportsData, setTeacherPreReportsData] = useState([]);
    const [TeacherPostreportsData, setTeacherPostReportsData] = useState([]);
    const [msg,setMsg] = useState('');
    const [TeacherPreshowTable, setTeacherPreShowTable] = useState(false);
    const [TeacherPostshowTable, setTeacherPostShowTable] = useState(false);
    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector((state) => state?.studentRegistration?.dists);

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);
    
    const handleDownload = (item) => {
        setMsg(item);
        var url = '';
        if (item === 'Teachers Pre Survey Completed List') {
            url = `/reports/preSurvey?role=MENTOR`;
        }else if (item === 'Teachers Post Survey Completed List') {
            url = `/reports/postSurvey?role=MENTOR`;
        }
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
                    const msg = item === 'Teachers Pre Survey Completed List'
                        ? 'Teachers Pre Survey Download successfully'
                        :  item === 'Teachers Post Survey Completed List'
                            ? 'Teachers Post Survey Download successfully'
                            : '';
                    if(item === 'Teachers Pre Survey Completed List'){
                        setTeacherPreReportsData(response?.data?.data);
                        setTeacherPreShowTable(true);
                    }else if (item === 'Teachers Post Survey Completed List') {
                        setTeacherPostReportsData(response?.data?.data);
                        setTeacherPostShowTable(true);
                    }
                    openNotificationWithIcon('success', msg);
                    
                }
                const element = document.getElementById('CSVBtn');
                element.click();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchData = (item, district, setData, setShowTable) => {
        const url = item === 'Teachers Pre Survey'
            ? `/reports/preSurvey?role=MENTOR`
            : item === 'Teachers Post Survey'
                ? `/reports/postSurvey?role=MENTOR`
                : '';

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
                    setData(response?.data?.data);
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
                <Container className="RegReports mt-5 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <h2>Survey Status Reports</h2>
                        <Col className="text-right mb-2">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() => history.push('/admin/reports')}
                            />
                        </Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Teachers Pre-Survey Report</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setTeacherPredistrict}
                                            placeHolder={'Select District'}
                                            value={TeacherPredistrict}
                                        />
                                    </div>
                                </Col>
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() => fetchData('Teachers Pre Survey', TeacherPredistrict, setTeacherPreReportsData, setTeacherPreShowTable)}
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            const val = 'Teachers Pre Survey Completed List';
                                            handleDownload(val,TeacherPredistrict);
                                        }}
                                        label={'Download'}
                                        btnClass="primary"
                                        size={'small'}
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
                    {TeacherPreshowTable && (
                        <Row className="mt-5">
                            <Col>
                                <div className="table-wrapper bg-white">
                                    <h2
                                        style={{
                                            color: 'deepskyblue',
                                            textAlign: 'center',
                                            fontFamily: 'Algerian',
                                            fontSize: '8px'
                                        }}
                                    >
                                        DATA GRID WITH SEARCH & PAGINATION
                                    </h2>
                                </div>
                                <div
                                    className="table-wrapper"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '20px'
                                    }}
                                >
                                    <Table className="table table-striped table-bordered responsive">
                                        <thead>
                                            <tr>
                                                <th>Quiz Response Id</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TeacherPrereportsData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.quiz_response_id}</td>
                                                    <td>{item['user.full_name']}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>

                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Teachers Post-Survey Reports</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setTeacherPostdistrict}
                                            placeHolder={'Select District'}
                                            value={TeacherPostdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() => fetchData('Teachers Post Survey', TeacherPostdistrict, setTeacherPostReportsData, setTeacherPostShowTable)}
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            const val = 'Teachers Post Survey Completed List';
                                            handleDownload(val,TeacherPostdistrict);
                                        }}
                                        label={'Download Report'}
                                        btnClass="primary"
                                        size={'small'}
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
                    {TeacherPostshowTable && (
                        <Row className="mt-5">
                            <Col>
                                <div className="table-wrapper bg-white">
                                    <h2
                                        style={{
                                            color: 'deepskyblue',
                                            textAlign: 'center',
                                            fontFamily: 'Algerian',
                                            fontSize: '8px'
                                        }}
                                    >
                                        DATA GRID WITH SEARCH & PAGINATION
                                    </h2>
                                </div>
                                <div
                                    className="table-wrapper my-0"
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '25px'
                                    }}
                                >
                                    <Table className="table table-striped table-bordered responsive">
                                        <thead>
                                            <tr>
                                                <th>Quiz Response Id</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TeacherPostreportsData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.quiz_response_id}</td>
                                                    <td>{item['user.full_name']}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
                <div className="m-3 common-flex">
                    <CSVLink
                        style={{ display: 'none' }}
                        id="CSVBtn"
                        data={TeacherPrereportsData.length > 0 ? TeacherPrereportsData : TeacherPostreportsData}
                        filename={
                            msg === 'Teachers Pre Survey Completed List'
                                ? 'Teachers Pre Survey List.csv'
                                : msg === 'Teachers Post Survey Completed List'
                                    ? 'Teachers Post Survey List.csv'
                                    : 'Report.csv'
                        }
                    />
                </div>
            </Layout>
        </>
    );
};

export default SurveyStatus;
