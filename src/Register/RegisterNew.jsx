/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Label, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import successIcon from '../assets/media/img/email.png';
import signuplogo from '../assets/media/img/UPSHIFT_BLACK.png';
import ellipse_1 from '../assets/media/img/ellipse.svg';
import { useFormik } from 'formik';
import { InputBox } from '../stories/InputBox/InputBox';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Button } from '../stories/Button';
import { URL, KEY } from '../constants/defaultValues';
import { Modal } from 'react-bootstrap';

import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';

import axios from 'axios';
import CryptoJS from 'crypto-js';
import OtpInput from 'react-otp-input-rc-17';
import { useHistory } from 'react-router-dom';

function RegisterNew() {
    const { t } = useTranslation();
    const history = useHistory();
    const [diesCode, setDiesCode] = useState('');
    const [orgData, setOrgData] = useState({});
    const [data, setData] = useState(false);
    const [error, setError] = useState('');
    const [schoolBtn, setSchoolBtn] = useState(false);
    const [btnOtp, setBtnOtp] = useState(false);
    const [otpRes, setOtpRes] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const [mentorData, setMentorData] = useState({});
    const [diceBtn, setDiceBtn] = useState(true);
    const [btn, setBtn] = useState(false);
    useEffect(() => {
        console.log(
            '🚀 ~ file: RegisterPopup.jsx ~ line 25 ~ RegisterPopup ~ orgData',
            orgData
        );
    }, [orgData]);
    const handleOnChange = (e) => {
        setDiesCode(e.target.value);
        setOrgData();
        setError('');
    };
    const handleClose = () => {
        setBtn(false);
    };
    const inputField = {
        type: 'text',
        className: 'defaultInput'
    };
    const inputName = {
        type: 'text',
        placeholder: `${t('teacehr_red.faculty_name_pl')}`,
        className: 'defaultInput'
    };
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const inputPhone = {
        type: 'text',
        placeholder: `${t('teacehr_red.faculty_ph')}`,
        className: 'defaultInput'
    };

    const inputEmail = {
        type: 'email',
        placeholder: `${t('teacehr_red.faculty_email')}`,
        className: 'defaultInput'
    };
    const formik = useFormik({
        initialValues: {
            full_name: '',
            organization_code: '',
            mobile: '',
            username: '',
            role: 'MENTOR',
            qualification: '-',
            reg_status: false,
            otp: '',
            password: ''
        },

        validationSchema: Yup.object({
            full_name: Yup.string()
                .trim()
                .min(2, 'Enter Name')
                .matches(/^[aA-zZ\s]+$/, 'Special Characters are not allowed')
                .required('Required'),
            mobile: Yup.string()
                .required('required')
                .trim()
                .matches(phoneRegExp, 'Phone number is not valid')
                .min(10, 'Please enter valid number')
                .max(10, 'Please enter valid number'),
            username: Yup.string()
                .trim()
                .email('Invalid username format')
                .required('Required')
        }),

        onSubmit: async (values) => {
            if (values.otp != '112233') {
                setErrorMsg(true);
            } else {
                const axiosConfig = getNormalHeaders(KEY.User_API_Key);
                values.password = values.mobile.trim();
                const key = CryptoJS.enc.Hex.parse(
                    '253D3FB468A0E24677C28A624BE0F939'
                );
                const iv = CryptoJS.enc.Hex.parse(
                    '00000000000000000000000000000000'
                );
                const encrypted = CryptoJS.AES.encrypt(values.mobile, key, {
                    iv: iv,
                    padding: CryptoJS.pad.NoPadding
                }).toString();
                values.password = encrypted;
                await axios
                    .post(
                        `${URL.mentorRegister}`,
                        JSON.stringify(values, null, 2),
                        axiosConfig
                    )
                    .then((mentorRegRes) => {
                        console.log(mentorRegRes);
                        if (mentorRegRes?.data?.status == 201) {
                            setMentorData(mentorRegRes?.data?.data[0]);
                            setBtn(true);
                            // setSchoolBtn(true);
                            // setDiceBtn(false);
                        }
                    })
                    .catch((err) => {
                        openNotificationWithIcon(
                            'error',
                            err.response.data?.message
                        );
                        setBtn(false);
                        formik.setErrors({
                            check: err.response && err?.response?.data?.message
                        });
                        return err.response;
                    });
            }
        }
    });

    const handleRegister = (e) => {
        const body = JSON.stringify({
            organization_code: diesCode
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response?.status == 200) {
                    if (
                        response?.data?.data[0].mentor != null &&
                        process.env.REACT_APP_USEDICECODE == 1
                    ) {
                        setError(
                            'Another Teacher is already registered in given School'
                        );
                    } else {
                        if (Object.keys(response?.data?.data[0]).length) {
                            setOrgData(response?.data?.data[0]);
                            formik.setFieldValue(
                                'organization_code',
                                response?.data?.data[0].organization_code
                            );
                            setDiceBtn(false);
                            setSchoolBtn(true);
                        } else {
                            setError('Oops..! UDISE Code seems incorrect');
                        }
                    }
                }
            })
            .catch(function (error) {
                if (error?.response?.data?.status === 404) {
                    setError('Entered Invalid UDISE Code');
                }
            });

        e.preventDefault();
    };
    const handleSendOtp = (e) => {
        setBtnOtp(true);
        setOtpRes('112233');
        e.preventDefault();
    };
    const handleOtpChange = (e) => {
        formik.setFieldValue('otp', e);
        setErrorMsg(false);
    };

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
                            <span className="color-green">Register</span>
                        </h4>
                    </Row>

                    <Row className="mt-5">
                        <Col md={12}>
                            <Form onSubmit={formik.handleSubmit}>
                                {diceBtn && (
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
                                                htmlFor="organization_code"
                                            >
                                                {t('teacehr_red.UDISE')}
                                            </Label>
                                            <Input
                                                {...inputField}
                                                id="organization_code"
                                                onChange={(e) =>
                                                    handleOnChange(e)
                                                }
                                                value={diesCode}
                                                name="organization_code"
                                                placeholder="Enter UDISE Code"
                                                className="w-100 mb-3 mb-md-0"
                                                style={{
                                                    borderRadius: '60px',
                                                    padding: '9px 11px'
                                                }}
                                            />
                                            {error ? <p>{error}</p> : null}

                                            {diceBtn && (
                                                <div className="mt-4">
                                                    <Button
                                                        label={t(
                                                            'teacehr_red.continue'
                                                        )}
                                                        btnClass={
                                                            !diesCode.length
                                                                ? 'default '
                                                                : 'primary'
                                                        }
                                                        size="small"
                                                        onClick={(e) =>
                                                            handleRegister(e)
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Col>
                                    </div>
                                )}
                                <div className="w-100 clearfix" />
                                {schoolBtn && (
                                    <div className="form-row row mb-5">
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={10}
                                            xl={7}
                                        >
                                            <Label className="mb-3 w-100 mt-4">
                                                <UncontrolledAlert color="primary ">
                                                    {t('teacehr_red.school')}:{' '}
                                                    {orgData?.organization_name}{' '}
                                                    <br />
                                                    {t(
                                                        'teacehr_red.city'
                                                    )}:{' '}
                                                    {orgData?.city
                                                        ? orgData?.city
                                                        : ' N/A'}{' '}
                                                    <br />
                                                    {t(
                                                        'teacehr_red.district'
                                                    )}:{' '}
                                                    {orgData?.district
                                                        ? orgData?.district
                                                        : ' N/A'}
                                                </UncontrolledAlert>
                                            </Label>
                                        </Col>
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={10}
                                            xl={7}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="name"
                                            >
                                                {t('teacehr_red.faculty_name')}
                                            </Label>
                                            <InputBox
                                                {...inputName}
                                                id="full_name"
                                                name="full_name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.full_name}
                                            />

                                            {formik.touched.full_name &&
                                            formik.errors.full_name ? (
                                                <small className="error-cls">
                                                    {formik.errors.full_name}
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
                                            <Label
                                                className="mb-2"
                                                htmlFor="mobile"
                                            >
                                                {t('teacehr_red.faculty_ph')}
                                            </Label>
                                            <InputBox
                                                {...inputPhone}
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
                                        <Col
                                            className="form-group"
                                            xs={12}
                                            sm={12}
                                            md={10}
                                            xl={7}
                                        >
                                            <Label
                                                className="mb-2"
                                                htmlFor="username"
                                            >
                                                {t('teacehr_red.faculty_email')}
                                            </Label>
                                            <InputBox
                                                {...inputEmail}
                                                id="username"
                                                name="username"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.username}
                                            />

                                            {formik.touched.username &&
                                            formik.errors.username ? (
                                                <small className="error-cls">
                                                    {formik.errors.username}
                                                </small>
                                            ) : null}

                                            <div className="mt-5">
                                                <Button
                                                    label={'Sent Otp'}
                                                    btnClass={
                                                        !(
                                                            formik.dirty &&
                                                            formik.isValid
                                                        )
                                                            ? 'default'
                                                            : 'primary'
                                                    }
                                                    onClick={handleSendOtp}
                                                    size="small"
                                                    disabled={
                                                        !(
                                                            formik.dirty &&
                                                            formik.isValid
                                                        )
                                                    }
                                                />
                                            </div>
                                            {btnOtp && (
                                                <div className="w-100 d-block text-center">
                                                    <Label
                                                        className="mb-2"
                                                        htmlFor="otp"
                                                    >
                                                        Enter Otp
                                                    </Label>
                                                    <div className="d-flex justify-content-center mt-5">
                                                        <OtpInput
                                                            numInputs={6}
                                                            isDisabled={false}
                                                            errorStyle="error"
                                                            onChange={
                                                                handleOtpChange
                                                            }
                                                            separator={
                                                                <span>
                                                                    {'-'}
                                                                </span>
                                                            }
                                                            isInputNum={true}
                                                            isInputSecure={
                                                                false
                                                            }
                                                            shouldAutoFocus
                                                            value={
                                                                formik.values
                                                                    .otp
                                                            }
                                                            placeholder={''}
                                                            inputStyle={{
                                                                border: '1px solid var(--color-grey-light-3)',
                                                                borderRadius:
                                                                    '8px',
                                                                width: '5.4rem',
                                                                height: '5.4rem',
                                                                fontSize:
                                                                    '2.2rem',
                                                                color: '#000',
                                                                fontWeight:
                                                                    '400',
                                                                caretColor:
                                                                    'blue'
                                                            }}
                                                            focusStyle={{
                                                                border: '1px solid #CFD3DB',
                                                                outline: 'none'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {formik.values.otp.length > 5 &&
                                                otpRes != formik.values.otp && (
                                                    <div className="d-flex justify-content-center">
                                                        <span
                                                            style={{
                                                                color: 'red'
                                                            }}
                                                        >
                                                            Invalid OTP
                                                        </span>
                                                    </div>
                                                )}
                                            {btnOtp && (
                                                <div className="mt-5">
                                                    <Button
                                                        label={'Continue'}
                                                        btnClass={
                                                            formik.values.otp
                                                                .length > 5 &&
                                                            otpRes ==
                                                                formik.values
                                                                    .otp
                                                                ? 'primary w-100'
                                                                : 'default w-100'
                                                        }
                                                        size="small"
                                                        type="submit"
                                                    />
                                                </div>
                                            )}
                                        </Col>
                                    </div>
                                )}
                                {/* {btn && ( */}
                                <Modal
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    show={btn}
                                    className="assign-evaluator ChangePSWModal teacher-register-modal"
                                    backdrop="static"
                                >
                                    <Modal.Header
                                        closeButton
                                        onHide={handleClose}
                                    >
                                        <Modal.Title
                                            id="contained-modal-title-vcenter"
                                            className="w-100 d-block text-center"
                                        >
                                            Register
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className=" row ">
                                            <div className="mt-5">
                                                <figure className="text-center">
                                                    <img
                                                        className="img-fluid w-50"
                                                        src={successIcon}
                                                        alt="success"
                                                    />
                                                    <h3>
                                                        {t(
                                                            'teacehr_red.success'
                                                        )}
                                                    </h3>
                                                </figure>

                                                <Button
                                                    label="Click Here to Continue"
                                                    btnClass={'primary mt-5'}
                                                    size="large"
                                                    type="submit"
                                                    onClick={() => {
                                                        history.push(
                                                            '/teacher'
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                                {/* )} */}
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default RegisterNew;
