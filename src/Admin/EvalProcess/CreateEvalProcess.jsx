/* eslint-disable indent */
import React from 'react';
import Layout from '../../Admin/Layout';
import { Row, Col, FormGroup, Label, Form } from 'reactstrap';
// import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../stories/Button';
import { InputBox } from '../../stories/InputBox/InputBox';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues';

const CreateEvalProcess = (props) => {
    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };
    // const headingDetails = {
    //     title: 'Add New Evaluation Process Details',

    //     options: [
    //         {
    //             title: 'Evaluation Process',
    //             path: '/admin/evaluationProcess'
    //         },
    //         {
    //             title: 'Add Evaluation Process',
    //             path: '/admin/create-evaluationProcess'
    //         }
    //     ]
    // };
    const formik = useFormik({
        initialValues: {
            level_name: '',
            no_of_evaluation: '',
            eval_schema: '',
            status: 'ACTIVE',
            district: '-'
        },
        validationSchema: Yup.object({
            level_name: Yup.string()
                .optional()
                .required('Level Name is Required'),
            no_of_evaluation: Yup.number()
                .optional()
                .positive()
                .integer()
                .required('No of Evaluation is Required'),
            eval_schema: Yup.string()
                .optional()
                .required(' Evaluation Schema is Required')
        }),
        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            await axios
                .post(
                    `${URL.createEvalProcess}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((response) => {
                    if (response.status == 201) {
                        openNotificationWithIcon(
                            'success',
                            'Evaluation Process Create Successfully'
                        );
                        props.history.push('/admin/evaluationProcess');
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
                        {/* <BreadcrumbTwo {...headingDetails} /> */}
                        <h3>Add New Evaluation Process Details</h3>

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <FormGroup className="form-group" md={12}>
                                        <Label
                                            className="mb-2"
                                            htmlFor="level_name"
                                        >
                                            Level Name
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="level_name"
                                            name="level_name"
                                            placeholder="Please enter Level name "
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.level_name}
                                        />
                                        {formik.touched.level_name &&
                                        formik.errors.level_name ? (
                                            <small className="error-cls">
                                                {formik.errors.level_name}
                                            </small>
                                        ) : null}
                                        <Label
                                            className="mb-2"
                                            htmlFor="no_of_evaluation"
                                        >
                                            No of Evaluation
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="no_of_evaluation"
                                            name="no_of_evaluation"
                                            type="number"
                                            placeholder="Please enter no of Evaluation"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.no_of_evaluation
                                            }
                                        />
                                        {formik.touched.no_of_evaluation &&
                                        formik.errors.no_of_evaluation ? (
                                            <small className="error-cls">
                                                {formik.errors.no_of_evaluation}
                                            </small>
                                        ) : null}
                                        <Label
                                            className="mb-2"
                                            htmlFor="eval_schema"
                                        >
                                            Evaluation Schema
                                        </Label>

                                        <select
                                            name="eval_schema"
                                            id="eval_schema"
                                            placeholder="Please select Evaluation schema"
                                            className="form-control custom-dropdown"
                                            value={formik.values.eval_schema}
                                            onChange={formik.handleChange}
                                        >
                                            <option disabled={true} value="">
                                                {' '}
                                                Select Evaluation Schema
                                            </option>
                                            <option value="RATING_SCALE">
                                                Rating Scale
                                            </option>
                                            <option value="ACCEPT_REJECT">
                                                Accept Reject
                                            </option>
                                        </select>

                                        {formik.touched.eval_schema &&
                                        formik.errors.eval_schema ? (
                                            <small className="error-cls">
                                                {formik.errors.eval_schema}
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
                                                    '/admin/evaluationProcess'
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
export default CreateEvalProcess;
