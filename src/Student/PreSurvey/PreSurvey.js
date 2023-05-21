import React, { useEffect, useState } from 'react';
// import '../PostSurvey/style.scss';
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
import { useFormik } from 'formik';
// import * as Yup from 'yup';
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
//import { Modal } from 'react-bootstrap';
//import ChildrensDaysGif from '../../assets/media/childrensdays.gif';

// const GreetingModal = (props) => {
//     return (
//         <Modal
//             show={props.show}
//             size="lg"
//             centered
//             className="modal-popup text-center"
//             onHide={props.handleClose}
//             backdrop={true}
//         >
//             <Modal.Header closeButton></Modal.Header>

//             <Modal.Body>
//                 <figure>
//                     <img
//                         src={ChildrensDaysGif}
//                         alt="Happy Children's Day"
//                         className="img-fluid"
//                     />
//                 </figure>
//             </Modal.Body>
//         </Modal>
//     );
// };

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

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            let responsesData = Object.keys(values).map((eachValues) => {
                let selected = values[eachValues].split(' -- ');
                return {
                    quiz_survey_question_id: selected[0],
                    selected_option: selected[1]
                };
            });

            let submitData = {
                responses: responsesData
            };
            if (preSurveyList.length != submitData.responses.length) {
                openNotificationWithIcon(
                    'warning',
                    t('student.attempt_all_questions'),
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

                            formik.resetForm();
                        }
                    })
                    .catch((err) => {
                        return err.response;
                    });
            }
        }
    });

    const handleStart = () => {
        // here student  can start journey //
        setShow(true);
    };

    // const handleClose = () => {
    //     setGreetChildrensDay(false);
    // };

    useEffect(() => {
        if (!localStorage.getItem('greetingChildren')) {
            localStorage.setItem('greetingChildren', true);
            //setGreetChildrensDay(true);
        }
    }, []);
    useEffect(() => {
        dispatch(getPresurveyData(language));
    }, [language]);

    return (
        <Layout>
            {/* <GreetingModal
                handleClose={handleClose}
                show={greetChildrensDay}
            ></GreetingModal> */}

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
                                    onSubmit={formik.handleSubmit}
                                    isSubmitting
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
                                                    <div className="answers">
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
                                                    </div>
                                                </Card>
                                            </Row>
                                        );
                                    })}

                                    <div className="text-right">
                                        <Button
                                            type="submit"
                                            btnClass={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                            disabled={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                            }
                                            size="small"
                                            label={t(
                                                'student_presurvey.submit'
                                            )}
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
