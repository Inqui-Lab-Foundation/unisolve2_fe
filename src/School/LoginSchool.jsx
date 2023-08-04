/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-undef */
import React, { useState, useLayoutEffect } from 'react';
import { Row, Col, Form, Label, FormGroup, Input } from 'reactstrap';
import ellipse_1 from '../assets/media/ellipse.svg';
import signuplogo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { Link, useHistory } from 'react-router-dom';
import { InputBox } from '../stories/InputBox/InputBox';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { schoolLoginUser } from '../School/store/school/actions';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Carousel } from 'react-bootstrap';
import logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import image_1 from '../assets/media/unisolve_slider1.png';
import image_2 from '../assets/media/unisolve_slider2.png';
import '../Student/Pages/SignUp.scss';

function LoginSchool(props) {
    const history = useHistory();
    const [password, handleSetPassword] = useState('password');

    useLayoutEffect(() => {
        const moduleName = localStorage.getItem('module');
        if (
            localStorage.getItem('current_user') &&
            localStorage.getItem('module')
        ) {
            moduleName === 'MENTOR'
                ? history.push('/teacher/dashboard')
                : moduleName === 'ADMIN'
                ? history.push('/admin/dashboard')
                : moduleName === 'EVALUATOR'
                ? history.push('/evaluator/submitted-ideas')
                : moduleName === 'EADMIN'
                ? history.push('/eadmin/dashboard')
                : moduleName === 'SCHOOL'
                ? history.push('/school/dashboard')
                : history.push('/dashboard');
        }
    }, []);

    const inputUserId = {
        type: 'text',
        placeholder: 'Enter UDISCE Code  '
    };

    const inputPassword = {
        placeholder: 'Enter password',
        showEyeIcon: true
    };
    // const handleShowPassword = (e, type) => {
    //     if (type === 'password') {
    //         handleSetPassword('text');
    //     } else {
    //         handleSetPassword('password');
    //     }
    // };
    const logInBtn = {
        label: 'Login',
        size: 'large'
    };
    const formik = useFormik({
        initialValues: {
            discecode: '',
            password: ''
        },

        validationSchema: Yup.object({
            discecode: Yup.string().required('required'),
            password: Yup.string().required('required')
        }),
        onSubmit: (values) => {
            if (
                localStorage.getItem('current_user') &&
                localStorage.getItem('module')
            ) {
                openNotificationWithIcon(
                    'error',
                    `Another User(${localStorage.getItem(
                        'module'
                    )}) has already logged in`
                );
                return;
            }
            const key = CryptoJS.enc.Hex.parse(
                '253D3FB468A0E24677C28A624BE0F939'
            );
            const iv = CryptoJS.enc.Hex.parse(
                '00000000000000000000000000000000'
            );
            const encrypted = CryptoJS.AES.encrypt(values.password, key, {
                iv: iv,
                padding: CryptoJS.pad.NoPadding
            }).toString();
            const body = {
                organization_code: values.discecode,
                password: encrypted
            };
            props.schoolLoginUserAction(body, history, 'SCHOOL');
        }
    });

    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login">
                <Row className="row-flex height-100 ">
                    <div className="col-md-4 aside mobile-header">
                        <Carousel>
                            <Carousel.Item>
                                <div className="mobile_tab-hide">
                                    <figure>
                                        <img
                                            src={image_1}
                                            alt="image_1"
                                            className="img-fluid img-1"
                                        />
                                    </figure>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="mobile_tab-hide">
                                    <figure>
                                        <img
                                            src={image_2}
                                            alt="image_2"
                                            className="img-fluid img-2"
                                        />
                                    </figure>
                                </div>
                            </Carousel.Item>
                            {/* <Carousel.Item>
                        <div className="mobile_tab-hide">
                            <figure>
                                <img
                                    src={ellipse_3}
                                    alt="ellipse_3"
                                    className="img-fluid img-3"
                                />
                            </figure>
                        </div>
                            </Carousel.Item> */}
                        </Carousel>
                        {/* <div className="row">
                            <Link to={'/'} exact>
                                <Col
                                    md={12}
                                    className=" mr-auto mobile_tab-hide"
                                >
                                    {' '}
                                    <h2 className="text-white">
                                        <img
                                            src={signuplogo}
                                            alt="Signup logo"
                                            className="img-fluid w-50"
                                        />
                                    </h2>
                                </Col>
                            </Link>
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
                                    className="img-fluid img-1"
                                />
                            </figure>
                        </div> */}
                    </div>
                    <Col xs={12} sm={12} md={8} xl={8} className="article">
                        {/* <Row className=" article-header mb-4">
                            <h4 className="mb-4">
                                <span className="color-green">School</span>{' '}
                                Login
                            </h4>
                        </Row> */}
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
                        <Row className=" article-header mb-4">
                            <h4 className="mb-4 d-flex justify-content-center align-elements-center">
                                School Login
                            </h4>
                        </Row>
                        <Row className="mt-5">
                            <Col md={12}>
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className="form-row row mb-5">
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            xl={12}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="discecode"
                                            >
                                                Enter UDISCE Code
                                            </Label>
                                            <InputBox
                                                {...inputUserId}
                                                id="discecode"
                                                name="discecode"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.discecode}
                                            />

                                            {formik.touched.discecode &&
                                            formik.errors.discecode ? (
                                                <small className="error-cls">
                                                    Required
                                                </small>
                                            ) : null}
                                        </Col>
                                    </div>
                                    <div className="w-100 clearfix" />

                                    <div className="form-row row mb-5">
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            xl={12}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="Password"
                                            >
                                                Password
                                            </Label>
                                            <InputBox
                                                {...inputPassword}
                                                id="password"
                                                name="password"
                                                type="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                            />

                                            {formik.touched.password &&
                                            formik.errors.password ? (
                                                <small className="error-cls">
                                                    Required
                                                </small>
                                            ) : null}
                                        </Col>

                                        {/* <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            xl={12}
                                        >
                                            <Row className="keepme_login">
                                                <Col className="col-sm-4">
                                                    <FormGroup check>
                                                        <Input
                                                            type="checkbox"
                                                            name="acceptedTerms"
                                                            className="my-auto"
                                                            onClick={(e) =>
                                                                handleShowPassword(
                                                                    e,
                                                                    password
                                                                )
                                                            }
                                                        />
                                                        <small className="text-bold ">
                                                            {' '}
                                                            Show Password
                                                        </small>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col> */}
                                    </div>
                                    <div className="form-row row mb-5">
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            xl={12}
                                        >
                                            <Button
                                                {...logInBtn}
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
                                                style={{ borderRadius: '0' }}
                                            />
                                        </Col>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = ({ authUser }) => {
    const { loading, error, currentUser } = authUser;
    return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
    schoolLoginUserAction: schoolLoginUser
})(LoginSchool);
