/* eslint-disable indent */
import React from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './style.scss';
import Layout from '../../Admin/Layout';
import { Button } from '../../stories/Button';
import axios from 'axios';

import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { getAdminEvalutorsList } from '../store/adminEvalutors/actions';
import { getAdmin } from '../store/admin/actions';
import { useDispatch } from 'react-redux';

const EditProfile = (props) => {
    // here we can edit the users details //
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    const mentorData =
        // where  mentorData = mentor details //
        (history && history.location && history.location.data) || {};
    const headingDetails = {
        title: 'User Edit Details',

        options: [
            {
                title: 'User List',
                path: '/admin/userlist'
            },
            {
                title: 'User Edit Profile',
                path: '/admin/userlist'
            }
        ]
    };
    // console.log(mentorData);
    // const phoneRegExp =
    //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const getValidationSchema = (data) => {
        // where data = mentorData //
        const adminValidation = Yup.object({
            name: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid name ')
                .min(2, 'Enter a valid name')
                .required('Name is Required'),
            email: Yup.string()
                .email('Invalid email address format')
                .required('Email is required')
        });
        // if (data?.mentor_id)
        //     adminValidation['phone'] = Yup.string()
        //         .matches(phoneRegExp, 'Mobile number is not valid')
        //         .min(10, 'Enter a valid mobile number')
        //         .max(10, 'Enter a valid mobile number')
        //         .required('Mobile Number is Required');
        if (data?.evaluator_id)
            adminValidation['district'] = Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid District Name ')
                .min(2, 'Enter a valid district')
                .required('District is Required');
        return adminValidation;
    };
    const getInitialValues = (data) => {
        const commonInitialValues = {
            name: mentorData.full_name || mentorData.user.full_name,
            email: mentorData.username || mentorData.user.username
        };
        if (!data?.admin_id) {
            commonInitialValues['phone'] = mentorData.mobile;
            if (!data?.mentor_id)
                commonInitialValues['district'] = mentorData.district;
        }
        return commonInitialValues;
    };
    const formik = useFormik({
        initialValues: getInitialValues(mentorData),
        validationSchema: getValidationSchema(mentorData),
        onSubmit: (values) => {
            const full_name = values.name;
            const email = values.email;
            // const mobile = values.phone;
            const district = values.district;
            const body = JSON.stringify({
                full_name: full_name,
                // mobile: mobile,
                username: email,
                district: district
            });
            const url = mentorData?.evaluator_id
                ? process.env.REACT_APP_API_BASE_URL +
                  '/evaluators/' +
                  mentorData.evaluator_id
                : mentorData?.admin_id
                ? process.env.REACT_APP_API_BASE_URL +
                  '/admins/' +
                  mentorData.admin_id
                : process.env.REACT_APP_API_BASE_URL +
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
                        mentorData?.evaluator_id
                            ? dispatch(getAdminEvalutorsList())
                            : mentorData?.admin_id && dispatch(getAdmin());
                        openNotificationWithIcon(
                            'success',
                            'Updated Successfully'
                        );
                        setTimeout(() => {
                            props.history.push(
                                mentorData.where === 'Dashbord'
                                    ? '/admin/dashboard'
                                    : '/admin/userlist'
                            );
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
        props.history.push(
            mentorData.where === 'Dashbord'
                ? '/admin/dashboard'
                : '/admin/userlist'
        );
        localStorage.setItem(
            'organization_code',
            JSON.stringify(mentorData.organization_code)
        );
    };
    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <BreadcrumbTwo {...headingDetails} />

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <Row className="justify-content-center">
                                        <Col md={6} className="mb-5 mb-xl-0">
                                            <Label
                                                className="name-req"
                                                htmlFor="name"
                                            >
                                                Name
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
                                        <div className="w-100" />
                                        <Col md={6}>
                                            <Label
                                                className="name-req mt-5"
                                                htmlFor="email"
                                            >
                                                Email
                                            </Label>
                                            <InputBox
                                                className={'defaultInput'}
                                                id="email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email &&
                                            formik.errors.email ? (
                                                <small className="error-cls">
                                                    {formik.errors.email}
                                                </small>
                                            ) : null}
                                        </Col>
                                        <div className="w-100" />
                                        {!mentorData?.admin_id && (
                                            <>
                                                {/* <Col md={6}>
                                                    <Label
                                                        className="name-req mt-5"
                                                        htmlFor="phone"
                                                    >
                                                        Phone
                                                    </Label>
                                                    <InputBox
                                                        className={
                                                            'defaultInput'
                                                        }
                                                        id="phone"
                                                        name="phone"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values.phone
                                                        }
                                                    />

                                                    {formik.touched.phone &&
                                                    formik.errors.phone ? (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .phone
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col> */}
                                                <div className="w-100" />
                                                {!mentorData?.mentor_id && (
                                                    <Col md={6}>
                                                        <Label
                                                            className="name-req mt-5"
                                                            htmlFor="district"
                                                        >
                                                            District
                                                        </Label>
                                                        <InputBox
                                                            className={
                                                                'defaultInput'
                                                            }
                                                            id="district"
                                                            name="district"
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                            value={
                                                                formik.values
                                                                    .district
                                                            }
                                                        />

                                                        {formik.touched
                                                            .district &&
                                                        formik.errors
                                                            .district ? (
                                                            <small className="error-cls">
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .district
                                                                }
                                                            </small>
                                                        ) : null}
                                                    </Col>
                                                )}
                                            </>
                                        )}
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
                                            // onClick={() =>
                                            //     props.history.push(
                                            //         mentorData.where ===
                                            //             'Dashbord'
                                            //             ? '/admin/dashboard'
                                            //             : '/admin/userlist'
                                            //     )
                                            // }
                                        />
                                    </Col>
                                    <Col className="submit-btn col-xs-12 col-sm-6">
                                        <Button
                                            label="Submit details"
                                            type="submit"
                                            // onClick={handleBack}
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

export default withRouter(EditProfile);
