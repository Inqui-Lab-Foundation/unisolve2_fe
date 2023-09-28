/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from 'react';
import '../Student/Pages/SignUp.scss';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InputBox } from '../stories/InputBox/InputBox';
import { Button } from '../stories/Button';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import signuplogo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import ellipse_1 from '../assets/media/ellipse.svg';
import { evaluatorLoginUser } from '../redux/actions';
import { Carousel } from 'react-bootstrap';
import logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import image_1 from '../assets/media/unisolve_slider1.png';
import image_2 from '../assets/media/unisolve_slider2.png';
import CryptoJS from 'crypto-js';
import { openNotificationWithIcon } from '../helpers/Utils';
import Register from './Register';

const LoginEvaluator = (props) => {
    const history = useHistory();
    const [password, handlePassword] = useState('password');
    //-for evaluator registration modal
    const [registerModalShow, setRegisterModalShow] = useState(false);

    React.useLayoutEffect(() => {
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
                : history.push('/dashboard');
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().required('required'),
            password: Yup.string().required('required')
        }),
        // EVALUATOR ROLE
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
            const encrypted = CryptoJS.AES.encrypt(
                values.password.trim(),
                key,
                {
                    iv: iv,
                    padding: CryptoJS.pad.NoPadding
                }
            ).toString();
            const body = {
                username: values.email,
                password: encrypted,
                role: 'EVALUATOR'
            };
            props.evaluatorLoginUserAction(body, history, 'EVALUATOR');
        }
    });

    const inputUserId = {
        type: 'text',
        placeholder: 'Enter Evaluator Mobile Number '
    };

    const inputPassword = {
        placeholder: 'Enter password',
        showEyeIcon: true
    };

    const logInBtn = {
        label: 'Login',
        size: 'large'
    };

    // const handleShow = (e, type) => {
    //     if (type === 'password') {
    //         handlePassword('text');
    //     } else {
    //         handlePassword('password');
    //     }
    // };
    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login">
                {/* <UsersPage /> */}
                <Row className="row-flex height-100">
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
                                    src={ellipse_2}
                                    alt="ellipse_2"
                                    className="img-fluid img-3"
                                />
                            </figure>
                        </div>
                            </Carousel.Item> */}
                        </Carousel>
                    </div>

                    <Col xs={12} sm={12} md={8} xl={8} className="article">
                        <Row className="logo">
                            <a href={process.env.REACT_APP_LANDING_PAGE_URL}>
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
                            </a>
                        </Row>
                        <Row className=" article-header mb-4">
                            <h4 className="mb-4 d-flex justify-content-center align-elements-center">
                                Evaluator Login
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
                                                htmlFor="email"
                                            >
                                                Mobile Number
                                            </Label>
                                            <InputBox
                                                {...inputUserId}
                                                id="email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />

                                            {formik.touched.email &&
                                            formik.errors.email ? (
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
                                                                handleShow(
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
                                                <Col className="col-sm-8 text-right">
                                                    <Link
                                                        exact="true"
                                                        to="/evaluator/forgotpassword"
                                                        className="text-link pt-1"
                                                    >
                                                        Forgot your password
                                                    </Link>
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
                                            <div
                                                className="text-primary text-center fs-4 pointer pt-1 mt-4"
                                                onClick={() =>
                                                    setRegisterModalShow(true)
                                                }
                                            >
                                                Sign Up
                                            </div>
                                        </Col>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            {registerModalShow && (
                <Register
                    show={registerModalShow}
                    setShow={setRegisterModalShow}
                    onHide={() => setRegisterModalShow(false)}
                />
            )}
        </React.Fragment>
    );
};

const mapStateToProps = ({ authUser }) => {
    const { loading, error, currentUser } = authUser;
    return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
    evaluatorLoginUserAction: evaluatorLoginUser
})(LoginEvaluator);
