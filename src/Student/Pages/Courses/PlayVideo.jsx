/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './style.scss';
import { BsChevronRight, BsFilter } from 'react-icons/bs';
import { RiAwardFill } from 'react-icons/ri';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { getAdminCourseDetails } from '../../../redux/actions';
import TakeAssesmentPopup from './TakeAssesmentPopup';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { VscCircleFilled } from 'react-icons/vsc';
import { VscCheck } from 'react-icons/vsc';
import Vimeo from '@u-wave/react-vimeo';
import Layout from '../../Layout';
import { BsQuestionCircle } from 'react-icons/bs';
import { Modal } from 'react-bootstrap';
import CourseSuccessMessage from './CourseSuccessMessage';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody
} from 'reactstrap';
import { Button } from '../../../stories/Button';
import { GrDocument } from 'react-icons/gr';
import { AiFillPlayCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import {
    getCurrentUser,
    openNotificationWithIcon
} from '../../../helpers/Utils';
import axios from 'axios';
import ModuleAssesmentImg from '../../../assets/media/moduleAssesmentPopup.svg';
import { connect, useSelector } from 'react-redux';
import DetaledQuiz from '../../../Admin/DetailedQuiz/DetaledQuiz';

import Csv from '../../../assets/media/csv1.png';

import Pdf from '../../../assets/media/csv1.png';
import FullScreenButton from '../../../components/FullScreenButtonComp';
import { getLanguage } from '../../../constants/languageOptions';
import { updateStudentBadges } from '../../../redux/studentRegistration/actions';
import { useDispatch } from 'react-redux';
import CommonPage from '../../../components/CommonPage';
import { useTranslation } from 'react-i18next';
import { getStudentDashboardStatus } from '../../../redux/studentRegistration/actions';
//VIMEO REFERENCE
//https://github.com/u-wave/react-vimeo/blob/default/test/util/createVimeo.js

const PlayVideoCourses = (props) => {
    const scrollRef = React.createRef();
    const { t } = useTranslation();
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );

    // console.log(props);
    const course_id = props.match.params.id;
    const description = props.location.data
        ? props.location.data.description
        : '';
    const title = props.location.data ? props.location.data.title : '';
    const courseModulesCount = props.location.data
        ? props.location.data.course_modules_count
        : '';
    const courseVideosCount = props.location.data
        ? props.location.data.course_videos_count
        : '';
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const [condition, setCondition] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [showQuiz, setHideQuiz] = useState(false);
    const [backToQuiz, setBackToQuiz] = useState(false);
    const [quizId, setQizId] = useState('');
    const [worksheetId, setWorksheetId] = useState('');
    const [currentTopicId, setCourseTopicId] = useState('');
    const [fileName, setFileName] = useState('');
    const [topicObj, setTopicObj] = useState({});
    const [id, setResponce] = useState([]);
    const [firstObj, setFirstObj] = useState([]);
    const [continueObj, setContinueObj] = useState([]);
    const [moduleResponce, setUpdateModuleResponce] = useState([]);
    const [worksheetResponce, SetWorksheetResponce] = useState([]);
    const [courseData, setCourseData] = useState(null);
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
    const [topic, setTopic] = useState('');
    const [quizTopic, setQuizTopic] = useState('');

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
    const [selectedCourseModule, setSelectedCourseModule] = useState([]);
    const [worksheet, setWorksheetByWorkSheetId] = useState([]);
    const [fullScreen, setFullScreen] = useState({
        isFullSCreen: false,
        width: ''
    });
    const [seletedFilesName, setSeletedFilesName] = useState([]);
    const [seletedFiles, setSeletedFiles] = useState([]);
    const [open, setOpen] = useState('0');
    const [badge, setBadge] = useState('0');
    const [showPage, setshowPage] = useState(true);
    const [showCompleteMessage, setShowCompleteMessage] = useState(false);
    const [userUploadedlist, setuserUploadedlist] = useState([]);

    // linkComponent
    const LinkComponent = ({ original, item, url, removeFileHandler, i }) => {
        let a_link;
        let count;
        if (url) {
            a_link = item.split('/');
            count = a_link.length - 1;
        }
        return (
            <>
                {original ? (
                    <div className="badge mb-2 bg-info ms-3">
                        <span className="p-2">{item.name}</span>
                        {original && (
                            <span
                                className="pointer"
                                onClick={() => removeFileHandler(i)}
                            >
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        )}
                    </div>
                ) : (
                    <a
                        className="badge mb-2 bg-info p-3 ms-3"
                        href={item}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {a_link[count]}
                    </a>
                )}
            </>
        );
    };

    //fileupload---
    const [files, setFiles] = useState([]);
    const [uploadQId, setuploadQId] = useState(null);
    const [immediateLink, setImmediateLink] = useState(null);
    const handleUploadFiles = (addedFiles) => {
        // here we can upload the files //
        // addedFiles = selected files //
        const upload = [...files];
        addedFiles.some((item) => {
            if (upload.findIndex((i) => i.name === item.name) === -1)
                upload.push(item);
        });
        setFiles(upload);
        setImmediateLink(null);
    };
    const removeFileHandler = (i) => {
        const fileAdded = [...files];
        fileAdded.splice(i, 1);
        setFiles(fileAdded);
    };

    let maxFileSize = 20000000;
    const fileHandler = (e) => {
        let choosenFiles = Array.prototype.slice.call(e.target.files);
        e.target.files = null;
        let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
        const checkPat = choosenFiles.filter((item) => {
            let pat = item.name.split('.');
            pat.pop();
            return pat.join().search(pattern);
        });
        if (checkPat.length > 0) {
            openNotificationWithIcon(
                'error',
                "Only alphanumeric and '_' are allowed "
            );
            return;
        }
        if (choosenFiles.filter((item) => item.size > maxFileSize).length > 0) {
            openNotificationWithIcon('error', t('student.less_20MB'));
            return;
        }
        handleUploadFiles(choosenFiles);
        setuploadQId(id);
    };

    //----if course is completed and navigated to this page, course success msg will display first
    const { dashboardStatus } = useSelector(
        (state) => state?.studentRegistration
    );
    React.useEffect(() => {
        if (!dashboardStatus) {
            dispatch(
                getStudentDashboardStatus(
                    currentUser?.data[0]?.user_id,
                    language
                )
            );
        }
    }, []);
    React.useEffect(() => {
        if (
            dashboardStatus &&
            dashboardStatus?.all_topics_count ===
                dashboardStatus?.topics_completed_count
        ) {
            setShowCompleteMessage(true);
        } else {
            setShowCompleteMessage(false);
        }
    }, [dashboardStatus]);

    const toggle = (id) => {
        if (id === 1) {
            setOpen('1');
            setBadge('the_inspirer');
        } else if (open === id) {
            setOpen();
            // } else if (open === '0') {
            //     setOpen('1');
        } else if (id === 2) {
            setOpen('2');
            setBadge('the_team_player');
        } else if (id === 3) {
            setOpen('3');
            setBadge('the_finder');
        } else if (id === 4) {
            setOpen('4');
            setBadge('the_explorer');
        } else if (id === 5) {
            setOpen('5');
            setBadge('the_ideator');
        } else if (id === 6) {
            setOpen('6');
            setBadge('the_solver');
        } else if (id === 7) {
            setOpen('7');
        } else {
            setOpen(id);
        }
    };

    useEffect(() => {
        props.getAdminCourseDetailsActions(course_id, language);
    }, [course_id, language]);
    useEffect(() => {
        var topicArrays = [];
        var firstObjectArray = [];
        var continueArrays = [];
        var continueObjectArrays = [];
        setAdminCourse(props.adminCoursesDetails[0]);
        // setAdminCourseDetails(props.adminCoursesDetails[0].description);
        setAdminCourseDetails(
            props.adminCoursesDetails[0] &&
                props.adminCoursesDetails[0].course_modules
        );
        props.adminCoursesDetails[0] &&
            props.adminCoursesDetails[0].course_modules.map((course, index) => {
                course.course_topics.map((lecture, index) => {
                    topicArrays.push(lecture);
                });
            });
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
            setFirstObj(firstObjectArray);
        }
    }, [props.adminCoursesDetails]);
    async function fetchData(videoId) {
        // here videoId= videoId //
        setVideoId(videoId);
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/videos/' +
                videoId +
                '?' +
                getLanguage(language),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
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
                '/worksheets/' +
                worksheetId +
                '?' +
                getLanguage(language),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    SetWorksheetResponce(response.data.data[0]);
                    if (response.data.data[0].response) {
                        const userUploadedfiles =
                            response.data.data[0].response.split(/[,]/);
                        setuserUploadedlist(userUploadedfiles);
                    } else {
                        setuserUploadedlist([]);
                    }

                    const worksheet =
                        response.data.data[0].attachments.split(/[,]/);
                    setWorksheetByWorkSheetId(worksheet[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleNxtVideo = (id) => {
        // here we can go for next video //
        fetchData(id?.topic_type_id);
        setItem('VIDEO');
    };

    async function modulesListUpdateApi(courseTopicId) {
        // here courseTopicId = courseTopicId  //
        const body1 = JSON.stringify({
            user_id: JSON.stringify(currentUser?.data[0]?.user_id),
            course_topic_id: JSON.stringify(courseTopicId),
            status: 'Completed'
        });
        var config = {
            method: 'post',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/userTopicProgress' +
                '?' +
                getLanguage(language),
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
                    props.getAdminCourseDetailsActions(course_id, language);
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
        // here we can increase the volume //
        setVolume(parseFloat(false));
    };

    const selectVideo = (index) => {
        setVideoIndex(index);
    };

    const SearchProps = {
        size: 'small',
        placeholder: 'Search Course'
    };

    const progressProps = {
        options: [
            {
                name: 'Finish this course to get your certificate.',
                path: '/playCourse'
            }
        ],
        name: 'Your Progress',
        Icon: RiAwardFill,
        progress: true
    };
    const filterDropProps = {
        label: 'Filter by',
        labelIcon: BsFilter
    };
    const ImageCardProps = {
        label: 'ImageCardComp',
        imgUrl: 'https://picsum.photos/318/180',
        title: 'How can I improve self care with Ikigai?',
        count: '1,288 students',
        time: '5m',
        type: 'Health'
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
    const [videoCompleted, setVideoCompleted] = useState(false);
    const handleVimeoOnEnd = (event) => {
        const topixIndex = setTopicArrays.findIndex(
            (item) => item.topic_type_id === topicObj.topic_type_id
        );
        if (event.reflective_quiz_status !== 'INCOMPLETE') {
            if (
                topicObj.topic_type_id !==
                setTopicArrays[setTopicArrays?.length - 1]?.topic_type_id
            ) {
                setTopic(setTopicArrays[topixIndex]);
                modulesListUpdateApi(topicObj.course_topic_id);
                handleSelect(
                    topicObj.topic_type_id,
                    topicObj.course_topic_id,
                    topicObj.topic_type
                );
                handlePlayerPlay();
            } else {
                setVideoCompleted(true);
            }
        }
    };

    const handleTimeUpdate = (event) => {
        // console.log("==========", event);
        const videoLength = event.duration; //500
        const halfTrimmedLength = videoLength / 2; //250
        const calculatePercentage = halfTrimmedLength / videoLength; //0.5
        const eventSeconds = Math.floor(event.seconds);
        const calculatedSeconds = Math.floor(halfTrimmedLength);

        // const lastTrimmedLength = videoLength / 1; //250
        // const calculatePercentage1 = lastTrimmedLength / videoLength; //0.5
        // const eventSeconds1 = Math.floor(event.seconds);
        // const calculatedSeconds1 = Math.floor(calculatePercentage1);

        // console.log(
        //   lastTrimmedLength,
        //   "lastTrimmedLength==",
        //   calculatePercentage1,
        //   "calculatePercentage12",
        //   eventSeconds1,
        //   "eventSeconds13",
        //   calculatedSeconds1,
        //   "calculatedSeconds14"
        // );

        // if (
        //   event.percent === calculatePercentage &&
        //   eventSeconds === calculatedSeconds
        // ) {
        //   handlePlayerPause();
        //   setModalShow(true);
        // }

        if (id.reflective_quiz_status === 'INCOMPLETE') {
            if (event.percent === 1) {
                handlePlayerPause();
                setModalShow(true);
                setTimeout(() => {
                    handlePlayerPause();
                }, 1000);
            }
        }

        // // if (
        // //   event.percent === calculatePercentage1 &&
        // //   eventSeconds1 === calculatedSeconds1
        // // ) {
        // //   console.log("==============1===============");
        // // }
        // if (event.percent === 0.998) {
        //     modulesListUpdateApi(topicObj.course_topic_id);
        //     handleSelect(
        //         topicObj.topic_type_id,
        //         topicObj.course_topic_id,
        //         topicObj.topic_type
        //     );
        // }
        // handlePlayerPlay();
    };

    const handleSelect = (topicId, couseId, type) => {
        // here topicId = topicId ; couseId = couseId //
        // type = worksheet ,video, quiz //
        setShowCompleteMessage(false);
        setCourseTopicId(couseId);
        const topic_Index =
            setTopicArrays &&
            setTopicArrays.findIndex(
                (data) =>
                    data.topic_type_id === topicId &&
                    data.course_topic_id === couseId
            );
        const currentObject = setTopicArrays[topic_Index];
        // if(id.reflective_quiz_status === "COMPLETED"){}

        // if(currentObject && currentObject.progress === "COMPLETED"){
        const topicObj = setTopicArrays[topic_Index + 1];
        setTopicObj(topicObj);
        if (type === 'WORKSHEET') {
            setWorksheetId(topicId);
            getWorkSheetApi(topicId);
            setItem('WORKSHEET');
            setHideQuiz(false);
        } else if (type === 'QUIZ') {
            setItem('QUIZ');
            setQizId(topicId);
        } else if (type === 'VIDEO') {
            setItem('VIDEO');
            fetchData(topicId);
            setHideQuiz(false);
        } else {
            setItem('');
            setHideQuiz(false);
        }
        scrollRef.current.scrollIntoView();
        // }
    };

    const videoStatus = (type, status) => {
        // here type = video , worksheet , quiz //
        // here status = Incomplete , completed //
        const done = <IoCheckmarkDoneCircleSharp className="done" />;
        const notDone = <IoCheckmarkDoneCircleSharp />;
        if (type === 'VIDEO' && status === 'COMPLETED') {
            return done;
        } else if (type === 'VIDEO' && status === 'INCOMPLETE') {
            // console.log("=================================================");
            return notDone;
        }

        if (type === 'WORKSHEET' && status === 'COMPLETED') {
            return done;
        } else if (type === 'WORKSHEET' && status === 'INCOMPLETE') {
            return notDone;
        }

        if (type === 'QUIZ' && status === 'COMPLETED') {
            return done;
        } else if (type === 'QUIZ' && status === 'INCOMPLETE') {
            return notDone;
        }
    };

    const handleClose = (item) => {
        // here we can close the worksheet //
        setItem('WORKSHEET');
        setModalShow(item);
        setHideQuiz(false);
    };
    const handleQuiz = () => {
        // here we can see quiz //
        modulesListUpdateApi(topicObj.course_topic_id);
        handleSelect(
            topicObj.topic_type_id,
            topicObj.course_topic_id,
            topicObj.topic_type
        );
    };
    const handleAssesmentClose = () => {
        modulesListUpdateApi(topicObj.course_topic_id);
        setItem('VIDEO');
        setTopic(topicObj);
        handleSelect(
            topicObj.topic_type_id,
            topicObj.course_topic_id,
            topicObj.topic_type
        );
        setModalShow(false);
        setHideQuiz(false);
    };

    const changeHandler = (event) => {
        const data = [];
        for (let i = 0; i < event.target.files.length; i++) {
            data.push(event.target.files[i]);
        }
        setSeletedFilesName(data);
        setSeletedFiles(event.target.files);

        const file = event.target.files[0].name.split('.', 2);
        if (file[1] === 'pdf') {
            let img = event.target.files[0];
            setUrl(file[1]);
            setImage(img);
            setFileName(event.target.files[0].name);
        }
        event.target.files = null;
    };
    const removeSelectedImage = () => {
        // here we can remove the selected image //
        setSeletedFiles();
        setImage();
        setFileName();
        setUrl();
    };
    const handleSubmit = (e) => {
        // here we can submit the worksheet response //
        if (files) {
            // console.log(files,"---files");
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                let fieldName = 'file' + i ? i : '';
                formData.append(fieldName, files[i]);
            }
            var config = {
                method: 'post',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    '/worksheets/' +
                    worksheetId +
                    '/response' +
                    '?' +
                    getLanguage(language),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: formData
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        getWorkSheetApi(worksheetId);
                        // setImage();
                        // setFileName();
                        // setUrl();
                        // setSeletedFiles();
                        // dispatch(
                        //     updateStudentBadges(
                        //         { badge_slugs: [badge] },
                        //         currentUser.data[0].user_id,
                        //         language,t
                        //     )
                        // );
                        setFiles([]);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    const handleNextCourse = () => {
        // here we can go for next course //
        if (topicObj) {
            toggle(topicObj.course_module_id);
            modulesListUpdateApi(topicObj.course_topic_id);
            setTopic(topicObj);
            handleSelect(
                topicObj.topic_type_id,
                topicObj.course_topic_id,
                topicObj.topic_type
            );
        } else {
            setShowCompleteMessage(true);
        }
    };

    const startFirstCourse = (e) => {
        // here we can start the student presurvey journey //
        setCourseData(null);
        modulesListUpdateApi(firstObj[0].course_topic_id);
        setTopic(firstObj[0]);
        handleSelect(
            firstObj[0].topic_type_id,
            firstObj[0].course_topic_id,
            firstObj[0].topic_type
        );
        toggle(firstObj[0].course_module_id);
    };

    const startContinueCourse = (e) => {
        // here we can start the course //
        setCourseData(null);
        modulesListUpdateApi(continueObj[0].course_topic_id);
        setTopic(continueObj[0]);
        handleSelect(
            continueObj[0].topic_type_id,
            continueObj[0].course_topic_id,
            continueObj[0].topic_type
        );
        toggle(continueObj[0].course_module_id);
    };
    const startCourseModule = (e) => {
        modulesListUpdateApi(
            selectedCourseModule.course_topics[0].course_topic_id
        );
        handleSelect(
            selectedCourseModule.course_topics[0].topic_type_id,
            selectedCourseModule.course_topics[0].course_topic_id,
            selectedCourseModule.course_topics[0].topic_type
        );
    };
    const comingSoonText = t('dummytext.student_course');
    return (
        <Layout>
            {!showPage ? (
                <CommonPage text={comingSoonText} />
            ) : (
                <div className="courses-page" ref={scrollRef}>
                    <Row className="courses-head view-head py-5">
                        <Col md={12} lg={9} className="mb-5 mb-md-5 mb-lg-0">
                            {/* <p className="course-breadcrum">
                            Courses <BsChevronRight /> Courses details
                        </p> */}
                            <div className="courses-type">
                                <BsLayoutTextSidebarReverse />
                                <span className="card-type">
                                    {adminCourse && adminCourse.title}
                                </span>
                                <BsLayoutTextSidebarReverse className="lessonsvg" />
                                <span className="card-type">
                                    {adminCourse &&
                                        adminCourse.course_modules_count}{' '}
                                    {t('student_course.modules')}
                                </span>
                                <RiAwardFill className="lessonsvg" />
                                <span className="card-type points">
                                    {adminCourse &&
                                        adminCourse.course_videos_count}{' '}
                                    {t('student_course.videos')}
                                </span>
                            </div>
                        </Col>
                        {/* <Col md={12} lg={3} className="my-auto text-right">
                        <div className="progress-dropdown">
                            <CommonDropDownComp {...progressProps} />
                        </div>
                    </Col> */}
                    </Row>
                    <div className="px-5 mx-3">
                        <FullScreenButton
                            fullScreen={fullScreen}
                            setFullScreen={setFullScreen}
                        />
                    </div>

                    <div className=" px-3 px-md-5 mt-2 container-fluid">
                        <Row className="m-0 courser-video-section ">
                            <Col
                                xl={4}
                                className="course-assement order-2 order-xl-1 mb-5"
                                style={{
                                    display: `${
                                        fullScreen.isFullSCreen ? 'none' : ''
                                    }`
                                }}
                            >
                                <div className="assement-info">
                                    <p className="content-title">
                                        {t('student_course.lessons')}
                                    </p>
                                    <div className="view-head"></div>
                                    <div
                                        className="assement-item "
                                        id="scrollbar"
                                    >
                                        <Accordion open={open} toggle={toggle}>
                                            {adminCourseDetails &&
                                                adminCourseDetails.length &&
                                                adminCourseDetails.map(
                                                    (course, index) => {
                                                        const str = index + 1;
                                                        const str1 =
                                                            str.toString();
                                                        return (
                                                            <AccordionItem
                                                                className="m-0 course-items"
                                                                key={index}
                                                                onClick={() => {
                                                                    setCourseData(
                                                                        course
                                                                    );
                                                                    toggle(str);
                                                                    if (
                                                                        index ===
                                                                        0
                                                                    ) {
                                                                        setSelectedCourseModule(
                                                                            course
                                                                        );
                                                                    } else {
                                                                        setSelectedCourseModule(
                                                                            null
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                <AccordionHeader
                                                                    className="question"
                                                                    targetId={
                                                                        str1
                                                                    }
                                                                >
                                                                    <div className="course-sec">
                                                                        {/* <Avatar src={User} className="avatar-imgs" /> */}
                                                                        <div className="course-title">
                                                                            {
                                                                                course.title
                                                                            }
                                                                        </div>
                                                                        <div className="course-time">
                                                                            <span>
                                                                                {
                                                                                    course.videos_count
                                                                                }{' '}
                                                                                {t(
                                                                                    'student.videos'
                                                                                )}
                                                                            </span>

                                                                            {/* <span>
                                  <BsDot />
                                  {course.sectionDuration}mins
                                </span> */}
                                                                        </div>
                                                                    </div>
                                                                </AccordionHeader>
                                                                <AccordionBody
                                                                    accordionId={
                                                                        str1
                                                                    }
                                                                >
                                                                    <div className="course-list">
                                                                        {course.course_topics.map(
                                                                            (
                                                                                lecture,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className={`course-sec-list ${
                                                                                            lecture.progress ===
                                                                                            'COMPLETED'
                                                                                                ? 'hHover'
                                                                                                : 'noHover'
                                                                                        }  `}
                                                                                    >
                                                                                        <Row
                                                                                            style={{
                                                                                                background:
                                                                                                    currentTopicId ===
                                                                                                        lecture.course_topic_id &&
                                                                                                    '#f0f3f8',
                                                                                                position:
                                                                                                    'relative',
                                                                                                left: '0.75rem'
                                                                                            }}
                                                                                            className={`justify-content-between w-100 px-4 py-3 ${
                                                                                                lecture.progress ===
                                                                                                'COMPLETED'
                                                                                                    ? 'hHover'
                                                                                                    : 'noCurser'
                                                                                            }`}
                                                                                        >
                                                                                            <Col
                                                                                                md={
                                                                                                    12
                                                                                                }
                                                                                                className="my-auto"
                                                                                                onClick={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    e.stopPropagation();
                                                                                                    setTopic(
                                                                                                        lecture
                                                                                                    );
                                                                                                    setCourseData(
                                                                                                        null
                                                                                                    );
                                                                                                    handleSelect(
                                                                                                        lecture.topic_type_id,
                                                                                                        lecture.course_topic_id,
                                                                                                        lecture.topic_type
                                                                                                    );
                                                                                                    setHideQuiz(
                                                                                                        false
                                                                                                    );
                                                                                                    setQuizTopic(
                                                                                                        ''
                                                                                                    );
                                                                                                    setBackToQuiz(
                                                                                                        false
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <p className="course-icon mb-0">
                                                                                                    {videoStatus(
                                                                                                        lecture.topic_type,
                                                                                                        lecture.progress
                                                                                                    )}

                                                                                                    <span className="course-title">
                                                                                                        {
                                                                                                            lecture.title
                                                                                                        }
                                                                                                    </span>

                                                                                                    {lecture.type ===
                                                                                                    'modal' ? (
                                                                                                        <span
                                                                                                            className="course-name"
                                                                                                            onClick={() =>
                                                                                                                setModalShow(
                                                                                                                    true
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            Assesment
                                                                                                        </span>
                                                                                                    ) : (
                                                                                                        ''
                                                                                                    )}
                                                                                                </p>
                                                                                                {/* <p className="course-time mb-0 px-5 my-auto">
                                                                                                {videoType(
                                                                                                    lecture.topic_type
                                                                                                )}
                                                                                                {lecture.video_duration && (
                                                                                                    <span className="px-2">
                                                                                                        
                                                                                                        {Math.floor(
                                                                                                            lecture.video_duration /
                                                                                                                60
                                                                                                        )}
                                                                                                        {
                                                                                                            ''
                                                                                                        }{' '}
                                                                                                        min
                                                                                                    </span>
                                                                                                )
                                                                                                }
                                                                                            </p> */}
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                </AccordionBody>
                                                            </AccordionItem>
                                                        );
                                                    }
                                                )}
                                        </Accordion>
                                    </div>
                                </div>
                                {/* <div className='module-assement'>
                <div className='assement-info'>
                  <p className='content-title text-white'>Module Assessement</p>
                  <p className='module-text m-0'>
                    Test your knowledge of all skills in this module.
                  </p>
                  <p className='assement-link text-white pt-5'>
                    <span onClick={() => setModalShow(true)}>
                      Take assessment <BsChevronRight />
                    </span>
                    <figure>
                      <img
                        src={CourseVideo}
                        alt='module'
                        className='img-fluid'
                      />
                    </figure>
                  </p>
                </div>
              </div> */}
                            </Col>

                            <Col
                                xl={8}
                                className="course-video order-1 order-xl-2 mb-5 px-md-3 px-0"
                                style={{
                                    width: `${
                                        fullScreen.isFullSCreen
                                            ? fullScreen.width
                                            : ''
                                    }`
                                }}
                            >
                                {showCompleteMessage ? (
                                    <div className="bg-white rounded">
                                        <CourseSuccessMessage />
                                    </div>
                                ) : (
                                    <>
                                        {item === 'QUIZ' && !showQuiz ? (
                                            <div
                                                size="lg"
                                                centered
                                                className="modal-popup text-screen text-center  modal-popup"
                                            >
                                                <div className="modal-content">
                                                    <Modal.Header>
                                                        <Modal.Title className="w-100 d-block mb-2">
                                                            {t(
                                                                'student.quiz_heading'
                                                            )}
                                                        </Modal.Title>
                                                        <p className="w-100 d-block">
                                                            {t(
                                                                'student.take_challenge'
                                                            )}
                                                        </p>
                                                        <div className="row justify-content-center text-center">
                                                            <div className="col col-lg-3">
                                                                <p>
                                                                    <VscCircleFilled
                                                                        style={{
                                                                            color: '#067DE1'
                                                                        }}
                                                                    />
                                                                    {t(
                                                                        'student.questions'
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="col col-lg-3">
                                                                <p>
                                                                    <VscCircleFilled
                                                                        style={{
                                                                            color: '#067DE1'
                                                                        }}
                                                                    />{' '}
                                                                    {t(
                                                                        'student.minutes'
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Modal.Header>

                                                    <Modal.Body>
                                                        <figure>
                                                            <img
                                                                src={
                                                                    ModuleAssesmentImg
                                                                }
                                                                alt="test"
                                                                className="img-fluid w-50"
                                                            />
                                                        </figure>
                                                        <Button
                                                            label={t(
                                                                'student.lets_start'
                                                            )}
                                                            btnClass="primary mt-4"
                                                            size="small"
                                                            onClick={() =>
                                                                setHideQuiz(
                                                                    true
                                                                )
                                                            }
                                                        />
                                                    </Modal.Body>
                                                </div>
                                            </div>
                                        ) : item === 'WORKSHEET' ? (
                                            <Fragment>
                                                <Card className="course-sec-basic p-5">
                                                    <CardBody>
                                                        <div>
                                                            <CardTitle
                                                                className=" text-left pt-4 pb-4"
                                                                tag="h2"
                                                            >
                                                                Unisolve{' '}
                                                                {t(
                                                                    'student.w_sheet'
                                                                )}
                                                            </CardTitle>
                                                            <text>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: t(
                                                                            'student.worksheet'
                                                                        )
                                                                    }}
                                                                ></div>
                                                            </text>
                                                            <div className="text-left">
                                                                <div className="wrapper my-3 m-3">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-primary btn-lg"
                                                                    >
                                                                        upload
                                                                        file
                                                                    </button>
                                                                    <input
                                                                        type="file"
                                                                        name="file"
                                                                        multiple
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            fileHandler(
                                                                                e,
                                                                                '34'
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    btnClass={
                                                                        files.length >
                                                                        0
                                                                            ? 'primary'
                                                                            : 'default'
                                                                    }
                                                                    size="small"
                                                                    disabled={
                                                                        !files.length >
                                                                        0
                                                                    }
                                                                    label={
                                                                        'Submit'
                                                                    }
                                                                    onClick={() =>
                                                                        handleSubmit()
                                                                    }
                                                                />
                                                                <div className="mx-4">
                                                                    {immediateLink &&
                                                                        immediateLink.length >
                                                                            0 &&
                                                                        immediateLink.map(
                                                                            (
                                                                                item,
                                                                                i
                                                                            ) => (
                                                                                <LinkComponent
                                                                                    item={
                                                                                        item
                                                                                    }
                                                                                    url={
                                                                                        true
                                                                                    }
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                />
                                                                            )
                                                                        )}
                                                                    {!immediateLink &&
                                                                        files.length >
                                                                            0 &&
                                                                        files.map(
                                                                            (
                                                                                item,
                                                                                i
                                                                            ) => (
                                                                                <LinkComponent
                                                                                    original={
                                                                                        true
                                                                                    }
                                                                                    item={
                                                                                        item
                                                                                    }
                                                                                    i={
                                                                                        i
                                                                                    }
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    removeFileHandler={
                                                                                        removeFileHandler
                                                                                    }
                                                                                />
                                                                            )
                                                                        )}
                                                                    {!immediateLink &&
                                                                        files.length ===
                                                                            0 &&
                                                                        userUploadedlist.map(
                                                                            (
                                                                                item,
                                                                                i
                                                                            ) => (
                                                                                <LinkComponent
                                                                                    item={
                                                                                        item
                                                                                    }
                                                                                    url={
                                                                                        true
                                                                                    }
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                />
                                                                            )
                                                                        )}
                                                                </div>
                                                            </div>

                                                            <div className="text-right">
                                                                {/* {worksheetResponce.response ===
                                                                                    null ? (
                                                                                        <a
                                                                                            // href={
                                                                                            //     process
                                                                                            //         .env
                                                                                            //         .REACT_APP_API_IMAGE_BASE_URL +
                                                                                            //     worksheetResponce?.attachments
                                                                                            // }
                                                                                            href = {worksheetResponce?.attachments}
                                                                                            target="_blank"
                                                                                            rel="noreferrer"
                                                                                            className="primary"
                                                                                        >
                                                                                            <Button
                                                                                                button="submit"
                                                                                                label='new'
                                                                                                btnClass="primary mt-4 mb-2"
                                                                                                size="small"
                                                                                                style={{
                                                                                                    marginRight:
                                                                                                        '2rem'
                                                                                                }}
                                                                                            />
                                                                                        </a>
                                                                                    ) : ( */}
                                                                <a
                                                                    // href={
                                                                    //     process
                                                                    //         .env
                                                                    //         .REACT_APP_API_IMAGE_BASE_URL +
                                                                    //     worksheet
                                                                    // }
                                                                    href={
                                                                        worksheet
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="primary m-3"
                                                                >
                                                                    <Button
                                                                        button="submit"
                                                                        label={t(
                                                                            'student.download_worksheet'
                                                                        )}
                                                                        btnClass="primary mt-4 mb-2"
                                                                        size="small"
                                                                    />
                                                                </a>
                                                                {/* )} */}
                                                                {/* <Button
                                                                                        label={t(
                                                                                            'student.continue'
                                                                                        )}
                                                                                        btnClass=" mx-4"
                                                                                        size="small"
                                                                                        type="submit"
                                                                                        style={{
                                                                                            background:
                                                                                                '#00ced1',
                                                                                            color: '#fff'
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            handleNextCourse();
                                                                                            dispatch(
                                                                                                updateStudentBadges(
                                                                                                    {
                                                                                                        badge_slugs:
                                                                                                            [
                                                                                                                badge
                                                                                                            ]
                                                                                                    },
                                                                                                    currentUser
                                                                                                        .data[0]
                                                                                                        .user_id,
                                                                                                    language,t
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    /> */}

                                                                {worksheetResponce.response !=
                                                                    null && (
                                                                    // worksheetResponce.worksheet_id !==
                                                                    //     setTopicArrays[
                                                                    //         setTopicArrays?.length -
                                                                    //         1
                                                                    //     ]
                                                                    //         ?.topic_type_id ? (
                                                                    <Button
                                                                        label="Go to Next Course"
                                                                        btnClass="primary w-auto"
                                                                        size="small"
                                                                        type="submit"
                                                                        style={{
                                                                            background:
                                                                                '#00ced1',
                                                                            color: '#fff'
                                                                        }}
                                                                        onClick={() => {
                                                                            handleNextCourse();
                                                                            dispatch(
                                                                                updateStudentBadges(
                                                                                    {
                                                                                        badge_slugs:
                                                                                            [
                                                                                                badge
                                                                                            ]
                                                                                    },
                                                                                    currentUser
                                                                                        .data[0]
                                                                                        .user_id,
                                                                                    language,
                                                                                    t
                                                                                )
                                                                            );
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Fragment>
                                        ) : courseData !== null && !showQuiz ? (
                                            <Fragment>
                                                <Card
                                                    className="course-sec-basic p-5"
                                                    id="desc"
                                                >
                                                    <CardBody>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    courseData &&
                                                                    courseData.description
                                                            }}
                                                        ></div>
                                                        <div>
                                                            <Button
                                                                label={t(
                                                                    'student_course.continue course'
                                                                )}
                                                                btnClass="primary mt-4"
                                                                size="small"
                                                                onClick={(e) =>
                                                                    startContinueCourse(
                                                                        e
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Fragment>
                                        ) : item === 'VIDEO' &&
                                          condition === 'Video1' ? (
                                            <>
                                                <Card className="embed-container">
                                                    <CardTitle className=" text-left p-4 d-flex justify-content-between align-items-center">
                                                        <h3>
                                                            {topic?.title +
                                                                ' ' +
                                                                quizTopic}
                                                        </h3>
                                                        {backToQuiz && (
                                                            <Button
                                                                label={t(
                                                                    'student.backto_quiz'
                                                                )}
                                                                btnClass="primary"
                                                                size="small"
                                                                onClick={() => {
                                                                    setBackToQuiz(
                                                                        false
                                                                    );
                                                                    setItem('');
                                                                    setHideQuiz(
                                                                        true
                                                                    );
                                                                    setQuizTopic(
                                                                        ''
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    </CardTitle>
                                                    {/* https://vimeo.com/226260195 */}
                                                    {videoCompleted ? (
                                                        <CourseSuccessMessage />
                                                    ) : (
                                                        <Vimeo
                                                            video={
                                                                id.video_stream_id
                                                            }
                                                            volume={volume}
                                                            paused={paused}
                                                            onPause={
                                                                handlePlayerPause
                                                            }
                                                            onPlay={
                                                                handlePlayerPlay
                                                            }
                                                            onSeeked={
                                                                handleSeeked
                                                            }
                                                            onTimeUpdate={
                                                                handleTimeUpdate
                                                            }
                                                            onEnd={() => {
                                                                if (
                                                                    backToQuiz
                                                                ) {
                                                                    setBackToQuiz(
                                                                        false
                                                                    );
                                                                    setItem('');
                                                                    setHideQuiz(
                                                                        true
                                                                    );
                                                                    setQuizTopic(
                                                                        ''
                                                                    );
                                                                    return;
                                                                }
                                                                handleVimeoOnEnd(
                                                                    id
                                                                );
                                                            }}
                                                            showTitle
                                                        />
                                                    )}
                                                    {/* <p className="p-4">
                                                                    <span> Description : </span> Lorem
                                                                    ipsum dolor sit amet, consectetur
                                                                    adipisicing elit. Ullam fugiat fuga
                                                                    alias cupiditate dolor quos mollitia
                                                                    maiores quia, aliquid perspiciatis
                                                                    praesentium nisi voluptatum
                                                                    quibusdam consequuntur. Saepe harum
                                                                    hic dicta eius.
                                                                </p> */}
                                                </Card>
                                            </>
                                        ) : (
                                            showQuiz === false &&
                                            item !== 'VIDEO' &&
                                            condition !== 'Video1' && (
                                                <Fragment>
                                                    <Card className="course-sec-basic p-5 mb-5">
                                                        <CardBody>
                                                            <text>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html:
                                                                            adminCourse &&
                                                                            adminCourse.description
                                                                    }}
                                                                ></div>
                                                            </text>
                                                            {firstObj[0] &&
                                                            firstObj[0]
                                                                .progress ==
                                                                'INCOMPLETE' ? (
                                                                <div>
                                                                    <Button
                                                                        label={t(
                                                                            'student_course.start course'
                                                                        )}
                                                                        btnClass="primary mt-4"
                                                                        size="small"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            startFirstCourse(
                                                                                e
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <Button
                                                                        label={t(
                                                                            'student_course.continue course'
                                                                        )}
                                                                        btnClass="primary mt-4"
                                                                        size="small"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            startContinueCourse(
                                                                                e
                                                                            )
                                                                        }
                                                                    />
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
                                                setQuizTopic={setQuizTopic}
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </>
                                )}
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
            <TakeAssesmentPopup
                quiz="true"
                refQst={id && id.reflective_quiz_questions}
                videoId={videoId}
                show={modalShow}
                handleClose={() => handleAssesmentClose(topic)}
                onHide={() => setModalShow(false)}
            />
        </Layout>
    );
};

// export default withRouter(AdminPlayVideoCourses);

const mapStateToProps = ({ adminCourses }) => {
    const { adminCoursesDetails, loading } = adminCourses;
    return { adminCoursesDetails, loading };
};
export default connect(mapStateToProps, {
    getAdminCourseDetailsActions: getAdminCourseDetails
})(PlayVideoCourses);
