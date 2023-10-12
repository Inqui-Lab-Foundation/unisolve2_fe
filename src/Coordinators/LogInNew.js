/* eslint-disable indent */
import '../Student/Pages/SignUp.scss';
import React, { useLayoutEffect } from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { InputBox } from '../stories/InputBox/InputBox';
import { Button } from '../stories/Button';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import image_1 from '../assets/media/unisolve_slider1.png';
import image_2 from '../assets/media/unisolve_slider2.png';
import CryptoJS from 'crypto-js';
import { openNotificationWithIcon } from '../helpers/Utils';
import { coordinatorLoginUser } from '../Coordinators/store/Coordinator/actions';

const LogInNew = (props) => {
    // const { t } = useTranslation();
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
                : moduleName === 'SCHOOL'
                ? history.push('/school/dashboard')
                : moduleName === 'COORDINATOR'
                ? history.push('/coordinator/dashboard')
                : history.push('/dashboard');
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            district: '',
            password: ''
        },

        validationSchema: Yup.object({
            district: Yup.string()
                .trim()
                .min(2, 'Enter Name')
                .matches(
                    /^[aA-zZ]+$/,
                    'Special Characters are not allowed, ("Remove the Spaces")'
                ),
            // .required('Required'),
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
            const encrypted = CryptoJS.AES.encrypt(
                values.password.trim(),
                key,
                {
                    iv: iv,
                    padding: CryptoJS.pad.NoPadding
                }
            ).toString();
            const body = {
                username: values.district.trim(),
                password: encrypted
            };
            props.coordinatorLoginUserAction(body, history, 'COORDINATOR');
        }
    });
    const inputUserId = {
        type: 'text',
        placeholder: 'Enter District Name '
    };

    const inputPassword = {
        placeholder: 'Enter password',
        showEyeIcon: true
    };

    const logInBtn = {
        label: 'Login',
        size: 'large'
    };

    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login">
                {/* <UsersPage /> */}
                <Row className="row-flex height-100">
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
                                Coordinator Login
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
                                                htmlFor="district"
                                            >
                                                District Name
                                            </Label>
                                            <InputBox
                                                {...inputUserId}
                                                id="district"
                                                name="district"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.district}
                                            />

                                            {formik.touched.district &&
                                            formik.errors.district ? (
                                                // <small className="error-cls">
                                                //     Required
                                                // </small>
                                                <small className="error-cls">
                                                    {formik.errors.district}
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
                                                <Col className="col-sm-8 ">
                                                    <Link
                                                        exact="true"
                                                        to="/admin/forgotpassword"
                                                        className="text-link pt-1"
                                                    >
                                                        Forgot password
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
    coordinatorLoginUserAction: coordinatorLoginUser
})(LogInNew);
