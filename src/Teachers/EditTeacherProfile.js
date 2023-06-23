/* eslint-disable indent */
import React from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Layout from './Layout';
import { Button } from '../stories/Button';
import axios from 'axios';
import { InputBox } from '../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
    getCurrentUser,
    openNotificationWithIcon,
    setCurrentUser
} from '../helpers/Utils';
import { useHistory } from 'react-router-dom';

const EditTeacherProfileDetails = (props) => {
    // here we can edit the users details //
    const history = useHistory();
    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');

    const mentorData =
        // where  mentorData = mentor details //
        (history && history.location && history.location.item) || {};
    console.log(mentorData);

    const getValidationSchema = () => {
        // where data = mentorData //
        const adminValidation = Yup.object({
            whatapp_mobile: Yup.string()
                .required('required')
                .trim()
                .matches(/^[0-9\s]+$/, 'Mobile number is not valid')
                .min(10, 'Please enter valid number')
                .max(10, 'Please enter valid number'),
            gender: Yup.string().required('Please select valid gender'),
            title: Yup.string().required('Please select Title'),
            name: Yup.string()
                .matches(/^[A-Za-z]*$/, 'Invalid name ')
                .min(2, 'Enter a valid name')
                .required('Name is Required'),
            phone: Yup.string()
                .matches(/^[0-9\s]+$/, 'Mobile number is not valid')
                .min(10, 'Enter a valid mobile number')
                .max(10, 'Mobile number must be 10 Digit')
                .required('Mobile Number is Required')
        });
        return adminValidation;
    };
    const getInitialValues = (mentorData) => {
        const commonInitialValues = {
            name: mentorData?.full_name,
            phone: mentorData.mobile,
            title: mentorData.title,
            whatapp_mobile: mentorData.whatapp_mobile,
            gender: mentorData.gender
        };
        return commonInitialValues;
    };
    const formik = useFormik({
        initialValues: getInitialValues(mentorData),
        validationSchema: getValidationSchema(),
        onSubmit: (values) => {
            const full_name = values.name;
            const mobile = values.phone;
            const title = values.title;
            const whatapp_mobile = values.whatapp_mobile;
            const gender = values.gender;
            const body = JSON.stringify({
                full_name: full_name,
                mobile: mobile,
                title: title,
                whatapp_mobile: whatapp_mobile,
                gender: gender,
                username: mentorData.username
            });
            const url =
                process.env.REACT_APP_API_BASE_URL +
                '/mentors/' +
                mentorData.mentor_id;
            var config = {
                method: 'put',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        openNotificationWithIcon(
                            'success',
                            'Updated Successfully'
                        );
                        currentUser.data[0].full_name = values.name;
                        setCurrentUser(currentUser);
                        setTimeout(() => {
                            props.history.push('/teacher/my-profile');
                        }, 200);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });

    const handleDiscard = () => {
        // where we can discard  the changes //
        props.history.push('/teacher/my-profile');
    };

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <Row className="justify-content-center">
                                        <Col md={6}>
                                            <Label
                                                className="name-req"
                                                htmlFor="title"
                                            >
                                                {t('teacehr_red.title')}
                                            </Label>
                                            <select
                                                name="title"
                                                // id="gender"
                                                className=" col-8 form-control custom-registerdropdown "
                                                value={formik.values.title}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="">
                                                    {t(
                                                        'teacehr_red.teacher_title'
                                                    )}
                                                </option>
                                                <option value="Dr">
                                                    {t(
                                                        'teacehr_red.teacher_title_dr'
                                                    )}
                                                </option>
                                                <option value="Mr">
                                                    {t(
                                                        'teacehr_red.teacher_title_mr'
                                                    )}
                                                </option>
                                                <option value="Miss">
                                                    {t(
                                                        'teacehr_red.teacher_title_miss'
                                                    )}
                                                </option>
                                                <option value="Mrs">
                                                    {t(
                                                        'teacehr_red.teacher_title_mrs'
                                                    )}
                                                </option>
                                            </select>
                                            {formik.touched.title &&
                                            formik.errors.title ? (
                                                <small className="error-cls">
                                                    {formik.errors.title}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="name-req"
                                                htmlFor="name"
                                            >
                                                Full Name
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                id="name"
                                                name="name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />

                                            {formik.touched.name &&
                                            formik.errors.name ? (
                                                <small className="error-cls">
                                                    {formik.errors.name}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <Col md={6}>
                                            <Label
                                                className="name-req"
                                                htmlFor="gender"
                                            >
                                                {t('teacehr_red.gender')}
                                            </Label>
                                            <select
                                                name="gender"
                                                // id="gender"
                                                className=" col-8 SelectBox form-control custom-registerdropdown "
                                                value={formik.values.gender}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="">
                                                    {t(
                                                        'teacehr_red.teacher_gender'
                                                    )}
                                                </option>
                                                <option value="Male">
                                                    {t(
                                                        'teacehr_red.teacher_gender_male'
                                                    )}
                                                </option>
                                                <option value="Female">
                                                    {t(
                                                        'teacehr_red.teacher_gender_female'
                                                    )}
                                                </option>
                                            </select>
                                            {formik.touched.gender &&
                                            formik.errors.gender ? (
                                                <small className="error-cls">
                                                    {formik.errors.gender}
                                                </small>
                                            ) : null}
                                        </Col>
                                        {/* <Col md={6}>
                                            <Label
                                                className="name-req"
                                                htmlFor="phone"
                                            >
                                                Mobile
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                id="phone"
                                                name="phone"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                            />

                                            {formik.touched.phone &&
                                            formik.errors.phone ? (
                                                <small className="error-cls">
                                                    {formik.errors.phone}
                                                </small>
                                            ) : null}
                                        </Col> */}
                                        <Col md={6}>
                                            <Label
                                                className=" name-req"
                                                htmlFor="whatapp_mobile"
                                            >
                                                {t(
                                                    'teacehr_red.faculty_mobile'
                                                )}
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                id="whatapp_mobile"
                                                name="whatapp_mobile"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.whatapp_mobile
                                                }
                                            />

                                            {formik.touched.whatapp_mobile &&
                                            formik.errors.whatapp_mobile ? (
                                                <small className="error-cls">
                                                    {
                                                        formik.errors
                                                            .whatapp_mobile
                                                    }
                                                </small>
                                            ) : null}
                                        </Col>
                                    </Row>
                                </div>

                                <hr className="mt-4 mb-4"></hr>
                                <Row>
                                    <Col className="col-xs-12 col-sm-6">
                                        <Button
                                            label="Discard"
                                            btnClass="secondary"
                                            size="small"
                                            onClick={handleDiscard}
                                        />
                                    </Col>
                                    <Col className="submit-btn col-xs-12 col-sm-6">
                                        <Button
                                            label="Submit details"
                                            type="submit"
                                            btnClass={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                            size="small"
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default withRouter(EditTeacherProfileDetails);
