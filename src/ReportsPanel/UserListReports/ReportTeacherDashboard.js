/* eslint-disable react/no-unknown-property */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { Descriptions, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { Col, Row } from 'reactstrap';
import { Button } from '../../stories/Button';
import Layout from '../Layout';
import {
    deleteTempMentorById,
    teacherResetPassword
} from '../../Admin/store/admin/actions';
import { Col, Container, Row, CardBody, CardText } from 'reactstrap';
// import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import jsPDF from 'jspdf';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { URL, KEY } from '../../constants/defaultValues';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/media/logout.svg';
import { useDispatch } from 'react-redux';

import {
    getCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import { Card } from 'react-bootstrap';

const Dashboard = () => {
    // here we can see the registration details //
    const history = useHistory();
    const dispatch = useDispatch();
    const pdfRef = React.useRef(null);
    const inputField = {
        type: 'text',
        className: 'defaultInput'
    };
    const currentUser = getCurrentUser('current_user');
    const MentorData = JSON.parse(localStorage.getItem('teacherData'));

    // const [diesCode, setDiesCode] = useState('');
    // const [orgData, setOrgData] = useState({});
    // const [mentorId, setMentorId] = useState('');
    // const [SRows, setSRows] = React.useState([]);
    const [mentorTeam, setMentorTeam] = useState([]);
    // const [count, setCount] = useState(0);
    // const [error, setError] = useState('');
    // const [isideadisable, setIsideadisable] = useState(false);
    // const Mentor = JSON.parse(localStorage.getItem('mentor'));

    useEffect(() => {
        getMentorIdApi(MentorData.mentor_id);
    }, []);
    // const handleOnChange = (e) => {
    //     // we can give diescode as input //
    //     //where organization_code = diescode //
    //     localStorage.removeItem('organization_code');
    //     setCount(0);
    //     setDiesCode(e.target.value);
    //     setOrgData({});
    //     setError('');
    // };
    // useEffect(async () => {
    //     // where list = diescode //
    //     //where organization_code = diescode //
    //     const list = JSON.parse(localStorage.getItem('organization_code'));
    //     setDiesCode(list);
    //     await apiCall(list);
    // }, []);
    // async function apiCall(list) {
    //     // Dice code list API //
    //     // where list = diescode //
    //     const body = JSON.stringify({
    //         organization_code: list
    //     });
    //     var config = {
    //         method: 'post',
    //         url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: body
    //     };

    //     await axios(config)
    //         .then(async function (response) {
    //             if (response.status == 200) {
    //                 setOrgData(response?.data?.data[0]);
    //                 setCount(count + 1);
    //                 setMentorId(response?.data?.data[0]?.mentor.mentor_id);
    //                 setError('');

    //                 if (response?.data?.data[0]?.mentor.mentor_id) {
    //                     await getMentorIdApi(
    //                         response?.data?.data[0]?.mentor.mentor_id
    //                     );
    //                 }
    //             }
    //         })
    //         .catch(function (error) {
    //             if (error?.response?.data?.status === 404) {
    //                 setError('Entered Invalid UDISE Code');
    //             }
    //             setOrgData({});
    //         });
    // }

    // const handleSearch = (e) => {
    //     //where we can search through diescode //
    //     // we can see Registration Details & Mentor Details //

    //     const body = JSON.stringify({
    //         organization_code: diesCode
    //     });
    //     var config = {
    //         method: 'post',
    //         url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: body
    //     };

    //     axios(config)
    //         .then(async function (response) {
    //             if (response.status == 200) {
    //                 setOrgData(response?.data?.data[0]);
    //                 setCount(count + 1);
    //                 setMentorId(response?.data?.data[0]?.mentor.mentor_id);
    //                 setError('');
    //                 if (response?.data?.data[0]?.mentor.mentor_id) {
    //                     await getMentorIdApi(
    //                         response?.data?.data[0]?.mentor.mentor_id
    //                     );
    //                 }
    //             }
    //         })
    //         .catch(function (error) {
    //             if (error?.response?.data?.status === 404) {
    //                 setError('Entered Invalid Unique Code');
    //             }
    //             setOrgData({});
    //         });
    //     e.preventDefault();
    // };
    //
    async function getMentorIdApi(id) {
        // Mentor Id  Api//
        // id = Mentor Id //
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axiosConfig['params'] = {
            mentor_id: id,
            status: 'ACTIVE',
            ideaStatus: true
        };
        await axios
            .get(`${URL.getTeamMembersList}`, axiosConfig)
            .then((res) => {
                if (res?.status == 200) {
                    var mentorTeamArray = [];
                    res &&
                        res.data &&
                        res.data.data[0] &&
                        res.data.data[0].dataValues.length > 0 &&
                        res.data &&
                        res.data.data[0].dataValues.map((teams, index) => {
                            var key = index + 1;
                            return mentorTeamArray.push({ ...teams, key });
                        });
                    setMentorTeam(mentorTeamArray);
                }
            })
            .catch((err) => {
                return err.response;
            });
    }
    const handleEdit = () => {
        //  here  We can edit the Registration details //
        // Where data = orgData //
        history.push({
            pathname: '/report/mentor/edit-user-profile',
            data: {
                full_name: MentorData.full_name,
                // mobile: orgData.mentor?.mobile,
                username: MentorData.username,
                mentor_id: MentorData.mentor_id,
                where: 'Dashbord',
                organization_code: MentorData.organization_code,
                title: MentorData.title,
                gender: MentorData.gender,
                whatapp_mobile: MentorData.whatapp_mobile
            }
        });
    };

    // const handleEdit = () => {
    //     //  here  We can edit the Registration details //
    //     // Where data = orgData //
    //     history.push({
    //         pathname: '/report/mentor/edit-user-profile',
    //         data: {
    //             full_name: orgData.mentor?.full_name,
    //             // mobile: orgData.mentor?.mobile,
    //             username: orgData.mentor?.user?.username,
    //             mentor_id: orgData.mentor?.mentor_id,
    //             where: 'Dashbord',
    //             organization_code: orgData.organization_code,
    //             title: orgData.mentor?.title,
    //             gender: orgData.mentor?.gender,
    //             whatapp_mobile: orgData.mentor?.whatapp_mobile
    //         }
    //     });
    // };

    // const handleresetpassword = (data) => {
    //     //  here we can reset the password as disecode //
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'btn btn-success',
    //             cancelButton: 'btn btn-danger'
    //         },
    //         buttonsStyling: false
    //     });

    //     swalWithBootstrapButtons
    //         .fire({
    //             title: 'You are attempting to reset the password',
    //             text: 'Are you sure?',
    //             imageUrl: `${logout}`,
    //             showCloseButton: true,
    //             confirmButtonText: 'Reset Password',
    //             showCancelButton: true,
    //             cancelButtonText: 'cancel',
    //             reverseButtons: false
    //         })
    //         .then((result) => {
    //             if (result.isConfirmed) {
    //                 dispatch(
    //                     teacherResetPassword({
    //                         organization_code: data.organization_code,
    //                         mentor_id: data.mentor_id,
    //                         otp: false
    //                     })
    //                 );
    //             } else if (result.dismiss === Swal.DismissReason.cancel) {
    //                 swalWithBootstrapButtons.fire(
    //                     'Cancelled',
    //                     'Reset password is cancelled',
    //                     'error'
    //                 );
    //             }
    //         })
    //         .catch((err) => console.log(err.response));
    // };
    const handleresetpassword = (data) => {
        // We can resset the password//
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'You are attempting to reset the password',
                text: 'Are you sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Reset Password',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(
                        teacherResetPassword({
                            organization_code: data.organization_code,
                            mentor_id: data.mentor_id,
                            otp: false
                        })
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Reset password is cancelled',
                        'error'
                    );
                }
            })
            .catch((err) => console.log(err.response));
    };

    const downloadPDF = () => {
        // where we can download the Registration Details //
        const content = pdfRef.current;
        const doc = new jsPDF('p', 'px', [1280, 1020]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('Detail.pdf');
            }
        });
        console.warn(content);
    };
    const viewDetails = () => {
        // where we can see all details //
        // where orgData = orgnization details , Mentor details //
        history.push({
            pathname: '/report/teacher/View-More-details',
            data: MentorData
        });
        localStorage.setItem('MentorData', JSON.stringify(MentorData));
    };
    // useEffect(() => {
    //     var config = {
    //         method: 'get',
    //         url: process.env.REACT_APP_API_BASE_URL + `/popup/2`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //             Authorization: `Bearer ${currentUser.data[0]?.token}`
    //         }
    //     };
    //     axios(config)
    //         .then(function (response) {
    //             if (response.status === 200) {
    //                 if (response.data.data[0]?.on_off === '1') {
    //                     setIsideadisable(true);
    //                 } else {
    //                     setIsideadisable(false);
    //                 }
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, []);
    const MentorsData = {
        data: mentorTeam,
        columns: [
            {
                name: 'No',
                selector: 'key',
                width: '12%'
            },
            {
                name: 'Team Name',
                selector: 'team_name',
                sortable: true,
                center: true,
                width: '25%'
            },
            {
                name: 'Student Count',
                selector: 'student_count',
                center: true,
                width: '20%'
            },
            {
                name: 'Idea Sub Status',
                selector: 'ideaStatus',
                center: true,
                width: '25%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <>
                            {params.ideaStatus == 'SUBMITTED' && (
                                <Button
                                    key={params}
                                    // className={
                                    //     isideadisable
                                    //         ? `btn btn-success btn-lg mr-5 mx-2`
                                    //         : `btn btn-lg mr-5 mx-2`
                                    // }
                                    className={
                                        'btn btn-success btn-lg mr-5 mx-2'
                                    }
                                    label={'REVOKE'}
                                    size="small"
                                    shape="btn-square"
                                    onClick={() =>
                                        handleRevoke(
                                            params.challenge_response_id,
                                            params.ideaStatus
                                        )
                                    }
                                    // disabled={!isideadisable}
                                />
                            )}
                        </>
                    ];
                },
                width: '20%',
                center: true
            }
        ]
    };
    const handleRevoke = async (id, type) => {
        // where id = challenge response id //
        // here we  can see the Revoke button when ever idea is submitted //
        // where type = ideaStatus //
        let submitData = {
            status: type == 'DRAFT' ? 'SUBMITTED' : 'DRAFT'
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/updateEntry/' +
                JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: submitData
        };
        axios(config)
            .then(async function (response) {
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        'Idea Submission Status Successfully Update!',
                        ''
                    );
                    await getMentorIdApi(MentorData.mentor_id);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // const handleAlert = (id) => {
    //     // where id = mentor.userid //
    //     // we can delete the userid //
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: 'btn btn-success',
    //             cancelButton: 'btn btn-danger'
    //         },
    //         buttonsStyling: false,
    //         allowOutsideClick: false
    //     });

    //     swalWithBootstrapButtons
    //         .fire({
    //             title: 'You are Delete Organization',
    //             text: 'Are you sure?',
    //             showCloseButton: true,
    //             confirmButtonText: 'Confirm',
    //             showCancelButton: true,
    //             cancelButtonText: 'Cancel',
    //             reverseButtons: false
    //         })
    //         .then(async (result) => {
    //             if (result.isConfirmed) {
    //                 if (result.isConfirmed) {
    //                     await deleteTempMentorById(id);
    //                     setOrgData({});
    //                     setDiesCode('');
    //                 }
    //             } else if (result.dismiss === Swal.DismissReason.cancel) {
    //                 swalWithBootstrapButtons.fire('Cancelled', '', 'error');
    //             }
    //         });
    // };

    return (
        <Layout>
            <div className="dashboard-wrapper pb-5 my-5 px-5">
                <h2 className="mb-5">Dashboard </h2>
                <div className="dashboard p-5 mb-5">
                    <div className="text-right">
                        <Button
                            label="Back"
                            size="small"
                            btnClass="primary mb-3"
                            type="cancel"
                            onClick={() => history.push('/report/userlist')}
                        />
                    </div>
                    <div className="row " style={{ overflow: 'auto' }}>
                        <div className=" row  col-12 col-md-12">
                            <div
                                style={{ flex: 1, overflow: 'auto' }}
                                className="bg-white rounded px-5 py-3 col-lg-12 disc-card-search col-12"
                            >
                                {/* <h2 className="mt-3">
                                    Search Registration Details
                                </h2> */}
                                {/* <Row className="text-center justify-content-md-center my-4">
                                    <Col md={9} lg={12}>
                                        <Row>
                                            <Col md={9} className="my-auto">
                                                <Input
                                                    {...inputField}
                                                    id="organization_code"
                                                    onChange={(e) =>
                                                        handleOnChange(e)
                                                    }
                                                    value={diesCode}
                                                    name="organization_code"
                                                    placeholder="Enter Unique Code"
                                                    className="w-100 mb-3 mb-md-0"
                                                    style={{
                                                        borderRadius: '60px',
                                                        padding: '9px 11px'
                                                    }}
                                                />
                                            </Col>
                                            <Col md={3} className="partner-btn">
                                                <Button
                                                    label={'Search'}
                                                    btnClass="primary tex-center my-0 py-0 mx-3 px-3"
                                                    style={{
                                                        fontSize: '15px',
                                                        height: '35px'
                                                    }}
                                                    size="small"
                                                    onClick={(e) =>
                                                        handleSearch(e)
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> */}

                                {/* {orgData &&
                                orgData?.organization_name &&
                                orgData?.mentor !== null ? ( */}
                                <>
                                    {/* <div className="mb-5 p-3" >  */}
                                    {/* <div
                                                className="container-fluid card shadow border" ref={pdfRef}
                                                // style={{
                                                //     width: '300px',
                                                //     height: '300px'
                                                // }}
                                            > */}
                                    <div ref={pdfRef}>
                                        <div className="row">
                                            <div className="col">
                                                <h2 className="text-center m-3 text-primary ">
                                                    Registration Details
                                                </h2>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col">
                                                {/* <ul className="p-0">
                                                            <li className="d-flex justify-content-between">
                                                                School:
                                                                <p>
                                                                    {
                                                                        orgData.organization_name
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li className="d-flex justify-content-between">
                                                                City:{' '}
                                                                <p>
                                                                    {
                                                                        orgData.city
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li className="d-flex justify-content-between">
                                                                District:{' '}
                                                                <p>
                                                                    {
                                                                        orgData.district
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li className="d-flex justify-content-between">
                                                                Mentor Name:{' '}
                                                                <p>
                                                                    {
                                                                        orgData
                                                                            .mentor
                                                                            ?.full_name
                                                                    }
                                                                </p>
                                                            </li>
                                                            <li className="d-flex justify-content-between">
                                                                Mentor Mobile No
                                                                :{' '}
                                                                <p>
                                                                    {
                                                                        orgData
                                                                            .mentor
                                                                            ?.user
                                                                            ?.username
                                                                    }
                                                                </p>
                                                            </li>
                                                        </ul> */}
                                                <Row className="pt-3 pb-3">
                                                    <Col
                                                        xs={5}
                                                        sm={5}
                                                        md={5}
                                                        xl={5}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>School</p>
                                                    </Col>
                                                    <Col
                                                        xs={1}
                                                        sm={1}
                                                        md={1}
                                                        xl={1}
                                                    >
                                                        :
                                                    </Col>
                                                    <Col
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        xl={6}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>
                                                            {
                                                                MentorData
                                                                    ?.organization
                                                                    ?.organization_name
                                                            }
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="pt-3 pb-3">
                                                    <Col
                                                        xs={5}
                                                        sm={5}
                                                        md={5}
                                                        xl={5}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>City</p>
                                                    </Col>
                                                    <Col
                                                        xs={1}
                                                        sm={1}
                                                        md={1}
                                                        xl={1}
                                                    >
                                                        :
                                                    </Col>
                                                    <Col
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        xl={6}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>
                                                            {' '}
                                                            {MentorData?.city
                                                                ? MentorData?.city
                                                                : '-'}
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="pt-3 pb-3">
                                                    <Col
                                                        xs={5}
                                                        sm={5}
                                                        md={5}
                                                        xl={5}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>District</p>
                                                    </Col>
                                                    <Col
                                                        xs={1}
                                                        sm={1}
                                                        md={1}
                                                        xl={1}
                                                    >
                                                        :
                                                    </Col>
                                                    <Col
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        xl={6}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>
                                                            {
                                                                MentorData
                                                                    ?.organization
                                                                    ?.district
                                                            }
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="pt-3 pb-3">
                                                    <Col
                                                        xs={5}
                                                        sm={5}
                                                        md={5}
                                                        xl={5}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>Mentor Name</p>
                                                    </Col>
                                                    <Col
                                                        xs={1}
                                                        sm={1}
                                                        md={1}
                                                        xl={1}
                                                    >
                                                        :
                                                    </Col>
                                                    <Col
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        xl={6}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>
                                                            {
                                                                MentorData.full_name
                                                            }
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="pt-3 pb-3">
                                                    <Col
                                                        xs={5}
                                                        sm={5}
                                                        md={5}
                                                        xl={5}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>Mentor Mobile No</p>
                                                    </Col>
                                                    <Col
                                                        xs={1}
                                                        sm={1}
                                                        md={1}
                                                        xl={1}
                                                    >
                                                        :
                                                    </Col>
                                                    <Col
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        xl={6}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>
                                                            {
                                                                MentorData.username
                                                            }
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="pt-3 pb-3">
                                                    <Col
                                                        xs={5}
                                                        sm={5}
                                                        md={5}
                                                        xl={5}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>
                                                            WhatsApp Mobile No
                                                        </p>
                                                    </Col>
                                                    <Col
                                                        xs={1}
                                                        sm={1}
                                                        md={1}
                                                        xl={1}
                                                    >
                                                        :
                                                    </Col>
                                                    <Col
                                                        xs={6}
                                                        sm={6}
                                                        md={6}
                                                        xl={6}
                                                        className="my-auto profile-detail"
                                                    >
                                                        <p>
                                                            {
                                                                MentorData.whatapp_mobile
                                                            }
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                    {/* <div className="d-flex justify-content-between"> */}
                                    <div className="d-flex justify-content-between flex-column flex-md-row">
                                        <button
                                            className="btn  rounded-pill px-4  text-white mt-2 mt-md-0 ml-md-2"
                                            style={{
                                                backgroundColor: '#ffcb34'
                                            }}
                                            onClick={handleEdit}
                                            //className="btn btn-warning btn-lg  px-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleresetpassword({
                                                    mentor_id:
                                                        MentorData.mentor_id,
                                                    organization_code:
                                                        MentorData.organization_code
                                                })
                                            }
                                            className="btn btn-info rounded-pill px-4  text-white mt-2 mt-md-0 ml-md-2"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={() => {
                                                downloadPDF();
                                            }}
                                            className="btn btn-primary rounded-pill px-4 mt-2 mt-md-0 ml-md-2"
                                        >
                                            Download
                                        </button>

                                        <button
                                            onClick={viewDetails}
                                            className="btn btn-success rounded-pill px-4 mt-2 mt-md-0 ml-md-2"
                                        >
                                            View Details
                                        </button>

                                        {/* <button
                                                onClick={() => {
                                                    handleAlert(
                                                        orgData.mentor?.user_id
                                                    );
                                                }}
                                                className="btn  btn-lg  rounded-pill mt-2 mt-md-0 ml-md-2"
                                                style={{
                                                    backgroundColor: '#dc3545'
                                                }}
                                            >
                                                Delete
                                            </button> */}
                                    </div>

                                    {/* <div className="mb-5 p-3"> */}
                                    {/* <div className="container-fluid card shadow border"> */}
                                    <div>
                                        <div className="row">
                                            <div className="col">
                                                <h2 className="text-center m-3 text-primary">
                                                    Teams Registered
                                                </h2>
                                                <hr />
                                            </div>
                                        </div>
                                        <div>
                                            <DataTableExtensions
                                                print={false}
                                                export={false}
                                                {...MentorsData}
                                            >
                                                <DataTable
                                                    noHeader
                                                    defaultSortField="id"
                                                    defaultSortAsc={false}
                                                    highlightOnHover
                                                />
                                            </DataTableExtensions>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </>
                                {/* ) : (
                                    count != 0 && (
                                        <div className="text-success fs-highlight d-flex justify-content-center align-items-center">
                                            <span>
                                                Still No Teacher Registered
                                            </span>
                                        </div>
                                    )
                                )}
                                {error && diesCode && (
                                    <div className="text-danger mt-3 p-4 fs-highlight d-flex justify-content-center align-items-center">
                                        <span>{error}</span>
                                    </div>
                                )}
                                {!diesCode && (
                                    <div className="d-flex  mt-3 p-4 justify-content-center align-items-center">
                                        <span className="text-primary fs-highlight">
                                            Enter Unique Code
                                        </span>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
