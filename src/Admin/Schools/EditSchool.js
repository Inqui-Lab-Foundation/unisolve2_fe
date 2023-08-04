/* eslint-disable indent */
import React from 'react';
import { Row, Col, Form, Label, FormGroup } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './style.scss';

import Layout from '../../Admin/Layout';

import { Button } from '../../stories/Button';

import axios from 'axios';

import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';

import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';

const EditSchool = (props) => {
    const listID = JSON.parse(localStorage.getItem('listId'));
    // where  listID = orgnization details //
    const listId =
        (history &&
            history.location &&
            history.location.item &&
            history.location.item) ||
        listID;

    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };
    // const phoneRegExp = /^[0-9\s]+$/;
    const headingDetails = {
        title: 'Edit Institutions Details',

        options: [
            {
                title: 'Institutions',
                path: '/admin/registered-schools'
            },
            {
                title: 'Edit Institutions',
                path: '/admin/register-edit-schools'
            }
        ]
    };

    const formik = useFormik({
        initialValues: {
            principal_name: listId && listId.principal_name,
            // principal_mobile: listId && listId.principal_mobile,
            principal_email: listId && listId.principal_email,
            organization_name: listId && listId.organization_name,
            organization_code: listId && listId.organization_code,
            city: listId && listId.city,
            district: listId && listId.district,
            state: listId && listId.state,
            status: listId && listId.status
        },

        validationSchema: Yup.object({
            // principal_mobile: Yup.string()
            //     .matches(phoneRegExp, 'Mobile number is not valid')
            //     .min(10, 'Enter a valid mobile number')
            //     .max(10, 'Enter a valid mobile number'),
            principal_email: Yup.string()
                .email('Invalid email address format')
                .trim(),
            // .required('required'),
            principal_name: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid Name')
                .trim()
                .required('required'),
            organization_name: Yup.string()
                .required('Organization  Name is Required')
                .trim()
                .required('required'),
            organization_code: Yup.string()
                .matches(
                    /^[A-Za-z0-9 ]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim()
                .required('UDISE  Code is Required'),
            city: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid City')
                .trim()
                .required('required'),

            district: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid district')
                .trim()
                .required('required'),
            // .required('District is Required'),
            state: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid State')
                .trim()
                .required('required')
        }),

        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            await axios
                .put(
                    `${URL.updateOrganization + listId.organization_id}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((checkOrgRes) => {
                    if (checkOrgRes.status == 200) {
                        openNotificationWithIcon(
                            'success',
                            'School Update Successfully'
                        );
                        props.history.push('/admin/registered-schools');
                    }
                })
                .catch((err) => {
                    return err.response;
                });
        }
    });

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <BreadcrumbTwo {...headingDetails} />

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <FormGroup className="form-group" md={12}>
                                        <Label
                                            className="mb-2"
                                            htmlFor="organization_code"
                                        >
                                            Unique Code
                                            {/* <span required>*</span> */}
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="organization_code"
                                            name="organization_code"
                                            placeholder="Please enter Unique Code"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.organization_code
                                            }
                                        />
                                        {formik.touched.organization_code &&
                                        formik.errors.organization_code ? (
                                            <small className="error-cls">
                                                {
                                                    formik.errors
                                                        .organization_code
                                                }
                                            </small>
                                        ) : null}
                                        <Label
                                            className="mb-2"
                                            htmlFor="organization_name"
                                        >
                                            Institute/School Name
                                            {/* <span required>*</span> */}
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="organization_name"
                                            name="organization_name"
                                            placeholder="Please enter Institute/School name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.organization_name
                                            }
                                        />
                                        {formik.touched.organization_name &&
                                        formik.errors.organization_name ? (
                                            <small className="error-cls">
                                                {
                                                    formik.errors
                                                        .organization_name
                                                }
                                            </small>
                                        ) : null}
                                        <Label className="mb-2" htmlFor="city">
                                            City
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="city"
                                            name="city"
                                            placeholder="Please enter city"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.city}
                                        />
                                        {formik.touched.city &&
                                        formik.errors.city ? (
                                            <small className="error-cls">
                                                {formik.errors.city}
                                            </small>
                                        ) : null}
                                        <Label
                                            className="mb-2"
                                            htmlFor="district"
                                        >
                                            District
                                            {/* <span required>*</span> */}
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="district"
                                            name="district"
                                            placeholder="Please enter district"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.district}
                                        />
                                        {formik.touched.district &&
                                        formik.errors.district ? (
                                            <small className="error-cls">
                                                {formik.errors.district}
                                            </small>
                                        ) : null}
                                        <Label className="mb-2" htmlFor="state">
                                            State
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="state"
                                            name="state"
                                            placeholder="Please enter state"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.state}
                                        />
                                        {formik.touched.state &&
                                        formik.errors.state ? (
                                            <small className="error-cls">
                                                {formik.errors.state}
                                            </small>
                                        ) : null}
                                        <Label
                                            className="mb-2"
                                            htmlFor="principal_name"
                                        >
                                            Principal Name
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="principal_name"
                                            name="principal_name"
                                            placeholder="Please enter principal name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.principal_name}
                                        />
                                        {formik.touched.principal_name &&
                                        formik.errors.principal_name ? (
                                            <small className="error-cls">
                                                {formik.errors.principal_name}
                                            </small>
                                        ) : null}
                                        {/* <Label
                                            className="mb-2"
                                            htmlFor="principal_mobile"
                                        >
                                            Principal Mobile
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="principal_mobile"
                                            name="principal_mobile"
                                            placeholder="Please enter principal mobile number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.principal_mobile
                                            }
                                        />
                                        {formik.touched.principal_mobile &&
                                        formik.errors.principal_mobile ? (
                                            <small className="error-cls">
                                                {formik.errors.principal_mobile}
                                            </small>
                                        ) : null} */}
                                        <Label
                                            className="mb-2"
                                            htmlFor="principal_email"
                                        >
                                            Principal Email
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="principal_email"
                                            name="principal_email"
                                            placeholder="Please enter principal email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.principal_email
                                            }
                                        />
                                        {formik.touched.principal_email &&
                                        formik.errors.principal_email ? (
                                            <small className="error-cls">
                                                {formik.errors.principal_email}
                                            </small>
                                        ) : null}
                                    </FormGroup>
                                </div>

                                <hr className="mt-4 mb-4"></hr>
                                <Row>
                                    <Col className="col-xs-12 col-sm-6">
                                        <Button
                                            label="Discard"
                                            btnClass="secondary"
                                            size="small"
                                            onClick={() =>
                                                props.history.push(
                                                    '/admin/registered-schools'
                                                )
                                            }
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
                                            disabled={!formik.dirty}
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

export default withRouter(EditSchool);
