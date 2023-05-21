/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import TeacherCertificate from '../../assets/media/img/teachers_certificate.png';
import './style.scss';
import { BsChevronRight, BsFilter } from 'react-icons/bs';
import { RiAwardFill } from 'react-icons/ri';
import { CommonDropDownComp } from '../../stories/CommonDropdown/CommonDropdownComp';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import {
    getTeacherCourseDetails,
    getAdminCourseDetails,
    getMentorCourseAttachments
} from '../../redux/actions';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
// import { BsFillPauseFill } from "react-icons/bs";
// import { FiPlayCircle } from "react-icons/fi";
import { VscCircleFilled } from 'react-icons/vsc';
import { VscCheck } from 'react-icons/vsc';
// import CourseVideo from "../../assets/img/courseVideo.png";
// import { Avatar, Icon } from "antd";
import Vimeo from '@u-wave/react-vimeo';
import Layout from '../Layout';
// import { Progress } from "antd";
import { BsQuestionCircle } from 'react-icons/bs';
import { Accordion, Modal } from 'react-bootstrap';
// import User from "../../assets/img/avatar1.png";
import { Button } from '../../stories/Button';
import { GrDocument } from 'react-icons/gr';
import { AiFillPlayCircle } from 'react-icons/ai';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
// import { ProgressComp } from "../../stories/Progress/Progress";
import ModuleAssesmentImg from '../../assets/media/moduleAssesmentPopup.svg';

// import { FileComp } from "../../stories/FileComp/FileComp";
import { connect, useSelector } from 'react-redux';

// import DetaledQuiz from "../../Admin/DetailedQuiz";
import DetaledQuiz from '../../Admin/DetailedQuiz/DetaledQuiz';

import Csv from '../../assets/media/csv1.png';

import Pdf from '../../assets/media/csv1.png';
import jsPDF from 'jspdf';
import { useLayoutEffect } from 'react';
import { FaBullseye } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
//VIMEO REFERENCE
//https://github.com/u-wave/react-vimeo/blob/default/test/util/createVimeo.js

const TeacherPlayVideo = (props) => {
    const { t } = useTranslation();
    const language = useSelector((state) => state?.mentors.mentorLanguage);
    const pdfRef = useRef(null);
    const course_id = props.match.params.id ? props.match.params.id : 1;
    const currentUser = getCurrentUser('current_user');
    const [condition, setCondition] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [showQuiz, setHideQuiz] = useState(false);
    const [quizId, setQizId] = useState('');
    const [worksheetId, setWorksheetId] = useState('');
    const [backToQuiz, setBackToQuiz] = useState(false);

    const [coursesId, setCourseId] = useState('');
    const [fileName, setFileName] = useState('');
    const [topicObj, setTopicObj] = useState({});
    const [currentTopicId, setCourseTopicId] = useState('');
    const [handbook, setHandbook] = useState(false);

    const [id, setResponce] = useState([]);
    const [firstObj, setFirstObj] = useState([]);
    const [moduleResponce, setUpdateModuleResponce] = useState([]);
    const [worksheetResponce, SetWorksheetResponce] = useState([]);
    const [videosList, setVideosList] = useState({
        videoTitle: '',
        videoLink: ''
    });

    const [url, setUrl] = useState('');
    const [image, setImage] = useState();
    const [videoId, setVideoId] = useState('');
    const [setArrays, setArray] = useState([]);
    const [setTopicArrays, setTopicArray] = useState([]);
    const [isVideo, setIsVideo] = useState(false);
    const [modulesList, setModulesList] = useState({
        questionType: '',
        question: '',
        choice: ''
    });
    const [videoIndex, setVideoIndex] = useState(0);
    const [volume, setVolume] = useState(1);
    const [paused, setPaused] = useState(false);
    const [item, setItem] = useState('');
    const [adminCourseDetails, setAdminCourseDetails] = useState('');
    const [adminCourse, setAdminCourse] = useState([]);
    const [teacherCourseDetails, setTeacherCourseDetails] = useState('');
    const [teacherCourse, setTeacherCourse] = useState([]);
    const [worksheet, setWorksheetByWorkSheetId] = useState([]);
    const [certificate, setCertificate] = useState(false);
    const [instructions, setInstructions] = useState(false);
    const [continueObj, setContinueObj] = useState([]);
    const [courseData, setCourseData] = useState(null);
    const scrollRef = React.createRef();

    const getLastCourseStatus = (data = []) => {
        const length = data && data.length > 0 ? data.length - 1 : 0;
        if (length) {
            return data[length]?.progress === 'INCOMPLETE' ? false : true;
        }
        return false;
    };
    useEffect(() => {
        props.getTeacherCourseDetailsActions(course_id, language);
    }, [course_id, language]);

    useLayoutEffect(() => {
        props.getMentorCourseAttachmentsActions();
    }, []);

    useEffect(() => {
        var topicArrays = [];
        var firstObjectArray = [];
        var continueArrays = [];
        var continueObjectArrays = [];

        setAdminCourse(
            props.adminCoursesDetails && props.adminCoursesDetails[0]
        );
        setAdminCourseDetails(
            props.adminCoursesDetails[0] &&
                props.adminCoursesDetails[0].course_modules
        );
        setTeacherCourse(
            props.teaherCoursesDetails && props.teaherCoursesDetails[0]
        );
        setTeacherCourseDetails(
            props.teaherCoursesDetails[0] &&
                props.teaherCoursesDetails[0].mentor_course_topics
        );
        props.teaherCoursesDetails[0] &&
            props.teaherCoursesDetails[0].mentor_course_topics.map(
                (course, index) => {
                    topicArrays.push(course);
                }
            );
        setTopicArray(topicArrays);
        if (topicArrays.length > 0) {
            topicArrays.map((item, i) => {
                if (item.progress == 'COMPLETED') {
                    continueArrays.push(item);
                }
            });
            firstObjectArray.push(topicArrays[0]);
            continueObjectArrays.push(
                continueArrays[continueArrays.length - 1]
            );
            setContinueObj(continueObjectArrays);
            firstObjectArray.push(topicArrays[0]);
            setFirstObj(firstObjectArray);
        }
    }, [props.teaherCoursesDetails]);

    async function fetchData(videoId) {
        // here videoId = videoId //
        setVideoId(videoId);
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/videos/' + videoId,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        // let response = await axios(config);
        // console.log("res", response);
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResponce(response.data && response.data.data[0]);
                    setCondition('Video1');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function getWorkSheetApi(worksheetId) {
        // here worksheetId = worksheetId //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/mentorAttachments/' +
                worksheetId,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    const worksheet =
                        response.data.data[0]?.attachments.split('{{}}');
                    SetWorksheetResponce(worksheet);
                    setWorksheetByWorkSheetId(worksheet[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleNxtVideo = (id) => {
        // here id = course_id //
        fetchData(id);
        setItem('VIDEO');
    };

    async function modulesListUpdateApi(courseTopicId) {
        // here courseTopicId = courseTopicId //
        // here we can see the mentorTopicProgress //
        const body1 = JSON.stringify({
            user_id: JSON.stringify(currentUser?.data[0]?.user_id),
            mentor_course_topic_id: JSON.stringify(courseTopicId),
            status: 'Completed'
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/mentorTopicProgress',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body1
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 201) {
                    setUpdateModuleResponce(
                        response.data && response.data.data[0]
                    );
                    props.getTeacherCourseDetailsActions(course_id, language);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handlePause = (event) => {
        // here we can pause the video //
        setPaused(event.target.checked);
    };

    const handlePlayerPause = (event) => {
        setPaused(true);
    };
    const handlePlayerPlay = (event) => {
        setPaused(false);
    };

    const handleVolume = (event) => {
        // here we can increase  volume //
        setVolume(parseFloat(false));
    };

    const selectVideo = (index) => {
        setVideoIndex(index);
    };

    const SearchProps = {
        size: 'small',
        placeholder: 'Search Course'
    };

    const handleItem = (item) => {
        setItem(item);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setVideosList({
            ...videosList,
            [name]: value
        });
    };

    const handleModulesOnChange = (e) => {
        const { name, value } = e.target;
        setModulesList({
            ...modulesList,
            [name]: value
        });
    };

    const handleSeeked = (event) => {
        // console.log("428 event fired: ", event);
    };

    // const handleTimeUpdate = (event) => {
    //   // console.log("432event fired: ", event);
    //   if (event.seconds > "11.62") {
    //     // setModalShow(true);
    //   }
    // };

    const handleTimeUpdate = (event) => {
        const videoLength = event.duration; //500
        const halfTrimmedLength = videoLength / 2; //250
        const calculatePercentage = halfTrimmedLength / videoLength; //0.5
        const eventSeconds = Math.floor(event.seconds);
        const calculatedSeconds = Math.floor(halfTrimmedLength);
    };

    const handleVimeoOnEnd = (event) => {
        modulesListUpdateApi(topicObj.mentor_course_topic_id);
        handleSelect(
            topicObj.topic_type_id,
            topicObj.mentor_course_topic_id,
            topicObj.topic_type
        );
        handlePlayerPlay();
        setHandbook(true);
    };

    const handleSelect = (topicId, couseId, type) => {
        // here topicId = topicId //
        // here couseId = couseId  //
        // here type = Attachment ,Video ,Quiz //
        scrollRef.current.scrollIntoView();
        setCourseTopicId(couseId);
        const topic_Index =
            setTopicArrays &&
            setTopicArrays.findIndex(
                (data) =>
                    data.topic_type_id === topicId &&
                    data.mentor_course_topic_id === couseId
            );
        const topicObj = setTopicArrays[topic_Index + 1];
        setTopicObj(topicObj);
        if (type === 'ATTACHMENT') {
            setWorksheetId(topicId);
            getWorkSheetApi(topicId);
            setItem('ATTACHMENT');
            setHideQuiz(false);
        } else if (type === 'VIDEO') {
            setItem('VIDEO');
            fetchData(topicId);
            setHideQuiz(false);
        } else if (type === 'QUIZ') {
            setItem('QUIZ');
            setQizId(topicId);
        } else {
            setItem('');
            setHideQuiz(false);
        }
    };

    const videoStatus = (type, status) => {
        // here we can see the videoStatus //
        // type = video ,attachment ,quiz, certificates  //
        //  where status = completed /incomplete //
        const done = <IoCheckmarkDoneCircleSharp className="done" />;
        const notDone = <IoCheckmarkDoneCircleSharp />;
        if (type === 'VIDEO' && status === 'COMPLETED') {
            return done;
        } else if (type === 'VIDEO' && status === 'INCOMPLETE') {
            return notDone;
        }
        if (type === 'ATTACHMENT' && status === 'COMPLETED') {
            return done;
        } else if (type === 'ATTACHMENT' && status === 'INCOMPLETE') {
            return notDone;
        }
        if (type === 'QUIZ' && status === 'COMPLETED') {
            return done;
        } else if (type === 'QUIZ' && status === 'INCOMPLETE') {
            return notDone;
        }
        if (type === 'CERTIFICATE' && status === 'COMPLETED') {
            return done;
        } else if (type === 'CERTIFICATE' && status === 'INCOMPLETE') {
            return notDone;
        }
    };

    const handleClose = (item) => {
        setItem('WORKSHEET');
        setModalShow(item);
        setHideQuiz(false);
    };
    const handleQuiz = () => {
        // here we can see Quiz //
        modulesListUpdateApi(topicObj.mentor_course_topic_id);
        handleSelect(
            topicObj.topic_type_id,
            topicObj.mentor_course_topic_id,
            topicObj.topic_type
        );
    };

    const handleAssesmentClose = (item) => {
        setItem('VIDEO');
        // const video_Id_Index =
        //   setArrays && setArrays.findIndex((data) => data === videoId);
        // const Video_id = setArrays[video_Id_Index + 1];
        // setVideoId(Video_id);
        setModalShow(item);
        setHideQuiz(false);
    };

    const changeHandler = (event) => {
        const file = event.target.files[0].name.split('.', 2);
        if (file[1] === 'csv' || file[1] === 'pdf') {
            let img = event.target.files[0];
            setUrl(file[1]);
            setImage(img);
            setFileName(event.target.files[0].name);
        }
    };
    const removeSelectedImage = () => {
        // here we can remove the selected image //
        setImage();
        setFileName();
        setUrl();
    };

    const handleSubmit = (e) => {
        // here we can submit the worksheets  responses//
        const data = new FormData();
        data.append('attachment_1', image);
        var config = {
            method: 'post',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/worksheets/' +
                worksheetId +
                '/response',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    getWorkSheetApi(worksheetId);
                    setImage();
                    setFileName();
                    setUrl();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleNextCourse = () => {
        // here we can go for next course //
        // here course_topic_id = course_topic_id //
        modulesListUpdateApi(topicObj.course_topic_id);
        handleSelect(
            topicObj.topic_type_id,
            topicObj.course_topic_id,
            topicObj.topic_type
        );
    };

    const startFirstCourse = (e) => {
        // here we can start the course //
        setCourseData(null);
        modulesListUpdateApi(firstObj[0].mentor_course_topic_id);
        handleSelect(
            firstObj[0].topic_type_id,
            firstObj[0].mentor_course_topic_id,
            firstObj[0].topic_type
        );
    };

    const startContinueCourse = (e) => {
        // here we can continue the course //
        setCourseData(null);
        modulesListUpdateApi(continueObj[0].course_topic_id);
        handleSelect(
            continueObj[0].topic_type_id,
            continueObj[0].course_topic_id,
            continueObj[0].topic_type
        );
        // toggle(continueObj[0].course_module_id);
    };

    const handlenextend = () => {
        // here we can see continue button , go to the next course //
        handleVimeoOnEnd();
        setInstructions(true);
        setHandbook(false);
    };

    const handleDownload = (path) => {
        // here we can download teacher handbook //
        let a = document.createElement('a');
        a.target = '_blank';
        //a.href = process.env.REACT_APP_API_IMAGE_BASE_URL + path;
        a.href = path;
        a.click();
        handleVimeoOnEnd();
        setInstructions(true);
        setHandbook(false);
    };
    const handleInstructionDownload = (path) => {
        // here we can download the instructions  //
        let a = document.createElement('a');
        a.target = '_blank';
        //a.href = process.env.REACT_APP_API_IMAGE_BASE_URL + path;
        a.href = path;
        a.click();
    };
    const handleCertificateDownload = () => {
        // here we can download the certificate //
        const content = pdfRef.current;
        const doc = new jsPDF('l', 'px', [210, 297]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('certificate.pdf');
            }
        });
    };
    return (
        <Layout>
            <div className="courses-page" ref={scrollRef}>
                <div
                    className="pb-5 my-5 px-5 container-fluid"
                    style={{ minHeight: '72vh' }}
                >
                    <Row className="m-0 courser-video-section ">
                        <Col
                            xl={4}
                            className="course-assement order-2 order-xl-1 "
                        >
                            <div className="assement-info">
                                <p className="content-title">Lessons</p>
                                <div className="view-head"></div>
                                <div className="assement-item" id="scrollbar">
                                    {teacherCourseDetails &&
                                        teacherCourseDetails.length &&
                                        teacherCourseDetails.map(
                                            (course, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`course-sec-list ${
                                                            course.progress ===
                                                            'COMPLETED'
                                                                ? 'hHover'
                                                                : 'noHover'
                                                        }  `}
                                                    >
                                                        <Row
                                                            style={{
                                                                background:
                                                                    currentTopicId ===
                                                                        course.mentor_course_topic_id &&
                                                                    '#f0f3f8'
                                                            }}
                                                            className={`justify-content-between w-100 px-4 py-3 ${
                                                                course.progress ===
                                                                'COMPLETED'
                                                                    ? 'hHover'
                                                                    : 'noCurser'
                                                            }`}
                                                        >
                                                            <Col
                                                                md={12}
                                                                className="my-auto"
                                                                onClick={() => {
                                                                    setCourseData(
                                                                        course
                                                                    );
                                                                    handleSelect(
                                                                        course.topic_type_id,
                                                                        course.mentor_course_topic_id,
                                                                        course.topic_type
                                                                    );
                                                                    if (
                                                                        course.title.toLowerCase() ===
                                                                            'handbook' ||
                                                                        course.title ===
                                                                            'கையேடு'
                                                                    ) {
                                                                        setHandbook(
                                                                            true
                                                                        );
                                                                        setInstructions(
                                                                            false
                                                                        );
                                                                    } else if (
                                                                        course.title.toLowerCase() ===
                                                                            'instructions' ||
                                                                        course.title ===
                                                                            'வழிமுறைகள்'
                                                                    ) {
                                                                        setInstructions(
                                                                            true
                                                                        );
                                                                        setHandbook(
                                                                            false
                                                                        );
                                                                    } else if (
                                                                        course.title.toLowerCase() ===
                                                                        'certificate'
                                                                    ) {
                                                                        setCertificate(
                                                                            true
                                                                        );
                                                                        setItem(
                                                                            'CERTIFICATE'
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                <p className="course-icon mb-0">
                                                                    {videoStatus(
                                                                        course.topic_type,
                                                                        course.progress
                                                                    )}

                                                                    <span className="course-title">
                                                                        {
                                                                            course.title
                                                                        }
                                                                    </span>
                                                                </p>
                                                                {/* <p className="course-time mb-0 px-5 my-auto">
                                                            {course.video_duration && (
                                                                <span className="px-2">
                                                                    {Math.floor(
                                                                        course.video_duration / 60
                                                                    )}
                                                                    {""} min
                                                                </span>
                                                            )}
                                                        </p> */}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            </div>
                        </Col>

                        <Col
                            xl={8}
                            className="course-video mb-5 order-1 order-xl-2"
                        >
                            {item === 'QUIZ' && !showQuiz ? (
                                <div
                                    size="lg"
                                    centered
                                    className="modal-popup text-screen text-center  modal-popup"
                                >
                                    <div className="modal-content">
                                        <Modal.Header>
                                            <Modal.Title className="w-100 d-block mb-2">
                                                Ready for a quick test?
                                            </Modal.Title>
                                            <p className="w-100 d-block">
                                                Test your course skills in a
                                                short test challenge!
                                            </p>
                                            <div className="row justify-content-center text-center">
                                                <div className="col col-lg-3">
                                                    <p>
                                                        <VscCircleFilled
                                                            style={{
                                                                color: '#067DE1'
                                                            }}
                                                        />
                                                        Questions
                                                    </p>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <p>
                                                        <VscCircleFilled
                                                            style={{
                                                                color: '#067DE1'
                                                            }}
                                                        />{' '}
                                                        Minutes
                                                    </p>
                                                </div>
                                            </div>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <figure>
                                                <img
                                                    src={ModuleAssesmentImg}
                                                    alt="test"
                                                    className="img-fluid w-50"
                                                />
                                            </figure>
                                            <Button
                                                label="Let's Start"
                                                btnClass="primary mt-4"
                                                size="small"
                                                onClick={() =>
                                                    setHideQuiz(true)
                                                }
                                            />
                                        </Modal.Body>
                                    </div>
                                </div>
                            ) : item === 'ATTACHMENT' &&
                              !instructions &&
                              handbook &&
                              props.mentorAttachments.length > 0 &&
                              props.mentorAttachments[0]?.attachments?.split(
                                  '{{}}'
                              ).length === 1 ? (
                                <Fragment>
                                    <Card className="course-sec-basic p-5">
                                        <CardBody>
                                            <CardTitle
                                                className="text-left"
                                                tag="h2"
                                            >
                                                {t('teacehr_red.hand_book')}
                                            </CardTitle>
                                            <CardBody>
                                                <p className="text-primary">
                                                    <b>
                                                        Guidelines for Handbook
                                                    </b>
                                                </p>
                                                <p>Dear Guide Teachers,</p>
                                                <p>
                                                    This handbook is an
                                                    important document which
                                                    will help you understand the
                                                    program objectives and
                                                    enable you to support your
                                                    Unisolve student teams
                                                    better.
                                                </p>
                                                <p>
                                                    STEP 1 : Go through pages 1
                                                    - 28, to understand about
                                                    the program before giving
                                                    the Quiz.
                                                </p>
                                                <p>
                                                    STEP 2 : Refer to pages 29 -
                                                    38 to roll out the program
                                                    in your schools and
                                                    familiarise all the studetns
                                                    about the program and the
                                                    course components.
                                                </p>
                                                <p>
                                                    STEP 3 : Register the
                                                    students on the platform and
                                                    guide then through the
                                                    journey.
                                                </p>
                                                <p className="text-primary text-left">
                                                    <b>
                                                        Instructions on Idea
                                                        Submission
                                                    </b>
                                                </p>
                                                <p>
                                                    Final IDEA SUBMISSION by the
                                                    team should happen only
                                                    after all the students in
                                                    the team complete the
                                                    following activities:
                                                </p>
                                                <div>
                                                    <p className="mb-0">
                                                        A. Watching the videos
                                                        as team/individually
                                                    </p>
                                                    <p className="mb-0">
                                                        B. Complete the quiz
                                                        individually{' '}
                                                    </p>
                                                    <p className="mb-0">
                                                        C. Complete the
                                                        worksheet (as a team)
                                                    </p>
                                                </div>
                                                {/* <br />
                                                <p>
                                                    Initial Idea Submission{' '}
                                                    <b>DOES NOT</b> require a
                                                    Model or Prototype. Idea
                                                    submission process includes
                                                    submission of form with the
                                                    following details:
                                                </p>
                                                <div>
                                                    <p className="mb-0">
                                                        1.Real life problem that
                                                        team has identified{' '}
                                                    </p>
                                                    <p className="mb-0">
                                                        2. Solution details for
                                                        the identified problem{' '}
                                                    </p>
                                                    <p className="mb-0">
                                                        3. Details about how was
                                                        the solution arrived
                                                    </p>
                                                    <p className="mb-0">
                                                        4. Upload relevant photo
                                                        or a document (If
                                                        applicable)
                                                    </p>
                                                </div> */}
                                            </CardBody>
                                            <div className="text-left mb-2">
                                                <div>
                                                    {worksheetResponce &&
                                                        worksheetResponce?.length >
                                                            0 &&
                                                        worksheetResponce.map(
                                                            (item, i) => (
                                                                <Button
                                                                    style={{
                                                                        margin: '5px'
                                                                    }}
                                                                    key={i}
                                                                    label={`Download ${item
                                                                        .split(
                                                                            '/'
                                                                        )
                                                                        [
                                                                            item.split(
                                                                                '/'
                                                                            )
                                                                                .length -
                                                                                1
                                                                        ].split(
                                                                            '.'
                                                                        )[0]
                                                                        .replace(
                                                                            '_',
                                                                            ' '
                                                                        )}`}
                                                                    btnClass="secondary mx-2"
                                                                    size="small"
                                                                    onClick={() =>
                                                                        handleDownload(
                                                                            item
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                            <Col className="text-right">
                                                <Button
                                                    label={'Continue'}
                                                    onClick={() =>
                                                        handlenextend()
                                                    }
                                                    btnClass="primary mt-4 mb-2"
                                                    size="small"
                                                />
                                            </Col>
                                        </CardBody>
                                    </Card>
                                </Fragment>
                            ) : item === 'VIDEO' && condition === 'Video1' ? (
                                <Card className="embed-container">
                                    <CardTitle className=" text-left p-4 d-flex justify-content-between align-items-center">
                                        {/* <h3>
                                                {topic?.title + " " + quizTopic}
                                            </h3> */}
                                        {backToQuiz && (
                                            <Button
                                                label="Back to Quiz"
                                                btnClass="primary"
                                                size="small"
                                                onClick={() => {
                                                    setBackToQuiz(false);
                                                    setItem('');
                                                    setHideQuiz(true);
                                                    // setQuizTopic("");
                                                }}
                                            />
                                        )}
                                    </CardTitle>
                                    <Vimeo
                                        video={id.video_stream_id}
                                        volume={volume}
                                        paused={paused}
                                        onPause={handlePlayerPause}
                                        onPlay={handlePlayerPlay}
                                        onSeeked={handleSeeked}
                                        onTimeUpdate={handleTimeUpdate}
                                        onEnd={handleVimeoOnEnd}
                                    />
                                </Card>
                            ) : (
                                showQuiz === false &&
                                !certificate &&
                                !instructions &&
                                !handbook && (
                                    <Fragment>
                                        <Card className="course-sec-basic p-5">
                                            <CardBody>
                                                <text
                                                // style={{
                                                //     whiteSpace: 'pre-wrap'
                                                // }}
                                                >
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                teacherCourse &&
                                                                teacherCourse.description
                                                        }}
                                                    ></div>
                                                </text>
                                                {firstObj[0] &&
                                                firstObj[0].progress ==
                                                    'INCOMPLETE' ? (
                                                    <div>
                                                        <Button
                                                            label="START COURSE"
                                                            btnClass="primary mt-4"
                                                            size="small"
                                                            onClick={(e) =>
                                                                startFirstCourse(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {getLastCourseStatus(
                                                            teacherCourseDetails
                                                        ) ? (
                                                            <h2 className="text-success text-center">
                                                                Congratulations
                                                                ! your course
                                                                completed
                                                                successfully !
                                                            </h2>
                                                        ) : (
                                                            <Button
                                                                label={`CONTINUE COURSE`}
                                                                btnClass={`primary mt-4`}
                                                                size="small"
                                                                onClick={(e) =>
                                                                    startContinueCourse(
                                                                        e
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </CardBody>
                                        </Card>
                                    </Fragment>
                                )
                            )}
                            {showQuiz ? (
                                <DetaledQuiz
                                    course_id={course_id}
                                    quizId={quizId}
                                    handleQuiz={handleQuiz}
                                    handleClose={handleClose}
                                    handleNxtVideo={handleNxtVideo}
                                    setBackToQuiz={setBackToQuiz}
                                    setHideQuiz={setHideQuiz}
                                    quiz="true"
                                    setInstructions={setInstructions}
                                    setHandbook={setHandbook}
                                    instructions={instructions ? 'no' : 'yes'}
                                    // setQuizTopic={setQuizTopic}
                                />
                            ) : (
                                ''
                            )}
                            {item === 'ATTACHMENT' &&
                                instructions &&
                                !handbook &&
                                props.mentorAttachments.length > 0 &&
                                props.mentorAttachments[1]?.attachments?.split(
                                    '{{}}'
                                ).length > 2 && (
                                    <Fragment>
                                        <Card className="course-sec-basic p-5">
                                            <CardBody>
                                                <CardTitle
                                                    className=" text-left pt-4 pb-4"
                                                    tag="h2"
                                                >
                                                    Unisolve Worksheets
                                                </CardTitle>
                                                <CardBody>
                                                    {/* <p className="text-primary">
                                                        <b>
                                                            Additional Resources
                                                        </b>
                                                    </p> */}
                                                    <p>Dear Guide Teachers,</p>
                                                    <p>
                                                        In addition to the
                                                        teacher handbook there
                                                        are worksheets and
                                                        additional readings for
                                                        your student teams which
                                                        will aid in this
                                                        Unisolve learning
                                                        journey:
                                                    </p>
                                                    {/* <p className="mb-0">
                                                        A. Worksheets
                                                    </p>
                                                    <p className="mb-3">
                                                        B. Additional Readings
                                                    </p>

                                                    <p className="text-decoration-underline">
                                                        <b>A.Worksheets </b>
                                                    </p> */}
                                                    <h3>WORKSHEETS</h3>
                                                    <p className="mb-0">
                                                        1. This document had one
                                                        set of Worksheet per
                                                        Module.
                                                    </p>
                                                    <p className="mb-0">
                                                        2. Respective worksheets
                                                        are required to be
                                                        completed/filled by the
                                                        Unisolve Students (as a
                                                        TEAM) after they watch
                                                        each lesson from lesson
                                                        1 to lesson 6.
                                                    </p>
                                                    <p className="mb-0">
                                                        3. Download, Print/Xerox
                                                        this worksheets and hand
                                                        over one set per team.{' '}
                                                    </p>
                                                    <p className="mb-0">
                                                        4. Support/Mentor/Guide
                                                        Unisolve students to
                                                        complete the worksheets
                                                        if they need help.
                                                    </p>
                                                    <p className="mb-0">
                                                        5. Guide the teams to
                                                        upload their worksheets
                                                        on the portal after they
                                                        complete it.
                                                    </p>
                                                    <br></br>
                                                    <h3>ADDITIONAL READINGS</h3>
                                                    <p>
                                                        Print and provide the
                                                        related pages from the
                                                        Additional Reading
                                                        document to each student
                                                        while they watch the
                                                        respective video to
                                                        support their learning.
                                                    </p>
                                                </CardBody>
                                                <div className="text-left mb-5">
                                                    {worksheetResponce &&
                                                        worksheetResponce?.length >
                                                            0 &&
                                                        worksheetResponce.map(
                                                            (item, i) =>
                                                                i > 1 && (
                                                                    <Button
                                                                        style={{
                                                                            margin: '5px'
                                                                        }}
                                                                        key={i}
                                                                        label={`Download ${item
                                                                            .split(
                                                                                '/'
                                                                            )
                                                                            [
                                                                                item.split(
                                                                                    '/'
                                                                                )
                                                                                    .length -
                                                                                    1
                                                                            ].split(
                                                                                '.'
                                                                            )[0]
                                                                            .replace(
                                                                                '_',
                                                                                ' '
                                                                            )}`}
                                                                        btnClass="secondary mx-2"
                                                                        size="small"
                                                                        onClick={() =>
                                                                            handleInstructionDownload(
                                                                                item
                                                                            )
                                                                        }
                                                                    />
                                                                )
                                                        )}
                                                </div>

                                                {/* <p className="text-decoration-underline">
                                                    <b>
                                                        B. Additional Readings{' '}
                                                    </b>
                                                </p>
                                                <p>
                                                    These are additional reading
                                                    material for the students
                                                    after each lesson. This
                                                    document contains more
                                                    information and examples on
                                                    the topics covered in each
                                                    lesson.
                                                </p>
                                                <p>
                                                    This can be shared with Unisolve
                                                    students. We recommend to
                                                    share the soft copy or print
                                                    it for future reference.
                                                </p> */}
                                                <div className="text-left mb-5">
                                                    {worksheetResponce &&
                                                        worksheetResponce?.length >
                                                            0 &&
                                                        worksheetResponce.map(
                                                            (item, i) =>
                                                                i <= 1 && (
                                                                    <Button
                                                                        style={{
                                                                            margin: '5px'
                                                                        }}
                                                                        key={i}
                                                                        label={`Download ${item
                                                                            .split(
                                                                                '/'
                                                                            )
                                                                            [
                                                                                item.split(
                                                                                    '/'
                                                                                )
                                                                                    .length -
                                                                                    1
                                                                            ].split(
                                                                                '.'
                                                                            )[0]
                                                                            .replace(
                                                                                '_',
                                                                                ' '
                                                                            )}`}
                                                                        btnClass="secondary mx-2"
                                                                        size="small"
                                                                        onClick={() =>
                                                                            handleInstructionDownload(
                                                                                item
                                                                            )
                                                                        }
                                                                    />
                                                                )
                                                        )}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Fragment>
                                )}
                            {item === 'CERTIFICATE' && certificate && (
                                <Fragment>
                                    <Card className="course-sec-basic p-5">
                                        <CardBody>
                                            <CardTitle
                                                className=" text-left pt-4 pb-4"
                                                tag="h2"
                                            >
                                                Certificate
                                            </CardTitle>
                                            {worksheetResponce.response ===
                                                null && (
                                                <p>
                                                    Please Download
                                                    Certificate...
                                                </p>
                                            )}
                                            <div
                                                ref={pdfRef}
                                                style={{ position: 'relative' }}
                                            >
                                                <span
                                                    className="text-capitalize"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '19%',
                                                        left: '16%',
                                                        fontSize: 'inherit'
                                                    }}
                                                >
                                                    {
                                                        currentUser?.data[0]
                                                            ?.full_name
                                                    }
                                                </span>
                                                <img
                                                    src={TeacherCertificate}
                                                    alt="certificate"
                                                    style={{
                                                        width: '297px',
                                                        height: '209px'
                                                    }}
                                                />
                                            </div>
                                            <div className="text-right">
                                                <Button
                                                    button="submit"
                                                    label="Download Certificate"
                                                    btnClass="primary mt-4"
                                                    size="small"
                                                    style={{
                                                        marginRight: '2rem'
                                                    }}
                                                    onClick={
                                                        handleCertificateDownload
                                                    }
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Fragment>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = ({ teacherCourses, adminCourses }) => {
    const { teaherCoursesDetails, loading, mentorAttachments } = teacherCourses;
    const { adminCoursesDetails } = adminCourses;
    return {
        teaherCoursesDetails,
        loading,
        adminCoursesDetails,
        mentorAttachments
    };
};

export default connect(mapStateToProps, {
    getTeacherCourseDetailsActions: getTeacherCourseDetails,
    getAdminCourseDetailsActions: getAdminCourseDetails,
    getMentorCourseAttachmentsActions: getMentorCourseAttachments
})(TeacherPlayVideo);
