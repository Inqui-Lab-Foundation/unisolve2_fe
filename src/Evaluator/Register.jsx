/* eslint-disable indent */
import React from 'react';
import { Modal, Form, FormGroup } from 'react-bootstrap';
import { InputBox } from '../stories/InputBox/InputBox';
import // EyeOutlined,
// EyeInvisibleOutlined,
// CalendarOutlined
'@ant-design/icons';
import { Label } from 'reactstrap';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
import { URL, KEY } from '../constants/defaultValues';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { getAdmin, getAdminEvalutorsList } from '../redux/actions';

const Register = (props) => {
    // here we can add admin / eadmin //
    const handleClose = () => {};
    // const [passwordType, setPasswordType] = React.useState('password');
    // const [confirmPassType, setConfirmPassType] = React.useState('password');
    const dispatch = useDispatch();

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
    // const password = {
    //     type: 'password',
    //     placeholder: 'Enter Minimum 8 Characters',
    //     className: 'defaultInput'
    // };
    // const inputDOB = {
    //     type: 'date',
    //     placeholder: 'Date Of Birth',
    //     className: 'defaultInput'
    // };
    // const inputQualification = {
    //     type: 'text',
    //     placeholder: 'Evaluator Qualification',
    //     className: 'defaultInput'
    // };
    const inputCity = {
        type: 'text',
        placeholder: 'District Name',
        className: 'defaultInput'
    };

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
        // password: Yup.string()
        //     .trim()
        //     .required('Password is required')
        //     .min(8, 'Minimum 8 characters required')
        //     .matches(/[a-zA-Z0-9]/, 'Required only alphanumeric'),
        // date_of_birth: Yup.date().required('Required'),
        // qualification: Yup.string().trim().required('Required'),
        district: Yup.string().trim().required('Required')
    });
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
            mobile: '',
            full_name: '',
            password: '',
            role: props.roleToBeAdded === 'EVALUATOR' ? 'EVALUATOR' : 'ADMIN',
            // date_of_birth: '',
            // qualification: '',
            district: ''
        },

        validationSchema:
            props.roleToBeAdded === 'EVALUATOR'
                ? validationForEvaluator
                : validationForAdmin,

        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            values.password =
                props.roleToBeAdded === 'EVALUATOR'
                    ? values.mobile.trim()
                    : values.username.trim();
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
            const actualUrl =
                props.roleToBeAdded === 'EVALUATOR'
                    ? URL.evaluatorRegister
                    : URL.adminRegister;
            await axios
                .post(actualUrl, JSON.stringify(values, null, 2), axiosConfig)
                .then((evaluatorRegRes) => {
                    if (evaluatorRegRes?.data?.status == 201) {
                        // setUserData(evaluatorRegRes?.data?.data[0]);
                        props.roleToBeAdded === 'EVALUATOR'
                            ? dispatch(getAdminEvalutorsList())
                            : dispatch(getAdmin());
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

    // const handleShowPassword = (name) => {
    //     switch (name) {
    //         case password:
    //             name?.type === 'password'
    //                 ? setPasswordType('text')
    //                 : setPasswordType('password');
    //             break;
    //         case confirm_password:
    //             name?.type === 'password'
    //                 ? setConfirmPassType('text')
    //                 : setConfirmPassType('password');
    //             break;
    //     }
    // };
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
                    {props.roleToBeAdded && props.roleToBeAdded === 'EVALUATOR'
                        ? 'ADD EVALUATOR'
                        : 'ADD ADMIN'}
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
                            className={`row justify-content-center pe-md-0 ${
                                props.roleToBeAdded !== 'EVALUATOR' &&
                                'add-admin'
                            }`}
                        >
                            <div
                                className={`col-md-6 p-0 ${
                                    props.roleToBeAdded !== 'EVALUATOR' &&
                                    'w-100'
                                }`}
                            >
                                <FormGroup
                                    className={`form-group mt-md-0 mt-5 ${
                                        props.roleToBeAdded === 'EVALUATOR' &&
                                        'me-md-3'
                                    }`}
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
                            {props.roleToBeAdded !== 'EVALUATOR' ? (
                                <div className="col-md-6 p-0 w-100">
                                    <FormGroup
                                        className={`form-group  w-100`}
                                        md={12}
                                    >
                                        <Label
                                            className="mb-2"
                                            htmlFor="username"
                                        >
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
                                        <Label
                                            className="mb-2"
                                            htmlFor="username"
                                        >
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
                            ) : (
                                <div className="col-md-6 p-0">
                                    <FormGroup
                                        className="form-group mt-md-0 mt-5"
                                        md={12}
                                    >
                                        <Label
                                            className="mb-2"
                                            htmlFor="mobile"
                                        >
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
                            )}
                        </div>

                        {props.roleToBeAdded === 'EVALUATOR' && (
                            <div className="row justify-content-center pe-md-0">
                                <div className="col-md-6 p-0">
                                    <FormGroup
                                        className="form-group mt-5 me-md-3"
                                        md={12}
                                    >
                                        <Label
                                            className="mb-2"
                                            htmlFor="username"
                                        >
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
                                    <FormGroup
                                        className="form-group mt-5"
                                        md={12}
                                    >
                                        <Label
                                            className="mb-2"
                                            htmlFor="district"
                                        >
                                            District Name
                                        </Label>
                                        <InputBox
                                            {...inputCity}
                                            id="district"
                                            name="district"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.district}
                                            maxLength={50}
                                        />

                                        {formik.touched.district &&
                                        formik.errors.district ? (
                                            <small className="error-cls">
                                                {formik.errors.district}
                                            </small>
                                        ) : null}
                                    </FormGroup>
                                    {/* <FormGroup
                                        className="form-group mt-5"
                                        md={12}
                                    >
                                        <Label
                                            className="mb-2"
                                            htmlFor="date_of_birth"
                                        >
                                            Date of Birth
                                        </Label>
                                        <div className="position-relative">
                                            <InputBox
                                                {...inputDOB}
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.date_of_birth
                                                }
                                            />
                                            <div
                                                className="position-absolute"
                                                style={{
                                                    right: '2rem',
                                                    bottom: '2rem'
                                                }}
                                            >
                                                <CalendarOutlined />
                                            </div>
                                        </div>
                                        {formik.touched.date_of_birth &&
                                        formik.errors.date_of_birth ? (
                                            <small className="error-cls">
                                                {formik.errors.date_of_birth}
                                            </small>
                                        ) : null}
                                    </FormGroup> */}
                                </div>
                            </div>
                        )}
                        {props.roleToBeAdded === 'EVALUATOR' && (
                            <div className="row justify-content-center pe-md-0">
                                {/* <div className="col-md-6 p-0">
                                    <FormGroup
                                        className="form-group mt-5 me-md-3"
                                        md={12}
                                    >
                                        <Label
                                            className="mb-2"
                                            htmlFor="qualification"
                                        >
                                            Qualification
                                        </Label>
                                        <InputBox
                                            {...inputQualification}
                                            id="qualification"
                                            name="qualification"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.qualification}
                                            maxLength={50}
                                        />

                                        {formik.touched.qualification &&
                                        formik.errors.qualification ? (
                                            <small className="error-cls">
                                                {formik.errors.qualification}
                                            </small>
                                        ) : null}
                                    </FormGroup>
                                </div> */}

                                {/* <div className="col-md-6 p-0">
                                    <FormGroup
                                        className="form-group mt-5"
                                        md={12}
                                    >
                                        <Label className="mb-2" htmlFor="district">
                                            District Name
                                        </Label>
                                        <InputBox
                                            {...inputCity}
                                            id="district"
                                            name="district"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.district}
                                            maxLength={50}
                                        />

                                        {formik.touched.district &&
                                        formik.errors.district ? (
                                            <small className="error-cls">
                                                {formik.errors.district}
                                            </small>
                                        ) : null}
                                    </FormGroup>
                                </div> */}
                            </div>
                        )}

                        <div className="mt-5">
                            <Button
                                label={
                                    props.roleToBeAdded &&
                                    props.roleToBeAdded === 'EVALUATOR'
                                        ? 'Add Evaluator'
                                        : 'Add Admin'
                                }
                                // btnClass='primary w-100'
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
