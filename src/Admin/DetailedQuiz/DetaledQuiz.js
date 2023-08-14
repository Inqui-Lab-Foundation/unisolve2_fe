/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'reactstrap';
import { Fragment } from 'react';
import Question from './Question';
import { Button } from '../../stories/Button';
import './quiz.scss';
import Confetti from 'react-confetti';
import ResultStar from '../../assets/media/quiz-result-star.png';
import { connect, useDispatch, useSelector } from 'react-redux';
import DoubleBounce from '../../components/Loaders/DoubleBounce';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getCurrentUser } from '../../helpers/Utils';

import {
    getAdminQuizQuestions,
    getAdminQuizResponce,
    getAdminCourseDetails
} from '../../redux/actions';
import QuizResponse from './QuizResponse';
import succesImg from '../../assets/media/success1.jpeg';
import { updateStudentBadges } from '../../redux/studentRegistration/actions';

const DetaledQuiz = (props) => {
    const currentUser = getCurrentUser('current_user');
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const quizId = props.quizId;
    const [adminQst, SetAdminQst] = useState({});
    const [type, SetType] = useState('');
    const [loading, Setloading] = useState(false);
    const [selectOption, SetSelectOption] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [condition, SetCondition] = useState(true);
    const [video, SetVideo] = useState(true);
    const [qst, SetQst] = useState({});
    const [quizdata, setQuizData] = useState(0);
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const [isSubmitted, setSubmitted] = useState(false);
    const [attemptNumber, setAttemptNumber] = useState(0);
    const [currentScore, setCurrentScore] = useState({});
    const [currentRole, setCurrentRole] = useState('');
    const [totalQstCount, setTotalQstCount] = useState(0);
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const [startloader, setStartloader] = useState(false);

    useEffect(() => {
        setCurrentRole(currentUser?.data[0]?.role);
    }, [currentUser]);

    function resultdata() {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/quiz/result?user_id=${currentUser.data[0].user_id}&quiz_id=${quizId}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.count === null) {
                        setAttemptNumber(1);
                        props.getAdminQuizQuestionsActions(quizId, language, 1);
                    } else {
                        setAttemptNumber(
                            response?.data?.data[0].data[
                                response?.data?.data[0].data.length - 1
                            ].attempts
                        );
                        props.getAdminQuizQuestionsActions(
                            quizId,
                            language,
                            response?.data?.data[0].data[
                                response?.data?.data[0].data.length - 1
                            ].attempts
                        );
                        setCurrentScore(
                            response?.data?.data[0].data[
                                response?.data?.data[0].data.length - 1
                            ]
                        );
                        setCurrentPercentage(
                            Math.round(
                                (response?.data?.data[0].data[
                                    response?.data?.data[0].data.length - 1
                                ]?.score /
                                    response?.data?.data[0]?.all[0]
                                        ?.allquestions) *
                                    100
                            )
                        );
                    }
                    setTotalQstCount(
                        response?.data?.data[0]?.all[0]?.allquestions
                    );
                    setQuizData(response?.data?.data[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        resultdata();
        setStartloader(true);
    }, []);

    useEffect(() => {
        SetAdminQst(props.adminCourseQst.data);
        SetQst(props.adminCourseQst.data);
    }, [props.adminCourseQst]);

    const handleSelect = (answer) => {
        SetSelectOption(answer);
    };
    const handleSelectType = (answer) => {
        SetType(answer);
    };

    const handleSubmit = () => {
        if (type === 'DRAW') {
            const quiz_id = adminQst[0].quiz_id;
            const data = new FormData();
            data.append('quiz_question_id', adminQst[0].quiz_question_id);
            data.append('selected_option', 'ok');
            data.append('attachment', selectOption);
            props.getAdminQuizResponceAction(quiz_id, data, language);
            SetSelectOption('');
            SetType('');
        } else {
            const quiz_id = adminQst[0].quiz_id;
            const body = JSON.stringify({
                quiz_question_id: adminQst[0].quiz_question_id,
                selected_option: selectOption,
                attempts: attemptNumber
            });
            const correctAnswer = adminQst[0].options.find(
                (option) => option === adminQst[0].correct_ans
            );
            setCorrectAnswer(correctAnswer);
            props.getAdminQuizResponceAction(quiz_id, body, language);
            SetSelectOption('');
            SetType('');
            setSubmitted(true);
        }
    };
    const goToTop = () => {
        window.scrollTo(0, 0);
        const section = document.querySelector('#start');
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    const handleNxtQst = () => {
        Setloading(true);
        setTimeout(() => {
            Setloading(false);
            SetCondition(true);
            props.getAdminQuizQuestionsActions(
                props.quizId,
                language,
                attemptNumber
            );
            SetSelectOption('');
            SetType('');
            goToTop();
            setSubmitted(false);
            resultdata();
        }, 500);
    };
    const handlevideo = (id) => {
        SetVideo(false);
        props.handleNxtVideo(id);
        props.setBackToQuiz(true);
        props.setHideQuiz(false);
        props.setQuizTopic(id?.title);
    };

    const handleRetest = () => {
        setAttemptNumber(attemptNumber + 1);
        props.getAdminQuizQuestionsActions(
            props.quizId,
            language,
            attemptNumber + 1
        );
    };
    setTimeout(() => {
        setStartloader(false);
    }, 500);

    return (
        <>
            {startloader ? (
                <DoubleBounce />
            ) : (
                <Fragment>
                    {video === true &&
                        props.adminCourseQst &&
                        props.adminCourseQst.data ===
                            'Quiz has been completed no more questions to display' && (
                            <div>
                                {currentRole === 'MENTOR' ? (
                                    <Confetti className="w-100" />
                                ) : (
                                    currentPercentage >= 60 && (
                                        <Confetti className="w-100" />
                                    )
                                )}
                            </div>
                        )}

                    {condition === true &&
                    props.adminCourseQst &&
                    props.adminCourseQst.status === 200 ? (
                        <Fragment>
                            {/* <ProgressComp
                        level={
                            props.adminCourseQst.data &&
                            props.adminCourseQst.data[0] &&
                            props.adminCourseQst.data[0].level
                        }
                        {...progressBar}
                    /> */}
                        </Fragment>
                    ) : null}

                    <Card className="quiz">
                        {video === true &&
                        props.adminCourseQst &&
                        props.adminCourseQst.data ===
                            'Quiz has been completed no more questions to display' ? (
                            <div className="container new-result">
                                <div className="row justify-content-md-center ">
                                    <div className="col col-lg-9">
                                        <div className="mt-4 text-center">
                                            <div className="success_img text-center w-100">
                                                <img src={succesImg} alt=".." />
                                                <br />
                                            </div>
                                            {currentRole === 'MENTOR' && (
                                                <>
                                                    <h2>
                                                        Score:
                                                        {currentScore?.score
                                                            ? currentScore?.score
                                                            : '0'}
                                                        /{totalQstCount}
                                                    </h2>
                                                    <h2
                                                        style={{
                                                            color: 'green'
                                                        }}
                                                    >
                                                        {t(
                                                            'student.quiz_completed'
                                                        )}
                                                    </h2>
                                                    <Button
                                                        label="continue"
                                                        btnClass="primary w-auto"
                                                        size="small"
                                                        type="submit"
                                                        onClick={() => {
                                                            props.handleQuiz();
                                                            props.setInstructions(
                                                                true
                                                            );
                                                            props.setHandbook(
                                                                false
                                                            );
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        {currentRole === 'STUDENT' && (
                                            <>
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                {t('Attempts')}
                                                            </th>
                                                            <th>
                                                                {t(
                                                                    'Correct Answers'
                                                                )}
                                                            </th>
                                                            <th>
                                                                {t(
                                                                    'Wrong Answers'
                                                                )}
                                                            </th>
                                                            <th>
                                                                {t('Result')}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    {quizdata?.data?.map(
                                                        (item, index) => {
                                                            return (
                                                                <tbody
                                                                    key={index}
                                                                >
                                                                    <tr>
                                                                        <td>
                                                                            {
                                                                                item.attempts
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {item.score
                                                                                ? item.score
                                                                                : '0'}
                                                                        </td>
                                                                        <td>
                                                                            {totalQstCount -
                                                                                item.score}
                                                                        </td>
                                                                        <td>
                                                                            {Math.round(
                                                                                (item.score /
                                                                                    totalQstCount) *
                                                                                    100
                                                                            )}
                                                                            %
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            );
                                                        }
                                                    )}
                                                </Table>
                                                <div
                                                    style={{
                                                        textAlign: 'center',
                                                        marginTop: '2rem'
                                                    }}
                                                >
                                                    {currentPercentage >= 60 ? (
                                                        <h2
                                                            style={{
                                                                color: 'green'
                                                            }}
                                                        >
                                                            {t(
                                                                'student.quiz_completed'
                                                            )}
                                                        </h2>
                                                    ) : (
                                                        <h2
                                                            style={{
                                                                color: 'red'
                                                            }}
                                                        >
                                                            {t(
                                                                'You scored less than the cutoff (60%)'
                                                            )}
                                                        </h2>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        <div className="results-heading mt-4">
                                            <img src={ResultStar} alt="star" />
                                        </div>
                                        {currentRole === 'STUDENT' && (
                                            <div className="row py-3 mb-3 d-flex justify-content-end">
                                                {currentPercentage < 60 ? (
                                                    <div className="text-right">
                                                        <Button
                                                            label={t('Retest')}
                                                            btnClass="primary w-auto"
                                                            size="small"
                                                            type="submit"
                                                            onClick={
                                                                handleRetest
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="text-right">
                                                        <Button
                                                            label={t(
                                                                'student.continue'
                                                            )}
                                                            btnClass="primary w-auto"
                                                            size="small"
                                                            type="submit"
                                                            onClick={() => {
                                                                dispatch(
                                                                    updateStudentBadges(
                                                                        {
                                                                            badge_slugs:
                                                                                [
                                                                                    props.badge
                                                                                ]
                                                                        },
                                                                        currentUser
                                                                            .data[0]
                                                                            .user_id,
                                                                        language,
                                                                        t
                                                                    )
                                                                );
                                                                props.handleQuiz();
                                                                props.handleNextCourse();
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : loading === true ? (
                            <DoubleBounce />
                        ) : (
                            <Fragment>
                                <div className="question-section" id="start">
                                    <div className="score"></div>
                                    <Row>
                                        <Col xs={10}>
                                            <p>{t('teacher.question')}</p>
                                        </Col>
                                    </Row>

                                    <Question
                                        isSubmitted={isSubmitted}
                                        responceData={props.adminQstResponce}
                                        adminQuizDetails={qst}
                                        quizId={quizId}
                                        onSelectAnswer={handleSelect}
                                        onSelectType={handleSelectType}
                                        correctAnswer={correctAnswer}
                                    />

                                    {video === true &&
                                    props.adminQstResponce &&
                                    props.adminQstResponce.status === 200 ? (
                                        <div>
                                            <div className="score">
                                                {props.adminQstResponce &&
                                                    props.adminQstResponce
                                                        .data[0] &&
                                                    props.adminQstResponce
                                                        .data[0].is_correct ===
                                                        true && (
                                                        <div className="w-100">
                                                            <QuizResponse
                                                                response={
                                                                    props
                                                                        .adminQstResponce
                                                                        .data[0]
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                <br />
                                                {props.adminQstResponce &&
                                                    props.adminQstResponce
                                                        .data[0] &&
                                                    props.adminQstResponce
                                                        .data[0].is_correct ===
                                                        false && (
                                                        <QuizResponse
                                                            response={
                                                                props
                                                                    .adminQstResponce
                                                                    .data[0]
                                                            }
                                                        />
                                                    )}
                                                <br />
                                            </div>

                                            <Row className="justify-content-between mt-5">
                                                {props.adminQstResponce &&
                                                    props.adminQstResponce
                                                        .data[0] &&
                                                    props.adminQstResponce
                                                        .data[0].is_correct ===
                                                        true && (
                                                        <Col
                                                            md={12}
                                                            className="text-right"
                                                        >
                                                            <Button
                                                                btnClass="primary"
                                                                size="small"
                                                                label={t(
                                                                    'student.continue'
                                                                )}
                                                                onClick={
                                                                    handleNxtQst
                                                                }
                                                            />
                                                        </Col>
                                                    )}
                                                {props.adminQstResponce &&
                                                    props.adminQstResponce
                                                        .data[0] &&
                                                    props.adminQstResponce
                                                        .data[0].is_correct ===
                                                        false && (
                                                        <Col
                                                            md={12}
                                                            className="text-right"
                                                        >
                                                            {props.adminQstResponce &&
                                                                props
                                                                    .adminQstResponce
                                                                    .data[0] &&
                                                                props
                                                                    .adminQstResponce
                                                                    .data[0]
                                                                    .redirect_to !=
                                                                    null && (
                                                                    <Button
                                                                        btnClass="primary px-5 mx-sm-3 mx-1 mb-3"
                                                                        size="small"
                                                                        label={t(
                                                                            'teacher.refer_video'
                                                                        )}
                                                                        onClick={() =>
                                                                            handlevideo(
                                                                                props.adminQstResponce &&
                                                                                    props
                                                                                        .adminQstResponce
                                                                                        .data[0] &&
                                                                                    props
                                                                                        .adminQstResponce
                                                                                        .data[0]
                                                                                        .redirect_to
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            <Button
                                                                btnClass="primary px-5"
                                                                size="small"
                                                                label={t(
                                                                    'teacher.continue'
                                                                )}
                                                                onClick={
                                                                    handleNxtQst
                                                                }
                                                            />
                                                        </Col>
                                                    )}
                                            </Row>
                                        </div>
                                    ) : null}

                                    {props.adminQstResponce &&
                                    props.adminQstResponce.status ===
                                        200 ? null : (
                                        <Row className="justify-content-between mt-5">
                                            <Col md={12} className="text-right">
                                                <Button
                                                    size="small"
                                                    label={t('teacher.submit')}
                                                    onClick={handleSubmit}
                                                    btnClass={
                                                        !selectOption
                                                            ? 'default'
                                                            : 'primary'
                                                    }
                                                    disabled={!selectOption}
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                            </Fragment>
                        )}
                    </Card>
                </Fragment>
            )}
        </>
    );
};

const mapStateToProps = ({ adminCourses }) => {
    const { adminCourseQst, adminQstResponce } = adminCourses;
    return { adminCourseQst, adminQstResponce };
};

export default connect(mapStateToProps, {
    getAdminQuizQuestionsActions: getAdminQuizQuestions,
    getAdminQuizResponceAction: getAdminQuizResponce,
    getAdminCourseDetailsActions: getAdminCourseDetails
})(DetaledQuiz);
