/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Tabs } from "antd";
import Layout from '../../Admin/Layout';
import {
    // BsChevronRight,
    // BsFilter,
    BsPlusLg,
    // BsGraphUp,
    BsUpload
} from 'react-icons/bs';
import { Button } from '../../stories/Button';
import ImportPopup from './ImportPopup';
import { useHistory } from 'react-router-dom';

import { getSchoolRegistationBulkUploadList } from '../../redux/actions';
import { connect } from 'react-redux';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const TicketsPage = (props) => {
    // here we can see all the support tickets //
    const currentUser = getCurrentUser('current_user');
    const [showImportPopup, setImportPopup] = useState(false);
    const [reqList, setReqList] = useState(false);
    const [newList, setNewList] = useState(false);
    const [reqSchoolsResponse, setReqSchoolsResponse] = useState([]);
    const [newSchoolsResponse, setNewSchoolsResponse] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [SRows, setSRows] = React.useState([]);
    // const list = JSON.parse(localStorage.getItem('list'));

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSRows(reqSchoolsData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(SchoolsData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const history = useHistory();
    useEffect(() => {
        props.getSchoolRegistationBulkUploadActions('i');
    }, []);
    const handleEdit = (item) => {
        // where item = orgnization id  details //
        // where we can edit the institution details //
        history.push({
            pathname: '/admin/register-edit-schools'
        });
        localStorage.setItem('listId', JSON.stringify(item));
    };
    const handleActiveStatusUpdate = (item, itemA) => {
        // where we can update the status InActive or New   //
        // where item = orgnization id details , itemA= status //
        const body = {
            status: itemA,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/' +
                item.organization_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setReqList(false);
                    openNotificationWithIcon(
                        'success',
                        'Status update successfully'
                    );
                    props.getSchoolRegistationBulkUploadActions('i');
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };
    const handleStatusUpdate = (item, itemS) => {
        // where we can update the status Active or New  //
        // where item = orgnization id details , itemS= status //
        //organization_code = orgnization code //
        // organization_name = orgnization name //
        const body = {
            status: itemS,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/' +
                item.organization_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setReqList(true);
                    listApi();
                    openNotificationWithIcon(
                        'success',
                        'Status update successfully'
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };

    const handleNewUpdate = (item, itemS) => {
        // where we can update the status Active or InActive //
        // where item = orgnization id details , itemS= status //
        //organization_code = orgnization code //
        // organization_name = orgnization name //
        const body = {
            status: itemS,
            organization_code: item.organization_code,
            organization_name: item.organization_name
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations/' +
                item.organization_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setNewList(true);
                    newListApi();
                    openNotificationWithIcon(
                        'success',
                        'Status update successfully'
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };
    const handleNewSchoolsList = () => {
        // here we can see  list of  new institutions //
        setReqList(false);
        newListApi();
    };
    async function listApi() {
        //  here we can see listApi where we can see all InActive Institutions //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations?status=INACTIVE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setReqSchoolsResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setReqList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function newListApi() {
        // here we can see newListApi where we can see list of new Institutions //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/organizations?status=NEW',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setNewSchoolsResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setNewList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleReqSchoolsList = (e) => {
        // here we can see  list of inActive institutions //
        listApi();
    };

    const handleBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
        setNewList(false);
        props.getSchoolRegistationBulkUploadActions('i');
    };

    const handleNewBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
        setNewList(false);
        props.getSchoolRegistationBulkUploadActions('i');
    };
    const [array, setarray] = useState([]);
    useEffect(() => {
        if (
            props.schoolsRegistrationList &&
            props.schoolsRegistrationList.length > 0
        ) {
            let dataarray = [];
            props.schoolsRegistrationList.forEach((item, index) => {
                dataarray.push(Object.assign(item, { index: index + 1 }));
            });
            setarray([...dataarray]);
        }
    }, [props.schoolsRegistrationList]);
    const SchoolsData = {
        data: array,
        columns: [
            {
                name: 'No',
                selector: (row) => row.index,
                cellExport: (row) => row.index,
                width: '6%'
            },
            {
                name: 'UDISE Code ',
                selector: 'organization_code',
                cellExport: (row) => row.organization_code,
                sortable: true,

                width: '15%'
            },
            {
                name: 'Institution Name',
                selector: 'organization_name',
                cellExport: (row) => row.organization_name,
                width: '27%'
            },
            {
                name: 'Principal Name',
                selector: 'principal_name',
                cellExport: (row) => row.principal_name,
                width: '15%'
            },
            // {
            //     name: 'Mobile',
            //     selector: 'principal_mobile',
            //     cellExport: (row) => row.principal_mobile,
            //     width: '12%'
            // },
            {
                name: 'Status',
                cellExport: (row) => row.status,
                cell: (row) => [
                    <Badge
                        key={row.organization_id}
                        bg={`${
                            row.status === 'ACTIVE' ? 'secondary' : 'danger'
                        }`}
                    >
                        {row.status}
                    </Badge>
                ],
                width: '10%'
            },
            {
                name: 'Actions',
                selector: 'action',
                width: '27%',
                center: true,
                cellExport: (row) => {},
                cell: (record) => [
                    <>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </Link>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() =>
                                handleActiveStatusUpdate(record, 'NEW')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-success btn-lg">NEW</div>
                        </Link>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() =>
                                handleActiveStatusUpdate(record, 'INACTIVE')
                            }
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-danger btn-lg">
                                INACTIVE
                            </div>
                        </Link>
                    </>
                ]
            }
        ]
    };
    const reqSchoolsData = {
        data: reqSchoolsResponse,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '6%'
                // center: true,
            },
            {
                name: 'Unique Code',
                selector: (row) => row.organization_code,
                sortable: true,
                width: '15%'
                // center: true,
            },
            {
                name: 'Institution Name',
                selector: (row) => row.organization_name,
                width: '27%'
                // center: true,
            },
            {
                name: 'Principal Name',
                selector: 'principal_name',
                width: '15%'
            },
            // {
            //     name: 'Mobile',
            //     selector: 'principal_mobile',
            //     width: '12%'
            // },
            {
                name: 'Status',
                cell: (row) => [
                    <Badge key={row.organization_id} bg={`${'danger'}`}>
                        {row.status}
                    </Badge>
                ],
                width: '10%'
                // center: right,
            },
            {
                name: 'Actions',
                selector: 'action',
                center: true,
                width: '20%',
                cell: (record) => [
                    <>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </Link>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleStatusUpdate(record, 'ACTIVE')}
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-warning btn-lg">ACTIVE</div>
                        </Link>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleStatusUpdate(record, 'NEW')}
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-success btn-lg">NEW</div>
                        </Link>
                    </>
                ]
            }
        ]
    };
    const newSchoolsData = {
        data: newSchoolsResponse,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                width: '6%'
            },
            {
                name: 'Unique Code',
                selector: 'organization_code',
                sortable: true,
                width: '15%'
            },
            {
                name: 'Institution Name',
                selector: 'organization_name',
                width: '25%'
            },
            {
                name: 'Principal Name',
                selector: 'principal_name',
                width: '13%'
            },

            {
                name: 'Status',
                cell: (row) => [
                    <Badge
                        key={row.organization_id}
                        bg={`${row.status === 'NEW' ? 'secondary' : 'success'}`}
                    >
                        {row.status}
                    </Badge>
                ],
                width: '10%'
            },
            {
                name: 'Actions',
                selector: 'action',
                width: '24%',
                center: true,
                cell: (record) => [
                    <>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '7px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </Link>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleNewUpdate(record, 'ACTIVE')}
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-warning btn-lg">ACTIVE</div>
                        </Link>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleNewUpdate(record, 'INACTIVE')}
                            style={{ marginRight: '10px' }}
                        >
                            <div className="btn btn-danger btn-lg">
                                INACTIVE
                            </div>
                        </Link>
                    </>
                ]
            }
        ]
    };
    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50">
                <Row className="pt-3">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            {reqList ? (
                                <h2>List of inactive institutions</h2>
                            ) : newList ? (
                                <h2>List of new institutions</h2>
                            ) : (
                                <h2>List of active institutions</h2>
                            )}
                        </Col>

                        <Col className="ticket-btn col ml-auto ">
                            {reqList ? (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Back"
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleBack(e)}
                                    />
                                </div>
                            ) : newList ? (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Back"
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleNewBack(e)}
                                    />
                                </div>
                            ) : (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        label="Add Institutions"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        Icon={BsPlusLg}
                                        onClick={() =>
                                            history.push(
                                                '/admin/register-new-schools'
                                            )
                                        }
                                    />
                                    <Button
                                        label="InActive Institutions"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleReqSchoolsList(e)}
                                    />
                                    <Button
                                        label="New Institutions"
                                        btnClass="primary"
                                        size="small"
                                        shape="btn-square"
                                        onClick={(e) => handleNewSchoolsList(e)}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>

                    {reqList ? (
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={false}
                                {...reqSchoolsData}
                                exportHeaders
                            >
                                <DataTable
                                    data={SRows}
                                    // noHeader
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    ) : newList ? (
                        <div className="my-2">
                            <DataTableExtensions
                                {...newSchoolsData}
                                exportHeaders
                            >
                                <DataTable
                                    // data={rows}
                                    // noHeader
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    // fixedHeaderScrollHeight='300px'
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    ) : (
                        <div className="my-2">
                            <DataTableExtensions
                                {...SchoolsData}
                                export={true}
                                exportHeaders
                            >
                                <DataTable
                                    data={rows}
                                    // noHeader
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    // fixedHeaderScrollHeight='300px'
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    )}
                </Row>
            </Container>
            <ImportPopup
                show={showImportPopup}
                setImportPopup={setImportPopup}
                onHide={() => setImportPopup(false)}
            />
        </Layout>
    );
};
const mapStateToProps = ({ schoolRegistration }) => {
    const { schoolsRegistrationList } = schoolRegistration;
    return { schoolsRegistrationList };
};
export default connect(mapStateToProps, {
    getSchoolRegistationBulkUploadActions: getSchoolRegistationBulkUploadList
})(TicketsPage);
