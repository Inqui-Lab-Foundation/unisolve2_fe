import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col, Card, Label, Form } from 'reactstrap';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import { useTranslation } from 'react-i18next';

const EditTranslation = (props) => {
    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const translationData =
        (history && history.location && history.location.item) || {};

    const [editorStateOfToValue, setEditorStateOfToValue] = useState();

    useEffect(() => {
        setEditorStateOfToValue(translationData && translationData.value);
    }, []);

    const handleEditorChangeOfToValue = (state) => {
        // console.log(state.target.value);
        setEditorStateOfToValue(state.target.value);
        formik.setFieldValue('value', state.target.value);
    };

    const formik = useFormik({
        initialValues: {
            from_locale: translationData && translationData.from_locale,
            key: translationData && translationData.key,
            to_locale: translationData && translationData.to_locale,
            value: translationData && translationData.value
        },

        validationSchema: Yup.object({
            value: Yup.string().required('required')
        }),

        onSubmit: (values) => {
            const body = JSON.stringify({
                from_locale: values.from_locale,
                key: values.key,
                to_locale: values.to_locale,
                value: values.value,
                status: 'ACTIVE'
            });

            var config = {
                method: 'put',
                url:
                    process.env.REACT_APP_API_BASE_URL +
                    '/translations/' +
                    translationData.translation_id,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 200) {
                        props.history.push('/admin/translation');
                        openNotificationWithIcon(
                            'success',
                            'Translation Update Successfully'
                        );
                    } else {
                        openNotificationWithIcon(
                            'error',
                            'Opps! Something Wrong'
                        );
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });

    return (
        <Layout>
            <Container className="mt-5 pt-5 mb-5">
                <Form onSubmit={formik.handleSubmit} isSubmitting>
                    <Row>
                        <Col>
                            <div>
                                <h2>Edit Translation</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Card className="mt-5 mb-5 p-5">
                            <Col>
                                <Label>English Content :-</Label>
                            </Col>

                            <Col className="form-group" md={12}>
                                {/* <textarea
                                    className="form-control form-control-lg"
                                    rows="3"
                                    value={formik.values.from_key}
                                    style={{ fontSize: '2rem' }}
                                ></textarea> */}
                                <p style={{ fontSize: '2rem' }} className="p-3">
                                    {formik.values.key}
                                </p>
                            </Col>
                        </Card>
                    </Row>
                    <Row>
                        <Card className="mt-5 mb-5 p-5">
                            <Col>
                                <Label>{t('translation.tamil')}</Label>
                            </Col>

                            <Col className="form-group" md={12}>
                                <textarea
                                    className="form-control form-control-lg"
                                    rows="5"
                                    value={editorStateOfToValue}
                                    onChange={(e) =>
                                        handleEditorChangeOfToValue(e)
                                    }
                                    style={{ fontSize: '2rem' }}
                                ></textarea>
                                {formik.errors.to_value ? (
                                    <small className="error-cls">
                                        {formik.errors.value}
                                    </small>
                                ) : null}
                            </Col>
                        </Card>
                    </Row>
                    <Row>
                        <div className="row mb-4 justify-content-between">
                            <div className="col-6">
                                <Button
                                    label="Discard"
                                    size="small"
                                    btnClass="primary"
                                    type="cancel"
                                    onClick={() =>
                                        history.push('/admin/translation')
                                    }
                                />
                            </div>
                            <div className="col-6 text-right">
                                <Button
                                    label="Update"
                                    type="submit"
                                    btnClass={
                                        !(formik.dirty && formik.isValid)
                                            ? 'default'
                                            : 'primary'
                                    }
                                    size="small"
                                    disabled={!(formik.dirty && formik.isValid)}
                                />
                            </div>
                        </div>
                    </Row>
                </Form>
            </Container>
        </Layout>
    );
};

export default EditTranslation;
