/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import '../Student/Pages/SignUp.scss';
import React, { useLayoutEffect} from 'react';
import { Row, Col, Form, Label,} from 'reactstrap';
import { Link } from 'react-router-dom';
import { InputBox } from '../stories/InputBox/InputBox';
import { Button } from '../stories/Button';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import studentIcon from '../assets/media/student_login_icon.png';
import teacherIcon from '../assets/media/teacher_login_icon.png';
// import logo from '../assets/media/logo-rect.svg';
import ellipse_1 from '../assets/media/ellipse.svg';
import { teacherLoginUser } from '../redux/actions';
import CryptoJS from 'crypto-js';
// import ForgotPassword from './ForgotPassword';
import { openNotificationWithIcon } from '../helpers/Utils';
import i18next from 'i18next';

const LoginNew = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    // const [showPopUp, setShowPopUp] = useState(false);
    useLayoutEffect(() => {
        i18next.changeLanguage('en');
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
            email: Yup.string().required('required').trim(),
            // .matches(/^[0-9\s]+$/, 'Mobile number is not valid')
            // .min(10, 'Please enter valid number')
            // .max(10, 'Please enter valid number'),
            password: Yup.string().required('Required password')
        }),
        // TEACHER ROLE
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
                username: values.email.trim(),
                password: encrypted,
                role: 'MENTOR'
            };
            props.teacherLoginUserAction(body, history, 'MENTOR');
        }
    });

    const inputUserId = {
        type: 'mobile',
        // placeholder: t('loginPage.Enter_your_email')
        placeholder: 'Enter your Mobile number'
    };

    const inputPassword = {
        placeholder: t('loginPage.Password'),
        showEyeIcon: true
    };

    const logInBtn = {
        label: t('login.logIn'),
        size: 'large'
    };
    // const handleShow = (e, type) => {
    //     if (type === 'password') {
    //         handlePassword('text');
    //     } else {
    //         handlePassword('password');
    //     }
    // };
    // const handleOnClick = () => {
    //     setShowPopUp(true);
    // };
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
                        <Row className="login-options">
                            <Col md={12} className="text-right"></Col>
                        </Row>
                        <Row className=" article-header mb-4">
                            <div className="d-flex mt-4 login-div justify-content-center align-items-center">
                                <Link
                                    className="landing-page-actions "
                                    exact="true"
                                    to="/teacher"
                                >
                                    <button className="storybook-button storybook-button--small storybook-button--loginBtn active">
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
                                    <button className="storybook-button storybook-button--small storybook-button--loginBtn ">
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
                                                Mobile /phone
                                                {/* {t('loginPage.User_ID_Teacher')} */}
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

                                        <div
                                            className="form-group"
                                            // xs={12}
                                            // sm={12}
                                            // md={12}
                                            // xl={12}
                                        >
                                            <Row className="keepme_login">
                                                
                                                <Col className="forgotp d-flex ">
                                                    <div
                                                        // onClick={handleOnClick}
                                                        className="text-link pt-1 text-primary"
                                                    >
                                                        {/* {t(
                                                            'loginPage.Forgot_password'
                                                        )} */}
                                                        <Link
                                                            exact="true"
                                                            to="/teacher/forgotpassword"
                                                            className="text-link pt-1"
                                                        >
                                                            {t(
                                                                'loginPage.Forgot_password'
                                                            )}
                                                        </Link>
                                                    </div>
                                                </Col>
 
                                            </Row>
                                        </div>
                                    </div>

                                    <div className="form-row row mb-5">
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
                                    <div className="form-row row mb-5">
                                        <Link
                                            to={'/register'}
                                            exact
                                            className="w-50 d-block text-center"
                                        >
                                            Click Here To Register
                                        </Link>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            {/* {showPopUp && (
                <ForgotPassword
                    show={showPopUp}
                    setShow={setShowPopUp}
                    onHide={() => setShowPopUp(false)}
                />
            )} */}
        </React.Fragment>
    );
};

const mapStateToProps = ({ authUser }) => {
    const { loading, error, currentUser } = authUser;
    return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
    teacherLoginUserAction: teacherLoginUser
})(LoginNew);
