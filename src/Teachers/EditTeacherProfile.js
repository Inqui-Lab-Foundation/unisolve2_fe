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
import { getCurrentUser, openNotificationWithIcon } from '../helpers/Utils';
import { useHistory } from 'react-router-dom';

const EditTeacherProfileDetails = (props) => {
    // here we can edit the users details //
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');

    const mentorData =
        // where  mentorData = mentor details //
        (history && history.location && history.location.item) || {};

    const getValidationSchema = () => {
        // where data = mentorData //
        const adminValidation = Yup.object({
            name: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid name ')
                .min(2, 'Enter a valid name')
                .required('Name is Required'),
            phone: Yup.string()
                .matches(/^[0-9]/, 'Mobile number is not valid')
                .min(10, 'Enter a valid mobile number')
                .max(10, 'Mobile number must be 10 Digit')
                .required('Mobile Number is Required')
        });        
        return adminValidation;
    };
    const getInitialValues = (mentorData) => {
        const commonInitialValues = {
            name: mentorData?.full_name,
            phone: mentorData.mobile
        };
        return commonInitialValues;
    };
    const formik = useFormik({
        initialValues: getInitialValues(mentorData),
        validationSchema: getValidationSchema(),
        onSubmit: (values) => {
            const full_name = values.name;
            const mobile = values.phone;
            const body = JSON.stringify({
                full_name: full_name,
                mobile: mobile,
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
                                        <Col md={6} className="mb-5 mb-xl-0">
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
                                        <div className="w-100" />
                                        <div className="w-100" />
                                        <>
                                            <Col md={6}>
                                                <Label
                                                    className="name-req mt-5"
                                                    htmlFor="phone"
                                                >
                                                    Phone
                                                </Label>
                                                <InputBox
                                                    className={'defaultInput'}
                                                    id="phone"
                                                    name="phone"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.phone}
                                                />

                                                {formik.touched.phone &&
                                                formik.errors.phone ? (
                                                    <small className="error-cls">
                                                        {formik.errors.phone}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </>
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
