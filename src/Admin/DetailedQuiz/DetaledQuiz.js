





/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'reactstrap';
import { Fragment } from 'react';
import Question from './Question';
import { Button } from '../../stories/Button';
import './quiz.scss';
import Confetti from 'react-confetti';
import ResultStar from '../../assets/media/quiz-result-star.png';
import { connect, useSelector } from 'react-redux';
import DoubleBounce from '../../components/Loaders/DoubleBounce';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getCurrentUser } from '../../helpers/Utils';

import {
  getAdminQuizQuestions,
  getAdminQuizResponce,
  getAdminCourseDetails,
} from '../../redux/actions';
import QuizResponse from './QuizResponse';
import succesImg from '../../assets/media/success1.jpeg';

const DetaledQuiz = (props) => {
  const currentUser = getCurrentUser('current_user');
  const { t } = useTranslation();
  const quizId = props.quizId;
  const [adminQst, SetAdminQst] = useState({});
  const [type, SetType] = useState('');
  const [loading, Setloading] = useState(false);
  const [selectOption, SetSelectOption] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [condition, SetCondition] = useState(true);
  const [video, SetVideo] = useState(true);
  const [qst, SetQst] = useState({});
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [data, setData] = useState(0);
  const language = useSelector(
    (state) => state?.studentRegistration?.studentLanguage
  );
  const [isSubmitted, setSubmitted] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(0);

  useEffect(() => {
    props.getAdminQuizQuestionsActions(quizId, language);
  }, [props.quizId, language]);

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

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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
      const correctAnswer = adminQst[0].options.find((option) => option === adminQst[0].correct_ans);
      setCorrectAnswer(correctAnswer);
      props.getAdminQuizResponceAction(quiz_id, body, language);
      SetSelectOption('');
      SetType('');
      setSubmitted(true);
    }

    // Increment totalQuestions
    setTotalQuestions((prevTotalQuestions) => prevTotalQuestions + 1);
  };
  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleNxtQst = () => {
    Setloading(true);
    setTimeout(() => {
      Setloading(false);
      SetCondition(true);
      props.getAdminQuizQuestionsActions(props.quizId, language);
      SetSelectOption('');
      SetType('');
      goToTop();
      setSubmitted(false);
    }, 500);
  };
  const handlevideo = (id) => {
    SetVideo(false);
    props.handleNxtVideo(id);
    props.setBackToQuiz(true);
    props.setHideQuiz(false);
    props.setQuizTopic(id?.title);
  };
  const handleQuizResponseSubmission = (response) => {
    // Check if the response is correct and increment the count if true
    if (response.is_correct) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };

  const scorePercentage = ((correctAnswers/2) / totalQuestions) * 100;

  const handleRetest = () => {
    
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setAttemptNumber((prevAttempts) => prevAttempts + 1);
  };

  useEffect(() => {
    var config = {
        method: 'get',
        url: process.env.REACT_APP_API_BASE_URL + `/quiz/result?user_id=${currentUser.data[0].user_id}&quiz_id=${quizId}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${currentUser.data[0]?.token}`
        }
    };
    axios(config)
        .then(function (response) {
            if (response.status === 200) {
              if(response.data.count === null)
              {
                setAttemptNumber(1);
              }
              else{
                setAttemptNumber(response.data.data[response.data.data.length-1].attempts);
              }
              
              setData(response.data.data);
              console.log('success');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  }, []);

  console.log(data, "Hi data");
  console.log(attemptNumber, "Hi attempts");
  useEffect(() => {
    if (totalQuestions > 0 && totalQuestions === props.adminCourseQst.count) {
      setTotalAttempts((prevAttempts) => prevAttempts + 1);
    }
  }, [totalQuestions]);

  return (
    <Fragment>
      {video === true && props.adminCourseQst && props.adminCourseQst.count === null && (
        <Confetti className="w-100" />
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
        props.adminCourseQst.count === null ? (
          <div className="container new-result">
            <div className="row justify-content-md-center ">
              <div className="col col-lg-9">
                <div className="mt-4 text-center">
                  <div className="success_img text-center w-100">
                    <img src={succesImg} alt=".." />
                    <br />
                  </div>
                  <p>{t('student.quiz_completed')}</p>
                </div>
                <div className="results-heading mt-4">
                  <img src={ResultStar} alt="star" />
                </div>
                <div className="score">
                  <p>
                    {t('Score')}: {correctAnswers/2}/{totalQuestions}
                  </p>
                  {scorePercentage < 60 && (
                    <p>{t('You scored less than the cutoff')}</p>
                  )}
                </div>
                <Table>
                    <thead>
                        <tr>
                         <th>{t('attempts')}</th>
                         <th>{t('Correct Answers')}</th>
                         <th>{t('Wrong Answers')}</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr>
                         <td>{totalAttempts}</td>
                         <td>{correctAnswers/2}</td>
                         <td>{totalQuestions-(correctAnswers/2)}</td>
                       </tr>
                    </tbody>
                </Table>
                <div className="row py-3 mb-3 d-flex justify-content-between">
    <div>
      {props.instructions === 'yes' ? (
        <Button
          label={t('student.continue')}
          btnClass="primary w-auto"
          size="small"
          type="submit"
          onClick={() => {
            props.handleQuiz();
            props.setInstructions(false);
            props.setHandbook(true);
          }}
        />
      ) : (
        <Button
          label={t('student.continue')}
          btnClass="primary w-auto"
          size="small"
          type="submit"
          onClick={props.handleQuiz}
        />
      )}
    </div>
    {scorePercentage < 60 && (
      <div>
        <Button
          label={t('Retest')}
          btnClass="primary w-auto"
          size="small"
          type="submit"
          onClick={handleRetest}
        />
      </div>
    )}
  </div>
              </div>
            </div>
          </div>
        ) : loading === true ? (
          <DoubleBounce />
        ) : (
          <Fragment>
            <div className="question-section">
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
                <div className="question-section">
                  <div className="score">
                    {props.adminQstResponce &&
                      props.adminQstResponce.data[0] &&
                      props.adminQstResponce.data[0].is_correct === true && (
                      <div className="w-100">
                        <QuizResponse
                          response={props.adminQstResponce.data[0]}
                          onQuizResponseSubmission={handleQuizResponseSubmission}
                        />
                      </div>
                    )}
                    <br />
                    {props.adminQstResponce &&
                      props.adminQstResponce.data[0] &&
                      props.adminQstResponce.data[0].is_correct === false && (
                      <QuizResponse
                        response={props.adminQstResponce.data[0]}
                      />
                    )}
                    <br />
                  </div>

                  <Row className="justify-content-between mt-5">
                    {props.adminQstResponce &&
                      props.adminQstResponce.data[0] &&
                      props.adminQstResponce.data[0].is_correct === true && (
                      <Col md={12} className="text-right">
                        <Button
                          btnClass="primary px-5"
                          size="small"
                          label={t('student.continue')}
                          onClick={handleNxtQst}
                        />
                      </Col>
                    )}
                    {props.adminQstResponce &&
                      props.adminQstResponce.data[0] &&
                      props.adminQstResponce.data[0].is_correct === false && (
                      <Col md={12} className="text-right">
                        {props.adminQstResponce &&
                          props.adminQstResponce.data[0] &&
                          props.adminQstResponce.data[0].redirect_to != null && (
                          <Button
                            btnClass="primary px-5 mx-sm-3 mx-1 mb-3"
                            size="small"
                            label={t('teacher.refer_video')}
                            onClick={() =>
                              handlevideo(
                                props.adminQstResponce &&
                                  props.adminQstResponce.data[0] &&
                                  props.adminQstResponce.data[0].redirect_to
                              )
                            }
                          />
                        )}
                        <Button
                          btnClass="primary px-5"
                          size="small"
                          label={t('teacher.continue')}
                          onClick={handleNxtQst}
                        />
                      </Col>
                    )}
                  </Row>
                </div>
              ) : null}

              {props.adminQstResponce && props.adminQstResponce.status === 200 ? null : (
                <Row className="justify-content-between mt-5">
                  <Col md={12} className="text-right">
                    <Button
                      size="small"
                      label={t('teacher.submit')}
                      onClick={handleSubmit}
                      btnClass={!selectOption ? 'default' : 'primary'}
                    />
                  </Col>
                </Row>
              )}
            </div>
          </Fragment>
        )}
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({ adminCourses }) => {
  const { adminCourseQst, adminQstResponce } = adminCourses;
  return { adminCourseQst, adminQstResponce };
};

export default connect(mapStateToProps, {
  getAdminQuizQuestionsActions: getAdminQuizQuestions,
  getAdminQuizResponceAction: getAdminQuizResponce,
  getAdminCourseDetailsActions: getAdminCourseDetails,
})(DetaledQuiz);
