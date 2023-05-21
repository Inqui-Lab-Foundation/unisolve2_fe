import React, { useEffect, useState } from 'react';
import '../../Teachers/PostSurvey/style.scss';
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
import { getLanguage } from '../../constants/languageOptions';
import { useDispatch, useSelector } from 'react-redux';
import { UncontrolledAlert } from 'reactstrap';
import CommonPage from '../../components/CommonPage';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
    getStudentChallengeSubmittedResponse,
    getStudentDashboardStatus,
    studentPostSurveyCertificate,
    updateStudentBadges
} from '../../redux/studentRegistration/actions';

const PostSurvey = () => {
    // here we can attempt all the question to complete the postsurvey //
    const { t } = useTranslation();
    const ideaSubmissionStatus = useSelector(
        (state) => state?.studentRegistration.ideaSubmissionStatus
    );
    const topicTotalCount = useSelector(
        (state) => state?.studentRegistration.dashboardStatus?.all_topics_count
    );
    const topicCompletedCount = useSelector(
        (state) =>
            state?.studentRegistration.dashboardStatus?.topics_completed_count
    );
    // const  postSurveyStatusGl  = useSelector((state) => state?.studentRegistration?.postSurveyStatusGl);
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    const [postSurveyList, setPostSurveyList] = useState([]);
    const [quizSurveyId, setQuizSurveyId] = useState(0);
    const [count, setCount] = useState(0);
    const [postSurveyStatus, setPostSurveyStatus] = useState('COMPLETED');
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const showPage =
        ideaSubmissionStatus &&
        ideaSubmissionStatus !== 'DRAFT' &&
        topicTotalCount === topicCompletedCount;
    const handleClick = () => {
        ///here postsurvey is completed then only enable the student certificates //
        // here we can see the certificates of students  //
        history.push('/student/my-certificate');
    };
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
            if (postSurveyList.length != submitData.responses.length) {
                openNotificationWithIcon(
                    'warning',
                    t('student.attempt_all_questions'),
                    ''
                );
            } else {
                return await axios
                    .post(
                        `${
                            URL.getPostSurveyList
                        }/${quizSurveyId}/responses?${getLanguage(language)}`,
                        JSON.stringify(submitData, null, 2),
                        axiosConfig
                    )
                    .then((preSurveyRes) => {
                        if (preSurveyRes?.status == 200) {
                            setTimeout(() => {
                                const badge = 'survey_master';
                                dispatch(
                                    updateStudentBadges(
                                        { badge_slugs: [badge] },
                                        currentUser?.data[0]?.user_id,
                                        language,
                                        t
                                    )
                                );
                                dispatch(
                                    getStudentDashboardStatus(
                                        currentUser?.data[0]?.user_id,
                                        language
                                    )
                                );
                                dispatch(
                                    studentPostSurveyCertificate(language)
                                );
                                openNotificationWithIcon(
                                    'success',
                                    t('student.postsurver_scc_sub'),
                                    ''
                                );
                                setCount(count + 1);
                                formik.resetForm();
                            }, 300);
                        }
                    })
                    .catch((err) => {
                        return err.response;
                    });
            }
        }
    });
    useEffect(() => {
        if (!ideaSubmissionStatus)
            dispatch(
                getStudentChallengeSubmittedResponse(
                    currentUser?.data[0]?.team_id,
                    language
                )
            );
        if (!topicCompletedCount)
            dispatch(
                getStudentDashboardStatus(
                    currentUser?.data[0]?.user_id,
                    language
                )
            );
    }, [language, dispatch, currentUser?.data[0]?.team_id]);

    useEffect(() => {
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const lang = getLanguage(language);
        const final = lang.split('=');
        axiosConfig['params'] = {
            role: 'STUDENT',
            locale: final[1]
        };
        axios
            .get(`${URL.getStudentPostSurveyList}`, axiosConfig)
            .then((postSurveyRes) => {
                if (postSurveyRes?.status == 200) {
                    setQuizSurveyId(postSurveyRes.data.data[0].quiz_survey_id);
                    setPostSurveyStatus(postSurveyRes.data.data[0].progress);
                    let allQuestions = postSurveyRes.data.data[0];
                    setPostSurveyList(allQuestions.quiz_survey_questions);
                }
            })
            .catch((err) => {
                return err.response;
            });
    }, [language, count]);
    const comingSoonText = t('dummytext.student_post_survey');
    return (
        <Layout>
            {!showPage ? (
                <CommonPage text={comingSoonText} />
            ) : (
                <Container className="presuervey mb-50 mt-5 ">
                    <Col>
                        <Row className=" justify-content-center">
                            <div className="aside  p-4 bg-transparent">
                                {postSurveyStatus != 'COMPLETED' && (
                                    <UncontrolledAlert
                                        color="danger"
                                        className="mb-5"
                                    >
                                        {t(
                                            'student.please_com_postsurvey_for_certificate'
                                        )}
                                    </UncontrolledAlert>
                                )}
                                <h2>{t('student.post_survey')}</h2>
                                <CardBody>
                                    {postSurveyStatus != 'COMPLETED' && (
                                        <Form
                                            className="form-row"
                                            onSubmit={formik.handleSubmit}
                                            //isSubmitting
                                        >
                                            {postSurveyList.map(
                                                (eachQuestion, i) => (
                                                    <Row key={i}>
                                                        <Card className="card mb-4 my-3 comment-card px-0 px-5 py-3">
                                                            <div className="question quiz">
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
                                                                        formik
                                                                            .values
                                                                            .radioGroup1
                                                                    }
                                                                    error={
                                                                        formik
                                                                            .errors
                                                                            .radioGroup1
                                                                    }
                                                                    touched={
                                                                        formik
                                                                            .touched
                                                                            .radioGroup1
                                                                    }
                                                                    onChange={
                                                                        formik.handleChange
                                                                    }
                                                                    onBlur={
                                                                        formik.handleBlur
                                                                    }
                                                                >
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
                                                                </FormGroup>
                                                            </div>
                                                        </Card>
                                                    </Row>
                                                )
                                            )}

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

                                    {postSurveyStatus == 'COMPLETED' && (
                                        <Card>
                                            <div
                                                style={{ textAlign: 'center' }}
                                            >
                                                <div>
                                                    <img
                                                        className="img-fluid w-25"
                                                        src={Congo}
                                                    ></img>
                                                </div>
                                                <div>
                                                    <h2>
                                                        {t(
                                                            'student.post_survey_desc'
                                                        )}
                                                    </h2>
                                                    <p>
                                                        {t(
                                                            'student.click_button_post_survey'
                                                        )}
                                                    </p>
                                                    <Button
                                                        label={t(
                                                            'student_course.go_certificate'
                                                        )}
                                                        btnClass="primary mt-4 mx-4 mb-5"
                                                        size="small"
                                                        onClick={() =>
                                                            handleClick()
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </Card>
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

export default PostSurvey;
