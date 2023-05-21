/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, List, Label, Card } from 'reactstrap';
import { Tabs, Space } from 'antd';
import TicketDataTable from './TicketDataTable';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { Button } from '../../stories/Button';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import dummyCSV from '../../media/basic-csv.csv';
import {
    getAdminTeamsList,
    getAdminTeamMembersList
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

// const { TabPane } = Tabs;

const TicketsPage = (props) => {
    const history = useHistory();
    const { t } = useTranslation();
    const dashboardStates = useSelector(
        (state) => state.teacherDashBoard.dashboardStates
    );

    localStorage.setItem('teamId', JSON.stringify(''));
    const [count, setCount] = useState(0);
    // const [show, setDelete] = useState(false);

    const [teamsArray, setTeamsArray] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [teamMembersListArray, setTeamMembersArray] = useState([]);
    // const [newTeamMembersListArray, setNewTeamMembersArray] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [teamId, setTeamId] = useState('');

    const currentUser = getCurrentUser('current_user');
    const [pending, setPending] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(adminTeamsList.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    useEffect(() => {
        setLoading(true);
        props
            .getAdminTeamsListAction(currentUser?.data[0]?.mentor_id)
            .then(() => setLoading(false));
    }, [count]);

    useEffect(() => {
        setLoading(true);
        var teamsArrays = [];
        props.teamsList.map((teams, index) => {
            var key = index + 1;
            return teamsArrays.push({ ...teams, key });
        });
        setTeamsArray(teamsArrays);
        setLoading(false);
    }, [props.teamsList]);

    // useEffect(() => {
    //     props.getAdminTeamMembersListAction(teamId);
    // }, [teamId]);

    useEffect(() => {
        var teamsMembersArrays = [];
        props.teamsMembersList.length > 0 &&
            props.teamsMembersList.map((teams, index) => {
                var key = index + 1;
                return teamsMembersArrays.push({ ...teams, key });
            });
        setTeamMembersArray(teamsMembersArrays);
    }, [props.teamsMembersList.length > 0]);

    const adminTeamsList = {
        data: teamsArray,
        columns: [
            {
                name: t('teacher_teams.s_no'),
                selector: 'key',
                width: '10%'
            },
            {
                name: t('teacher_teams.team_name'),
                selector: 'team_name',
                sortable: true,
                width: '20%'
            },
            {
                name: t('teacher_teams.team_members_count'),
                selector: 'student_count',
                width: '20%'
            },
            {
                name: t('teacher_teams.actions'),
                cell: (params) => {
                    return [
                        <Link
                            key={params}
                            exact="true"
                            onClick={() => handleCreate(params)}
                        >
                            {process.env.REACT_APP_TEAM_LENGTH >
                                params.student_count && (
                                <div className="btn btn-success btn-lg mr-5 mx-2">
                                    {t('teacher_teams.create')}
                                </div>
                            )}
                        </Link>,
                        <Link
                            key={params}
                            exact="true"
                            onClick={() => handleView(params)}
                        >
                            {!params.student_count < 1 && (
                                <div className="btn btn-primary btn-lg mr-5">
                                    {t('teacher_teams.view')}
                                </div>
                            )}
                        </Link>,
                        // <Link
                        //     key={params}
                        //     exact='true'
                        //     onClick={() => handleEditTeam(params)}
                        //     // style={{marginRight:"20px"}}
                        // >
                        //     <div className="btn btn-warning btn-lg mr-5 mx-2">{t('teacher_teams.edit')}</div>
                        // </Link>,
                        <Link
                            key={params}
                            exact="true"
                            onClick={() => handleDelete(params)}
                            // style={{marginRight:"20px"}}
                        >
                            {params.student_count <= 2 && (
                                <div className="btn btn-danger btn-lg mx-2">
                                    {t('teacher_teams.delete')}
                                </div>
                            )}
                        </Link>
                    ];
                },
                width: '40%',
                left: true
            }
        ]
    };
    const handleCreate = (item) => {
        // where item = team name //
        // where we can add team member details //
        history.push({
            pathname: `/teacher/create-team-member/${item.team_id}/${
                item.student_count ? item.student_count : 'new'
            }`
        });
    };
    const handleEditTeam = (item) => {
        // item = student //
        // here we can edit the team member details //
        history.push({
            pathname: '/teacher/edit-team',
            item: item
        });
        localStorage.setItem('teamId', JSON.stringify(item));
    };
    const handleView = (item) => {
        // here item = team member details  //
        history.push({
            pathname: '/teacher/view-team-member',
            item: item
        });
        localStorage.setItem('teamId', JSON.stringify(item));
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
                            process.env.REACT_APP_API_BASE_URL +
                            '/teams/' +
                            item.team_id,
                        headers: {
                            'Content-Type': 'application/json',
                            // Accept: "application/json",
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                setCount(count + 1);
                                openNotificationWithIcon(
                                    'success',
                                    'Team Delete Successfully'
                                );
                                props.history.push('/teacher/teamlist');
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

    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50 userlist">
                <Row className="pt-5">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <h2>{t('teacher_teams.team_heading')}</h2>
                        </Col>

                        <Col className="ticket-btn col ml-auto ">
                            <div className="d-flex justify-content-end">
                                <Button
                                    label={t('teacher_teams.create_team')}
                                    btnClass="primary ml-2"
                                    size="small"
                                    shape="btn-square"
                                    Icon={BsPlusLg}
                                    onClick={() =>
                                        history.push('/teacher/create-team')
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="ticket-data">
                        <Tabs defaultActiveKey="1">
                            {loading && teamsArray && !teamsArray.length > 0 ? (
                                <DoubleBounce />
                            ) : (
                                <div className="my-2">
                                    <DataTableExtensions
                                        print={false}
                                        export={false}
                                        {...adminTeamsList}
                                    >
                                        <DataTable
                                            data={rows}
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            fixedHeader
                                            subHeaderAlign={Alignment.Center}
                                            paginationRowsPerPageOptions={[
                                                25, 50, 100
                                            ]}
                                            paginationPerPage={25}
                                        />
                                    </DataTableExtensions>
                                </div>
                            )}
                        </Tabs>
                    </div>
                </Row>
                <Row className="pt-5">
                    <Card className="w-100 p-5">
                        <Label>Instructions</Label>
                        <List>
                            <li>
                                Each team needs to have a minimum of 2 members.
                            </li>
                            <li>
                                Only 5 students in total can be added per team.
                            </li>
                            <li>
                                Delete team members will be active only once you
                                add 3 members to the team.
                            </li>
                            <li>
                                You can edit details of the team member by using
                                edit option.
                            </li>
                            <li>
                                You can delete the team by using Delete Option
                            </li>
                            <li>
                                Special characters are not allowed in team name
                                & Student name
                            </li>
                            {/* <li>
                                25 to 30 students to be enrolled in Project per School
                            </li> */}
                        </List>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

const mapStateToProps = ({ teams }) => {
    const { teamsList, teamsMembersList } = teams;
    return { teamsList, teamsMembersList };
};

export default connect(mapStateToProps, {
    getAdminTeamsListAction: getAdminTeamsList,
    getAdminTeamMembersListAction: getAdminTeamMembersList
})(TicketsPage);
