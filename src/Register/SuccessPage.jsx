/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import '../Student/Pages/SignUp.scss';
import React, { useState } from 'react';
import { Row, Col, Form, Label, CarouselItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { InputBox } from '../stories/InputBox/InputBox';
import { useTranslation } from 'react-i18next';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import signuplogo from '../assets/media/logo-rect.svg';
import successLogo from '../assets/media/th.png';
import image_1 from '../assets/media/unisolve_slider1.png';
import image_2 from '../assets/media/unisolve_slider2.png';
import { URL, KEY } from '../constants/defaultValues';
import axios from 'axios';

import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
import { useHistory } from 'react-router-dom';

const SuccessPage = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const mentorDaTa = JSON.parse(localStorage.getItem('mentorData'));
    const orgDaTa = JSON.parse(localStorage.getItem('orgData'));

    const successData = history && history.location && history.location.data;
    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login ">
                <Row>
                    <div className="col-md-6 aside mobile-header">
                        {/* <div className="row">
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
                        </div> */}

                        {/* <h1 className="text-left pb-5 mobile_tab-hide">
                            Together let’s learn and build something amazing.
                        </h1>
                        <p className="mobile_tab-hide">
                            Creating change makers of tomorrow
                        </p> */}
                        <Carousel>
                            <CarouselItem>
                                <div className="mobile_tab-hide">
                                    <figure>
                                        <img
                                            src={image_1}
                                            alt="image_1"
                                            style={{ width: '100%' }}
                                            className="img-fluid img-1"
                                        />
                                    </figure>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className="mobile_tab-hide">
                                    <figure>
                                        <img
                                            src={image_2}
                                            alt="image_2"
                                            style={{ width: '100%' }}
                                            className="img-fluid img-2"
                                        />
                                    </figure>
                                </div>
                            </CarouselItem>
                            {/* <CarouselItem>
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
                            </CarouselItem> */}
                        </Carousel>
                    </div>
                    <Col
                        xs={12}
                        sm={12}
                        md={6}
                        xl={6}
                        className="article"
                        style={{ padding: '8rem 8rem' }}
                    >
                        <Row className="mb-0">
                            <Col
                                xs={12}
                                sm={12}
                                md={12}
                                xl={12}
                                className="my-auto"
                            >
                                <figure>
                                    <img
                                        src={successLogo}
                                        alt="successLogo"
                                        style={{
                                            width: '30%'
                                        }}
                                        className="img-fluid img-1"
                                    />
                                </figure>

                                <p
                                    style={{
                                        fontSize: '3.4rem',
                                        fontWeight: 'bold',
                                        color: 'lightgreen'
                                    }}
                                >
                                    Congratulations
                                </p>

                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        marginBottom: '2rem'
                                    }}
                                >
                                    Your school has been successfully
                                    registered.
                                </p>

                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    UDICE Code:{' '}
                                    {/* {successData &&
                                        successData.organization_code} */}
                                    {mentorDaTa.organization_code}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    School Name: {orgDaTa.organization_name}
                                    {/* {mentorDaTa.organization_code} */}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '4rem'
                                    }}
                                >
                                    District: {orgDaTa.district}
                                    {/* {mentorDaTa.organization_code} */}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    Faculty Name: {mentorDaTa.title}.{' '}
                                    {mentorDaTa.full_name}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    Mobile Number / Login ID:{' '}
                                    {mentorDaTa.mobile}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    Whatsapp Number: {mentorDaTa.whatapp_mobile}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    Password: {mentorDaTa.mobile}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '2rem'
                                    }}
                                >
                                    Gender: {mentorDaTa.gender}
                                </p>
                                <p
                                    style={{
                                        color: 'gray',
                                        marginBottom: '2rem'
                                    }}
                                >
                                    Take a screenshot for future reference.
                                </p>

                                <h3>
                                    To login into Teacher account
                                    <Link
                                        exact="true"
                                        to="/teacher"
                                        className="p-0 blue text-link w-100 mt-3"
                                    >
                                        {t(' click here')}
                                    </Link>
                                </h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default SuccessPage;
