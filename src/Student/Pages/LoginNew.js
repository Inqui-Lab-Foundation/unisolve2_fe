/* eslint-disable indent */
import './SignUp.scss';
import React, { useLayoutEffect} from 'react';
import { Row, Col, Form, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { InputBox } from '../../stories/InputBox/InputBox.jsx';
import { Carousel } from 'react-bootstrap';
import { Button } from '../../stories/Button.jsx';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/media/tn-brands/UPSHIFT_BLACK.png';
import studentIcon from '../../assets/media/student_login_icon.png';
import teacherIcon from '../../assets/media/teacher_login_icon.png';
import ellipse_1 from '../../assets/media/ellipse.svg';
import { loginUser } from '../../redux/actions.js';
import CryptoJS from 'crypto-js';
import { openNotificationWithIcon } from '../../helpers/Utils';

const LoginNew = (props) => {
    const { t } = useTranslation();

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
                iv: iv,
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
        placeholder: t('loginPage.Password'),
        showEyeIcon: true
    };

    const logInBtn = {
        label: t('login.logIn'),
        size: 'large'
    };

    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login">
                {/* <UsersPage /> */}
                <Row className="row-flex height-100">
                <div className="col-md-4 aside mobile-header">
                        <h1 className="text-left pb-5 mobile_tab-hide">
                            {t('login.Title')}
                        </h1>
                        <p className="mobile_tab-hide">{t('login.subtitle')}</p>
                        <Carousel>
                            <Carousel.Item>
                        <div className="mobile_tab-hide">
                            <figure>
                                <img
                                    src={ellipse_1}
                                    alt="ellipse_1"
                                    className="img-fluid img-1"
                                />
                            </figure>
                        </div>
                            </Carousel.Item>
                            <Carousel.Item>
                        <div className="mobile_tab-hide">
                            <figure>
                                <img
                                    src={ellipse_1}
                                    alt="ellipse_1"
                                    className="img-fluid img-2"
                                />
                            </figure>
                        </div>
                            </Carousel.Item>
                            <Carousel.Item>
                        <div className="mobile_tab-hide">
                            <figure>
                                <img
                                    src={ellipse_1}
                                    alt="ellipse_1"
                                    className="img-fluid img-3"
                                />
                            </figure>
                        </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    

                    <Col xs={12} sm={12} md={8} xl={8} className="article">
                        <Row className="logo">
                            <Col md={12} className="d-flex justify-content-center align-items-center">
                                <img src={logo} alt="Logo" className="logo-image" />
                            </Col>
                        </Row>
                        <Row className="login-options d-flex ">
                            <Col md={12} className="text-right"></Col>
                        </Row>
                        <Row className=" article-header mb-4 d-flex ">
                            <div className="d-flex mt-4 login-div justify-content-center align-items-center">
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
                                            xl={11}
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
                                            xl={11}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="Password"
                                            >
                                                {t('loginPage.Password_label')}
                                            </Label>
                                            <InputBox
                                                {...inputPassword}
                                                type='password'
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
                                            xl={11}
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
};

const mapStateToProps = ({ authUser }) => {
    const { loading, error, currentUser } = authUser;
    return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
    loginUserAction: loginUser
})(LoginNew);
