/* eslint-disable indent */
import React from 'react';
import { Modal, Form, FormGroup } from 'react-bootstrap';
import { InputBox } from '../../stories/InputBox/InputBox';
import { Label } from 'reactstrap';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getNormalHeaders, openNotificationWithIcon } from '../../helpers/Utils';
import { URL, KEY } from '../../constants/defaultValues';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { getAdmin} from '../store/admin/actions';

const Register = (props) => {
    // here we can add admin / eadmin //
    const handleClose = () => {};
    const dispatch = useDispatch();

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

    const validationForAdmin = Yup.object({
        full_name: Yup.string()
            .trim()
            .min(2, 'Enter Name')
            .matches(/^[aA-zZ\s]+$/, 'Not allowed')
            .required('Required'),
        username: Yup.string()
            .trim()
            .email('Invalid username format')
            .required('Required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            full_name: '',
            password: '',
            role: 'ADMIN'
        },

        validationSchema: validationForAdmin,

        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            values.password = values.username.trim();
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
            const actualUrl = URL.adminRegister;
            await axios
                .post(actualUrl, JSON.stringify(values, null, 2), axiosConfig)
                .then((evaluatorRegRes) => {
                    if (evaluatorRegRes?.data?.status == 201) {
                        dispatch(getAdmin());
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
    const dists = ['ADMIN', 'EADMIN'];
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
                    {'ADD ADMIN'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <Form
                        className="form-row row  mt-0 pb-5"
                        onSubmit={formik.handleSubmit}
                        isSubmitting
                    >
                        <div
                            className={`row justify-content-center pe-md-0 add-admin`}
                        >
                            <div className={`col-md-6 p-0 w-100`}>
                                <FormGroup
                                    className={`form-group mt-md-0 mt-5 `}
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
                            <div className="col-md-6 p-0 w-100">
                                <FormGroup
                                    className={`form-group  w-100`}
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
                                <FormGroup
                                    className={`form-group me-md-3 w-100`}
                                    md={12}
                                >
                                    <Label className="mb-2" htmlFor="username">
                                        Admin Type
                                    </Label>
                                    <select
                                        id="role"
                                        name="role"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.role}
                                    >
                                        {dists.map((item, i) => (
                                            <option key={i} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.role &&
                                    formik.errors.role ? (
                                        <small className="error-cls">
                                            {formik.errors.role}
                                        </small>
                                    ) : null}
                                </FormGroup>
                            </div>
                        </div>
                        <div className="mt-5">
                            <Button
                                label={'Add Admin'}
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
