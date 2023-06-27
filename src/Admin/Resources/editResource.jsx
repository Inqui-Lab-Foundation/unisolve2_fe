/* eslint-disable indent */
import React from 'react';
// import { Select } from 'antd';
import Layout from '../../Admin/Layout';
import { Row, Col, FormGroup, Label, Form } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../stories/Button';
import { useFormik} from 'formik';
import { InputBox } from '../../stories/InputBox/InputBox';
// import { Select } from 'antd';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import * as Yup from 'yup';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues';

const EditResource = (props) => {
    const resID = JSON.parse(localStorage.getItem('resID'));
    // resID = evaluation_process_id //
    const inputDICE = {
        type: 'text',
        className: 'defaultInput'
    };

    // const typeOptions = [
    //     { value: 'file', label: 'File' },
    //     { value: 'link', label: 'Link' },
    // ];

    const headingDetails = {
        title: 'Edit Resource Details',

        options: [
            {
                title: 'Resource',
                path: '/admin/Resources'
            },
            {
                title: 'Edit Resource',
                path: '/admin/Resources/editResource'
            }
        ]
    };
    const formik = useFormik({
        initialValues: {
            role: resID && resID.role,
            details: resID && resID.details,
            type: resID && resID.type,
            file: resID && resID.file && resID.file.name,
            link: resID && resID.link
            // status: 'ACTIVE'
        },
        validationSchema: Yup.object({
            role: Yup.string()
                .optional()
                .required('Role is Required'),
            details: Yup.string()
                .optional()
                // .matches(phoneRegExp, 'Enter only numeric Values')
                // .positive()
                // .integer()
                // .max(2)
                .required('Details is Required'),
            type: Yup.string()
                .optional()
                .oneOf(['file', 'link'], 'Submission type is Required'),
            file: Yup.mixed().when('type', {
                is: 'file',
                then: Yup.mixed().required('File is Required'),
                otherwise: Yup.mixed().nullable()
            }),
            link: Yup.string().when('type', {
                is: 'link',
                then: Yup.string().required('Link is Required'),
                otherwise: Yup.string().nullable()
            })
        }),
        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            await axios
                .put(
                    `${URL.updateResource + resID.Resource_id}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((response) => {
                    if (response.status == 200) {
                        openNotificationWithIcon(
                            'success',
                            'Resource Updated Successfully'
                        );
                        props.history.push('/admin/Resources');
                    }
                })
                .catch((err) => {
                    return err.response;
                });
        }
    });

    // const [selectedType, setSelectedType] = React.useState('');
    // const fileInputRef = React.useRef(null);

    // const handleFileChange = (e) => {
    //     formik.setFieldValue('file', e.target.files[0]);
    //   };

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
                                            htmlFor="role"
                                            // style={{ fontSize: 15 }}
                                        >
                                            Role
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="role"
                                            name="role"
                                            placeholder="Please enter Role "
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.role}
                                        />
                                        {formik.touched.role &&
                                        formik.errors.role ? (
                                            <small className="error-cls">
                                                {formik.errors.role}
                                            </small>
                                        ) : // eslint-disable-next-line indent
                                        null}
                                        <Label
                                            className="mb-2"
                                            htmlFor="details" 
                                        >
                                            Details
                                        </Label>
                                        <InputBox
                                            {...inputDICE}
                                            id="details"
                                            name="Details"
                                            placeholder="Please enter details "
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.details}
                                        />
                                        {formik.touched.details &&
                                        formik.errors.details ? (
                                            <small className="error-cls">
                                                {formik.errors.details}
                                            </small>
                                        ) : null}
                                        
                                        {/* <Label className="mb-2" htmlFor="type">
                                            Type
                                        </Label>
                                        <div>
                                            <Select
                                                id="type"
                                                name="type"
                                                options={typeOptions}
                                                value={formik.values.type}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        
                                        {formik.touched.type && formik.errors.type ? (
                                            <small className="error-cls">{formik.errors.type}</small>
                                        ) : null} */}

                                        {/* <Label className="mb-2" htmlFor="type">
                                            Type
                                        </Label>
                                        <div>
                                            <Select
                                            id="type"
                                            name="type"
                                            options={typeOptions}
                                            value={formik.values.type}
                                            onChange={(selectedOption) => {
                                                const selectedType = selectedOption.value;
                                                formik.setFieldValue("type", selectedType);
                                                formik.setFieldValue("file", ""); // Clear the file field when type changes
                                                formik.setFieldValue("link", ""); // Clear the link field when type changes
                                                // Reset the input values based on the selected type
                                                if (selectedType === "file") {
                                                formik.setFieldValue("link", "");
                                                } else if (selectedType === "link") {
                                                formik.setFieldValue("file", "");
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        {formik.touched.type && formik.errors.type && (
                                            <small className="error-cls">{formik.errors.type}</small>
                                        )}

                                        {formik.values.type === "file" && (
                                            <>
                                            

                                            <Label className="mb-2" htmlFor="file">
                                                File
                                            </Label>
                                            <div className="d-flex align-items-center">
                                                <InputBox
                                                type="file"
                                                id="file"
                                                name="file"
                                                accept=".pdf,.doc,.docx" // Specify the file formats allowed
                                                style={{ display: "none" }}
                                                onChange={(event) => {
                                                    formik.setFieldValue("file", event.target.files[0]);
                                                }}
                                                onBlur={formik.handleBlur}
                                                />
                                                <Button
                                                label="Upload File"
                                                onClick={() => {
                                                    document.getElementById("file").click();
                                                }}
                                                />
                                                {formik.values.file && (
                                                <span className="ml-2">{formik.values.file.name}</span>
                                                )}
                                            </div>
                                            {formik.touched.file && formik.errors.file && (
                                                <small className="error-cls">{formik.errors.file}</small>
                                            )}

                                            
                                            </>
                                        )}
                                        {formik.values.type === "link" && (
                                            <>
                                            

                                            <Label className="mb-2" htmlFor="link">
                                                Link
                                            </Label>
                                            <InputBox
                                                type="text"
                                                id="link"
                                                name="link"
                                                placeholder="Enter link"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.link}
                                            />
                                            {formik.touched.link && formik.errors.link && (
                                                <small className="error-cls">{formik.errors.link}</small>
                                            )}

                                            
                                            </>
                                        )} */}

                                        <Label className="mb-2" htmlFor="type">
                                            Type
                                        </Label>
                                        <select
    name="type"
    id="type"
    className="form-control custom-dropdown"
    value={formik.values.type}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
>
    {/* <option value="">Select type</option> */}
    <option value="file">File</option>
    <option value="link">Link</option>
</select>
                                        {formik.touched.type && formik.errors.type && (
                                        <small className="error-cls">{formik.errors.type}</small>
                                        )}

{formik.values.type === "file" && (
    <>
        <Label className="mb-2" htmlFor="file">
            File
        </Label>
        <div className="d-flex align-items-center">
            <InputBox
                type="file"
                id="file"
                name="file"
                // accept=".pdf,.doc,.docx" // Specify the file formats allowed
                style={{ display: "none" }}
                onChange={(event) => {
                    formik.setFieldValue("file", event.target.files[0]);
                }}
                onBlur={formik.handleBlur}
            />
            <Button
                label="Upload File"
                onClick={() => {
                    document.getElementById("file").click();
                }}
            />
            {formik.values.file && formik.values.file.name ? (
                <span className="ml-2">
                    {formik.values.file.name}
                </span>
            ) : (
                <span className="ml-2">
                    {formik.initialValues.file && formik.initialValues.file.name}
                </span>
            )}
        </div>
        {formik.touched.file && formik.errors.file && (
            <small className="error-cls">{formik.errors.file}</small>
        )}
    </>
)}


{formik.values.type === "link" && (
    <FormGroup className="form-group" md={12}>
        <Label className="mb-2" htmlFor="link">
            Link
        </Label>
        <InputBox
            type="text"
            id="link"
            name="link"
            placeholder="Enter link"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.link}
        />
        {formik.touched.link && formik.errors.link && (
            <small className="error-cls">{formik.errors.link}</small>
        )}
    </FormGroup>
)}

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
                                                    '/admin/Resources'
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
export default EditResource;