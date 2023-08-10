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
                                        <p style={{color:'blue',fontSize:'2.5rem',fontWeight:'bold'}}> Idea Submission Guidelines </p>
                                    </CardTitle>
                                    <CardBody>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: t(
                                                    'student_course.idea_ins_note'
                                                )
                                            }}
                                        ></div>

                                        <div className="text-right">
                                            <Button
                                                label="next"
                                                btnClass="primary mt-4 mx-4"
                                                size="small"
                                                onClick={handleNext}
                                            />
                                        </div>
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
