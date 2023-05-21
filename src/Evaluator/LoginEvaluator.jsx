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
            const encrypted = CryptoJS.AES.encrypt(values.password, key, {
                iv: iv,
                padding: CryptoJS.pad.NoPadding
            }).toString();
            // console.log(encrypted);
            const body = {
                username: values.email,
                password: encrypted,
                role: 'EVALUATOR'
            };
            props.evaluatorLoginUserAction(body, history, 'EVALUATOR');
            // history.push('/evaluator/submitted-ideas');
        }
    });

    const inputUserId = {
        type: 'text',
        placeholder: 'Enter evaluator email '
    };

    const inputPassword = {
        placeholder: 'Enter password'
    };

    const logInBtn = {
        label: 'Login',
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
        <React.Fragment>
            <div className="container-fluid  SignUp Login">
                {/* <UsersPage /> */}
                <Row className="row-flex height-100">
                    <div className="col-md-4 aside mobile-header">
                        <div className="row">
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
                        </div>
                    </div>

                    <Col xs={12} sm={12} md={8} xl={8} className="article">
                        <Row className=" article-header mb-4">
                            <h4 className="mb-4">
                                <span className="color-green">Evaluator</span>{' '}
                                Login
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
                                            md={10}
                                            xl={7}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="email"
                                            >
                                                Email
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
                                            md={10}
                                            xl={7}
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
                                                type={password}
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

                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={10}
                                            xl={7}
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
                                        </Col>
                                    </div>
                                    <div className="form-row row mb-5">
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

// export default LoginEvaluator;
