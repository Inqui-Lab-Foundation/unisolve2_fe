/* eslint-disable indent */
import React, { useEffect } from 'react';
import { Modal, Form, FormGroup } from 'react-bootstrap';
import { InputBox } from '../stories/InputBox/InputBox';
import { Label } from 'reactstrap';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
import { URL, KEY } from '../constants/defaultValues';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { getAdminEvalutorsList } from '../redux/actions';
import Select from '../Admin/Challenges/pages/Select';
import { getDistrictData } from '../redux/studentRegistration/actions';

import { useSelector } from 'react-redux';
const Register = (props) => {
    // here we can add admin / eadmin //
    const handleClose = () => {};
    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    const phoneRegExp = /^[0-9\s]+$/;

    const inputPhone = {
        type: 'text',
        placeholder: 'Enter Phone Number',
        className: 'defaultInput'
    };

    const inputEmail = {
        type: 'email',
        placeholder: 'Enter Email Address',
        className: 'defaultInput'
    };

    const inputName = {
        type: 'text',
        placeholder: 'Enter Full Name',
        className: 'defaultInput'
    };
    // const inputCity = {
    //     type: 'text',
    //     placeholder: 'District Name',
    //     className: 'defaultInput'
    // };
    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

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
            .min(10, 'Please enter valid number')
            .max(10, 'Please enter valid number'),
        username: Yup.string()
            .trim()
            .email('Invalid username format')
            .required('Required'),
        district: Yup.string().trim().required('Required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            mobile: '',
            full_name: '',
            password: '',
            role: 'EVALUATOR',
            district: ''
        },

        validationSchema: validationForEvaluator,

        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            values.password = values.mobile.trim();
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
            values.password = encrypted;
            const actualUrl = URL.evaluatorRegister;
            await axios
                .post(actualUrl, JSON.stringify(values, null, 2), axiosConfig)
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
                        </div>

                        <div className="row justify-content-center pe-md-0">
                            <div className="col-md-6 p-0">
                                <FormGroup
                                    className="form-group mt-5 me-md-3"
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
                                        maxLength={100}
                                        // isDisabled={stepTwoData.mobile ? true : false}
                                    />

                                    {formik.touched.username &&
                                    formik.errors.username ? (
                                        <small className="error-cls">
                                            {formik.errors.username}
                                        </small>
                                    ) : null}
                                </FormGroup>
                            </div>

                            <div className="col-md-6 p-0">
                                <FormGroup className="form-group mt-5" md={12}>
                                    <Label className="mb-2" htmlFor="district">
                                        District
                                    </Label>
                                    {/* <InputBox
                                        {...inputCity}
                                        id="district"
                                        name="district"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.district}
                                        maxLength={50}
                                    /> */}
                                    <div className="md-12  justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={(value) =>
                                                formik.setFieldValue(
                                                    'district',
                                                    value
                                                )
                                            }
                                            placeHolder={'Select District'}
                                            value={formik.values.district}
                                        />
                                    </div>

                                    {formik.touched.district &&
                                    formik.errors.district ? (
                                        <small className="error-cls">
                                            {formik.errors.district}
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
