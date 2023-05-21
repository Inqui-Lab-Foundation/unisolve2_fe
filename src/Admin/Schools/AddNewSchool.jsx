/* eslint-disable indent */
import React from 'react';
import { Row, Col, Form, Label, FormGroup } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './style.scss';
// import { BsChevronRight, BsFilter, BsFillPauseFill } from "react-icons/bs";
// import { RiAwardFill } from "react-icons/ri";
// import { VscCheck } from "react-icons/vsc";
// import CourseVideo from "../../assets/img/courseVideo.png";
import Layout from '../../Admin/Layout';
// import { BsDot, BsQuestionCircle } from "react-icons/bs";
// import { Accordion } from "react-bootstrap";
// import { AccordionHeader, AccordionBody, AccordionItem } from "reactstrap";
// import User from "../../assets/img/avatar1.png";
import { Button } from '../../stories/Button';
// import { GrDocument } from "react-icons/gr";
// import { AiFillPlayCircle } from "react-icons/ai";
import axios from 'axios';

import { InputBox } from '../../stories/InputBox/InputBox';
// import { TextArea } from '../../stories/TextArea/TextArea';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { DropDownComp } from '../../stories/DropdownComp/DropdownComp';
// import { getCurrentUser } from '../../helpers/Utils';
import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';

const AddNewSchool = (props) => {
    // const currentUser = getCurrentUser('current_user');
    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };
    // const phoneRegExp =
    //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const headingDetails = {
        title: 'Add New Institution Details',

        options: [
            {
                title: 'Institution',
                path: '/admin/registered-schools'
            },
            {
                title: 'Add New Institution',
                path: '/admin/register-new-schools'
            }
        ]
    };

    const formik = useFormik({
        initialValues: {
            principal_name: '',
            principal_mobile: 'null',
            principal_email: '',
            organization_name: '',
            organization_code: '',
            city: '',
            district: '',
            state: '',
            status: 'ACTIVE'
        },

        validationSchema: Yup.object({
            // principal_mobile: Yup.string()
            //     .optional()
            //     .matches(phoneRegExp, 'Mobile number is not valid')
            //     .min(10, 'Enter a valid mobile number')
            //     .max(10, 'Enter a valid mobile number'),
            principal_email: Yup.string()
                .optional()
                .email('Invalid email address format'),
            principal_name: Yup.string()
                .optional()
                .matches(/^[aA-zZ\s]+$/, 'Invalid Name'),
            organization_name: Yup.string().required(
                'Organization  Name is Required'
            ),
            organization_code: Yup.string()
                .matches(
                    /^[A-Za-z0-9]*$/,
                    'Please enter only alphanumeric characters'
                )
                .required('UDISE  Code is Required'),
            city: Yup.string().matches(/^[aA-zZ\s]+$/, 'Invalid City'),
            district: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Invalid district')
                .required('District is Required'),
            state: Yup.string()
                .optional()
                .matches(/^[aA-zZ\s]+$/, 'Invalid State')
        }),

        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            await axios
                .post(
                    `${URL.createOrganization}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((checkOrgRes) => {
                    if (checkOrgRes.status == 201) {
                        openNotificationWithIcon(
                            'success',
                            'School Create Successfully'
                        );
                        props.history.push('/admin/registered-schools');
                    }
                })
                .catch((err) => {
                    openNotificationWithIcon(
                        'error',
                        err.response.data.message
                    );
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
                                            // style={{ fontSize: 15 }}
                                        >
                                            Unique Code
                                            <span required>*</span>
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
                                            // style={{ fontSize: 15 }}
                                        >
                                            Institute/School Name
                                            <span required>*</span>
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
                                            <span required>*</span>
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

export default withRouter(AddNewSchool);
