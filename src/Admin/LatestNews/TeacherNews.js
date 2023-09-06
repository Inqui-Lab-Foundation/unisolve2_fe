/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';
// import { ReactDOM } from 'react-dom';
// import * as ReactDOM from 'react-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import logout from '../../assets/media/logout.svg';

import 'sweetalert2/src/sweetalert2.scss';
const AdminLatestNews = () => {
    const history = useHistory();
    const [resList, setResList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    const [reqList, setReqList] = useState(false);

    const currentUser = getCurrentUser('current_user');
    useEffect(async () => {
        teacherList();
    }, []);
    const teacherList = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/latest_news/list?category=mentor',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResList(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleBack = (e) => {
        // here we can go back to main page //
        setReqList(false);
    };
    async function handleNewStatus(data, value) {
        const body = {
            status: data.status,
            category: data.category,
            details: data.details,
            new_status: value
        };
        let config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/latest_news/${data.latest_news_id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (value === '0') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Disabled successfully'
                        );
                    } else if (value === '1') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Enabled successfully'
                        );
                    }
                    teacherList();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleEdit = (item) => {
        // where we can edit level name, no of evaluation //
        history.push({
            pathname: '/admin/LatestNews/editLatestNews'
        });
        localStorage.setItem('newsID', JSON.stringify(item));
    };
    const handleDelete = (item) => {
        // here we can delete the team //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure you want to delete this news?',
                text: 'Are you sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Delete',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/latest_news/' +
                            item.latest_news_id,
                        headers: {
                            'Content-Type': 'application/json',
                            // Accept: "application/json",
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                openNotificationWithIcon(
                                    'success',
                                    'News succesfully deleted'
                                );
                                teacherList();
                            } else {
                                openNotificationWithIcon(
                                    'error',
                                    'Opps! Something Wrong'
                                );
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Team not Deleted',
                        'error'
                    );
                }
            });
    };
    const handleStudentList = async (e) => {
        // alert('hii');
        // here we can see  list of inActive institutions //
        await stuList();
    };
    const handleStuDelete = (itemA) => {
        // here we can delete the team //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure you want to delete this news?',
                text: 'Are you sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Delete',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/latest_news/' +
                            itemA.latest_news_id,
                        headers: {
                            'Content-Type': 'application/json',
                            // Accept: "application/json",
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                openNotificationWithIcon(
                                    'success',
                                    'News succesfully deleted'
                                );
                                stuList();
                            } else {
                                openNotificationWithIcon(
                                    'error',
                                    'Opps! Something Wrong'
                                );
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Team not Deleted',
                        'error'
                    );
                }
            });
    };
    async function handleNewStuStatus(item, number) {
        const body = {
            status: item.status,
            category: item.category,
            details: item.details,
            new_status: number
        };
        let config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/latest_news/${item.latest_news_id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: JSON.stringify(body)
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (number === '0') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Disabled successfully'
                        );
                    } else if (number === '1') {
                        openNotificationWithIcon(
                            'success',
                            'New Status Enabled successfully'
                        );
                    }
                    stuList();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const stuList = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/latest_news/list?category=student',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response, 'stu');
                    setStudentList(response.data.data);
                    setReqList(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const stuNewsData = {
        data: studentList && studentList.length > 0 ? studentList : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'Role',
                selector: 'category',
                width: '12rem'
            },
            {
                name: 'New Icon',
                width: '12rem',
                cell: (record) => {
                    if (record.new_status === '1') {
                        return (
                            <button
                                className="btn btn-danger btn-lg mx-2"
                                onClick={() => {
                                    handleNewStuStatus(record, '0');
                                }}
                            >
                                Disable
                            </button>
                        );
                    } else if (record.new_status === '0') {
                        return (
                            <button
                                className="btn btn-success btn-lg mx-2"
                                onClick={() => {
                                    handleNewStuStatus(record, '1');
                                }}
                            >
                                Enable
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Details',
                selector: 'details',
                width: '40rem'
            },
            {
                name: 'File',
                width: '13rem',
                cell: (record) => {
                    if (record.file_name === null) {
                        return <p>No file</p>;
                    } else {
                        return (
                            <button className="btn btn-warning btn-lg mx-2">
                                <a
                                    href={record.file_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Download
                                </a>
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Link',
                width: '13rem',
                cell: (record) => {
                    if (record.url === null) {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Navigate
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Actions',
                width: '20rem',
                selector: 'action',
                center: true,
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleStuDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                DELETE
                            </div>
                        </div>
                    </>
                ]
            }
        ]
    };

    const resData = {
        data: resList && resList.length > 0 ? resList : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'Role',
                selector: 'category',
                width: '12rem'
            },
            {
                name: 'New Icon',
                width: '12rem',
                cell: (record) => {
                    if (record.new_status === '1') {
                        return (
                            <button
                                className="btn btn-danger btn-lg mx-2"
                                onClick={() => {
                                    handleNewStatus(record, '0');
                                }}
                            >
                                Disable
                            </button>
                        );
                    } else if (record.new_status === '0') {
                        return (
                            <button
                                className="btn btn-success btn-lg mx-2"
                                onClick={() => {
                                    handleNewStatus(record, '1');
                                }}
                            >
                                Enable
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Details',
                selector: 'details',
                width: '40rem'
            },
            {
                name: 'File',
                width: '13rem',
                cell: (record) => {
                    if (record.file_name === null) {
                        return <p>No file</p>;
                    } else {
                        return (
                            <button className="btn btn-warning btn-lg mx-2">
                                <a
                                    href={record.file_name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Download
                                </a>
                            </button>
                        );
                    }
                }
            },
            {
                name: 'Link',
                width: '13rem',
                cell: (record) => {
                    if (record.url === null) {
                        return <p>No link</p>;
                    } else {
                        return (
                            <a
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Navigate
                            </a>
                        );
                    }
                }
            },
            {
                name: 'Actions',
                width: '20rem',
                selector: 'action',
                center: true,
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                DELETE
                            </div>
                        </div>
                    </>
                ]
            }
        ]
    };
    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50">
                <Row className="pt-3">
                    <Col className="col-auto">
                        {reqList ? (
                            <h2>Student Latest News</h2>
                        ) : (
                            <h2>Teacher Latest News</h2>
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
                        ) : (
                            <div className="d-flex justify-content-end">
                                <Button
                                    label="Student Latest News"
                                    btnClass=" btn btn-success"
                                    size="small"
                                    shape="btn-square"
                                    // Icon={BsPlusLg}
                                    onClick={(e) => handleStudentList(e)}
                                />
                                <Button
                                    label="Create LatestNews"
                                    btnClass="primary mx-3"
                                    size="small"
                                    shape="btn-square"
                                    onClick={() =>
                                        history.push(
                                            '/admin/LatestNews/createLatestNews'
                                        )
                                    }
                                />
                            </div>
                        )}
                    </Col>
                    {reqList ? (
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={true}
                                {...stuNewsData}
                                exportHeaders
                            >
                                <DataTable
                                    // data={SRows}
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    ) : (
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={false}
                                {...resData}
                                exportHeaders
                            >
                                <DataTable
                                    // data={setResList}
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
                    )}
                </Row>
            </Container>
            {/* <h1>hi</h1> */}
        </Layout>
    );
};

export default AdminLatestNews;
