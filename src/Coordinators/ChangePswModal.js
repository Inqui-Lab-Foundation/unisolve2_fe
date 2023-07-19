/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Label } from 'reactstrap';

import axios from 'axios';
import '../Student/Pages/SignUp.scss';
import { InputBox } from '../stories/InputBox/InputBox';
import CryptoJS from 'crypto-js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCurrentUser } from '../helpers/Utils';
import { useTranslation } from 'react-i18next';
import 'sweetalert2/src/sweetalert2.scss';
import Layout from './Layout';
import { useHistory } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

// eslint-disable-next-line no-unused-vars
const ChangePswModal = (props) => {
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const { t } = useTranslation();
    const [error, SetError] = useState('');
    const [res, SetRes] = useState('');
    // eslint-disable-next-line no-unused-vars

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },

        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Required'),
            newPassword: Yup.string().required('Required'),
            confirmPassword: Yup.string().required('Required')
        }),

        onSubmit: (values) => {
            if (values.newPassword.length < 8) {
                SetError('New Password must be 8-character minimum .');
            } else if (values.oldPassword === values.newPassword) {
                SetError('Old Password and New Password are same .');
            } else if (values.newPassword !== values.confirmPassword) {
                SetError('New Password and Confirm Password not same .');
            } else {
                const key = CryptoJS.enc.Hex.parse(
                    '253D3FB468A0E24677C28A624BE0F939'
                );
                const iv = CryptoJS.enc.Hex.parse(
                    '00000000000000000000000000000000'
                );
                const old1 = CryptoJS.AES.encrypt(values.oldPassword, key, {
                    iv: iv,
                    padding: CryptoJS.pad.NoPadding
                }).toString();
                const new1 = CryptoJS.AES.encrypt(values.newPassword, key, {
                    iv: iv,
                    padding: CryptoJS.pad.NoPadding
                }).toString();

                const body = JSON.stringify({
                    old_password: old1,
                    new_password: new1,
                    id: JSON.stringify(currentUser?.data[0]?.id)
                });
                const config = {
                    method: 'put',
                    url:
                        process.env.REACT_APP_API_BASE_URL +
                        '/district_coordinators/changePassword',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    },
                    data: body
                };
                axios(config)
                    .then(function (response) {
                        SetRes('Password updated successfully');
                        setTimeout(() => {
                            SetRes('');
                            history.push('/coordinator/dashboard');
                        }, 1000);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    });
    useEffect(() => {
        SetError('');
    }, [formik.values]);
    const [oldPassTypeValue, setOldPassTypeValue] = useState('password');
    const [newPassTypeValue, setNewPassTypeValue] = useState('password');
    const [confirmPassTypeValue, setConfirmPassTypeValue] =
        useState('password');
    const oldPasswordData = {
        type: oldPassTypeValue,
        placeholder: t('coordinatorpswd.Enter_current_password_here'),
        className: 'defaultInput'
    };

    const newPasswordData = {
        type: newPassTypeValue,
        placeholder: t('coordinatorpswd.Create_new_password_here'),
        className: 'defaultInput'
    };

    const confirmPasswordData = {
        type: confirmPassTypeValue,
        placeholder: t('coordinatorpswd.Verify_New_password'),
        className: 'defaultInput'
    };
    const handleOnCancelPassword = () => {
        history.push('/coordinator/dashboard');
    };
    const handleShowPassword = (show) => {
        switch (show) {
            case oldPasswordData:
                show?.type === 'password'
                    ? setOldPassTypeValue('text')
                    : setOldPassTypeValue('password');
                break;
            case newPasswordData:
                show?.type === 'password'
                    ? setNewPassTypeValue('text')
                    : setNewPassTypeValue('password');
                break;
            case confirmPasswordData:
                show?.type === 'password'
                    ? setConfirmPassTypeValue('text')
                    : setConfirmPassTypeValue('password');
                break;
        }
    };
    return (
        <Layout>
            <div className="container ChangePSWModal mb-5">
                <Row className="mt-5 change-password">
                    <Col md={12}>
                        <h2>{t('coordinatorpswd.Change your password')}</h2>
                        <p>
                            {t(
                                'coordinatorpswd.password_helps_prevent_unauthorized'
                            )}
                        </p>
                    </Col>

                    <Col md={12}>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="form-row row mb-5 mt-3">
                                <Col
                                    className="form-group position-relative"
                                    md={12}
                                >
                                    <Label className="mb-2" htmlFor="Password">
                                        <h3>
                                            {t(
                                                'coordinatorpswd.Current_password'
                                            )}
                                        </h3>
                                    </Label>
                                    <InputBox
                                        {...oldPasswordData}
                                        id="oldPassword"
                                        name="oldPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.oldPassword}
                                    />
                                    <div
                                        className="pointer position-absolute top-50 end-0 me-4 mt-1"
                                        onClick={() => {
                                            handleShowPassword(oldPasswordData);
                                        }}
                                    >
                                        {oldPasswordData?.type ===
                                        'password' ? (
                                            <FaEyeSlash size={18} />
                                        ) : (
                                            <FaEye size={18} />
                                        )}
                                    </div>
                                    {formik.touched.oldPassword &&
                                    formik.errors.oldPassword ? (
                                        <small className="error-cls">
                                            {formik.errors.oldPassword}
                                        </small>
                                    ) : null}
                                </Col>
                            </div>
                            <div className="w-100 clearfix " />

                            <div className="form-row row  mb-5">
                                <Col
                                    className="form-group position-relative"
                                    md={12}
                                >
                                    <Label
                                        className="mb-2"
                                        htmlFor="newPassword"
                                    >
                                        <h3>
                                            {t('coordinatorpswd.New_password')}
                                        </h3>
                                    </Label>
                                    <InputBox
                                        {...newPasswordData}
                                        id="newPassword"
                                        name="newPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.newPassword}
                                    />
                                    <div
                                        className="pointer position-absolute end-0 me-4"
                                        style={{ bottom: '4rem' }}
                                        onClick={() => {
                                            handleShowPassword(newPasswordData);
                                        }}
                                    >
                                        {newPasswordData?.type ===
                                        'password' ? (
                                            <FaEyeSlash size={18} />
                                        ) : (
                                            <FaEye size={18} />
                                        )}
                                    </div>
                                    <small className="mt-2">
                                        {t(
                                            'coordinatorpswd.8-charac_minimum_case_sensitive'
                                        )}
                                    </small>
                                    {formik.touched.newPassword &&
                                    formik.errors.newPassword ? (
                                        <small className="error-cls">
                                            {formik.errors.newPassword}
                                        </small>
                                    ) : null}
                                </Col>
                                <div className="w-100 clearfix" />
                                <Col
                                    className="form-group mt-5 position-relative"
                                    md={12}
                                >
                                    <Label
                                        className="mb-2"
                                        htmlFor="confirmPassword"
                                    >
                                        <h3>
                                            {t(
                                                'coordinatorpswd.Verify_New_password'
                                            )}
                                        </h3>
                                    </Label>
                                    <InputBox
                                        {...confirmPasswordData}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                    />
                                    <div
                                        className="pointer position-absolute top-50 end-0 me-4 mt-1"
                                        onClick={() => {
                                            handleShowPassword(
                                                confirmPasswordData
                                            );
                                        }}
                                    >
                                        {confirmPasswordData?.type ===
                                        'password' ? (
                                            <FaEyeSlash size={18} />
                                        ) : (
                                            <FaEye size={18} />
                                        )}
                                    </div>
                                    {formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword ? (
                                        <small className="error-cls">
                                            {formik.errors.confirmPassword}
                                        </small>
                                    ) : null}
                                </Col>
                            </div>
                            <b style={{ color: 'red' }}>{error}</b>
                            <b style={{ color: '#3BB143' }}>{res}</b>
                            <div
                                className="swal2-actions"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    fontSize: '0.9em'
                                }}
                            >
                                <button
                                    onClick={handleOnCancelPassword}
                                    className="btn btn-outline-secondary rounded-pill sweet-btn-max"
                                >
                                    {t('coordinatorpswd.Cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="storybook-button storybook-button--small storybook-button--primary sweet-btn-max"
                                >
                                    {t('coordinatorpswd.Change_password')}
                                </button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default ChangePswModal;
