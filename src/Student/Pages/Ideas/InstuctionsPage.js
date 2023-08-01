/* eslint-disable no-undef */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
// import './style.scss';
import { Button } from '../../../stories/Button';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Card, CardBody, CardTitle } from 'reactstrap';

import Layout from '../../Layout';

const InstructionsPage = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const handleNext = () => {
        // alert('hii');
        history.push('/challenges');
    };
    return (
        <Layout>
            <div className="courses-page">
                <div
                    className="pb-5 my-5 px-5 container-fluid"
                    // style={{ minHeight: '72vh' }}
                >
                    <Row>
                        <Col
                            xl={12}
                            // className="course-video mb-5 order-1 order-xl-2"
                        >
                            <Fragment>
                                <Card className="course-sec-basic p-5">
                                    <CardTitle className="text-left" tag="h2">
                                        {/* {t('teacehr_red.hand_book')} */}
                                        <h3> Idea Instructions Page </h3>
                                    </CardTitle>
                                    <CardBody>
                                        <p className="text-primary">
                                            <b>
                                                Guidelines for Idea Submission
                                                ....
                                            </b>
                                        </p>
                                        {/* <p>Dear Guide Teachers,</p>
                                        <p>
                                            This handbook is an important
                                            document which will help you
                                            understand the program objectives
                                            and enable you to support your
                                            Unisolve student teams better.
                                        </p>
                                        <p>
                                            STEP 1 : Go through pages 1 - 28, to
                                            understand about the program before
                                            giving the Quiz.
                                        </p> */}
                                        <div className="congratulations text-center">
                                            <div className="success_img text-center w-100">
                                                {/* <img src={succesImg} alt=".." /> */}
                                                <br />
                                            </div>
                                            <h2>
                                                {t(
                                                    'student_course.course_completed_succ'
                                                )}
                                            </h2>
                                            <p>
                                                {t(
                                                    'student_course.continue_to_idea'
                                                )}
                                            </p>
                                        </div>
                                        <div className="d-sm-flex justify-content-center mb-3 text-center">
                                            <Button
                                                // label={t(
                                                //     'student_course.go_idea_submission'
                                                // )}
                                                label="Click Here to Continue"
                                                btnClass="primary mt-4 mx-4"
                                                size="small"
                                                onClick={handleNext}
                                            />
                                        </div>
                                        {/* <p>
                                            STEP 2 : Refer to pages 29 - 38 to
                                            roll out the program in your schools
                                            and familiarise all the studetns
                                            about the program and the course
                                            components.
                                        </p>
                                        <p>
                                            STEP 3 : Register the students on
                                            the platform and guide then through
                                            the journey.
                                        </p>
                                        <p className="text-primary text-left">
                                            <b>
                                                Instructions on Idea Submission
                                            </b>
                                        </p>
                                        <p>
                                            Final IDEA SUBMISSION by the team
                                            should happen only after all the
                                            students in the team complete the
                                            following activities:
                                        </p>
                                        <div>
                                            <p className="mb-0">
                                                A. Watching the videos as
                                                team/individually
                                            </p>
                                            <p className="mb-0">
                                                B. Complete the quiz
                                                individually{' '}
                                            </p>
                                            <p className="mb-0">
                                                C. Complete the worksheet (as a
                                                team)
                                            </p>
                                        </div> */}
                                    </CardBody>
                                </Card>
                            </Fragment>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
};

export default InstructionsPage;
