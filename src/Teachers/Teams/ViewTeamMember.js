/* eslint-disable indent */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Tabs } from 'antd';
// import TicketDataTable from './TicketDataTable';
import Layout from '../Layout';
// import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { Button } from '../../stories/Button';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import dummyCSV from '../../media/basic-csv.csv';
import {
    // getAdminTeamsList,
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
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useTranslation } from 'react-i18next';
import DoubleBounce from '../../components/Loaders/DoubleBounce';

// const { TabPane } = Tabs;

const ViewTeamMember = () => {
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

    const headingDetails = {
        title: teamID.team_name + t('teacher_teams.view_team_member_details'),
        options: [
            {
                title: t('teacher_teams.teamslist'),
                path: '/teacher/teamlist'
            },
            {
                title: t('teacher_teams.view_team_member')
            }
        ]
    };
    const [count, setCount] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [teamsMembersList, setTeamsMemers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        handleteamMembersAPI(teamId);
        // here teamId = team id //
    }, [teamId, count]);

    async function handleteamMembersAPI(teamId) {
        // here we can get all team member details //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/teams/' +
                teamId +
                '/members' +
                '?status=ACTIVE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log('response.data.data', response.data.data);
                    const updatedWithKey =
                        response.data &&
                        response.data.data.map((item, i) => {
                            const upd = { ...item };
                            upd['key'] = i + 1;
                            return upd;
                        });
                    setTeamsMemers(updatedWithKey && updatedWithKey);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
        data: teamsMembersList.length > 0 && teamsMembersList,
        columns: [
            {
                name: 'S.No',
                selector: 'key',
                width: '6%'
            },
            {
                name: 'User Id',
                selector: 'user.username',
                width: '16%'
            },
            {
                name: 'Default Password',
                selector: 'UUID',
                width: '20%'
            },
            {
                name: t('teacher_teams.student_name'),
                selector: 'full_name',
                width: '16%'
            },
            {
                name: 'Class',
                selector: 'Grade',
                width: '10%'
            },
            {
                name: t('teacher_teams.age'),
                selector: 'Age',
                width: '10%'
            },

            {
                name: t('teacher_teams.gender'),
                selector: 'Gender',
                width: '10%'
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
                            {teamsMembersList &&
                                teamsMembersList.length > 2 && (
                                    <i
                                        key={params.team_id}
                                        className="fa fa-trash"
                                        style={{ marginRight: '10px' }}
                                    />
                                )}
                        </a>,
                        <a onClick={() => handleResetPassword(params)}>
                            <i key={params.team_id} className="fa fa-key" />
                        </a>
                    ];
                },
                width: '12%',
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
                            <BreadcrumbTwo {...headingDetails} />
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
                    {/* 
                    <p>
                        {t('teacher_teams.team_name')}: {teamID.team_name}
                    </p> */}
                    <div className="ticket-data">
                        <Tabs defaultActiveKey="1">
                            {teamsMembersList &&
                            !teamsMembersList.length > 0 ? (
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
                                            // pagination
                                            highlightOnHover
                                            fixedHeader
                                            subHeaderAlign={Alignment.Center}
                                        />
                                    </DataTableExtensions>
                                </div>
                            )}
                        </Tabs>
                    </div>
                </Row>
            </Container>
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
