import React, { useState } from 'react';
import { Modal, Col, Form, FormGroup } from 'react-bootstrap';
import { Label, UncontrolledAlert } from 'reactstrap';
import axios from 'axios';
import { InputBox } from '../../stories/InputBox/InputBox';
import { getNormalHeaders } from '../../helpers/Utils';
import { URL, KEY } from '../../constants/defaultValues';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import CryptoJS from 'crypto-js';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

function StepTwo({
    setUserData,
    orgData,
    setHideTwo,
    // setHideThree,
    // setHideFour
    setHideFive
}) {
    const { t } = useTranslation();
    // const phoneRegExp =
    //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    // const inputPhone = {
    //     type: 'text',
    //     placeholder: `${t('teacehr_red.faculty_ph')}`,
    //     className: 'defaultInput'
    // };

    const inputEmail = {
        type: 'email',
        placeholder: `${t('teacehr_red.faculty_email')}`,
        className: 'defaultInput'
    };

    const inputName = {
        type: 'text',
        placeholder: `${t('teacehr_red.faculty_name_pl')}`,
        className: 'defaultInput'
    };
    const password = {
        placeholder: `${t('teacehr_red.enter_pass')}`,
        className: 'defaultInput'
    };

    const formik = useFormik({
        initialValues: {
            full_name: '',
            mobile: 'null',
            username: '',
            organization_code: orgData?.organization_code,
            role: 'MENTOR',
            qualification: '-',
            reg_status: false,
            password: ''
        },

        validationSchema: Yup.object({
            full_name: Yup.string()
                .trim()
                .min(2, 'Enter Name')
                .matches(/^[aA-zZ\s]+$/, 'Special Characters are Not allowed')
                .required('Required'),
            // mobile: Yup.string()
            //     .required('required')
            //     .trim()
            //     .matches(phoneRegExp, 'Phone number is not valid')
            //     .min(10, 'Please enter valid number')
            //     .max(10, 'Please enter valid number'),
            username: Yup.string()
                .trim()
                .email('Invalid username format')
                .required('Required'),
            password: Yup.string()
                .trim()
                .required('Password is required')
                .min(8, 'Your password should be minimum 8 characters')
                .matches(/[a-zA-Z0-9]/, 'Password should be only alphanumeric')
        }),

        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);

            values.password = values.password.trim();
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
            await axios
                .post(
                    `${URL.mentorRegister}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((mentorRegRes) => {
                    if (mentorRegRes?.data?.status == 201) {
                        setUserData(mentorRegRes?.data?.data[0]);
                        setHideTwo(false);
                        setHideFive(true);
                    }
                })
                .catch((err) => {
                    formik.setErrors({
                        check: err.response && err?.response?.data?.message
                    });
                    return err.response;
                });
        }
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Modal.Body>
            <div className="form-row row  mt-0 pt-5">
                <Col className="form-group" md={12}>
                    <Label className="mb-2 w-100">
                        <UncontrolledAlert color="primary ">
                            {t('teacehr_red.school')}:{' '}
                            {orgData?.organization_name} <br />
                            {t('teacehr_red.city')}:{' '}
                            {orgData?.city ? orgData?.city : ' N/A'} <br />
                            {t('teacehr_red.district')}:{' '}
                            {orgData?.district ? orgData?.district : ' N/A'}
                        </UncontrolledAlert>
                    </Label>
                </Col>
                {formik.errors.check ? (
                    <small className="error-cls mb-3 mt-3 text-center">
                        {formik.errors.check}
                    </small>
                ) : null}
                <Form
                    className="form-row row  mt-0 pb-5"
                    onSubmit={formik.handleSubmit}
                    isSubmitting
                >
                    <FormGroup className="form-group mb-5" md={12}>
                        <Label className="mb-2" htmlFor="name">
                            {t('teacehr_red.faculty_name')}
                        </Label>

                        <InputBox
                            {...inputName}
                            id="full_name"
                            name="full_name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.full_name}
                            // isDisabled={stepTwoData.mobile ? true : false}
                        />

                        {formik.touched.full_name && formik.errors.full_name ? (
                            <small className="error-cls">
                                {formik.errors.full_name}
                            </small>
                        ) : null}
                    </FormGroup>
                    {/* <FormGroup className="form-group" md={12}>
                        <Label className="mb-2" htmlFor="mobile">
                            {t('teacehr_red.faculty_ph')}
                        </Label>
                        {/* <InputWithMobileNoComp {...inputPhone} id='mobile' name='mobile' /> */}
                    {/* <InputBox
                            {...inputPhone}
                            id="mobile"
                            name="mobile"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobile}
                        /> */}
                    {/* {formik.touched.mobile && formik.errors.mobile ? (
                            <small className="error-cls">
                                {formik.errors.mobile}
                            </small>
                        ) : null}
                    </FormGroup> */}
                    <FormGroup className="form-group mb-5" md={12}>
                        <Label className="mb-2" htmlFor="username">
                            {t('teacehr_red.faculty_email')}
                        </Label>
                        <InputBox
                            {...inputEmail}
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            // isDisabled={stepTwoData.mobile ? true : false}
                        />

                        {formik.touched.username && formik.errors.username ? (
                            <small className="error-cls">
                                {formik.errors.username}
                            </small>
                        ) : null}
                    </FormGroup>
                    <FormGroup className="form-group mb-5" md={12}>
                        <Label className="mb-2" htmlFor="new_password">
                            {t('teacehr_red.enter_pass')}
                        </Label>
                        <div style={{ position: 'relative' }}>
                            <InputBox
                                {...password}
                                id="password"
                                placeholder={'Enter minimum 8 characters'}
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                type={showPassword ? 'text' : 'password'}
                            />

                            {showPassword ? (
                                <EyeOutlined
                                    onClick={() =>
                                        setShowPassword(
                                            (lastPassword) => !lastPassword
                                        )
                                    }
                                    className="position-absolute"
                                    style={{
                                        top: '25%',
                                        left: '90%',
                                        fontSize: '2.6rem'
                                    }}
                                />
                            ) : (
                                <EyeInvisibleOutlined
                                    onClick={() =>
                                        setShowPassword(
                                            (lastPassword) => !lastPassword
                                        )
                                    }
                                    className="position-absolute"
                                    style={{
                                        top: '25%',
                                        left: '90%',
                                        fontSize: '2.6rem'
                                    }}
                                />
                            )}
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <small className="error-cls">
                                {formik.errors.password}
                            </small>
                        ) : null}
                    </FormGroup>
                    <div className="mb-5">
                        <Button
                            label={t('teacehr_red.continue')}
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
    );
}

export default StepTwo;
