/* eslint-disable indent */
import 'antd/dist/antd.css';
import { Card, Col, Progress } from 'reactstrap';
import { Table } from 'antd';
import { getAdminTeamsList, getTeamMemberStatus } from '../store/teams/actions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Button } from '../../stories/Button';
import IdeaSubmissionCard from '../../components/IdeaSubmissionCard';
import { getStudentChallengeSubmittedResponse } from '../../redux/studentRegistration/actions';
import { useTranslation } from 'react-i18next';
import Select from '../../Admin/Challenges/pages/Select';
import { Modal } from 'react-bootstrap';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';

export default function DoughnutChart({ user }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const { teamsList, teamsMembersStatus, teamsMembersStatusErr } =
        useSelector((state) => state.teams);
    const [teamId, setTeamId] = useState(null);
    const [showDefault, setshowDefault] = useState(true);
    const [ideaShow, setIdeaShow] = useState(false);
    const [Student, setStudent] = useState('');
    const [ChangeShow, setChangeShow] = useState(false);
    const [mentorid, setmentorid] = useState('');
    const [studentchangelist, setstudentchangelist] = useState([]);
    const [studentchangeObj, setstudentchangeObj] = useState({});
    const { challengesSubmittedResponse } = useSelector(
        (state) => state?.studentRegistration
    );
    useEffect(() => {
        dispatch(getTeamMemberStatus(teamId, setshowDefault));
        dispatch(getStudentChallengeSubmittedResponse(teamId));
    }, [teamId, dispatch]);
    const percentageBWNumbers = (a, b) => {
        return (((a - b) / a) * 100).toFixed(2);
    };
    useEffect(() => {
        if (user) {
            setmentorid(user[0].mentor_id);
        }
    }, [user]);
    useEffect(() => {
        if (mentorid) {
            setshowDefault(true);
            dispatch(getAdminTeamsList(mentorid));
        }
    }, [mentorid]);

    const handleChangeStudent = async (id, name) => {
        //  handleChangeStudent Api we can update the initiate student //
        // here id = class ; name = student name //

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
            data: { initiated_by: studentchangeObj[name] }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        'Idea initiated to New Student Successfully',
                        ''
                    );
                    setChangeShow(false);
                    dispatch(getStudentChallengeSubmittedResponse(teamId));
                    setStudent('');
                }
            })
            .catch(function (error) {
                console.log(error);
                setChangeShow(false);
            });
    };
    const handleRevoke = async (id, type) => {
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
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        'Idea Submission Status Successfully Update!',
                        ''
                    );
                    dispatch(getTeamMemberStatus(teamId, setshowDefault));
                    dispatch(getStudentChallengeSubmittedResponse(teamId));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            width: '20%'
        },
        {
            title: 'Pre Survey',
            dataIndex: 'pre_survey_status',
            align: 'center',
            width: '10%',
            render: (_, record) =>
                record?.pre_survey_status ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Lesson Progress',
            dataIndex: 'address',
            align: 'center',
            width: '30%',
            render: (_, record) => {
                let percent =
                    100 -
                    percentageBWNumbers(
                        record.all_topics_count,
                        record.topics_completed_count
                    );
                return (
                    <div className="d-flex">
                        <div style={{ width: '80%' }}>
                            <Progress
                                key={'25'}
                                className="progress-height"
                                animated
                                color={
                                    percent
                                        ? percent <= 25
                                            ? 'danger'
                                            : percent > 25 && percent <= 50
                                            ? 'info'
                                            : percent > 50 && percent <= 75
                                            ? 'warning'
                                            : 'sucess'
                                        : 'danger'
                                }
                                value={percent}
                            />
                        </div>
                        <span className="ms-2">
                            {Math.round(percent) ? Math.round(percent) : '0'}%
                        </span>
                    </div>
                );
            }
        },
        {
            title: 'Idea Submission',
            dataIndex: 'idea_submission',
            align: 'center',
            width: '20%',
            render: (_, record) =>
                record?.idea_submission ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Post Survey',
            dataIndex: 'post_survey_status',
            align: 'center',
            width: '10%',
            render: (_, record) =>
                record?.post_survey_status ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Certificate',
            dataIndex: 'certificate',
            align: 'center',
            width: '10%',
            render: (_, record) =>
                record?.certificate ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        }
    ];

    useEffect(() => {
        const studentlistObj = {};
        const studentlist = teamsMembersStatus.map((stu) => {
            studentlistObj[stu.full_name] = stu.user_id;
            return stu.full_name;
        });
        let index = studentlist.indexOf(
            challengesSubmittedResponse[0]?.initiated_name
        );
        if (index >= 0) {
            studentlist.splice(index, 1);
        }
        setstudentchangelist(studentlist);
        setstudentchangeObj(studentlistObj);
    }, [teamsMembersStatus, ChangeShow]);
    return (
        <>
            <div className="select-team w-100">
                <label htmlFor="teams" className="">
                    Team Progress:
                </label>
                <div className="d-flex align-items-center">
                    <Col className="row p-4">
                        <select
                            onChange={(e) => setTeamId(e.target.value)}
                            name="teams"
                            id="teams"
                            style={{ backgroundColor: 'lavender' }}
                        >
                            <option value="">Select Team</option>
                            {teamsList && teamsList.length > 0 ? (
                                teamsList.map((item, i) => (
                                    <option key={i} value={item.team_id}>
                                        {item.team_name}
                                    </option>
                                ))
                            ) : (
                                <option value="">There are no teams</option>
                            )}
                        </select>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Card className="p-3 mx-4 d-flex flex-row">
                            <span className="fw-bold">IDEA STATUS :</span>
                            <span>
                                {' '}
                                {challengesSubmittedResponse[0]?.status
                                    ? challengesSubmittedResponse[0]?.status
                                    : 'NOT STARTED'}{' '}
                            </span>
                            {challengesSubmittedResponse[0]?.status ==
                            'SUBMITTED' ? (
                                <Button
                                    className="btn btn-success btn-lg mr-5 mx-2"
                                    label={'REVOKE'}
                                    size="small "
                                    onClick={() =>
                                        handleRevoke(
                                            challengesSubmittedResponse[0]
                                                .challenge_response_id,
                                            challengesSubmittedResponse[0]
                                                .status
                                        )
                                    }
                                />
                            ) : (
                                ''
                            )}
                        </Card>

                        <Button
                            button="button"
                            label={t('student.view_idea')}
                            disabled={
                                teamsMembersStatus.length > 0 &&
                                challengesSubmittedResponse[0]?.status
                                    ? false
                                    : true
                            }
                            btnClass={`${
                                teamsMembersStatus.length > 0 &&
                                challengesSubmittedResponse[0]?.status
                                    ? 'primary'
                                    : 'default'
                            }`}
                            size="small"
                            onClick={() => setIdeaShow(true)}
                        />
                        <div className="m-3">
                            <Button
                                label={'Change'}
                                disabled={
                                    teamsMembersStatus.length > 0 &&
                                    challengesSubmittedResponse[0]?.status
                                        ? false
                                        : true
                                }
                                btnClass={`${
                                    teamsMembersStatus.length > 0 &&
                                    challengesSubmittedResponse[0]?.status
                                        ? 'primary'
                                        : 'default'
                                }`}
                                size="small"
                                onClick={() => setChangeShow(true)}
                            />
                        </div>
                    </Col>
                </div>
                {showDefault && (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: '25rem' }}
                    >
                        <h2 className="text-primary">Please Select a Team*</h2>
                    </div>
                )}
                {teamsMembersStatus.length > 0 && !showDefault ? (
                    <Table
                        bordered
                        pagination={false}
                        dataSource={teamsMembersStatus}
                        columns={columns}
                    />
                ) : teamsMembersStatusErr ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: '25rem' }}
                    >
                        <p className="text-primary">
                            There are no students in selected Team
                        </p>
                    </div>
                ) : null}
            </div>
            {ideaShow && (
                <IdeaSubmissionCard
                    show={ideaShow}
                    handleClose={() => setIdeaShow(false)}
                    response={challengesSubmittedResponse}
                />
            )}
            {ChangeShow && (
                <Modal
                    show={ChangeShow}
                    onHide={() => setChangeShow(false)}
                    //{...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="assign-evaluator ChangePSWModal teacher-register-modal"
                    backdrop="static"
                    scrollable={true}
                >
                    <Modal.Header
                        closeButton
                        onHide={() => setChangeShow(false)}
                    >
                        <Modal.Title
                            id="contained-modal-title-vcenter"
                            className="w-100 d-block text-center"
                        >
                            Idea Initiation Change
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="my-3 text-center">
                            <h3 className="mb-sm-4 mb-3">
                                Please Initiate Idea to Student
                            </h3>
                            <Select
                                list={studentchangelist}
                                setValue={setStudent}
                                placeHolder={'Please Select'}
                                value={Student}
                            />
                        </div>
                        <div className="text-center">
                            <Button
                                label={'Submit'}
                                btnClass={!Student ? 'default' : 'primary'}
                                size="small "
                                onClick={() =>
                                    handleChangeStudent(
                                        challengesSubmittedResponse[0]
                                            .challenge_response_id,
                                        Student
                                    )
                                }
                                disabled={!Student}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}
