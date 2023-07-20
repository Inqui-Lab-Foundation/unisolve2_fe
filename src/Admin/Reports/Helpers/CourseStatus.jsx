import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {openNotificationWithIcon,getCurrentUser} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch,useSelector} from 'react-redux';
import Select from '../Helpers/Select';
import axios from 'axios';
import '../reports.scss';

const CourseStatus = () => {

    const [district, setdistrict] = React.useState('');
    const [teacherCourseReportsData, setTeacherCourseReportsData] = useState([]);
    const [teacherCourseShowTable, setTeacherCourseShowTable] = useState(false);
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector((state) => state?.studentRegistration?.dists);

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const handleDownload = (item) => {
        setMsg(item);
        let url = '';
        if (item === 'Teachers Course Completion List') {
            url = `/reports/courseComplete`;
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
                    const msg = 
                    item === 'Teachers Course Completion List' 
                        ? 'Teachers Course Completion Download Successfully' 
                        : '';

                    if (item === 'Teachers Course Completion List') {
                        setTeacherCourseReportsData(response?.data?.data);
                        setTeacherCourseShowTable(true);
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

    const fetchData = (item) => {
        const url = 
        item === 'Teachers Course Completion List' ? '/reports/courseComplete' : '';
    
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
                    setTeacherCourseReportsData(response?.data?.data);
                    setTeacherCourseShowTable(true);
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
                        <Col><h2>Course Completion Reports </h2></Col>
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
                                <h2>Course Completed Teachers List</h2>
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
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                        
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() =>
                                            fetchData('Teachers Course Completion List')
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('Teachers Course Completion List');}}
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

                    {teacherCourseShowTable && (
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
                                        padding: '20px',
                                        maxHeight: '300px',
                                        overflowY: 'auto'
                                    }}
                                >
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
                                            {teacherCourseReportsData.map(
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
                        </Row>
                    )}
                </Container>
            </Layout>
            <div className="m-3 common-flex">
                <CSVLink
                    style={{ display: 'none' }}
                    id="CSVBtn"
                    data={teacherCourseReportsData}
                    filename={
                        msg === 'Teachers Course Completion List'
                            ? 'Teacher Course Completion.csv'
                            : 'Report.csv'
                    }
                />
            </div>
        </>
    );
};

export default CourseStatus;

