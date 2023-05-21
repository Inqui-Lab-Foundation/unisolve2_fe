/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import { Tabs } from 'antd';
import Layout from '../../Admin/Layout';
import { Link } from 'react-router-dom';

import {
    // BsPlusLg,
    BsUpload
    // BsGraphUp
} from 'react-icons/bs';
import { Button } from '../../stories/Button';
import { connect } from 'react-redux';
// import dummyCSV from '../../assets/media/basic-csv.csv';
import {
    getAdmin,
    getAdminEvalutorsList,
    getAdminMentorsList,
    getAdminMentorsListSuccess,
    updateMentorStatus
} from '../../redux/actions';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues.js';

import {
    getNormalHeaders
    // getCurrentUser,
    // openNotificationWithIcon
} from '../../helpers/Utils';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/media/logout.svg';
import ImportPopup from './ImportPopup';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {
    getDistrictData,
    getStudentListSuccess,
    getStudentRegistationData,
    updateStudentStatus
} from '../../redux/studentRegistration/actions';
import { Badge } from 'react-bootstrap';
import CommonPage from '../../components/CommonPage';
import { updateEvaluator } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Register from '../../Evaluator/Register';
import dist from 'react-data-table-component-extensions';

const { TabPane } = Tabs;

const SelectDists = ({ getDistrictsListAction, dists, tab, setDist }) => {
    const [dsts, setNewDist] = useState('');

    useEffect(async () => {
        const dist = localStorage.getItem('dist');
        await setNewDist(dist);
    }, [localStorage.getItem('dist')]);
    useEffect(() => {
        if (tab && (tab == 1 || tab == 2)) getDistrictsListAction();
    }, [tab]);
    const handleDists = (e) => {
        setNewDist(e.target.value);
        setDist(e.target.value);
    };
    return (
        <select
            onChange={handleDists}
            name="districts"
            id="districts"
            value={dsts}
            className="text-capitalize"
        >
            <option value="">Select District</option>
            {dists && dists.length > 0 ? (
                dists.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))
            ) : (
                <option value="">There are no Districts</option>
            )}
        </select>
    );
};
const TicketsPage = (props) => {
    // const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    const [showImportPopup, setImportPopup] = useState(false);
    const [menter, activeMenter] = useState(false);
    // const [admin, activeAdmin] = useState(false);
    const [evaluater, activeEvaluater] = useState(false);
    const [tab, setTab] = useState('1');
    const [studentDist, setstudentDist] = useState('');
    const [mentorDist, setmentorDist] = useState('');
    const [newDist, setNewDists] = useState('');
    const [registerModalShow, setRegisterModalShow] = useState(false);
    useEffect(() => {
        if (tab === 3) {
            props.getEvaluatorListAction();
        } else if (tab === 4) {
            props.getAdminListAction();
        }
    }, [tab]);

    useEffect(() => {
        if (Number(tab) === 1 && studentDist !== '') {
            props.getStudentListAction(studentDist);
        }
    }, [tab, studentDist]);
    useEffect(() => {
        if (Number(tab) === 2 && mentorDist !== '') {
            props.getAdminMentorsListAction('ALL', mentorDist);
        }
    }, [tab, mentorDist]);

    const [rows, setRows] = React.useState([]);
    const [mentorRows, setMentorRows] = React.useState([]);

    useEffect(() => {
        const mentorTimeout = setTimeout(() => {
            setMentorRows(TableMentorsProps.data);
        }, 2000);
        return () => clearTimeout(mentorTimeout);
    }, []);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(StudentsData.data);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    const changeTab = (e) => {
        // here we can see 4 tabs //
        // here e = students / teachers / evaluators / admins //
        setmentorDist('');
        setNewDists('');
        // localStorage.removeItem('dist');
        // localStorage.removeItem('num');
        setstudentDist('');
        localStorage.setItem('tab', e);
        if (e === '4') {
            activeMenter(false);
            activeEvaluater(false);
            props.getAdminListAction();
            // activeAdmin(true);
        } else if (e === '3') {
            activeEvaluater(!evaluater);
            props.getEvaluatorListAction();
            activeMenter(false);
            // activeAdmin(false);
            activeEvaluater(true);
        } else if (e === '2') {
            //props.getAdminMentorsListAction('ALL',mentorDist);
            dispatch(getAdminMentorsListSuccess([], 0));
            activeMenter(!menter);
            // activeAdmin(false);
            activeEvaluater(false);
        } else {
            activeEvaluater(false);
            activeMenter(false);
            dispatch(getStudentListSuccess([]));
        }
    };
    useEffect(() => {
        if (localStorage.getItem('tab')) {
            setTab(localStorage.getItem('tab'));
        }
    }, [localStorage.getItem('tab')]);

    useEffect(() => {
        // here dist = district //
        if (localStorage.getItem('dist')) {
            const number = localStorage.getItem('num');
            if (number == '2') {
                let dist = localStorage.getItem('dist');
                setmentorDist(dist);
                setNewDists(dist);
                props.getAdminMentorsListAction('ALL', mentorDist);
            } else {
                let dist = localStorage.getItem('dist');
                setstudentDist(dist);
                setNewDists(dist);
                props.getStudentListAction(studentDist);
            }
        }
    }, [localStorage.getItem('dist')]);

    // const viewDetail = (item) => {
    //     props.history.push({
    //         pathname: '/admin/userprofile',
    //         data: item
    //     });
    //     // localStorage.setItem('mentor', JSON.stringify(item));
    // };
    const handleSelect = (item, num) => {
        // where item = student id / mentor id //
        localStorage.removeItem('dist');
        localStorage.removeItem('num');
        if (num == '1') {
            props.history.push({
                pathname: `/admin/userprofile`,
                data: item,
                dist: studentDist,
                num: num
            });
        } else {
            props.history.push({
                pathname: `/admin/userprofile`,
                data: item,
                dist: mentorDist,
                num: num
            });
        }
        localStorage.setItem('mentor', JSON.stringify(item));
    };
    const handleEdit = (item) => {
        // where we can edit user details  //
        // where item = mentor id //
        props.history.push({
            pathname: `/admin/edit-user-profile`,
            data: item
        });
        localStorage.setItem('mentor', JSON.stringify(item));
    };
    // const handleReset = (item) => {
    //     const body = JSON.stringify({
    //         organization_code: item.organization_code,
    //         otp: false,
    //         mentor_id: item.mentor_id
    //     });
    //     var config = {
    //         method: 'put',
    //         url: process.env.REACT_APP_API_BASE_URL + '/mentors/resetPassword',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${currentUser?.data[0]?.token}`
    //         },
    //         data: body
    //     };
    //     axios(config)
    //         .then(function (response) {
    //             if (response.status === 202) {
    //                 openNotificationWithIcon(
    //                     'success',
    //                     'Reset Password Successfully Update!',
    //                     ''
    //                 );
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };
    // const handleDelete = () => {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'btn btn-success',
    //             cancelButton: 'btn btn-danger'
    //         },
    //         buttonsStyling: false
    //     });

    //     swalWithBootstrapButtons
    //         .fire({
    //             title: 'You are attempting to delete Evalauaor.',
    //             text: 'Are you sure?',
    //             imageUrl: `${logout}`,
    //             showCloseButton: true,
    //             confirmButtonText: 'Delete',
    //             showCancelButton: true,
    //             cancelButtonText: 'Cancel',
    //             reverseButtons: false
    //         })
    //         .then((result) => {
    //             if (result.isConfirmed) {
    //                 swalWithBootstrapButtons.fire(
    //                     'Loged out!',
    //                     'Successfully deleted.',
    //                     'success'
    //                 );
    //             } else if (result.dismiss === Swal.DismissReason.cancel) {
    //                 swalWithBootstrapButtons.fire(
    //                     'Cancelled',
    //                     'You are Logged in',
    //                     'error'
    //                 );
    //             }
    //         });
    // };
    const handleStatusUpdateInAdmin = async (data, id) => {
        // where we can update the admin status //
        // where id = admin id //
        // where data = status //
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .put(`${URL.updateMentorStatus + '/' + id}`, data, axiosConfig)
            .then((user) => console.log(user))
            .catch((err) => {
                console.log('error', err);
            });
    };

    const handleStatus = (status, id, type = undefined, all = undefined) => {
        // where we can update the status Active to InActive //
        // where id = student id / mentor id  / admin id / evaluator  id//
        // where status = status //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: `You are attempting to ${
                    status.toLowerCase() === 'active'
                        ? 'activate'
                        : 'inactivate'
                } ${
                    type && type === 'student'
                        ? 'Student'
                        : type && type === 'evaluator'
                        ? 'evaluator'
                        : type && type === 'admin'
                        ? 'Admin'
                        : 'Mentor'
                }.`,
                text: 'Are you sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: status,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (type && type === 'student') {
                        props.studentStatusUpdate({ status }, id);
                        setTimeout(() => {
                            props.getStudentListAction(studentDist);
                        }, 500);
                    } else if (type && type === 'evaluator') {
                        console.warn(status, id, type);
                        dispatch(updateEvaluator({ status }, id));
                        setTimeout(() => {
                            props.getEvaluatorListAction();
                        }, 500);
                    } else if (type && type === 'admin') {
                        const obj = {
                            full_name: all.full_name,
                            username: all.username,
                            // mobile: all.mobile,
                            status
                        };
                        handleStatusUpdateInAdmin({ obj }, id);
                        // dispatch(updateAdmin({ status }, id));
                        setTimeout(() => {
                            props.getAdminListAction();
                        }, 500);

                        // setTimeout(() => {
                        //     props.getEvaluatorListAction();
                        // }, 500);
                    } else {
                        const obj = {
                            full_name: all.full_name,
                            username: all.username,
                            // mobile: all.mobile,
                            status
                        };
                        props.mentorStatusUpdate(obj, id);
                        setTimeout(() => {
                            props.getAdminMentorsListAction('ALL', mentorDist);
                        }, 500);
                    }
                    swalWithBootstrapButtons.fire(
                        `${
                            type && type === 'student'
                                ? 'Student'
                                : type && type === 'evaluator'
                                ? 'evaluator'
                                : type && type === 'admin'
                                ? 'Admin'
                                : 'Mentor'
                        } Status has been changed!`,
                        'Successfully updated.',
                        'success'
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Not updated successfully',
                        'error'
                    );
                }
            });
    };
    const TableMentorsProps = {
        data: props.mentorsList,
        totalItems: props.totalItems,
        columns: [
            {
                name: 'No',
                selector: 'id',
                width: '6%'
            },
            {
                name: 'UDISE',
                selector: 'organization_code',
                width: '13%'
            },

            {
                name: 'Teacher Name',
                selector: 'full_name',
                width: '21%'
            },

            {
                name: 'Email',
                selector: 'username',
                width: '22%'
            },
            // {
            //     name: 'Phone',
            //     selector: 'mobile',
            //     width: '10%'
            // },
            {
                name: 'Status',
                cell: (row) => [
                    <Badge
                        key={row.mentor_id}
                        bg={`${
                            row.status === 'ACTIVE' ? 'secondary' : 'danger'
                        }`}
                    >
                        {row.status}
                    </Badge>
                ],
                width: '9%'
            },
            {
                name: 'Actions',
                selector: 'action',
                width: '35%',
                cell: (record) => [
                    // <Link
                    //     exact="true"
                    //     key={record.id}
                    //     onClick={() => handleReset(record)}
                    //     style={{ marginRight: '10px' }}
                    // >
                    //     <div className="btn btn-success btn-lg">RESET</div>
                    // </Link>,
                    <Link
                        exact="true"
                        key={record.id}
                        onClick={() => handleSelect(record, '2')}
                        style={{ marginRight: '10px' }}
                    >
                        <div className="btn btn-primary btn-lg">VIEW</div>
                    </Link>,
                    // <Link
                    //     exact="true"
                    //     key={record.id}
                    //     onClick={() => handleEdit(record)}
                    //     style={{ marginRight: '10px' }}
                    // >
                    //     <div className="btn btn-warning btn-lg">EDIT</div>
                    // </Link>,
                    <Link
                        exact="true"
                        key={record.id}
                        className="mr-5"
                        onClick={() => {
                            let status =
                                record?.status === 'ACTIVE'
                                    ? 'INACTIVE'
                                    : 'ACTIVE';
                            handleStatus(
                                status,
                                record?.mentor_id,
                                undefined,
                                record
                            );
                        }}
                    >
                        {record?.status === 'ACTIVE' ? (
                            <div className="btn btn-danger btn-lg">
                                INACTIVE
                            </div>
                        ) : (
                            <div className="btn btn-success btn-lg">ACTIVE</div>
                        )}
                    </Link>
                ]
            }
        ]
    };
    const StudentsData = {
        data: props.studentList,
        columns: [
            {
                name: 'No',
                selector: 'id',
                width: '6%'
                // center: true,
            },
            {
                name: 'Team Name',
                selector: 'team.team_name',
                // sortable: true,
                width: '17%'
                // center: true,
            },
            {
                name: 'Student Name',
                selector: 'full_name',
                width: '20%'
                // center: true,
            },
            {
                name: 'Grade',
                selector: 'Grade',
                width: '9%'
                // center: right,
            },
            {
                name: 'Age',
                selector: 'Age',
                width: '8%'
                // center: right,
            },
            {
                name: 'Gender',
                selector: 'Gender',
                width: '10%'
                // center: right,
            },
            {
                name: 'Status',
                cell: (row) => [
                    <Badge
                        key={row.mentor_id}
                        bg={`${
                            row.status === 'ACTIVE' ? 'secondary' : 'danger'
                        }`}
                    >
                        {row.status}
                    </Badge>
                ],
                width: '8%'
            },
            {
                name: 'Actions',
                sortable: false,
                selector: 'null',
                width: '19%',
                cell: (record) => [
                    <Link
                        key={record.id}
                        exact="true"
                        // onClick={viewDetail}
                        onClick={() => handleSelect(record, '1')}
                        style={{ marginRight: '10px' }}
                    >
                        <div className="btn btn-primary btn-lg mr-5">VIEW</div>
                    </Link>,
                    <Link
                        key={record.id}
                        exact="true"
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            let status =
                                record?.status === 'ACTIVE'
                                    ? 'INACTIVE'
                                    : 'ACTIVE';
                            handleStatus(status, record?.student_id, 'student');
                        }}
                    >
                        {record?.status === 'ACTIVE' ? (
                            <div className="btn btn-danger btn-lg">
                                INACTIVE
                            </div>
                        ) : (
                            <div className="btn btn-warning btn-lg">ACTIVE</div>
                        )}
                    </Link>
                ]
            }
        ]
    };
    const evaluatorsData = {
        data: props.evalutorsList,
        columns: [
            {
                name: 'No',
                selector: 'id',
                width: '6%'
            },
            {
                name: 'Evaluator Name',
                selector: 'user.full_name',
                width: '20%'
            },
            {
                name: 'Email',
                selector: 'user.username',
                width: '25%'
            },
            // {
            //     name: 'Mobile',
            //     selector: 'mobile',
            //     width: '11%'
            // },
            {
                name: 'District',
                selector: 'district',
                width: '11%'
            },
            {
                name: 'Status',
                cell: (row) => [
                    <Badge
                        key={row.mentor_id}
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
                sortable: false,
                selector: 'null',
                width: '15%',
                cell: (record) => [
                    // <Link
                    //     key={record.id}
                    //     exact="true"
                    //     onClick={() => handleSelect(record)}
                    //     style={{ marginRight: '10px' }}
                    // >
                    //     <div className="btn btn-primary btn-lg mr-5">View</div>
                    // </Link>,
                    <Link
                        exact="true"
                        key={record.id}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: '10px' }}
                    >
                        <div className="btn btn-primary btn-lg">EDIT</div>
                    </Link>,
                    <Link
                        exact="true"
                        key={record.id}
                        className="mr-5"
                        onClick={() => {
                            let status =
                                record?.status === 'ACTIVE'
                                    ? 'INACTIVE'
                                    : 'ACTIVE';
                            handleStatus(
                                status,
                                record?.evaluator_id,
                                'evaluator'
                            );
                        }}
                    >
                        {record?.status === 'ACTIVE' ? (
                            <div className="btn btn-danger btn-lg">
                                INACTIVE
                            </div>
                        ) : (
                            <div className="btn btn-warning btn-lg">ACTIVE</div>
                        )}
                    </Link>
                ]
            }
        ]
    };
    const adminData = {
        data:
            props.adminData && props.adminData.length > 0
                ? props.adminData
                : [],
        columns: [
            {
                name: 'No',
                selector: (row) => row?.id,
                width: '6%'
            },
            {
                name: 'Admin Name',
                selector: (row) => row?.user?.full_name,
                width: '17%'
            },
            {
                name: 'Email',
                selector: (row) => row?.user?.username,
                width: '27%'
            },
            {
                name: 'Role',
                selector: (row) => row?.user?.role,
                width: '15%',
                cell: (params) => [
                    params.user.role === 'ADMIN' ? (
                        <span className="py-2 px-4 rounded-pill bg-danger bg-opacity-25 text-danger fw-bold">
                            ADMIN
                        </span>
                    ) : params.user.role === 'EADMIN' ? (
                        <span className="py-2 px-4 rounded-pill bg-success bg-opacity-25 text-info fw-bold">
                            EADMIN
                        </span>
                    ) : params.user.role === 'STUDENT' ? (
                        <span className="bg-success bg-opacity-25 px-4 py-2 rounded-pill text-success fw-bold">
                            STUDENT
                        </span>
                    ) : (
                        ''
                    )
                ]
            },
            {
                name: 'Status',
                cell: (row) => [
                    <Badge
                        key={row.mentor_id}
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
                sortable: false,
                selector: 'null',

                width: '25%',
                cell: (record) => [
                    <Link
                        exact="true"
                        className="mr-5"
                        key={record?.id}
                        onClick={() => handleEdit(record)}
                        style={{ marginRight: '10px' }}
                    >
                        <div className="btn btn-primary btn-lg">EDIT</div>
                    </Link>,
                    <Link
                        exact="true"
                        key={record.id}
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            let status =
                                record?.status === 'ACTIVE'
                                    ? 'INACTIVE'
                                    : 'ACTIVE';
                            handleStatus(
                                status,
                                record?.admin_id,
                                'admin',
                                record
                            );
                        }}
                    >
                        {record?.status === 'ACTIVE' ? (
                            <div className="btn btn-danger btn-lg">
                                INACTIVE
                            </div>
                        ) : (
                            <div className="btn btn-secondary btn-lg">
                                ACTIVE
                            </div>
                        )}
                    </Link>
                    // <Link
                    //     key={record?.id}
                    //     exact="true"
                    //     onClick={() => handleSelect(record)}
                    //     style={{ marginRight: '10px' }}
                    // >
                    //     <div className="btn btn-primary btn-lg mr-5">View</div>
                    // </Link>,
                ]
            }
        ]
    };

    // const handleEvaluatorStatus=(status,id)=>{
    //     console.warn(status,id);
    // };

    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50 userlist">
                <Row className="mt-0 pt-3">
                    <h2>User List</h2>
                    {/* <h2 onClick={handleDelete}>User List</h2> */}
                    <div className="ticket-data">
                        <Tabs
                            defaultActiveKey={
                                localStorage.getItem('tab')
                                    ? localStorage.getItem('tab')
                                    : '1'
                            }
                            onChange={(key) => changeTab(key)}
                        >
                            <Row className="mt-0">
                                <Col className="ticket-btn col ml-auto  ">
                                    <div
                                        className={`d-flex ${
                                            tab == 1 || tab == 2
                                                ? ''
                                                : 'justify-content-end'
                                        }`}
                                    >
                                        {tab && tab == 1 && (
                                            <>
                                                <SelectDists
                                                    getDistrictsListAction={
                                                        props.getDistrictsListAction
                                                    }
                                                    setDist={setstudentDist}
                                                    newDist={newDist}
                                                    dists={props.dists}
                                                    tab={tab}
                                                />
                                                {studentDist && (
                                                    <Card className="ms-3 p-3">
                                                        Total Students :{' '}
                                                        {
                                                            props.studentList
                                                                .length
                                                        }
                                                    </Card>
                                                )}
                                            </>
                                        )}
                                        {tab && tab == 2 && (
                                            <>
                                                <SelectDists
                                                    getDistrictsListAction={
                                                        props.getDistrictsListAction
                                                    }
                                                    setDist={setmentorDist}
                                                    newDist={newDist}
                                                    dists={props.dists}
                                                    tab={tab}
                                                />
                                                {mentorDist && (
                                                    <Card className="ms-3 p-3">
                                                        Total Teachers :{' '}
                                                        {
                                                            props.mentorsList
                                                                .length
                                                        }
                                                    </Card>
                                                )}
                                            </>
                                        )}
                                        {tab && (tab == 3 || tab == 4) && (
                                            <Button
                                                label={
                                                    tab == 3
                                                        ? 'Add New Evaluator'
                                                        : 'Add New Admin'
                                                }
                                                btnClass="primary"
                                                size="small"
                                                shape="btn-square"
                                                Icon={BsUpload}
                                                onClick={() =>
                                                    setRegisterModalShow(true)
                                                }
                                            />
                                        )}
                                        {/* <div>
                                            <Button
                                                label="Import"
                                                btnClass="primary-outlined"
                                                size="small"
                                                shape="btn-square"
                                                Icon={BsUpload}
                                                onClick={() =>
                                                    setImportPopup(true)
                                                }
                                            />

                                            <a
                                                href={dummyCSV}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="primary"
                                            >
                                                <Button
                                                    label="Export"
                                                    btnClass="primary-outlined mx-2"
                                                    size="small"
                                                    shape="btn-square"
                                                    Icon={BsGraphUp}
                                                    style={{ color: '#231f20' }}
                                                />
                                            </a>
                                        </div> */}

                                        {/* {menter === true ? (
                                            <Button
                                                label='Add Mentor'
                                                btnClass='primary ml-2'
                                                size='small'
                                                shape='btn-square'
                                                Icon={BsPlusLg}
                                                onClick={() => props.history.push("/admin/add-mentor")}
                                            />
                                        ) : evaluater === true ? (
                                            <Button
                                                label='Add Evaluator'
                                                btnClass='primary ml-2'
                                                size='small'
                                                shape='btn-square'
                                                Icon={BsPlusLg}
                                                onClick={() =>
                                                    props.history.push("/admin/add-evaluator")
                                                }
                                            />
                                        ) : null} */}
                                    </div>
                                </Col>
                            </Row>
                            <TabPane
                                tab="Students"
                                key="1"
                                className="bg-white p-3 mt-2 sub-tab"
                                tabId="1"
                            >
                                {studentDist === '' ? (
                                    <CommonPage text="Please select a district" />
                                ) : (
                                    <div className="my-5">
                                        <DataTableExtensions
                                            {...StudentsData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane
                                tab="Teachers"
                                key="2"
                                className="bg-white p-3 mt-2 sub-tab"
                                tabId="2"
                            >
                                {mentorDist === '' ? (
                                    <CommonPage text="Please select a district" />
                                ) : (
                                    <div className="my-5">
                                        <DataTableExtensions
                                            {...TableMentorsProps}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={mentorRows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane
                                tab="Evaluators"
                                key="3"
                                className="bg-white p-3 mt-2 sub-tab"
                                tabId="3"
                            >
                                <div className="my-5">
                                    <DataTableExtensions
                                        {...evaluatorsData}
                                        exportHeaders
                                    >
                                        <DataTable
                                            responsive={true}
                                            data={props.evalutorsList}
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            fixedHeader
                                            subHeaderAlign={Alignment.Center}
                                        />
                                    </DataTableExtensions>
                                </div>
                            </TabPane>
                            <TabPane
                                tab="Admins"
                                key="4"
                                className="bg-white p-3 mt-2 sub-tab"
                                tabId="4"
                            >
                                <div className="my-5">
                                    <DataTableExtensions
                                        {...adminData}
                                        exportHeaders
                                    >
                                        <DataTable
                                            data={props.adminData}
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            fixedHeader
                                            subHeaderAlign={Alignment.Center}
                                        />
                                    </DataTableExtensions>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Row>
            </Container>
            <ImportPopup
                show={showImportPopup}
                setImportPopup={setImportPopup}
                onHide={() => setImportPopup(false)}
            />
            {registerModalShow && (
                <Register
                    show={registerModalShow}
                    setShow={setRegisterModalShow}
                    onHide={() => setRegisterModalShow(false)}
                    roleToBeAdded={
                        tab &&
                        (tab == 3 ? 'EVALUATOR' : tab == 4 ? 'ADMIN' : null)
                    }
                />
            )}
        </Layout>
    );
};

const mapStateToProps = ({
    adminEvalutors,
    adminMentors,
    studentRegistration,
    admin
}) => {
    const { evalutorsList } = adminEvalutors;
    const { adminData } = admin;
    const { mentorsList, totalItems } = adminMentors;
    const { studentList, dists } = studentRegistration;
    return {
        evalutorsList,
        adminData,
        mentorsList,
        totalItems,
        studentList,
        dists
    };
};
export default connect(mapStateToProps, {
    getAdminMentorsListAction: getAdminMentorsList,
    getStudentListAction: getStudentRegistationData,
    getDistrictsListAction: getDistrictData,
    getEvaluatorListAction: getAdminEvalutorsList,
    getAdminListAction: getAdmin,
    mentorStatusUpdate: updateMentorStatus,
    studentStatusUpdate: updateStudentStatus
})(TicketsPage);
