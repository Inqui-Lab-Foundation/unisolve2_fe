import React from 'react';
import Layout from '../Layout';
import { Container, Row, Col, Card, Label, Form } from 'reactstrap';
import { Button } from '../../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';

const CreateTranslation = (props) => {
    const { t } = useTranslation();
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();

    // const [editorStateOfFromKey, setEditorStateOfFromKey] = useState(() =>
    //     EditorState.createEmpty()
    // );
    // const [editorStateOfToValue, setEditorStateOfToValue] = useState(() =>
    //     EditorState.createEmpty()
    // );

    // const handleEditorChangeOfFromKey = (state) => {
    //     setEditorStateOfFromKey(state);
    //     formik.setFieldValue(
    //         'from_key',
    //         state.getCurrentContent().getPlainText()
    //     );
    // };

    // const handleEditorChangeOfToValue = (state) => {
    //     setEditorStateOfToValue(state);
    //     formik.setFieldValue(
    //         'to_value',
    //         state.getCurrentContent().getPlainText()
    //     );
    // };

    const formik = useFormik({
        initialValues: {
            from_locale: 'en',
            key: '',
            to_locale: t('translation.tamil_to'),
            value: ''
        },

        validationSchema: Yup.object({
            from_locale: Yup.string().required('required'),
            key: Yup.string().required('required'),
            to_locale: Yup.string().required('required'),
            value: Yup.string().required('required')
        }),

        onSubmit: (values) => {
            const body = JSON.stringify({
                from_locale: values.from_locale,
                key: values.key,
                to_locale: values.to_locale,
                value: values.value
            });

            var config = {
                method: 'post',
                url: process.env.REACT_APP_API_BASE_URL + '/translations',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.data[0]?.token}`
                },
                data: body
            };
            axios(config)
                .then(function (response) {
                    if (response.status === 201) {
                        props.history.push('/admin/translation');
                        openNotificationWithIcon(
                            'success',
                            'Translation Create Successfully'
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
                                <h2>Create Translation</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Card className="mt-5 mb-5 p-5">
                            <Col>
                                <Col>
                                    <Label>English Content :-</Label>
                                </Col>
                            </Col>
                            <textarea
                                className="form-control form-control-lg"
                                rows="4"
                                name="key"
                                value={formik.values.key}
                                onChange={formik.handleChange}
                                style={{ fontSize: '2rem' }}
                            ></textarea>

                            <Col className="form-group" md={12}>
                                {formik.errors.key ? (
                                    <small className="error-cls">
                                        {formik.errors.key}
                                    </small>
                                ) : null}
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
                                    rows="4"
                                    name="value"
                                    value={formik.values.value}
                                    onChange={formik.handleChange}
                                    style={{ fontSize: '2rem' }}
                                ></textarea>
                                {formik.errors.value ? (
                                    <small className="error-cls">
                                        {formik.errors.value}
                                    </small>
                                ) : null}
                            </Col>
                        </Card>
                    </Row>
                    <Row>
                        <hr className="my-5 w-100 mb-4 clearfix" />
                        <div className="row mb-4 justify-content-between">
                            <div className="col-6">
                                <Button
                                    label="Discard"
                                    size="small"
                                    btnClass="primary"
                                    type="cancel"
                                    onClick={() => history.goBack()}
                                />
                            </div>
                            <div className="col-6 text-right">
                                <Button
                                    label="Save"
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

export default CreateTranslation;
