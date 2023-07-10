/* eslint-disable indent */
import React, { useState } from 'react';
import { Modal, Form, FormGroup } from 'react-bootstrap';
import { Label } from 'reactstrap';
import { InputBox } from '../stories/InputBox/InputBox';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { URL, KEY } from '../constants/defaultValues';
import { getNormalHeaders, openNotificationWithIcon } from '../helpers/Utils';
import axios from 'axios';
function ForgotPassword(props) {
    const [errorMsg, seterrorMsg] = useState('');
    const inputMob = {
        type: 'text',
        className: 'defaultInput'
    };
    const handleClose = () => {
        props.setShow(false);
    };
    const formik = useFormik({
        initialValues: {
            email: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().required('Required email id')
        }),

        onSubmit: async (values) => {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            await axios
                .put(
                    `${URL.putResetPassword}`,
                    JSON.stringify(values, null, 2),
                    axiosConfig
                )
                .then((checkOrgRes) => {
                    if (checkOrgRes.status == 202) {
                        props.setShow(false);
                        openNotificationWithIcon(
                            'success',
                            'Temporary Password Sent Successfully'
                        );
                    }
                })
                .catch((err) => {
                    seterrorMsg(err.response.data.message);
                    return err.response;
                });
        }
    });
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-evaluator ChangePSWModal teacher-register-modal"
            backdrop="static"
        >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="w-100 d-block text-center"
                >
                    Forgot Password
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form
                    className="form-row row mb-5 mt-3 py-5"
                    onSubmit={formik.handleSubmit}
                    isSubmitting
                >
                    <FormGroup className="form-group" md={12}>
                        <Label className="mb-2" htmlFor="email">
                            Enter Email Address
                        </Label>
                        <InputBox
                            {...inputMob}
                            id="email"
                            name="email"
                            placeholder=" Enter the Registered email "
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            style={{ borderRadius: '0'}}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <small className="error-cls">
                                {formik.errors.email}
                            </small>
                        ) : null}
                    </FormGroup>
                    {errorMsg === 'User not found' && (
                        <b className="text-danger m-3">
                            Please enter registered email ID
                        </b>
                    )}
                    <div className="mt-3">
                        <Button
                            label="Generate Password"
                            btnClass={
                                !(formik.dirty && formik.isValid)
                                    ? 'default'
                                    : 'primary'
                            }
                            size="large "
                            type="submit"
                            disabled={!(formik.dirty && formik.isValid)}
                            style={{ borderRadius: '0' }}
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ForgotPassword;
