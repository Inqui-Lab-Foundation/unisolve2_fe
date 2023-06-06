/* eslint-disable indent */
import './SignUp.scss';
import React, { useLayoutEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { InputBox } from '../../stories/InputBox/InputBox.jsx';
import { Button } from '../../stories/Button.jsx';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import signuplogo from '../../assets/media/tn-brands/UPSHIFT_BLACK.png';
import studentIcon from '../../assets/media/student_login_icon.png';
import teacherIcon from '../../assets/media/teacher_login_icon.png';
import ellipse_1 from '../../assets/media/ellipse.svg';
import { loginUser } from '../../redux/actions.js';
import CryptoJS from 'crypto-js';
import { openNotificationWithIcon } from '../../helpers/Utils';

const LoginNew = (props) => {
    const { t } = useTranslation();
    const [password, handlePassword] = useState('password');
    const history = useHistory();
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
                : history.push('/dashboard');
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().required('Required user id'),
            password: Yup.string().required('Required Password')
        }),
        // STIDENT ROLE
        onSubmit: (values) => {
            if (
                localStorage.getItem('current_user') &&
                localStorage.getItem('module')
            ) {
                openNotificationWithIcon(
                    'error',
                    `Another User(${localStorage.getItem(
                        'module'
                    )}) has already logged in.`
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
                iv,
                padding: CryptoJS.pad.NoPadding
            }).toString();
            const body = {
                username: values.email.trim(),
                password: encrypted,
                role: 'STUDENT'
            };
            props.loginUserAction(body, history, 'STUDENT');
        }
    });

    const inputUserId = {
        type: 'text',
        placeholder: t('loginPage.Enter_your_userId')
    };

    const inputPassword = {
        placeholder: t('loginPage.Password')
    };

    const logInBtn = {
        label: t('login.logIn'),
        size: 'large'
    };
    const handleShow = (e, type) => {
        if (type === 'password') {
            handlePassword('text');
        } else {
            handlePassword('password');
        }
    };
    return (
        <>
            <div className="container-fluid  SignUp Login">
                {/* <UsersPage /> */}
                <Row className="row-flex height-100">
                    <div className="col-md-4 aside mobile-header">
                        <div className="row">
                            <a href={process.env.REACT_APP_LANDING_PAGE_URL}>
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
                            </a>
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
                        </div>
                    </div>

                    <Col xs={12} sm={12} md={8} xl={8} className="article">
                        <Row className="login-options">
                            <Col md={12} className="text-right" />
                        </Row>
                        <Row className=" article-header mb-4">
                            <div className="d-flex mt-4 login-div">
                                <Link
                                    className="landing-page-actions "
                                    exact="true"
                                    to="/teacher"
                                >
                                    <button className="storybook-button storybook-button--small storybook-button--loginBtn ">
                                        <img
                                            src={teacherIcon}
                                            alt="login icon"
                                            className="img-fluid"
                                        />{' '}
                                        {t('loginPage.teacher_login')}
                                    </button>
                                </Link>
                                <Link
                                    className="landing-page-actions"
                                    exact="true"
                                    to="/login"
                                >
                                    <button className="storybook-button storybook-button--small storybook-button--loginBtn active">
                                        <img
                                            src={studentIcon}
                                            alt="login icon"
                                            className="img-fluid"
                                        />{' '}
                                        {t('loginPage.student_login')}
                                    </button>
                                </Link>
                            </div>
                        </Row>

                        <Row className="my-2">
                            <Col md={12}>
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className="form-row row mb-5">
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={10}
                                            xl={7}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="email"
                                            >
                                                {t('loginPage.User_ID_Email')}
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
                                                    {formik.errors.email}
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
                                            md={10}
                                            xl={7}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="Password"
                                            >
                                                {t('loginPage.Password_label')}
                                            </Label>
                                            <InputBox
                                                {...inputPassword}
                                                type={password}
                                                id="password"
                                                name="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                            />

                                            {formik.touched.password &&
                                            formik.errors.password ? (
                                                <small className="error-cls">
                                                    {formik.errors.password}
                                                </small>
                                            ) : null}
                                        </Col>
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
                                                        {t(
                                                            'loginPage.Show_Password'
                                                        )}
                                                    </small>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="form-row row mb-5">
                                        {/* <p>Student login will be launched shortly. Please wait for notice from the program coordinators.</p> */}
                                        {/* Login button */}
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={10}
                                            xl={7}
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
                                            />
                                        </Col>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = ({ authUser }) => {
    const { loading, error, currentUser } = authUser;
    return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
    loginUserAction: loginUser
})(LoginNew);
