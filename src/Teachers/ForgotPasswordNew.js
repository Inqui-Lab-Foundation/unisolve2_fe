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
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import image_7 from '../assets/media/unisolve_slider1.png';
import image_8 from '../assets/media/unisolve_slider2.png';
import { URL, KEY } from '../constants/defaultValues';
import axios from 'axios';

import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
const ForgotPasswordNew = () => {
    const { t } = useTranslation();
    const [errorMsg, seterrorMsg] = useState('');
    const inputMobile = {
        type: 'mobile',
        placeholder: 'Enter your registered Mobile Number'
    };

    const logInBtn = {
        label: 'Request Reset Link',
        size: 'large',
        btnClass: 'default'
    };
    const formik = useFormik({
        initialValues: {
            mobile: ''
        },

        validationSchema: Yup.object({
            mobile: Yup.string()
                .required('required')
                .trim()
                .matches(/^[0-9\s]+$/, 'Mobile number is not valid')
                .min(10, 'Please enter valid number')
                .max(10, 'Please enter valid number')
        }),

        onSubmit: async (values) => {
            // alert(JSON.stringify(values, null, 2));
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            await axios
                .put(
                    `${URL.putResetPassword}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((checkOrgRes) => {
                    if (checkOrgRes.status == 202) {
                        // props.setShow(false);
                        openNotificationWithIcon(
                            'success',
                            'Temporary Password Sent Successfully'
                        );
                        seterrorMsg('');
                    }
                })
                .catch((err) => {
                    seterrorMsg(err.response.data.message);
                    return err.response;
                });
        }
    });

    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login vh-100">
                <Row>
                    <div className="col-md-4 aside mobile-header">
                        {/* <h1 className="text-left pb-5 mobile_tab-hide">
                            {t('login.Title')}
                        </h1>
                        <p className="mobile_tab-hide">{t('login.subtitle')}</p> */}
                        <Carousel>
                            <Carousel.Item>
                                <div className="mobile_tab-hide">
                                    <figure>
                                        <img
                                            src={image_7}
                                            alt="image_7"
                                            className="img-fluid img-1"
                                        />
                                    </figure>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="mobile_tab-hide">
                                    <figure>
                                        <img
                                            src={image_8}
                                            alt="image_8"
                                            className="img-fluid img-2"
                                        />
                                    </figure>
                                </div>
                            </Carousel.Item>
                            {/* <Carousel.Item>
                        <div className="mobile_tab-hide">
                            <figure>
                                <img
                                    src={ellipse_1}
                                    alt="ellipse_1"
                                    className="img-fluid img-1"
                                />
                            </figure>
                        </div>
                            </Carousel.Item> */}
                        </Carousel>
                    </div>
                    <Col xs={12} sm={12} md={12} xl={12} className="article">
                        <Row className="logo">
                            <Col
                                md={12}
                                className="d-flex justify-content-center align-items-center"
                            >
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="logo-image"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-0">
                            <Col
                                xs={12}
                                sm={12}
                                md={12}
                                xl={12}
                                className="my-auto"
                            >
                                <h4>Did you forgot your password?</h4>
                                <span className=" sub mt-2 w-100">
                                    Don’t worry! Resetting your password is
                                    easy, just type in the mobile number you
                                    registered to this program
                                </span>
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className="form-row row my-5">
                                        <Col className="form-group">
                                            <Label
                                                className="mb-2"
                                                htmlFor="mobile"
                                            >
                                                Enter Mobile Number
                                            </Label>
                                            <InputBox
                                                {...inputMobile}
                                                id="mobile"
                                                name="mobile"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mobile}
                                            />

                                            {formik.touched.mobile &&
                                            formik.errors.mobile ? (
                                                <small className="error-cls">
                                                    {formik.errors.mobile}
                                                </small>
                                            ) : null}
                                        </Col>
                                    </div>
                                    <div className="w-100 clearfix" />

                                    {errorMsg === 'User not found' && (
                                        <b className="text-danger m-3">
                                            Please enter registered Mobile
                                            Number
                                        </b>
                                    )}
                                    <div className="mt-3">
                                        <Button
                                            label="Generate Password"
                                            btnClass={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                            size="large "
                                            type="submit"
                                            disabled={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                            }
                                            style={{ borderRadius: '0' }}
                                        />
                                    </div>
                                </Form>
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

export default ForgotPasswordNew;
