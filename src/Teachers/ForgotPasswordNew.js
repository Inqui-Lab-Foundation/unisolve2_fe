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
import ellipse_1 from '../assets/media/ellipse.svg';
import { URL, KEY } from '../constants/defaultValues';
import axios from 'axios';

import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
const ForgotPasswordNew = () => {
    const [errorMsg, seterrorMsg] = useState('');
    const inputMobile = {
        type: 'mobile',
        placeholder: 'Enter your Unisolve registered Mobile Number'
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
                                <h4>Did you forgot your password?</h4>
                                <span className=" sub mt-2 w-100">
                                    Don’t worry! Resetting your password is
                                    easy, just type in the mobile number you
                                    registered to Unisolve
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
