/* eslint-disable indent */
import React from 'react';
import Layout from '../../Admin/Layout';
import { Row, Col, FormGroup, Label, Form, Input } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../stories/Button';
import { InputBox } from '../../stories/InputBox/InputBox';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import { useTranslation } from 'react-i18next';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { URL, KEY } from '../../constants/defaultValues';
// import { staticData } from './index';

const CreateResource = (props) => {
    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');
    // const history = useHistory();
    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };

    const fileHandler = (e) => {
        let file = e.target.files[0];

        if (!file) {
            return;
        }

        let pattern = /^[a-zA-Z0-9_-\s]{0,}$/;
        const fileName = file.name.split('.').slice(0, -1).join('.');
        const isValidFileName = pattern.test(fileName);

        const maxFileSize = 10000000;
        const isOverMaxSize = file.size > maxFileSize;

        if (isOverMaxSize) {
            openNotificationWithIcon('error', t('student.less_10MB'));
            return;
        }

        if (!isValidFileName) {
            openNotificationWithIcon(
                'error',
                "Only alphanumeric and '_' are allowed"
            );
            return;
        }

        formik.setFieldValue('attachments', file);
    };
    const handleTypeChnage = () => {
        formik.setFieldValue('attachments', '');
    };

    const formik = useFormik({
        initialValues: {
            role: '',
            description: '',
            type: '',
            attachments: ''
        },
        validationSchema: Yup.object({
            role: Yup.string()
                .optional()
                .oneOf(['mentor', 'student'], 'Role is Required'),
            description: Yup.string()
                .optional()
                .required('details is Required'),
            type: Yup.string()
                .optional()
                .oneOf(['file', 'link'], 'Submission type is Required'),
            attachments: Yup.mixed().when('type', {
                is: 'file',
                then: Yup.mixed().required('File is Required'),
                otherwise: Yup.string().required('Link is Required')
            })
        }),
        onSubmit: async (values) => {
            try {
                if (values.type === 'file') {
                    const fileData = new FormData();
                    fileData.append('file', values.attachments);

                    const response = await axios.post(
                        `${process.env.REACT_APP_API_BASE_URL}/resource/resourceFileUpload`,
                        fileData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${currentUser?.data[0]?.token}`
                            }
                        }
                    );
                    values.attachments =
                        response?.data?.data[0].attachments[0].toString();
                    // if (response.status === 200) {
                    //     openNotificationWithIcon(
                    //       'success',
                    //       'File Uploaded Successfully'
                    //     );
                    //   } else {
                    //     openNotificationWithIcon('error', 'Opps! Something Wrong');
                    //   }
                }

                const body = {
                    role: values.role,
                    type: values.type,
                    description: values.description,
                    attachments: values.attachments
                };

                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/resource`,
                    body,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        }
                    }
                );

                if (response.status === 201) {
                    props.history.push('/admin/Resources');
                    openNotificationWithIcon(
                        'success',
                        'Resource Updated Successfully'
                    );
                } else {
                    openNotificationWithIcon('error', 'Opps! Something Wrong');
                }
            } catch (error) {
                console.log(error);
            }
        }
        //   onSubmit: (values) => {

        //     const body = JSON.stringify({
        //         role: values.role,
        //         description: values.description,
        //         type: values.type,
        //         attachments: values.attachments
        //     });

        //     var config = {
        //         method: 'post',
        //         url: process.env.REACT_APP_API_BASE_URL + '/resource',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${currentUser?.data[0]?.token}`
        //         },
        //         data: body
        //     };
        //     axios(config)
        //         .then(function (response) {
        //             if (response.status === 201) {
        //                 props.history.push('/admin/Resources/index');
        //                 openNotificationWithIcon(
        //                     'success',
        //                     'Resource Created Successfully'
        //                 );
        //             } else {
        //                 openNotificationWithIcon(
        //                     'error',
        //                     'Opps! Something Wrong'
        //                 );
        //             }
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        // }
    });

    // const handleFileChange = (e) => {
    //   formik.setFieldValue('file', e.target.files[0]);
    // };

    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <h3 className="mt-5 mb-5 ">
                            {' '}
                            Add New Resources Details{' '}
                        </h3>
                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <div className="create-ticket register-block">
                                    <FormGroup className="form-group" md={12}>
                                        <Label className="mb-2" htmlFor="role">
                                            Role
                                        </Label>
                                        <select
                                            name="role"
                                            id="role"
                                            className="form-control custom-dropdown"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.role}
                                            style={{
                                                color: formik.values.role
                                                    ? 'black'
                                                    : 'initial',
                                                fontWeight: formik.values.role
                                                    ? 'bold'
                                                    : 'normal'
                                            }}
                                        >
                                            <option value="" disabled={true}>
                                                Select role
                                            </option>
                                            <option value="mentor">
                                                mentor
                                            </option>
                                            <option value="student">
                                                student
                                            </option>
                                        </select>
                                        {formik.touched.role &&
                                            formik.errors.role && (
                                                <small className="error-cls">
                                                    {formik.errors.role}
                                                </small>
                                            )}

                                        <Label
                                            className="mb-2"
                                            htmlFor="description"
                                        >
                                            Details
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="description"
                                            name="description"
                                            placeholder="Please enter details"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.description}
                                        />
                                        {formik.touched.description &&
                                            formik.errors.description && (
                                                <small className="error-cls">
                                                    {formik.errors.description}
                                                </small>
                                            )}

                                        <Label className="mb-2" htmlFor="type">
                                            Type
                                        </Label>
                                        <select
                                            name="type"
                                            id="type"
                                            placeholder="Please select submission type"
                                            className="form-control custom-dropdown"
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                handleTypeChnage();
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.type}
                                            style={{
                                                color: formik.values.type
                                                    ? 'black'
                                                    : 'initial',
                                                fontWeight: formik.values.type
                                                    ? 'bold'
                                                    : 'normal'
                                            }}
                                        >
                                            <option disabled={true} value="">
                                                Select type
                                            </option>
                                            <option value="file">File</option>
                                            <option value="link">Link</option>
                                        </select>
                                        {formik.touched.type &&
                                            formik.errors.type && (
                                                <small className="error-cls">
                                                    {formik.errors.type}
                                                </small>
                                            )}

                                        {formik.values.type === 'file' && (
                                            <>
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="attachments"
                                                >
                                                    File
                                                </Label>
                                                <div className="d-flex align-items-center">
                                                    <InputBox
                                                        type="file"
                                                        id="attachments"
                                                        name="attachments"
                                                        style={{
                                                            display: 'none'
                                                        }}
                                                        accept=".png, .jpg, .jpeg,.pdf,video/mp4,video/x-m4v,.doc,.docx"
                                                        onChange={(e) =>
                                                            fileHandler(e)
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    />
                                                    <Button
                                                        label="Upload File "
                                                        btnClass="primary"
                                                        size="small"
                                                        onClick={() => {
                                                            document
                                                                .getElementById(
                                                                    'attachments'
                                                                )
                                                                .click();
                                                        }}
                                                    />
                                                    {formik.values
                                                        .attachments &&
                                                    formik.values.attachments
                                                        .name ? (
                                                        <span className="ml-2">
                                                            {
                                                                formik.values
                                                                    .attachments
                                                                    .name
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className="ml-2">
                                                            {formik
                                                                .initialValues
                                                                .attachments &&
                                                                formik
                                                                    .initialValues
                                                                    .attachments
                                                                    .name}
                                                        </span>
                                                    )}
                                                </div>
                                                {formik.touched.attachments &&
                                                    formik.errors
                                                        .attachments && (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .attachments
                                                            }
                                                        </small>
                                                    )}
                                            </>
                                        )}

                                        {formik.values.type === 'link' && (
                                            <FormGroup
                                                className="form-group"
                                                md={12}
                                            >
                                                <Label
                                                    className="mb-2"
                                                    htmlFor="attachments"
                                                >
                                                    Link
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="attachments"
                                                    id="attachments"
                                                    placeholder="Please enter the link"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .attachments
                                                    }
                                                />
                                                {formik.touched.attachments &&
                                                    formik.errors
                                                        .attachments && (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .attachments
                                                            }
                                                        </small>
                                                    )}
                                            </FormGroup>
                                        )}
                                    </FormGroup>
                                </div>

                                <hr className="mt-4 mb-4" />
                                <Row>
                                    <Col className="col-xs-12 col-sm-6">
                                        <div className="col-6">
                                            <Button
                                                label="Discard"
                                                size="small"
                                                btnClass="primary"
                                                type="cancel"
                                                // onClick={() =>
                                                //     history.push(
                                                //         'admin/Resources/index'
                                                //     )
                                                // }
                                                onClick={() =>
                                                    props.history.push(
                                                        '/admin/Resources'
                                                    )
                                                }
                                            />
                                        </div>
                                    </Col>
                                    <Col className="submit-btn col-xs-12 col-sm-6">
                                        <Button
                                            label="Submit details"
                                            type="submit"
                                            btnClass={
                                                // !formik.dirty && !formik.isValid
                                                //     ? 'default'
                                                //     : 'primary'
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

export default CreateResource;
