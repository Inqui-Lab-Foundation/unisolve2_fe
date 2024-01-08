/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import { Modal, Form, FormGroup } from 'react-bootstrap';
import { InputBox } from '../stories/InputBox/InputBox';
import { Label } from 'reactstrap';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
import { KEY } from '../constants/defaultValues';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { getAdminEvalutorsList } from '../redux/actions';

const Register = (props) => {
    // here we can add admin / eadmin //
    const handleClose = () => {};
    const dispatch = useDispatch();

    const phoneRegExp = /^[0-9]+$/;

    const inputPhone = {
        type: 'text',
        placeholder: 'Enter Phone Number',
        className: 'defaultInput'
    };

    const inputName = {
        type: 'text',
        placeholder: 'Enter Full Name',
        className: 'defaultInput'
    };
    const inputEmail = {
        type: 'text',
        placeholder: 'Enter Email id',
        className: 'defaultInput'
    };
    // const inputCity = {
    //     type: 'text',
    //     placeholder: 'District Name',
    //     className: 'defaultInput'
    // };

    const validationForEvaluator = Yup.object({
        full_name: Yup.string()
            .trim()
            .min(2, 'Enter Name')
            .matches(/^[aA-zZ\s]+$/, 'Not allowed')
            .required('Required'),
        mobile: Yup.string()
            .required('required')
            .trim()
            .matches(phoneRegExp, 'Contact number is not valid')
            .min(10, 'Number is less than 10 digits')
            .max(10, 'Please enter valid number'),
        username: Yup.string()
            .trim()
            .email('Invalid username format')
            .required('Required')
        // district: Yup.string().trim().required('Required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            mobile: '',
            full_name: '',
            password: '',
            role: 'EVALUATOR'
            // district: ''
        },

        validationSchema: validationForEvaluator,

        onSubmit: async (values) => {
            // const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            var pass = values.mobile.trim();

            const key = CryptoJS.enc.Hex.parse(
                '253D3FB468A0E24677C28A624BE0F939'
            );
            const iv = CryptoJS.enc.Hex.parse(
                '00000000000000000000000000000000'
            );
            const encrypted = CryptoJS.AES.encrypt(pass, key, {
                iv: iv,
                padding: CryptoJS.pad.NoPadding
            }).toString();
            values.password = encrypted;
            const body = JSON.stringify({
                full_name: values.full_name.trim(),
                mobile: values.mobile.trim(),
                username: values.username.trim(),
                role: values.role.trim(),
                password: encrypted
            });
            var config = {
                method: 'post',
                url:
                    process.env.REACT_APP_API_BASE_URL + '/evaluators/register',
                headers: {
                    'Content-Type': 'application/json'
                },

                data: body
            };
            console.log(body);
            // const actualUrl = URL.evaluatorRegister;
            await axios(config)
                // .post(actualUrl, JSON.stringify(values, null, 2), axiosConfig)
                .then((evaluatorRegRes) => {
                    if (evaluatorRegRes?.data?.status == 201) {
                        dispatch(getAdminEvalutorsList());
                        openNotificationWithIcon(
                            'success',
                            evaluatorRegRes?.data?.message
                        );
                        props.setShow(false);
                    }
                })
                .catch((err) => {
                    openNotificationWithIcon(
                        'error',
                        err.response.data?.message
                    );
                    formik.setErrors({
                        check: err.response && err?.response?.data?.message
                    });
                    props.setShow(false);
                    return err.response;
                });
        }
    });

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-evaluator ChangePSWModal teacher-register-modal"
            backdrop="static"
            scrollable={true}
        >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="w-100 d-block text-center"
                >
                    {'ADD EVALUATOR'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <Form
                        className="form-row row  mt-0 pb-5"
                        onSubmit={formik.handleSubmit}
                        isSubmitting
                    >
                        <div className={`row justify-content-center pe-md-0`}>
                            <div className={`col-md-6 p-0 `}>
                                <FormGroup
                                    className={`form-group mt-md-0 mt-5 me-md-3 `}
                                    md={12}
                                >
                                    <Label className="mb-2" htmlFor="name">
                                        Name
                                    </Label>

                                    <InputBox
                                        {...inputName}
                                        id="full_name"
                                        name="full_name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.full_name}
                                        maxLength={100}
                                    />

                                    {formik.touched.full_name &&
                                    formik.errors.full_name ? (
                                        <small className="error-cls">
                                            {formik.errors.full_name}
                                        </small>
                                    ) : null}
                                </FormGroup>
                            </div>

                            <div className="col-md-6 p-0">
                                <FormGroup
                                    className="form-group mt-md-0 mt-5"
                                    md={12}
                                >
                                    <Label className="mb-2" htmlFor="mobile">
                                        Contact Number
                                    </Label>
                                    {/* <InputWithMobileNoComp {...inputPhone} id='mobile' name='mobile' /> */}
                                    <InputBox
                                        {...inputPhone}
                                        id="mobile"
                                        name="mobile"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.mobile}
                                        maxLength={10}
                                    />

                                    {formik.touched.mobile &&
                                    formik.errors.mobile ? (
                                        <small className="error-cls">
                                            {formik.errors.mobile}
                                        </small>
                                    ) : null}
                                </FormGroup>
                            </div>
                            <div className="col-md-12 p-0">
                                <FormGroup
                                    className="form-group mt-md-0 mt-5"
                                    md={12}
                                >
                                    <Label className="mb-2" htmlFor="username">
                                        Email Address
                                    </Label>
                                    <InputBox
                                        {...inputEmail}
                                        id="username"
                                        name="username"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        keyboardType="numberFormat"
                                    />

                                    {formik.touched.username &&
                                    formik.errors.username ? (
                                        <small className="error-cls">
                                            {formik.errors.username}
                                        </small>
                                    ) : null}
                                </FormGroup>
                            </div>
                        </div>

                        <div className="mt-5">
                            <Button
                                label={'Add Evaluator'}
                                btnClass={
                                    !(formik.dirty && formik.isValid)
                                        ? 'default'
                                        : 'primary'
                                }
                                size="large "
                                type="submit"
                                disabled={!(formik.dirty && formik.isValid)}
                            />
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Register;
