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

function LoginSchool(props) {
    const history = useHistory();
    const [password, handlePassword] = useState('password');

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
        placeholder: 'Enter password'
    };
    const handleShow = (e, type) => {
        if (type === 'password') {
            handlePassword('text');
        } else {
            handlePassword('password');
        }
    };
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
        <div className="container-fluid  SignUp Login">
            <Row className="row-flex  ">
                <div className="col-md-4 aside mobile-header">
                    <div className="row">
                        <Link to={'/'} exact>
                            <Col md={12} className=" mr-auto mobile_tab-hide">
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
                            <span className="color-green">School</span> Login
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
                                    </Col>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = ({ authUser }) => {
    const { loading, error, currentUser } = authUser;
    return { loading, error, currentUser };
};

export default connect(mapStateToProps, {
    schoolLoginUserAction: schoolLoginUser
})(LoginSchool);
