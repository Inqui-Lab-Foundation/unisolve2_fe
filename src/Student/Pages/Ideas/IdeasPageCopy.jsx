/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { Button } from '../../../stories/Button';
import { TextArea } from '../../../stories/TextArea/TextArea';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Layout from '../../Layout';
import { useSelector } from 'react-redux';
import {
    getStudentChallengeQuestions,
    getStudentChallengeSubmittedResponse
    // updateStudentBadges
} from '../../../redux/studentRegistration/actions';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../../helpers/Utils';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils';
import axios from 'axios';
import { KEY, URL } from '../../../constants/defaultValues';
import CommonPage from '../../../components/CommonPage';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../../assets/media/logout.svg';
import { cardData } from './SDGData';
import moment from 'moment';
import { getLanguage } from '../../../constants/languageOptions';

const LinkComponent = ({ original, item,url, removeFileHandler, i }) => {
    let a_link;
    let count;
    if(url){
        a_link = item.split( '/' ); 
        count = a_link.length - 1;
    }
    return (
        <>
            {original ? <div className="badge mb-2 bg-info ms-3">
                <span className="p-2">{item.name}</span>
                {original && (
                    <span className="pointer" onClick={() => removeFileHandler(i)}>
                        <AiOutlineCloseCircle size={20} />
                    </span>
                )}            
            </div> :
                <a
                    className="badge mb-2 bg-info p-3 ms-3"
                    href={item}
                    target="_blank"
                    rel="noreferrer"
                >
                    {a_link[count]}
                </a>
            }
        </>
    );
};
const IdeasPageNew = () => {
    const { t } = useTranslation();
     const history = useHistory();
    const challengeQuestions = useSelector(
        (state) => state?.studentRegistration.challengeQuestions
    );
    const showPage = false;
    const [answerResponses, setAnswerResponses] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const initialLoadingStatus = { draft: false, submit: false };
    const [loading, setLoading] = useState(initialLoadingStatus);
    const [wordCount, setWordCount] = useState([]);
    const { challengesSubmittedResponse } = useSelector(
        (state) => state?.studentRegistration
    );
    const initialSDG = challengesSubmittedResponse[0]?.sdg;
    const [sdg, setSdg] = useState(challengesSubmittedResponse[0]?.sdg);
    const [files, setFiles] = useState([]);
    const [uploadQId, setuploadQId] = useState(null);
    const [immediateLink, setImmediateLink] = useState(null);
    const [others, setOthers] = useState(
        challengesSubmittedResponse[0]?.others
    );
    const initiatedBy =
        challengesSubmittedResponse &&
        challengesSubmittedResponse.length > 0 &&
        challengesSubmittedResponse[0].initiated_by;
    const submittedResponse = challengesSubmittedResponse[0]?.response;
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    const prePopulatingCount = (answers) => {
        if (answers && answers !== {}) {
            const data = Object.entries(answers);
            const answerFormat = data.map((item) => {
                return {
                    i: item[0],
                    count:
                        (item[1]?.word_limit ? item[1]?.word_limit : 100) -
                        item[1]?.selected_option[0]?.length
                };
            });
            return answerFormat;
        }
    };
    const prePopulatingData = (answers) => {
        if (answers && answers !== {}) {
            const data = Object.entries(answers);
            const answerFormat = data.map((item) => {
                return {
                    challenge_question_id: item[0],
                    selected_option: item[1]?.selected_option,
                    type: item[1]?.question_type
                };
            });
            return answerFormat;
        }
    };
    const filterAnswer = (questionId) => {
        const data =
            answerResponses &&
            answerResponses.length > 0 &&
            answerResponses.filter(
                (item) => item.challenge_question_id == questionId
            );
        return data && data.length > 0 && data[0].selected_option
            ? data[0].selected_option
            : '';
    };
    const redirect = () => {
        window.location.reload(false);
    };
    useEffect(() => {
        dispatch(getStudentChallengeQuestions(language));
    }, [language, dispatch]);
    useEffect(() => {
        setAnswerResponses(
            prePopulatingData(submittedResponse)
                ? prePopulatingData(submittedResponse)
                : []
        );
        setWordCount(
            prePopulatingCount(submittedResponse)
                ? prePopulatingCount(submittedResponse)
                : []
        );
    }, [submittedResponse]);
    useEffect(() => {
        setSdg(challengesSubmittedResponse[0]?.sdg);
        setOthers(challengesSubmittedResponse[0]?.others);
    }, [challengesSubmittedResponse]);

    useEffect(() => {
        if (challengesSubmittedResponse.length === 0)
            dispatch(
                getStudentChallengeSubmittedResponse(
                    currentUser?.data[0]?.team_id,
                    language
                )
            );
    }, [
        language,
        dispatch,
        currentUser?.data[0]?.team_id,
        challengesSubmittedResponse
    ]);
    const handleWordCount = (e, i, max) => {
        let obj = { i, count: (max ? max : 100) - e.target.value.length };
        let newItems = [...wordCount];
        const findExistanceIndex = newItems.findIndex((item) => item?.i == i);
        if (findExistanceIndex === -1) {
            newItems.push(obj);
        } else {
            let temp = newItems[findExistanceIndex];
            newItems[findExistanceIndex] = {
                ...temp,
                count: (max ? max : 100) - e.target.value.length
            };
        }
        setWordCount(newItems);
    };
    const filterCount = (id, max) => {
        const data =
            wordCount &&
            wordCount.length > 0 &&
            wordCount.filter((item) => item.i == id);
        return data && data.length > 0 && (data[0]?.count || "0") 
            ? data[0].count
            : max
            ? max
            : 100;
    };
    const handleChange = (e) => {
        let newItems = [...answerResponses];
        let obj = {
            challenge_question_id: e.target.name,
            selected_option:
                e.target.type === 'checkbox' ? [e.target.value] : e.target.value
        };
        const findExistanceIndex = newItems.findIndex(
            (item) =>
                parseInt(item?.challenge_question_id) ===
                parseInt(e.target.name)
        );
        if (findExistanceIndex === -1) {
                newItems.push(obj);
        } else {
            let temp = newItems[findExistanceIndex];
            if (e.target.type === 'checkbox') {
                let options = [...temp.selected_option];
                let indexOfCheckedAnswers = options.indexOf(e.target.value);
                if (e.target.checked && indexOfCheckedAnswers === -1) {
                    options.push(e.target.value);
                } else {
                    options.splice(indexOfCheckedAnswers, 1);
                }
                newItems[findExistanceIndex] = {
                    ...temp,
                    selected_option: options
                };
            } else {
                if(e.target.value === ''){
                    newItems.splice(findExistanceIndex, 1);
                }else{
                    newItems[findExistanceIndex] = {
                        ...temp,
                        selected_option: e.target.value
                    };
                }
            }
        }
        setAnswerResponses(newItems);
    };
    let lengthCheck =
        challengeQuestions.filter((item) => item.type !== 'DRAW').length +
        (sdg === 'OTHERS' ? 1 : 0);
    const responseData = answerResponses.map((eachValues) => {
        lengthCheck += eachValues.type ==="DRAW" ? 1 : 0;
        return {
            challenge_question_id: eachValues.challenge_question_id,
            selected_option: eachValues.selected_option
        };
    });
    const swalWrapper = (e, type) => {
        let responses = [...responseData];
        let responseLength =
            responses.length + (sdg === 'OTHERS' && others ? 1 : 0);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });
        if (!type && responseLength < lengthCheck) {
            swalWithBootstrapButtons.fire({
                title: t('student.not_allowed'),
                text: t('student.please_com_all'),
                imageUrl: `${logout}`,
                showCloseButton: true
            });
            return;
        }
        swalWithBootstrapButtons
            .fire({
                title: t('general_req.submit_idea'),
                text: t('general_req.are_you_sure'),
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: t('teacher_teams.submit'),
                showCancelButton: true,
                cancelButtonText: t('general_req.btn_cancel'),
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        handleSubmit(e, type);
                    }
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                    t('general_req.cancelled'),
                    t('general_req.idea_sub_cancelled'),
                    'error');
                }
            });
    };
    const handleUploadFiles = (addedFiles) => {
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
    const fileHandler = (e, id) => {
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
            openNotificationWithIcon(
                'error',
                t('student.less_20MB')
            );
            return;
        }
        handleUploadFiles(choosenFiles);
        setuploadQId(id);
    };
    const submittingCall = async (type, responses) => {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        let submitData = {
            responses,
            status: type ? 'DRAFT' : 'SUBMITTED',
            sdg,
            others: others ? others : ''
        };
        await axios
            .post(
                `${URL.submitChallengeResponse}team_id=${currentUser?.data[0]?.team_id}&${getLanguage(language)}`,
                submitData,
                axiosConfig
            )
            .then((challengeStatus) => {
                if (challengeStatus?.status == 200) {
                    openNotificationWithIcon(
                        'success',
                        `${
                            type ? t("student.idea_draft") : t("student.idea_submitted")
                        } `
                    );
                if(type!=='DRAFT'){
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success'
                        },
                        buttonsStyling: false
                    });

                    swalWithBootstrapButtons.fire({
                        title: t('badges.congratulations'),
                        text: t('badges.earn'),
                        // text:`You have Earned a New Badge ${data.badge_slugs[0].replace("_"," ").toUpperCase()}`,
                        imageUrl: `${logout}`,
                        showCloseButton: true,
                        confirmButtonText: t('badges.ok'),
                        showCancelButton: false,
                        reverseButtons: false
                    });
                }
                    // const badge = 'the_change_maker';
                    // if (!type) {
                    //     dispatch(
                    //         updateStudentBadges(
                    //             { badge_slugs: [badge] },
                    //             currentUser?.data[0]?.user_id,
                    //             language,
                    //             t
                    //         )
                    //     );
                    // }
                    setTimeout(() => {
                        dispatch(
                            getStudentChallengeSubmittedResponse(
                                currentUser?.data[0]?.team_id,
                                language
                            )
                        );
                        setIsDisabled(true);
                    }, 500);
                }
            })
            .catch((err) => {
                return err.response;
            });
    };
    const handleSubmit = async (e, type) => {
        const responses = [...responseData];
        e.preventDefault();
        if (type) {
            setLoading({ ...loading, draft: true });
        } else {
            setLoading({ ...loading, submit: true });
        }
        if (files && uploadQId) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                let fieldName = 'file' + i ? i : '';
                formData.append(fieldName, files[i]);
            }
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .post(
                    `${URL.uploadFile}${currentUser?.data[0]?.team_id}`,
                    formData,
                    axiosConfig
                )
                .then((res) => res)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                setImmediateLink(result.data?.data[0]?.attachments);
                responses.push({
                    challenge_question_id: uploadQId,
                    selected_option: result.data?.data[0]?.attachments
                });
                submittingCall(type, responses);
                setTimeout(() => {
                    dispatch(
                        getStudentChallengeSubmittedResponse(
                            currentUser?.data[0]?.team_id,
                            language
                        )
                    );
                    setLoading(initialLoadingStatus);
                    setFiles([]);
                }, 500);
            } else {
                openNotificationWithIcon('error', `${result?.data?.message}`);
                setLoading(initialLoadingStatus);
                return;
            }
        } else {
            submittingCall(type, responses);
            setLoading(initialLoadingStatus);
        }
    };

    useEffect(() => {
        if (submittedResponse && submittedResponse !== {}) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, []);

    const scroll = () => {
        const section = document.querySelector('#start');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const handleEdit = () => {
        setIsDisabled(false);
        scroll();
    };
    const comingSoonText = t('dummytext.student_idea_sub');
    const acceptedParamfileTypes="Accepting only png,jpg,jpeg,pdf,mp4,doc,docx Only, file size should be below 20MB";
    return (
        <Layout>
            {showPage ? (
                <CommonPage text={comingSoonText} />
            ) : (
                <Container className="presuervey mb-50 mt-5 " id="start">
                    <h2>{t('student_course.idea_submission')}</h2>
                    <Col>
                        {initiatedBy &&
                            initiatedBy !== currentUser?.data[0]?.user_id && (
                                <div className="d-md-flex justify-content-end px-4">
                                    <Card className="p-3">
                                        {t('student_course.idea_submission_msg1')}
                                        {challengesSubmittedResponse[0]
                                            ?.status === 'DRAFT'
                                            ? t('student_course.idea_status1')
                                            : t('student_course.idea_status2')}
                                        {t('student_course.idea_submission_msg2')}
                                        {
                                            challengesSubmittedResponse[0]
                                                ?.initiated_name
                                        }{t('student_course.idea_submission_msg3')}
                                        {moment(
                                            challengesSubmittedResponse[0]
                                                ?.created_at
                                        ).format('DD-MM-YYYY')}
                                    </Card>
                                </div>
                            )}
                        <Row className=" justify-content-center">
                            <div className="aside  mb-5 p-4">
                                <CardBody>
                                    {challengeQuestions.length > 0 && (
                                        <Form
                                            className="form-row row mb-5"
                                            isSubmitting
                                        >
                                            {initiatedBy &&
                                                initiatedBy ===
                                                    currentUser?.data[0]
                                                        ?.user_id &&
                                                challengesSubmittedResponse[0]
                                                    ?.status === 'DRAFT' && (
                                                    <div className="text-right">
                                                        {isDisabled ? (
                                                            <>
                                                                <Button
                                                                    type="button"
                                                                    btnClass="me-3 text-white"
                                                                    backgroundColor="#067DE1"
                                                                    onClick={
                                                                        handleEdit
                                                                    }
                                                                    size="small"
                                                                    label={t(
                                                                        'teacher_teams.edit_idea'
                                                                    )}
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    btnClass="primary"
                                                                    disabled={
                                                                        answerResponses &&
                                                                        answerResponses.length ===
                                                                            0
                                                                    }
                                                                    onClick={
                                                                        swalWrapper
                                                                    }
                                                                    size="small"
                                                                    label={t(
                                                                        'teacher_teams.submit'
                                                                    )}
                                                                />
                                                            </>
                                                        ) : (
                                                            <div className="d-flex justify-content-between">
                                                                <Button
                                                                    type="button"
                                                                    btnClass="secondary me-3"
                                                                    onClick={redirect}
                                                                    size="small"
                                                                    label={t(
                                                                        'teacher_teams.discard'
                                                                    )}
                                                                />
                                                                <div>
                                                                    <Button
                                                                        type="button"
                                                                        btnClass="me-3 text-white"
                                                                        backgroundColor="#067DE1"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleSubmit(
                                                                                e,
                                                                                'DRAFT'
                                                                            )
                                                                        }
                                                                        size="small"
                                                                        label={`${
                                                                            loading.draft
                                                                                ? t(
                                                                                      'teacher_teams.loading'
                                                                                  )
                                                                                : t(
                                                                                      'teacher_teams.draft'
                                                                                  )
                                                                        }`}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        btnClass="primary"
                                                                        disabled={
                                                                            answerResponses &&
                                                                            answerResponses.length ===
                                                                                0
                                                                        }
                                                                        onClick={
                                                                            swalWrapper
                                                                        }
                                                                        size="small"
                                                                        label={`${
                                                                            loading.submit
                                                                                ? t(
                                                                                      'teacher_teams.loading'
                                                                                  )
                                                                                : t(
                                                                                      'teacher_teams.submit'
                                                                                  )
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            <Row className="card mb-4 my-3 comment-card px-0 px-5 py-3 card">
                                                <div className="question quiz mb-0">
                                                    <b
                                                        style={{
                                                            fontSize: '1.6rem'
                                                        }}
                                                    >
                                                        {1}.{' '}
                                                        {t(
                                                            'student_course.sdg'
                                                        )}
                                                    </b>
                                                </div>
                                                <div>
                                                    <p
                                                        className="text-muted ms-5"
                                                        style={{
                                                            fontSize: '1.4rem'
                                                        }}
                                                    >
                                                        {t(
                                                            'student_course.sdg_desc'
                                                        )}
                                                    </p>
                                                </div>
                                                <div className=" answers row flex-column p-4">
                                                    <select
                                                        disabled={isDisabled}
                                                        onChange={(e) =>
                                                            setSdg(
                                                                e.target.value
                                                            )
                                                        }
                                                        name="teams"
                                                        id="teams"
                                                    >
                                                        {cardData.map(
                                                            (item, i) => (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.goal_title
                                                                    }
                                                                    selected={
                                                                        item.goal_title ===
                                                                        sdg
                                                                    }
                                                                >
                                                                    {
                                                                        item.goal_title
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </Row>
                                            {sdg === 'OTHERS' && (
                                                <Row className="card mb-4 my-3 comment-card px-0 px-5 py-3 card">
                                                    <div className="question quiz mb-0">
                                                        <b
                                                            style={{
                                                                fontSize:
                                                                    '1.6rem'
                                                            }}
                                                        >
                                                            {2}.{' '}
                                                            {t(
                                                                'student_course.others'
                                                            )}
                                                        </b>
                                                    </div>
                                                    <FormGroup
                                                        check
                                                        className="answers"
                                                    >
                                                        <Label
                                                            check
                                                            style={{
                                                                width: '100%'
                                                            }}
                                                        >
                                                            <TextArea
                                                                disabled={
                                                                    isDisabled
                                                                }
                                                                placeholder="Enter others description"
                                                                value={others}
                                                                maxLength={100}
                                                                onChange={(e) =>
                                                                    setOthers(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </Label>
                                                    </FormGroup>
                                                    <div className="text-end">
                                                        {t(
                                                            'student_course.chars'
                                                        )}{' '}
                                                        :
                                                        {100 -
                                                            (others
                                                                ? others.length
                                                                : 0)}
                                                    </div>
                                                </Row>
                                            )}
                                            {challengeQuestions.map(
                                                (eachQuestion, i) => (
                                                    <>
                                                        <Row
                                                            key={i}
                                                            className="card mb-4 my-3 comment-card px-0 px-5 py-3 card"
                                                        >
                                                            <div className="question quiz mb-0">
                                                                <b
                                                                    style={{
                                                                        fontSize:
                                                                            '1.6rem'
                                                                    }}
                                                                >
                                                                    {i +
                                                                        (sdg ===
                                                                        'OTHERS'
                                                                            ? 3
                                                                            : 2)}
                                                                    .{' '}
                                                                    {
                                                                        eachQuestion.question
                                                                    }
                                                                </b>
                                                            </div>
                                                            <div>
                                                                {eachQuestion?.description && (
                                                                    <p
                                                                        className="text-muted ms-5"
                                                                        style={{
                                                                            fontSize:
                                                                                '1.4rem'
                                                                        }}
                                                                    >
                                                                        {
                                                                            eachQuestion.description
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="answers">
                                                                <FormGroup
                                                                    tag="fieldset"
                                                                    className="w-100 challenges-fs"
                                                                    id="radioGroup1"
                                                                    label="One of these please"
                                                                >
                                                                    <>
                                                                        {eachQuestion.type ===
                                                                            'TEXT' && (
                                                                            <>
                                                                                <FormGroup
                                                                                    check
                                                                                    className=" answers"
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                        style={{
                                                                                            width: '100%'
                                                                                        }}
                                                                                    >
                                                                                        <TextArea
                                                                                            name={`${eachQuestion.challenge_question_id}`}
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            placeholder= {`${t('student.max_length_msg1')}${eachQuestion?.word_limit ||100}${t('student.max_length_msg2')}`}
                                                                                            maxLength={
                                                                                                eachQuestion?.word_limit ||
                                                                                                100
                                                                                            }
                                                                                            value={filterAnswer(
                                                                                                eachQuestion.challenge_question_id
                                                                                            )}
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                handleChange(
                                                                                                    e
                                                                                                );
                                                                                                handleWordCount(
                                                                                                    e,
                                                                                                    eachQuestion.challenge_question_id,
                                                                                                    eachQuestion?.word_limit
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    </Label>
                                                                                </FormGroup>
                                                                                <div className="float-end">
                                                                                    {t(
                                                                                        'student_course.chars'
                                                                                    )}{' '}
                                                                                    :{' '}
                                                                                    {filterCount(
                                                                                        eachQuestion.challenge_question_id,
                                                                                        eachQuestion?.word_limit
                                                                                    )}
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {eachQuestion.type ===
                                                                            'DRAW' &&  (
                                                                            <>
                                                                                {acceptedParamfileTypes}
                                                                                {initiatedBy &&
                                                                            initiatedBy ===
                                                                                currentUser?.data[0]
                                                                                    ?.user_id &&
                                                                            challengesSubmittedResponse[0]
                                                                                ?.status === 'DRAFT' &&
                                                                                <FormGroup
                                                                                    check
                                                                                    className="answers"
                                                                                >
                                                                                    <div className="wrapper my-3 common-flex">
                                                                                        {!isDisabled && <Button
                                                                                            type="button"
                                                                                            btnClass={`${
                                                                                                isDisabled
                                                                                                    ? 'secondary'
                                                                                                    : 'primary'
                                                                                            } me-3 pointer `}
                                                                                            size="small"
                                                                                            label={t('student.upload_file')}
                                                                                        />}
                                                                                        <input
                                                                                            type="file"
                                                                                            name="file"
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            accept=".png, .jpg, .jpeg,.pdf,video/mp4,video/x-m4v,.doc,.docx"
                                                                                            multiple
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                fileHandler(
                                                                                                    e,
                                                                                                    eachQuestion.challenge_question_id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </FormGroup>}
                                                                                <div className="mx-4">
                                                                                    {immediateLink &&
                                                                                        immediateLink.length >
                                                                                            0 &&
                                                                                        immediateLink.map(
                                                                                            (
                                                                                                item
                                                                                            ) => (
                                                                                                <LinkComponent
                                                                                                    item={
                                                                                                        item
                                                                                                    }
                                                                                                    url={true}
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
                                                                                        filterAnswer(
                                                                                            eachQuestion.challenge_question_id
                                                                                        )
                                                                                            .length >
                                                                                            0 &&
                                                                                        filterAnswer(
                                                                                            eachQuestion.challenge_question_id
                                                                                        ).map(
                                                                                            (
                                                                                                item,
                                                                                                i
                                                                                            ) => <LinkComponent
                                                                                                    item={
                                                                                                        item
                                                                                                    }
                                                                                                    url={true}
                                                                                                    key={
                                                                                                        i
                                                                                                    }
                                                                                                />
                                                                                        )}
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {eachQuestion.type ===
                                                                            'MRQ' && (
                                                                            <>
                                                                                {eachQuestion.option_a &&
                                                                                    eachQuestion.option_a !==
                                                                                        '' && (
                                                                                        <FormGroup
                                                                                            check
                                                                                            className="mx-5"
                                                                                        >
                                                                                            <Label
                                                                                                check
                                                                                                style={{
                                                                                                    fontSize:
                                                                                                        '1.4rem'
                                                                                                }}
                                                                                            >
                                                                                                <Input
                                                                                                    type="radio"
                                                                                                    name={`${eachQuestion.challenge_question_id}`}
                                                                                                    id="radioOption1"
                                                                                                    disabled={
                                                                                                        isDisabled
                                                                                                    }
                                                                                                    checked={
                                                                                                        filterAnswer(
                                                                                                            eachQuestion.challenge_question_id
                                                                                                        ) &&
                                                                                                        filterAnswer(
                                                                                                            eachQuestion.challenge_question_id
                                                                                                        ).includes(
                                                                                                            eachQuestion.option_a
                                                                                                        )
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        handleChange(
                                                                                                            e
                                                                                                        )
                                                                                                    }
                                                                                                    value={`${eachQuestion.option_a}`}
                                                                                                />
                                                                                                {
                                                                                                    eachQuestion.option_a
                                                                                                }
                                                                                            </Label>
                                                                                        </FormGroup>
                                                                                    )}
                                                                                {eachQuestion.option_b &&
                                                                                    eachQuestion.option_b !==
                                                                                        '' && (
                                                                                        <FormGroup
                                                                                            check
                                                                                            className="mx-5"
                                                                                        >
                                                                                            <Label
                                                                                                check
                                                                                                style={{
                                                                                                    fontSize:
                                                                                                        '1.4rem'
                                                                                                }}
                                                                                            >
                                                                                                <Input
                                                                                                    type="radio"
                                                                                                    name={`${eachQuestion.challenge_question_id}`}
                                                                                                    id="radioOption2"
                                                                                                    disabled={
                                                                                                        isDisabled
                                                                                                    }
                                                                                                    checked={
                                                                                                        filterAnswer(
                                                                                                            eachQuestion.challenge_question_id
                                                                                                        ) &&
                                                                                                        filterAnswer(
                                                                                                            eachQuestion.challenge_question_id
                                                                                                        ).includes(
                                                                                                            eachQuestion.option_b
                                                                                                        )
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        handleChange(
                                                                                                            e
                                                                                                        )
                                                                                                    }
                                                                                                    value={`${eachQuestion.option_b}`}
                                                                                                />{' '}
                                                                                                {
                                                                                                    eachQuestion.option_b
                                                                                                }
                                                                                            </Label>
                                                                                        </FormGroup>
                                                                                    )}
                                                                                {eachQuestion.option_c &&
                                                                                    eachQuestion.option_c !==
                                                                                        '' && (
                                                                                        <FormGroup
                                                                                            check
                                                                                            className="mx-5"
                                                                                        >
                                                                                            <Label
                                                                                                check
                                                                                                style={{
                                                                                                    fontSize:
                                                                                                        '1.4rem'
                                                                                                }}
                                                                                            >
                                                                                                <Input
                                                                                                    type="radio"
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        handleChange(
                                                                                                            e
                                                                                                        )
                                                                                                    }
                                                                                                    name={`${eachQuestion.challenge_question_id}`}
                                                                                                    id="radioOption3"
                                                                                                    disabled={
                                                                                                        isDisabled
                                                                                                    }
                                                                                                    value={`${eachQuestion.option_c}`}
                                                                                                />{' '}
                                                                                                {
                                                                                                    eachQuestion.option_c
                                                                                                }
                                                                                            </Label>
                                                                                        </FormGroup>
                                                                                    )}

                                                                                {eachQuestion.option_d &&
                                                                                    eachQuestion.option_d !==
                                                                                        '' && (
                                                                                        <FormGroup
                                                                                            check
                                                                                            className="mx-5"
                                                                                        >
                                                                                            <Label
                                                                                                check
                                                                                                style={{
                                                                                                    fontSize:
                                                                                                        '1.4rem'
                                                                                                }}
                                                                                            >
                                                                                                <Input
                                                                                                    type="radio"
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        handleChange(
                                                                                                            e
                                                                                                        )
                                                                                                    }
                                                                                                    name={`${eachQuestion.challenge_question_id}`}
                                                                                                    disabled={
                                                                                                        isDisabled
                                                                                                    }
                                                                                                    id="radioOption4"
                                                                                                    value={`${eachQuestion.option_d}`}
                                                                                                />{' '}
                                                                                                {
                                                                                                    eachQuestion.option_d
                                                                                                }
                                                                                            </Label>
                                                                                        </FormGroup>
                                                                                    )}
                                                                            </>
                                                                        )}
                                                                        {eachQuestion.type ===
                                                                            'MCQ' && (
                                                                            <>
                                                                                <FormGroup
                                                                                    check
                                                                                    className="mx-5"
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                        style={{
                                                                                            fontSize:
                                                                                                '1.4rem'
                                                                                        }}
                                                                                    >
                                                                                        <Input
                                                                                            type="checkbox"
                                                                                            name={`${eachQuestion.challenge_question_id}`}
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            checked={
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ) &&
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ).includes(
                                                                                                    eachQuestion.option_a
                                                                                                )
                                                                                            }
                                                                                            id={
                                                                                                eachQuestion.option_a
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                handleChange(
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            value={`${eachQuestion.option_a}`}
                                                                                        />
                                                                                        {
                                                                                            eachQuestion.option_a
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>
                                                                                <FormGroup
                                                                                    check
                                                                                    className="mx-5"
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                        style={{
                                                                                            fontSize:
                                                                                                '1.4rem'
                                                                                        }}
                                                                                    >
                                                                                        <Input
                                                                                            type="checkbox"
                                                                                            name={`${eachQuestion.challenge_question_id}`}
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            checked={
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ) &&
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ).includes(
                                                                                                    eachQuestion.option_b
                                                                                                )
                                                                                            }
                                                                                            id={
                                                                                                eachQuestion.option_b
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                handleChange(
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            value={`${eachQuestion.option_b}`}
                                                                                        />
                                                                                        {
                                                                                            eachQuestion.option_b
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>
                                                                                <FormGroup
                                                                                    check
                                                                                    className="mx-5"
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                        style={{
                                                                                            fontSize:
                                                                                                '1.4rem'
                                                                                        }}
                                                                                    >
                                                                                        <Input
                                                                                            type="checkbox"
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            name={`${eachQuestion.challenge_question_id}`}
                                                                                            checked={
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ) &&
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ).includes(
                                                                                                    eachQuestion.option_c
                                                                                                )
                                                                                            }
                                                                                            id={
                                                                                                eachQuestion.option_c
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                handleChange(
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            value={`${eachQuestion.option_c}`}
                                                                                        />
                                                                                        {
                                                                                            eachQuestion.option_c
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>

                                                                                <FormGroup
                                                                                    check
                                                                                    className="mx-5"
                                                                                >
                                                                                    <Label
                                                                                        check
                                                                                        style={{
                                                                                            fontSize:
                                                                                                '1.4rem'
                                                                                        }}
                                                                                    >
                                                                                        <Input
                                                                                            type="checkbox"
                                                                                            name={`${eachQuestion.challenge_question_id}`}
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            checked={
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ) &&
                                                                                                filterAnswer(
                                                                                                    eachQuestion.challenge_question_id
                                                                                                ).includes(
                                                                                                    eachQuestion.option_d
                                                                                                )
                                                                                            }
                                                                                            id={
                                                                                                eachQuestion.option_d
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                handleChange(
                                                                                                    e
                                                                                                )
                                                                                            }
                                                                                            value={`${eachQuestion.option_d}`}
                                                                                        />
                                                                                        {
                                                                                            eachQuestion.option_d
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                </FormGroup>
                                                            </div>
                                                        </Row>
                                                    </>
                                                )
                                            )}
                                        </Form>
                                    )}
                                </CardBody>
                            </div>
                        </Row>
                    </Col>
                </Container>
            )}
        </Layout>
    );
};

export default IdeasPageNew;
