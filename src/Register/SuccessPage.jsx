/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import '../Student/Pages/SignUp.scss';
import React, { useState } from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InputBox } from '../stories/InputBox/InputBox';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import signuplogo from '../assets/media/logo-rect.svg';
import successLogo from '../assets/media/th.png';
import ellipse_1 from '../assets/media/ellipse.svg';
import { URL, KEY } from '../constants/defaultValues';
import axios from 'axios';

import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
const SuccessPage = () => {
    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login vh-100">
                <Row>
                    <div className="col-md-4 aside mobile-header">
                        <div className="row">
                            <Col md={12} className=" mr-auto mobile_tab-hide">
                                {' '}
                                <h2 className="text-white">
                                    <img
                                        src={signuplogo}
                                        alt="Signup logo"
                                        className="img-fluid"
                                    />
                                    Unisolve
                                </h2>
                            </Col>
                        </div>

                        <h1 className="text-left pb-5 mobile_tab-hide">
                            Together let’s learn and build something amazing.
                        </h1>
                        <p className="mobile_tab-hide">
                            Creating change makers of tomorrow
                        </p>
                        <div className="mobile_tab-hide">
                            <figure>
                                <img
                                    src={ellipse_1}
                                    alt="ellipse_1"
                                    style={{ width: '70%' }}
                                    className="img-fluid img-1"
                                />
                            </figure>
                        </div>
                    </div>
                    <Col xs={12} sm={12} md={8} xl={8} className="article">
                        <Row className="mb-0 h-100">
                            <Col
                                xs={12}
                                sm={12}
                                md={10}
                                xl={8}
                                className="my-auto"
                            >
                                <figure>
                                    <img
                                        src={successLogo}
                                        alt="successLogo"
                                        style={{ width: '70%' }}
                                        // className="img-fluid img-1"
                                    />
                                </figure>
                                <h3> Success !....</h3>
                                <p>You Have Registered for your Account ...</p>
                                <p className="d-flex text-center  ">
                                    <Link
                                        exact="true"
                                        to="/teacher"
                                        className="p-0 blue text-link w-100 mt-3"
                                    >
                                        Back to Login
                                    </Link>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default SuccessPage;
