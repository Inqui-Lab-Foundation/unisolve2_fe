/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Tabs } from 'antd';
import Layout from '../Layout';
import { BsPlusLg } from 'react-icons/bs';
import { Button } from '../../stories/Button';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    getAdminTeamMembersList,
    studentResetPassword
} from '../../redux/actions';
import axios from 'axios';
import { openNotificationWithIcon, getCurrentUser } from '../../helpers/Utils';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/media/logout.svg';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useTranslation } from 'react-i18next';
import DoubleBounce from '../../components/Loaders/DoubleBounce';
import Select from '../../Admin/Challenges/pages/Select';
import { Modal } from 'react-bootstrap';
// const { TabPane } = Tabs;

const ViewTeamMember = (props) => {
    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');
    const teamID = JSON.parse(localStorage.getItem('teamId'));
    const dispatch = useDispatch();
    const history = useHistory();
    const teamId =
        (history &&
            history.location &&
            history.location.item &&
            history.location.item.team_id) ||
        teamID.team_id;
    const StudentCount =
        (history &&
            history.location &&
            history.location.item &&
            history.location.item.StudentCount) ||
        teamID.StudentCount;
    const mentorId =
        (history && history.location && history.location.mentorid) ||
        teamID.mentorid;
    const [count, setCount] = useState(0);
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [show, setShow] = useState(false);
    const [teamlist, setteamlist] = useState([]);
    const [value, setvalue] = useState('');
    const [teamchangeobj, setteamchangeObj] = useState({});
    const [selectedstudent, setselectedstudent] = useState();
    const [IdeaStatus, setIdeaStatus] = useState('No Idea');
    useEffect(async () => {
        props.getAdminTeamMembersListAction(teamId);
        ideaStatusfun();
        // here teamId = team id //
    }, [teamId, count]);

    const teamListbymentorid = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/teams/listwithideaStatus?mentor_id=${mentorId}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    const teamlistobj = {};
                    const listofteams = response.data.data
                        .map((item) => {
                            if (
                                item.StudentCount < 5 &&
                                item.ideaStatus === null
                            ) {
                                teamlistobj[item.team_name] = item.team_id;
                                return item.team_name;
                            }
                        })
                        .filter(Boolean);
                    if (Object.keys(teamlistobj).length > 0) {
                        let index = listofteams.indexOf(teamID.team_name);

                        if (index >= 0) {
                            listofteams.splice(index, 1);
                        }
                    }

                    setteamlist(listofteams);
                    setteamchangeObj(teamlistobj);
                    setShow(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const ideaStatusfun = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/challenge_response/ideastatusbyteamId?team_id=${teamId}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIdeaStatus(response.data.data[0].ideaStatus);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
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
                title: 'You are attempting to delete Team.',
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
                            process.env.REACT_APP_API_BASE_URL + '/teams/' + id,
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
                                    'Team Delete Successfully'
                                );
                                history.push({
                                    pathname: '/teacher/teamlist'
                                });
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

    const handleSwitchTeam = (item) => {
        if (props.teamsMembersList.length > 2) {
            teamListbymentorid();
            setselectedstudent(item);
        } else {
            openNotificationWithIcon('error', 'Opps! Something Wrong');
        }
    };
    const handleChangeStudent = (name) => {
        const body = {
            team_id: teamchangeobj[name].toString(),
            full_name: selectedstudent.full_name
        };
        var config = {
            method: 'PUT',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/students/' +
                selectedstudent.student_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setvalue('');
                    openNotificationWithIcon(
                        'success',
                        t('student team switch success')
                    );
                    history.push({
                        pathname: '/teacher/teamlist'
                    });
                } else {
                    openNotificationWithIcon('error', 'Opps! Something Wrong');
                }
            })

            .catch(function (error) {
                console.log(error);
                if (error.message === 'Request failed with status code 400') {
                    openNotificationWithIcon(
                        'error',
                        'Same Name student already existed in seleted team'
                    );
                }
            });
        setShow(false);
    };

    const handleResetPassword = (data) => {
        // here we can reset password as  user_id //
        // here data = student_id //
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
                cancelButtonText: t('general_req.btn_cancel'),
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(
                        studentResetPassword({
                            user_id: data.user_id.toString()
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

    var adminTeamMembersList = {
        data: props.teamsMembersList.length > 0 && props.teamsMembersList,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                width: '6rem'
            },
            {
                name: 'User Id',
                selector: 'user.username',
                width: '16rem'
            },
            {
                name: 'Default Password',
                selector: 'UUID',
                width: '20rem'
            },
            {
                name: t('teacher_teams.student_name'),
                selector: 'full_name',
                width: '16rem'
            },
            {
                name: 'Class',
                selector: 'Grade',
                width: '10rem'
            },
            {
                name: t('teacher_teams.age'),
                selector: 'Age',
                width: '10rem'
            },

            {
                name: t('teacher_teams.gender'),
                selector: 'Gender',
                width: '10rem'
            },
            {
                name: t('teacher_teams.actions'),
                cell: (params) => {
                    return [
                        <a onClick={() => handleEditTeamMember(params)}>
                            <i
                                key={params.team_id}
                                className="fa fa-edit"
                                style={{ marginRight: '10px' }}
                            />
                        </a>,

                        <a onClick={() => handleDeleteTeamMember(params)}>
                            {props.teamsMembersList &&
                                props.teamsMembersList.length > 2 &&
                                IdeaStatus === 'No Idea' && (
                                    <i
                                        key={params.team_id}
                                        className="fa fa-trash"
                                        style={{ marginRight: '10px' }}
                                    />
                                )}
                        </a>,
                        <a onClick={() => handleResetPassword(params)}>
                            <i key={params.team_id} className="fa fa-key" />
                        </a>,
                        props.teamsMembersList.length > 2 &&
                            IdeaStatus === 'No Idea' && ( // <-- Updated condition
                                <a onClick={() => handleSwitchTeam(params)}>
                                    <i
                                        key={params.team_id}
                                        className="fa fa-user-circle"
                                        style={{ paddingLeft: '10px' }}
                                    />
                                </a>
                            )
                    ];
                },
                width: '12rem',
                center: true
            }
        ]
    };
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(adminTeamMembersList.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const handleEditTeamMember = (item) => {
        // here we can edit team member details //
        // here item = student_id //
        history.push({
            pathname: '/teacher/edit-team-member',
            item: item
        });
    };

    const handleDeleteTeamMember = (item) => {
        // here we can delete the team member details //
        // here item = student_id //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: t('teacher_teams.delete_member_warning'),
                text: t('teacher_teams.sure'),
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: t('teacher_teams.delete'),
                showCancelButton: true,
                cancelButtonText: t('general_req.btn_cancel'),
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/students/' +
                            item.student_id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                setCount(count + 1);
                                openNotificationWithIcon(
                                    'success',
                                    t('teacher_teams.delete_success')
                                );
                                history.push({
                                    pathname: '/teacher/teamlist'
                                });
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
                        t('teacher_teams.delete_cancelled'),
                        t('teacher_teams.delete_member_cancel'),
                        'error'
                    );
                }
            });
    };


    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50 userlist">
                <Row className="pt-5">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <h3>Team Members Details</h3>
                        </Col>

                        <Col className="ticket-btn col ml-auto ">
                            <div className="d-flex justify-content-end">
                                <Button
                                    label={t('teacher_teams.back')}
                                    btnClass="primary ml-2"
                                    size="small"
                                    shape="btn-square"
                                    Icon={BsPlusLg}
                                    onClick={() =>
                                        history.push('/teacher/teamlist')
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="ticket-data">
                        <Tabs defaultActiveKey="1">
                            {props.teamsMembersList &&
                            !props.teamsMembersList.length > 0 ? (
                                <DoubleBounce />
                            ) : (
                                <div className="my-2">
                                    <DataTableExtensions
                                        print={false}
                                        export={false}
                                        {...adminTeamMembersList}
                                    >
                                        <DataTable
                                            data={rows}
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            highlightOnHover
                                            fixedHeader
                                            subHeaderAlign={Alignment.Center}
                                        />
                                    </DataTableExtensions>
                                </div>
                            )}
                        </Tabs>
                    </div>
                    {StudentCount <= 2 && IdeaStatus === 'No Idea' && (
                        <div className="p-5">
                            <Button
                                label={t('teacher_teams.delete')}
                                btnClass="primary ml-2"
                                size="small"
                                shape="btn-square"
                                style={{
                                    color: '#ffffff',
                                    backgroundColor: 'red'
                                }}
                                Icon={BsPlusLg}
                                onClick={() => handleDelete(teamId)}
                            />
                        </div>
                    )}
                </Row>
            </Container>
            {show && (
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    //{...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="assign-evaluator ChangePSWModal teacher-register-modal"
                    backdrop="static"
                    scrollable={true}
                >
                    <Modal.Header closeButton onHide={() => setShow(false)}>
                        <Modal.Title
                            id="contained-modal-title-vcenter"
                            className="w-100 d-block text-center"
                        >
                            Teams Change
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="my-3 text-center w-50%">
                            <h3 className="mb-sm-4 mb-3">
                                Please select Team to switch student
                            </h3>
                            <Select
                                list={teamlist}
                                setValue={setvalue}
                                placeHolder={'Please Select team'}
                                value={value}
                            />
                        </div>

                        <div className="text-center">
                            <Button
                                label={'Submit'}
                                btnClass={!value ? 'default' : 'primary'}
                                size="small "
                                onClick={() => handleChangeStudent(value)}
                                disabled={!value}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </Layout>
    );
};

const mapStateToProps = ({ teams }) => {
    const { teamsMembersList } = teams;
    return { teamsMembersList };
};

export default connect(mapStateToProps, {
    getAdminTeamMembersListAction: getAdminTeamMembersList
})(ViewTeamMember);
