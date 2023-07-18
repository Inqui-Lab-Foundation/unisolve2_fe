/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {openNotificationWithIcon,getCurrentUser} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from './Select';
import axios from 'axios';
import '../reports.scss';

const ChallengesReport = () => {
    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [NotRegTeachersdistrict, setNotRegTeachersdistrict] =
        React.useState('');
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [RegTeachersreportsData, setRegTeachersReportsData] = useState([]);
    const [NotRegTeachersreportsData, setNotRegTeachersReportsData] = useState(
        []
    );
    const [msg, setMsg] = useState('');
    const [RegshowTable, setRegShowTable] = useState(false);
    const [NotRegshowTable, setNotRegShowTable] = useState(false);
    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const handleDownload = (item) => {
        setMsg(item);
        let url = '';
        if (item === 'Registered Teachers List') {
            url = `/reports/mentorRegList?district=${RegTeachersdistrict}`;
        } else if (item === 'Not Registered Teachers List') {
            url = `/reports/notRegistered?district=${NotRegTeachersdistrict}`;
        }

        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    const msg =
                        item === 'Registered Teachers List'
                            ? 'Registered Teachers List Download Successfully'
                            : item === 'Not Registered Teachers List'
                            ? 'Not Registered Teachers List Download Successfully'
                            : '';

                    if (item === 'Registered Teachers List') {
                        setRegTeachersReportsData(response?.data?.data);
                        setRegShowTable(true);
                    } else if (item === 'Not Registered Teachers List') {
                        setNotRegTeachersReportsData(response?.data?.data);
                        setNotRegShowTable(true);
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
        const url =
            item === 'Registered Teachers List'
                ? `/reports/mentorRegList?district=${RegTeachersdistrict}`
                : item === 'Not Registered Teachers List'
                ? `/reports/notRegistered?district=${NotRegTeachersdistrict}`
                : '';

        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
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
                        <h2>Challenges Reports</h2>
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
                                <h2>Submitted Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={RegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-6"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() =>
                                            fetchData(
                                                'Registered Teachers List',
                                                RegTeachersdistrict,
                                                setRegTeachersReportsData,
                                                setRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Registered Teachers List';
                                            handleDownload(
                                                val,
                                                RegTeachersdistrict
                                            );
                                        }}
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

                    {RegshowTable && (
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
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>Organization Code</th>
                                                <th>Organization District</th>
                                                <th>Organization Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {RegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {item.full_name}
                                                        </td>
                                                        <td>{item.mobile}</td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
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

                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Draft Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Accepted Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Rejected Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>L1- Yet to Processed Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>L2-Processed Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>L2- Yet to Processed Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Final Evaluation Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                <Container className="RegReports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Final Winner Challenges List</h2>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setNotRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={NotRegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        //onClick={() => history.push('/admin/reports')}
                                        //onClick={() => setNotRegShowTable(true)}
                                        //onClick={() => {
                                        //    setNotRegShowTable(true);
                                        //    setNotRegTeachersReportsData(NotRegTeachersreportsData);
                                        //}}
                                        onClick={() =>
                                            fetchData(
                                                'Not Registered Teachers List',
                                                NotRegTeachersdistrict,
                                                setNotRegTeachersReportsData,
                                                setNotRegShowTable
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {
                                            const val =
                                                'Not Registered Teachers List';
                                            handleDownload(
                                                val,
                                                NotRegTeachersdistrict
                                            );
                                        }}
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
                    {NotRegshowTable && (
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
                                                <th>Organization ID</th>
                                                <th>Organization Name</th>
                                                <th>Organization Code</th>
                                                <th>District</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Principal Name</th>
                                                <th>Principal Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NotRegTeachersreportsData.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                item.organization_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.organization_code
                                                            }
                                                        </td>
                                                        <td>{item.district}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.state}</td>
                                                        <td>
                                                            {
                                                                item.principal_name
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.principal_mobile
                                                            }
                                                        </td>
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
                    data={
                        RegTeachersreportsData.length > 0
                            ? RegTeachersreportsData
                            : NotRegTeachersreportsData
                    }
                    filename={
                        msg === 'Registered Teachers List'
                            ? 'Registered Teachers List.csv'
                            : msg === 'Not Registered Teachers List'
                            ? 'Not Registered Teachers List.csv'
                            : 'Report.csv'
                    }
                />
            </div>
        </>
    );
};

export default ChallengesReport;
