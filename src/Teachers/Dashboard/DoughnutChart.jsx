/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import 'antd/dist/antd.css';
import { Card, Progress } from 'reactstrap';
import { Table } from 'antd';
import { getTeamMemberStatus } from '../store/teams/actions';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
    FaCheckCircle,
    FaDownload,
    FaHourglassHalf,
    FaTimesCircle
} from 'react-icons/fa';
import { Button } from '../../stories/Button';
import IdeaSubmissionCard from '../../components/IdeaSubmissionCard';
import { getStudentChallengeSubmittedResponse } from '../../redux/studentRegistration/actions';
import Select from '../../Admin/Challenges/pages/Select';
import { Modal } from 'react-bootstrap';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import Schoolpdf from '../../School/SchoolPdf';
export default function DoughnutChart({ user }) {
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const { teamsMembersStatus, teamsMembersStatusErr } = useSelector(
        (state) => state.teams
    );
    const [teamId, setTeamId] = useState(null);
    const [showDefault, setshowDefault] = useState(true);
    const [ideaShow, setIdeaShow] = useState(false);
    const [Student, setStudent] = useState('');
    const [ChangeShow, setChangeShow] = useState(false);
    const [mentorid, setmentorid] = useState('');
    const [studentchangelist, setstudentchangelist] = useState([]);
    const [studentchangeObj, setstudentchangeObj] = useState({});
    const [isideadisable, setIsideadisable] = useState(false);
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
    const [teamsList, setTeamsList] = useState([]);
    useEffect(() => {
        if (mentorid) {
            setshowDefault(true);
            teamNameandIDsbymentorid(mentorid);
        }
    }, [mentorid]);

    const teamNameandIDsbymentorid = (mentorid) => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/teams/namebymenterid?mentor_id=${mentorid}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamsList(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // console.log(teamsMembersStatus, challengesSubmittedResponse);

    useEffect(() => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/popup/2`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.data[0]?.on_off === '1') {
                        setIsideadisable(true);
                    } else {
                        setIsideadisable(false);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

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
            width: '15rem'
        },
        {
            title: 'Pre Survey',
            dataIndex: 'pre_survey_status',
            align: 'center',
            width: '15rem',
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
            width: '30rem',
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
            width: '20rem',
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
            width: '10rem',
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
            width: '10rem',
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

    ///// school pdf code
    const [showPrintSymbol, setShowPrintSymbol] = useState(true);
    //school pdf idea deatils
    const [ideaValuesForPDF, setIdeaValuesForPDF] = useState();
    const ideaDataforPDF = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/challenge_response/schoolpdfideastatus?mentor_id=${user[0].mentor_id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setIdeaValuesForPDF(response?.data?.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const [teamsData, setTeamsData] = useState([]);

    //school pdf mentor deatils
    const [mentorValuesForPDF, setMentorValuesForPDF] = useState();
    const mentorDataforPDF = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/mentors/mentorpdfdata?id=${user[0].mentor_id}&user_id=${user[0].user_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setMentorValuesForPDF(response?.data?.data[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Function to fetch data for a single team by ID
    const fetchTeamData = async (teamId, teamName) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/dashboard/teamStats/${teamId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    }
                }
            );
            return [...response.data.data, { name: teamName }];
        } catch (error) {
            console.error(`Error fetching data for team ID ${teamId}:`, error);
            return null;
        }
    };

    // Function to fetch data for all teams and store in a single array
    const fetchAllTeamsData = async () => {
        try {
            const teamDataPromises = teamsList.map((teamId) =>
                fetchTeamData(teamId.team_id, teamId.team_name)
            );
            const teamDataArray = await Promise.all(teamDataPromises);
            const filteredDataArray = teamDataArray.filter(
                (data) => data !== null
            );
            setTeamsData(filteredDataArray);
        } catch (error) {
            console.error('Error fetching team data:', error);
        }
    };

    useEffect(() => {
        if (
            teamsData.length === teamsList.length &&
            teamsData.length !== 0 &&
            mentorValuesForPDF !== undefined &&
            ideaValuesForPDF !== undefined
        ) {
            handlePrint();
            console.log('printcontinue');
            setShowPrintSymbol(true);
        } else {
            console.log("Some PDF printing related api's are failing");
            setShowPrintSymbol(true);
        }
    }, [teamsData, mentorValuesForPDF]);
    const tsetcall = () => {
        setShowPrintSymbol(false);
        mentorDataforPDF();
        ideaDataforPDF();
        fetchAllTeamsData();
    };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    //////
    
    return (
        <>
            <div style={{ display: 'none' }}>
                <Schoolpdf
                    ref={componentRef}
                    tabledata={teamsData}
                    remMentor={mentorValuesForPDF}
                    ideaStatusDetails={ideaValuesForPDF}
                />
            </div>
            <Card
                className="select-team p-5 w-100"
                style={{ overflowX: 'auto' }}
            >
                <div className="d-flex justify-content-between">
                    <label htmlFor="teams" className="">
                        Team Progress:
                    </label>
                    {showPrintSymbol ? (
                        <FaDownload size={22} onClick={tsetcall} />
                    ) : (
                        <FaHourglassHalf size={22} />
                    )}
                </div>
                <div className="d-flex align-items-center teamProgreess">
                    <Col md="3" xs="12">
                        <div className="singlediv">
                            <select
                                onChange={(e) => setTeamId(e.target.value)}
                                name="teams"
                                id="teams"
                                style={{
                                    backgroundColor: 'lavender',
                                    height: '40px', // Set the desired height
                                    fontSize: '16px'
                                }}
                            >
                                <option hidden>Select Team</option>
                                {teamsList &&
                                teamsList.length > 0 &&
                                teamId !== ''
                                    ? teamsList.map((item, i) => (
                                          <option key={i} value={item.team_id}>
                                              {item.team_name}
                                          </option>
                                      ))
                                    : null}
                            </select>
                        </div>
                    </Col>
                    {teamId && (
                        <>
                            <Row>
                                <div className="singlediv">
                                    <Card
                                        className="p-3 mx-4 d-flex flex-row"
                                        style={{
                                            marginTop: '.5rem',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        <span className="fw-bold">
                                            IDEA STATUS :
                                        </span>
                                        <span style={{ paddingLeft: '1rem' }}>
                                            {challengesSubmittedResponse[0]
                                                ?.status
                                                ? ` ${challengesSubmittedResponse[0]?.status}`
                                                : 'NOT STARTED'}
                                        </span>
                                    </Card>
                                </div>
                            </Row>
                            <>
                                <div>
                                    <Button
                                        button="button"
                                        label="View Idea"
                                        disabled={
                                            teamsMembersStatus.length > 0 &&
                                            challengesSubmittedResponse[0]
                                                ?.status
                                                ? false
                                                : true
                                        }
                                        btnClass={`${
                                            teamsMembersStatus.length > 0 &&
                                            challengesSubmittedResponse[0]
                                                ?.status
                                                ? 'primary'
                                                : 'default'
                                        }`}
                                        size="small"
                                        shape="btn-square"
                                        style={{ padding: '1rem 2.4rem' }}
                                        onClick={() => setIdeaShow(true)}
                                    />
                                </div>
                                <div className="m-3">
                                    <Button
                                        label={' Change  '}
                                        disabled={
                                            teamsMembersStatus.length > 0 &&
                                            challengesSubmittedResponse[0]
                                                ?.status
                                                ? false
                                                : true
                                        }
                                        btnClass={`${
                                            teamsMembersStatus.length > 0 &&
                                            challengesSubmittedResponse[0]
                                                ?.status
                                                ? 'primary'
                                                : 'default'
                                        }`}
                                        size="small"
                                        shape="btn-square"
                                        style={{ padding: '1rem 3rem' }}
                                        onClick={() => setChangeShow(true)}
                                    />
                                </div>
                                <div>
                                    {challengesSubmittedResponse[0]?.status ==
                                    'SUBMITTED' ? (
                                        <Button
                                            className={
                                                isideadisable
                                                    ? `btn btn-success btn-lg mr-5 mx-2`
                                                    : `btn btn-lg mr-5 mx-2`
                                            }
                                            label={'REVOKE'}
                                            size="small"
                                            shape="btn-square"
                                            style={{
                                                padding: '1rem 3rem',
                                                fontSize: '14px',
                                                marginBottom: '.8rem'
                                            }}
                                            onClick={() =>
                                                handleRevoke(
                                                    challengesSubmittedResponse[0]
                                                        .challenge_response_id,
                                                    challengesSubmittedResponse[0]
                                                        .status
                                                )
                                            }
                                            disabled={!isideadisable}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </>
                        </>
                    )}
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
            </Card>
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
