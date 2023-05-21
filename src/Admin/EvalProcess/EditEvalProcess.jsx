/* eslint-disable indent */
import React from 'react';
import Layout from '../../Admin/Layout';
import { Row, Col, FormGroup, Label, Form } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
import { InputBox } from '../../stories/InputBox/InputBox';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import * as Yup from 'yup';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues';

const EditEvalProcess = (props) => {
    const evalID = JSON.parse(localStorage.getItem('eavlId'));
    // evalID = evaluation_process_id //
    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };
    const headingDetails = {
        title: 'Edit Evaluation Process Details',

        options: [
            {
                title: 'Evaluation Process',
                path: '/admin/evaluationProcess'
            },
            {
                title: 'Edit Evaluation  Process',
                path: '/admin/edit-evaluationProcess'
            }
        ]
    };
    const formik = useFormik({
        initialValues: {
            level_name: evalID && evalID.level_name,
            no_of_evaluation: evalID && evalID.no_of_evaluation,
            status: 'ACTIVE'
        },
        validationSchema: Yup.object({
            level_name: Yup.string()
                .optional()
                .required('Level Name is Required'),
            no_of_evaluation: Yup.number()
                .optional()
                // .matches(phoneRegExp, 'Enter only numeric Values')
                .positive()
                // .integer()
                // .max(2)
                .required('No of Evaluation is Required')
        }),
        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            await axios
                .put(
                    `${URL.updateEvalProcess + evalID.evaluation_process_id}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((response) => {
                    if (response.status == 200) {
                        openNotificationWithIcon(
                            'success',
                            'Evaluation Process Update Successfully'
                        );
                        props.history.push('/admin/evaluationProcess');
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
                                            htmlFor="level_name"
                                            // style={{ fontSize: 15 }}
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
                                        ) : // eslint-disable-next-line indent
                                        null}
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
export default EditEvalProcess;
