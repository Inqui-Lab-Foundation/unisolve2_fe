/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import '../../Teachers/PostSurvey/style.scss';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { Button } from '../../stories/Button';
// import { useFormik } from 'formik';
import Layout from '../Layout';
import { URL, KEY } from '../../constants/defaultValues';
import {
    getCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import Congo from '../../assets/media/survey-success.jpg';
import { useHistory } from 'react-router-dom';
import { getLanguage } from '../../constants/languageOptions';
import { useDispatch, useSelector } from 'react-redux';
import getStart from '../../assets/media/getStart.png';
import { useTranslation } from 'react-i18next';
import {
    getPresurveyData,
    getStudentDashboardStatus,
    updateStudentBadges
} from '../../redux/studentRegistration/actions';

const PreSurvey = () => {
    // here student can attempt all the questions //
    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const dispatch = useDispatch();
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const preSurveyStatus = useSelector(
        (state) => state?.studentRegistration?.presuveyStatusGl
    );
    const preSurveyList = useSelector(
        (state) => state?.studentRegistration?.preSurveyList
    );
    const quizSurveyId = useSelector(
        (state) => state?.studentRegistration?.quizSurveyId
    );
    const [show, setShow] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const [answerResponses, setAnswerResponses] = useState([]);

    const filterAnswer = (questionId) => {
        // console.log(questionId);
        const data =
            answerResponses &&
            answerResponses.length > 0 &&
            answerResponses.filter(
                (item) => item.quiz_survey_question_id == questionId
            );
        return data && data.length > 0 && data[0].selected_option
            ? data[0].selected_option
            : '';
    };
    const handleChange = (e) => {
        let newItems = [...answerResponses];
        console.log(newItems);
        let obj = {
            quiz_survey_question_id: e.target.name,
            selected_option:
                e.target.type === 'checkbox' ? [e.target.value] : e.target.value
        };
        console.log(obj);
        const findExistanceIndex = newItems.findIndex(
            (item) =>
                parseInt(item?.quiz_survey_question_id) ===
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
                if (e.target.value === '') {
                    newItems.splice(findExistanceIndex, 1);
                } else {
                    newItems[findExistanceIndex] = {
                        ...temp,
                        selected_option: e.target.value
                    };
                }
            }
        }
        setAnswerResponses(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const axiosConfig = getNormalHeaders(KEY.User_API_Key);

        let submitData = {
            responses: answerResponses
        };
        if (preSurveyList.length != submitData.responses.length) {
            openNotificationWithIcon(
                'warning',
                'Please Attempt All Questions..!!',
                ''
            );
        } else {
            return await axios
                .post(
                    `${
                        URL.getPreSurveyList
                    }/${quizSurveyId}/responses?${getLanguage(language)}`,
                    JSON.stringify(submitData, null, 2),
                    axiosConfig
                )
                .then((preSurveyRes) => {
                    if (preSurveyRes?.status == 200) {
                        openNotificationWithIcon(
                            'success',
                            t('student.presurver_scc_sub'),
                            ''
                        );
                        dispatch(getPresurveyData(language));
                        dispatch(
                            getStudentDashboardStatus(
                                currentUser?.data[0]?.user_id,
                                language
                            )
                        );
                        dispatch(
                            updateStudentBadges(
                                { badge_slugs: ['survey_champ'] },
                                currentUser?.data[0]?.user_id,
                                language,
                                t
                            )
                        );
                        setTimeout(() => {
                            history.push('/dashboard');
                        }, 500);
                    }
                })
                .catch((err) => {
                    return err.response;
                });
            // .then((preSurveyRes) => {
            //     if (preSurveyRes?.status == 200) {
            //         dispatch(getStudentDashboardStatus,());
            //         openNotificationWithIcon(
            //             'success',
            //             'Presurvey has been submitted successfully'
            //         );
            //         setTimeout(() => {
            //             history.push('/teacher/dashboard');
            //         }, 500);

            //         // formik.resetForm();
            //     }
            // })
            // .catch((err) => {
            //     return err.response;
            // });
        }
    };

    // const formik = useFormik({
    //     initialValues: {},
    //     onSubmit: async (values) => {
    //         const axiosConfig = getNormalHeaders(KEY.User_API_Key);
    //         let responsesData = Object.keys(values).map((eachValues) => {
    //             let selected = values[eachValues].split(' -- ');
    //             return {
    //                 quiz_survey_question_id: selected[0],
    //                 selected_option: selected[1]
    //             };
    //         });

    //         let submitData = {
    //             responses: responsesData
    //         };
    //         if (preSurveyList.length != submitData.responses.length) {
    //             openNotificationWithIcon(
    //                 'warning',
    //                 t('student.attempt_all_questions'),
    //                 ''
    //             );
    //         } else {
    //             return await axios
    //                 .post(
    //                     `${
    //                         URL.getPreSurveyList
    //                     }/${quizSurveyId}/responses?${getLanguage(language)}`,
    //                     JSON.stringify(submitData, null, 2),
    //                     axiosConfig
    //                 )
    //                 .then((preSurveyRes) => {
    //                     if (preSurveyRes?.status == 200) {
    //                         openNotificationWithIcon(
    //                             'success',
    //                             t('student.presurver_scc_sub'),
    //                             ''
    //                         );
    //                         dispatch(getPresurveyData(language));
    //                         dispatch(
    //                             getStudentDashboardStatus(
    //                                 currentUser?.data[0]?.user_id,
    //                                 language
    //                             )
    //                         );
    //                         dispatch(
    //                             updateStudentBadges(
    //                                 { badge_slugs: ['survey_champ'] },
    //                                 currentUser?.data[0]?.user_id,
    //                                 language,
    //                                 t
    //                             )
    //                         );
    //                         setTimeout(() => {
    //                             history.push('/dashboard');
    //                         }, 500);

    //                         formik.resetForm();
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     return err.response;
    //                 });
    //         }
    //     }
    // });

    const handleStart = () => {
        // here student  can start journey //
        setShow(true);
    };

    useEffect(() => {
        if (!localStorage.getItem('greetingChildren')) {
            localStorage.setItem('greetingChildren', true);
        }
    }, []);
    useEffect(() => {
        dispatch(getPresurveyData(language));
    }, [language]);

    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Row className="justify-content-center aside p-0 p-md-4 bg-transparent">
                    {!show && preSurveyStatus != 'COMPLETED' ? (
                        <Card className="p-5">
                            <Row>
                                <Col md={4}>
                                    <figure>
                                        <img
                                            src={getStart}
                                            className="img-fluid"
                                            alt="get started"
                                        />
                                    </figure>
                                </Col>
                                <Col md={8}>
                                    <h2>{t('student_get_started.heading')}</h2>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: t(
                                                'student_get_started.desc'
                                            )
                                        }}
                                    ></div>

                                    <Button
                                        label={t('student_get_started.btn')}
                                        btnClass="primary my-3"
                                        size="small"
                                        onClick={handleStart}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    ) : (
                        <>
                            <h2>{t('home.pre_survey')}</h2>
                            {preSurveyStatus != 'COMPLETED' && (
                                <Form
                                    className="form-row"
                                    // onSubmit={formik.handleSubmit}
                                    // isSubmitting
                                >
                                    {preSurveyList.map((eachQuestion, i) => {
                                        return (
                                            <Row key={i}>
                                                <Card className="card mb-4 my-3 comment-card px-0 px-5 py-3">
                                                    <div className="question quiz mb-0">
                                                        <b>
                                                            {i + 1}.{' '}
                                                            {
                                                                eachQuestion.question
                                                            }
                                                        </b>
                                                    </div>
                                                    {/* <div className="answers">
                                                        <FormGroup
                                                            tag="fieldset"
                                                            className="w-100"
                                                            id="radioGroup1"
                                                            label="One of these please"
                                                            value={
                                                                formik.values
                                                                    .radioGroup1
                                                            }
                                                            error={
                                                                formik.errors
                                                                    .radioGroup1
                                                            }
                                                            touched={
                                                                formik.touched
                                                                    .radioGroup1
                                                            }
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                        >
                                                            {eachQuestion.option_a && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Label
                                                                        check
                                                                    >
                                                                        <Input
                                                                            type="radio"
                                                                            name={`radioGroup${i}`}
                                                                            id="radioOption1"
                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_a}`}
                                                                        />{' '}
                                                                        {
                                                                            eachQuestion.option_a
                                                                        }
                                                                    </Label>
                                                                </FormGroup>
                                                            )}
                                                            {eachQuestion.option_b && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Label
                                                                        check
                                                                    >
                                                                        <Input
                                                                            type="radio"
                                                                            name={`radioGroup${i}`}
                                                                            id="radioOption2"
                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_b}`}
                                                                        />{' '}
                                                                        {
                                                                            eachQuestion.option_b
                                                                        }
                                                                    </Label>
                                                                </FormGroup>
                                                            )}
                                                            {eachQuestion.option_c && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Label
                                                                        check
                                                                    >
                                                                        <Input
                                                                            type="radio"
                                                                            name={`radioGroup${i}`}
                                                                            id="radioOption3"
                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_c}`}
                                                                        />{' '}
                                                                        {
                                                                            eachQuestion.option_c
                                                                        }
                                                                    </Label>
                                                                </FormGroup>
                                                            )}
                                                            {eachQuestion.option_d && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Label
                                                                        check
                                                                    >
                                                                        <Input
                                                                            type="radio"
                                                                            name={`radioGroup${i}`}
                                                                            id="radioOption4"
                                                                            value={`${eachQuestion.quiz_survey_question_id} -- ${eachQuestion.option_d}`}
                                                                        />{' '}
                                                                        {
                                                                            eachQuestion.option_d
                                                                        }
                                                                    </Label>
                                                                </FormGroup>
                                                            )}
                                                        </FormGroup>
                                                    </div> */}
                                                    <div className="answers">
                                                        <FormGroup
                                                            tag="fieldset"
                                                            className="w-100 challenges-fs"
                                                            id="radioGroup1"
                                                            label="One of these please"
                                                        >
                                                            <>
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
                                                                                            name={`${eachQuestion.quiz_survey_question_id}`}
                                                                                            id="radioOption1"
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            checked={
                                                                                                filterAnswer(
                                                                                                    eachQuestion.quiz_survey_question_id
                                                                                                ) &&
                                                                                                filterAnswer(
                                                                                                    eachQuestion.quiz_survey_question_id
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
                                                                                            name={`${eachQuestion.quiz_survey_question_id}`}
                                                                                            id="radioOption2"
                                                                                            disabled={
                                                                                                isDisabled
                                                                                            }
                                                                                            checked={
                                                                                                filterAnswer(
                                                                                                    eachQuestion.quiz_survey_question_id
                                                                                                ) &&
                                                                                                filterAnswer(
                                                                                                    eachQuestion.quiz_survey_question_id
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
                                                                                            name={`${eachQuestion.quiz_survey_question_id}`}
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
                                                                                            name={`${eachQuestion.quiz_survey_question_id}`}
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
                                                                                    name={`${eachQuestion.quiz_survey_question_id}`}
                                                                                    disabled={
                                                                                        isDisabled
                                                                                    }
                                                                                    checked={
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
                                                                                        ) &&
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
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
                                                                                    name={`${eachQuestion.quiz_survey_question_id}`}
                                                                                    disabled={
                                                                                        isDisabled
                                                                                    }
                                                                                    checked={
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
                                                                                        ) &&
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
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
                                                                                    name={`${eachQuestion.quiz_survey_question_id}`}
                                                                                    checked={
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
                                                                                        ) &&
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
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
                                                                                    name={`${eachQuestion.quiz_survey_question_id}`}
                                                                                    disabled={
                                                                                        isDisabled
                                                                                    }
                                                                                    checked={
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
                                                                                        ) &&
                                                                                        filterAnswer(
                                                                                            eachQuestion.quiz_survey_question_id
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
                                                </Card>
                                            </Row>
                                        );
                                    })}

                                    <div className="text-right">
                                        <Button
                                            type="submit"
                                            btnClass={'primary'}
                                            // btnClass={
                                            //     !(
                                            //         formik.dirty &&
                                            //         formik.isValid
                                            //     )
                                            //         ? 'default'
                                            //         : 'primary'
                                            // }
                                            // disabled={
                                            //     !(
                                            //         formik.dirty &&
                                            //         formik.isValid
                                            //     )
                                            // }
                                            size="small"
                                            label={t(
                                                'student_presurvey.submit'
                                            )}
                                            onClick={(e) => handleSubmit(e)}
                                        />
                                    </div>
                                </Form>
                            )}
                            {preSurveyStatus == 'COMPLETED' && (
                                <Card className="p-5 m-5">
                                    <div style={{ textAlign: 'center' }}>
                                        <div>
                                            <img
                                                className="img-fluid w-25"
                                                src={Congo}
                                            ></img>
                                        </div>

                                        <div>
                                            <h2>
                                                {t('teacher_get_started.pre')}
                                            </h2>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </>
                    )}
                </Row>
            </Container>
        </Layout>
    );
};

export default PreSurvey;
