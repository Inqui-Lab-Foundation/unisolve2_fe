/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect } from 'react';
import { Row, Col, Form, Label, FormGroup } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import './style.scss';

import Layout from './Layout.jsx';

import { Button } from '../stories/Button.jsx';

import axios from 'axios';
// import Select from './../Challenges/pages/Select';

import { InputBox } from '../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useTranslation } from 'react-i18next';

import { URL, KEY } from '../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon,
    getCurrentUser
} from '../helpers/Utils';
import { useHistory } from 'react-router-dom';

const EditSchool = (props) => {
    const history = useHistory();

    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');

    const listId = (history && history.location && history.location.item) || {};

    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };

    console.log(listId, 'listId');
    const formik = useFormik({
        initialValues: {
            principal_name: listId && listId.principal_name,
            principal_mobile: listId && listId.principal_mobile,
            principal_email: listId && listId.principal_email,
            organization_name: listId && listId.organization_name,
            organization_code: listId && listId.organization_code,
            // organization_code: 'Unique Code',
            city: listId && listId.city,
            district: listId && listId.district,
            // district: 'District',
            // state: 'State',
            state: listId && listId.state,
            // status: listId && listId.status,
            status: 'ACTIVE',
            category: listId && listId.category
            // category: 'Category'
        },

        validationSchema: Yup.object({
            organization_code: Yup.string()
                .matches(
                    /^[A-Za-z0-9]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim()
                .required('UDISE  Code is Required'),
            organization_name: Yup.string().required(
                'Organization  Name is Required'
            ),
            district: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid district')
                .required('District is Required'),
            category: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid category')
                .required('category is Required'),
            state: Yup.string()
                .optional()
                .matches(/^[aA-zZ\s]+$/, 'Invalid State'),
            principal_email: Yup.string()
                .optional()
                .email('Invalid email address format'),
            principal_name: Yup.string()
                .optional()
                .matches(/^[aA-zZ\s/^.*$/]+$/, 'Invalid Name')
                .trim(),
            principal_mobile: Yup.string()
                .optional()
                .matches(/^[0-9\s]+$/, 'Please Enter Valid Number')
                .trim(),
            city: Yup.string().matches(/^[aA-zZ\s/^.*$/]+$/)
        }),

        onSubmit: async (values) => {
            // console.log(values, 'values');
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
                        props.history.push('/school/my-profile');
                    }
                })
                .catch((err) => {
                    return err.response;
                });
        }
    });
    console.log(status);
    // console.log('formik.values.district', formik.values.district);

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        {/* <BreadcrumbTwo {...headingDetails} /> */}
                        <h3 className="mb-5">Edit Institutions Details</h3>

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <FormGroup className="form-group">
                                        <Row className="justify-content-center">
                                            <p style={{ color: 'red' }}>
                                                Note : Here Editable Fields are
                                                School Name,City,Principal
                                                Name,Principal Email/Principal
                                                Mobile No.
                                            </p>
                                            <Col md={6}>
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
                                                    isDisabled={true}
                                                    name="organization_code"
                                                    placeholder="Please enter Unique Code"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .organization_code
                                                    }
                                                />
                                                {formik.touched
                                                    .organization_code &&
                                                formik.errors
                                                    .organization_code ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .organization_code
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={6}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="district"
                                                >
                                                    Category
                                                    {/* <span required>*</span> */}
                                                </Label>
                                                <InputBox
                                                    id="category"
                                                    name="category"
                                                    isDisabled={true}
                                                    className="code"
                                                    placeholder="Please enter category"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.category
                                                    }
                                                />

                                                {formik.touched.category &&
                                                formik.errors.category ? (
                                                    <small className="error-cls">
                                                        {formik.errors.category}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="organization_name"
                                                >
                                                    School Name
                                                    <span required>*</span>
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="organization_name"
                                                    name="organization_name"
                                                    placeholder="Please enter Institute/School name"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .organization_name
                                                    }
                                                    className="code"
                                                />
                                                {formik.touched
                                                    .organization_name &&
                                                formik.errors
                                                    .organization_name ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .organization_name
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={6}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="principal_mobile"
                                                >
                                                    Principal Mobile No
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="principal_mobile"
                                                    name="principal_mobile"
                                                    placeholder="Please enter principal mobile number"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .principal_mobile
                                                    }
                                                />
                                                {formik.touched
                                                    .principal_mobile &&
                                                formik.errors
                                                    .principal_mobile ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .principal_mobile
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="city"
                                                >
                                                    City
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="city"
                                                    name="city"
                                                    className="code"
                                                    placeholder="Please enter city "
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.city}
                                                />
                                                {formik.touched.city &&
                                                formik.errors.city ? (
                                                    <small className="error-cls">
                                                        {formik.errors.city}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
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
                                                    className="code"
                                                    isDisabled={true}
                                                    placeholder="Please enter district"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.district
                                                    }
                                                />

                                                {formik.touched.district &&
                                                formik.errors.district ? (
                                                    <small className="error-cls">
                                                        {formik.errors.district}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={4}>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="state"
                                                >
                                                    State
                                                </Label>
                                                <InputBox
                                                    {...inputDICE}
                                                    id="state"
                                                    name="state"
                                                    className="code"
                                                    isDisabled={true}
                                                    placeholder="Please enter state"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.state}
                                                />
                                                {formik.touched.state &&
                                                formik.errors.state ? (
                                                    <small className="error-cls">
                                                        {formik.errors.state}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .principal_name
                                                    }
                                                />
                                                {formik.touched
                                                    .principal_name &&
                                                formik.errors.principal_name ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .principal_name
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                            {/* <Col md={6}>
                                                <Label
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .principal_mobile
                                                    }
                                                />
                                                {formik.touched
                                                    .principal_mobile &&
                                                formik.errors
                                                    .principal_mobile ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .principal_mobile
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col> */}
                                            <Col md={4}>
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .principal_email
                                                    }
                                                />
                                                {formik.touched
                                                    .principal_email &&
                                                formik.errors
                                                    .principal_email ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .principal_email
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
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
                                                    '/school/my-profile'
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
