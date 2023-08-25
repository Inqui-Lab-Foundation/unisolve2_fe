import React, { useState, useEffect, useRef} from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table} from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {openNotificationWithIcon, getCurrentUser} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Select from '../Helpers/Select';
import axios from 'axios';
import '../reports.scss';
import { notification } from 'antd';

const SurveyStatus = () => {
    
    const [filterType, setFilterType] = useState('');
    const [surveyType, setSurveyType] = useState('');
    const filterOptions = ['Teacher', 'Student'];
    const surveyTypes = ['Pre Survey', 'Post Survey'];
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [surveyCounts, setSurveyCounts] = useState([]);

    const [mentPrereportsData, setMentPreReportsData] = useState([]);
    const [mentPostreportsData, setMentPostReportsData] = useState([]);
    const [stuPrereportsData, setStuPreReportsData] = useState([]);
    const [stuPostreportsData, setStuPostReportsData] = useState([]);

    const [mentPredownloadData, setMentPreDownloadData] = useState([]);
    const [mentPostdownloadData, setMentPostDownloadData] = useState([]);
    const [stuPredownloadData, setStuPreDownloadData] = useState([]);
    const [stuPostdownloadData, setStuPostDownloadData] = useState([]);
    
    const [showTable, setShowTable] = useState(false);
    
    const mentPrecsvLinkRef = useRef();
    const mentPostcsvLinkRef = useRef();
    const stuPrecsvLinkRef = useRef();
    const stuPostcsvLinkRef = useRef();
    
    const barChartData = {
        labels: ['Teacher Pre Survey', 'Teacher Post Survey', 'Student Pre Survey', 'Student Post Survey'],
        datasets: [
            {
                label: 'Survey Visualization',
                data: [
                    Number(surveyCounts.mentorPreCount),
                    Number(surveyCounts.mentorPostCount),
                    Number(surveyCounts.studentPreCount),
                    Number(surveyCounts.studentPostCount),
                ],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
                barThickness: 40,
            },
        ],
    };

    const barChartOptions = {
        maintainAspectRatio: true,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    const fetchSurveyCounts = () => {
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/reports/mentorstudentSurveyCount',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
        };
    
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    setSurveyCounts(response?.data?.data?.[0]?.Count[0] || {});
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };
    
    const fetchData = (filterType, surveyType) => {
        let url;
        if (filterType === 'Teacher' && surveyType === 'Pre Survey') {
            url = `/reports/preSurvey?role=MENTOR`;
        } else if (filterType === 'Teacher' && surveyType === 'Post Survey') {
            url = `/reports/postSurvey?role=MENTOR`;
        } else if (filterType === 'Student' && surveyType === 'Pre Survey') {
            url = `/reports/preSurvey?role=STUDENT`;
        } else if (filterType === 'Student' && surveyType === 'Post Survey') {
            url = `/reports/postSurvey?role=STUDENT`;
        } else {
            return;
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
                    if (filterType === 'Teacher' && surveyType === 'Pre Survey') {
                        setMentPreReportsData(response?.data?.data);
                        setMentPreDownloadData(response?.data?.data);
                    } else if (filterType === 'Teacher' && surveyType === 'Post Survey') {
                        setMentPostReportsData(response?.data?.data);
                        setMentPostDownloadData(response?.data?.data);
                    } else if (filterType === 'Student' && surveyType === 'Pre Survey') {
                        setStuPreReportsData(response?.data?.data);
                        setStuPreDownloadData(response?.data?.data);
                    } else if (filterType === 'Student' && surveyType === 'Post Survey') {
                        setStuPostReportsData(response?.data?.data);
                        setStuPostDownloadData(response?.data?.data);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };  

    useEffect(() => {
        fetchSurveyCounts();
    }, []);

    
    const handleViewDetails = () => {
        if ((!filterType) || (!surveyType)){
            notification.warning({
                message: 'Please select a user type and survey type before downloading the report.',
            });
            return;
        }
        setShowTable(true);
        fetchData(filterType,surveyType);
    };
    // console.log(fetchData);

    const handleDownload = () => {
        if (!filterType || !surveyType) {
            notification.warning({
                message: 'Please select a user type and survey type before downloading the report.',
            });
            return;
        }
    
        let url;
        if (filterType === 'Teacher' && surveyType === 'Pre Survey') {
            url = `/reports/preSurvey?role=MENTOR`;
        } else if (filterType === 'Teacher' && surveyType === 'Post Survey') {
            url = `/reports/postSurvey?role=MENTOR`;
        } else if (filterType === 'Student' && surveyType === 'Pre Survey') {
            url = `/reports/preSurvey?role=STUDENT`;
        } else if (filterType === 'Student' && surveyType === 'Post Survey') {
            url = `/reports/postSurvey?role=STUDENT`;
        } else {
            return;
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
            .then((response) => {
                if (response.status === 200) {
                    
                    if (filterType === 'Teacher' && surveyType === 'Pre Survey') {
                        mentPrecsvLinkRef.current.link.click();
                    } else if (filterType === 'Teacher' && surveyType === 'Post Survey') {
                        mentPostcsvLinkRef.current.link.click();
                    } else if (filterType === 'Student' && surveyType === 'Pre Survey') {
                        stuPrecsvLinkRef.current.link.click();
                    } else if (filterType === 'Student' && surveyType === 'Post Survey') {
                        stuPostcsvLinkRef.current.link.click();
                    }
    
                    openNotificationWithIcon('success', `${filterType} ${surveyType} Downloaded Successfully`);
                }
            })
            .catch((error) => {
                console.log('API error:', error);
                openNotificationWithIcon('error', `Failed to download the report`);
            });
    };

    return (
        <>
            <Layout>
                <Container className="RegReports mt-5 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col><h2>Survey Status Reports</h2></Col>
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
                                            list={filterOptions}
                                            setValue={setFilterType}
                                            placeHolder="Select User Type"
                                            value={filterType}
                                        />
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={surveyTypes}
                                            setValue={setSurveyType}
                                            placeHolder="Select Survey Type"
                                            value={surveyType}
                                        />
                                    </div>
                                </Col>
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={handleViewDetails}
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />
                                    <Button
                                        onClick={handleDownload}
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
                            <div className="chart">
                                {showTable ? null : (
                                    <div className="col-md-7 mt-5 d-flex align-items-center justify-content-center">
                                        <Bar data={barChartData} options={barChartOptions} />
                                    </div>
                                )} 
                            </div>
                            <div className="table">
                                {showTable && filterType === 'Teacher' && surveyType ==='Pre Survey' && mentPrereportsData.length > 0 && (
                                    <div className="mt-5">
                                        <h3>Data based on Filter: {filterType} {surveyType}</h3>
                                        <div className="table-wrapper bg-white">
                                            <div className="table-wrapper">
                                                <Table id="dataTable" className="table table-striped table-bordered responsive">
                                                    <thead>
                                                        <tr>
                                                            <th>Quiz Response Id</th>
                                                            <th>Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {mentPrereportsData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.quiz_response_id}</td>
                                                                <td>{item['user.full_name']}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showTable && filterType === 'Teacher' && surveyType ==='Post Survey' && mentPostreportsData.length > 0 && (
                                    <div className="mt-5">
                                        <h3>Data based on Filter: {filterType} {surveyType}</h3>
                                        <div className="table-wrapper bg-white">
                                            <div className="table-wrapper">
                                                <Table id="dataTable" className="table table-striped table-bordered responsive">
                                                    <thead>
                                                        <tr>
                                                            <th>Quiz Response Id</th>
                                                            <th>Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {mentPostreportsData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.quiz_response_id}</td>
                                                                <td>{item['user.full_name']}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {filterType === 'Student' && surveyType ==='Pre Survey' && stuPrereportsData.length > 0 && (
                                    <div className="mt-5">
                                        <h3>Data based on Filter: {filterType} {surveyType}</h3>
                                        <div className="table-wrapper bg-white">
                                            <div className="table-wrapper">
                                                <Table id="dataTable" className="table table-striped table-bordered responsive">
                                                    <thead>
                                                        <tr>
                                                            <th>Quiz Response Id</th>
                                                            <th>Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {stuPrereportsData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.quiz_response_id}</td>
                                                                <td>{item['user.full_name']}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {filterType === 'Student' && surveyType ==='Post Survey' && stuPostreportsData.length > 0 && (
                                    <div className="mt-5">
                                        <h3>Data based on Filter: {filterType} {surveyType}</h3>
                                        <div className="table-wrapper bg-white">
                                            <div className="table-wrapper">
                                                <Table id="dataTable" className="table table-striped table-bordered responsive">
                                                    <thead>
                                                        <tr>
                                                            <th>Quiz Response Id</th>
                                                            <th>Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {stuPostreportsData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.quiz_response_id}</td>
                                                                <td>{item['user.full_name']}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {mentPrereportsData.length > 0 && (
                                    <CSVLink
                                        data={mentPredownloadData}
                                        filename={`Teachers Pre Survey List.csv`}
                                        className="hidden"
                                        ref={mentPrecsvLinkRef}
                                    >
                                    Download CSV
                                    </CSVLink>
                                )}
                                {mentPostreportsData.length > 0 && (
                                    <CSVLink
                                        data={mentPostdownloadData}
                                        filename={`Teachers Post Survey List.csv`}
                                        className="hidden"
                                        ref={mentPostcsvLinkRef}
                                    >
                                    Download CSV
                                    </CSVLink>
                                )} 
                                {stuPrereportsData.length > 0 && (
                                    <CSVLink
                                        data={stuPredownloadData}
                                        filename={`Students Pre Survey List.csv`}
                                        className="hidden"
                                        ref={stuPrecsvLinkRef}
                                    >
                                    Download CSV
                                    </CSVLink>
                                )} 
                                {stuPostreportsData.length > 0 && (
                                    <CSVLink
                                        data={stuPostdownloadData}
                                        filename={`Students Post Survey List.csv`}
                                        className="hidden"
                                        ref={stuPostcsvLinkRef}
                                    >
                                    Download CSV
                                    </CSVLink>
                                )}
                            </div>
                        </div>
                    </Row>
                </Container>
            </Layout>
        </>
    );
};

export default SurveyStatus;
