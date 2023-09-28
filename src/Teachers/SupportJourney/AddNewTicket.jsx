/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import { Row, Col, Form, Label, FormGroup, Card, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './style.scss';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { DropDownWithSearch } from '../../stories/DropdownWithSearch/DropdownWithSearch';
import { TextArea } from '../../stories/TextArea/TextArea';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useDispatch } from 'react-redux';
import { createSupportTickets } from '../store/mentors/actions';
import { useHistory } from 'react-router-dom';
import logout from '../../assets/media/logout.svg';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useTranslation } from 'react-i18next';

const AddNewTicket = (props) => {
    // here we can add new support tickets //
    // console.log(props);
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

   

    const formik = useFormik({
        initialValues: {
            ticket: '',
            ticketDetails: ''
        },

        validationSchema: Yup.object({
            ticket: Yup.string().required('Required'),

            ticketDetails: Yup.string().required('Required')
        }),

        onSubmit: (values) => {
            const query_category = values.ticket;
            const query_details = values.ticketDetails;

            const body = JSON.stringify({
                query_category: query_category,
                query_details: query_details
            });

            dispatch(createSupportTickets(body, history));
        }
    });
    const handleDiscard = () => {
        // alert('hii');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'You are attempting to Discard the Support Ticket',
                text: 'Are you sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: t('general_req.btn_cancel'),
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(props.history.push('/teacher/support-journey'));
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        ' Discard the Support Ticket is cancelled',
                        'error'
                    );
                }
            })
            .catch((err) => console.log(err.response));
    };
    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <h3 className="mb-5"> Add New Query Details</h3>

                        <div>
                            <Form onSubmit={formik.handleSubmit} isSubmitting>
                                <Card className="aside p-4">
                                    <CardBody className="px-0">
                                        <FormGroup className="form-row row">
                                            <Col
                                                className="form-group mb-5  mb-md-0"
                                                md={12}
                                            >
                                                <Label className="mb-2">
                                                    Select Category
                                                    <span
                                                        required
                                                        // style={{ color: 'red' }}
                                                        className="p-1"
                                                    >
                                                        *
                                                    </span>
                                                </Label>

                                                <Col
                                                    className="form-group"
                                                    md={12}
                                                >
                                                  
                                                    <select
                                                        name="ticket"
                                                        id="ticket"
                                                        className="form-control custom-dropdown"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values.ticket
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled={true}
                                                        >
                                                            Select Category
                                                        </option>
                                                        <option value="General">
                                                            General
                                                        </option>
                                                        <option value="Technical">
                                                            Technical
                                                        </option>
                                                        <option value="Suggestion">
                                                            Suggestion
                                                        </option>
                                                    </select>
                                                    {formik.errors.ticket ? (
                                                        <small className="error-cls">
                                                            {
                                                                formik.errors
                                                                    .ticket
                                                            }
                                                        </small>
                                                    ) : null}
                                                </Col>
                                            </Col>
                                        </FormGroup>
                                    </CardBody>
                                    <div className="create-ticket1 register-block1">
                                        <Row>
                                            <Col md={12}>
                                                <Label
                                                    className="name-req "
                                                    htmlFor="ticket Details"
                                                >
                                                    Details
                                                    <span
                                                        required
                                                        // style={{ color: 'red' }}
                                                        className="p-1"
                                                    >
                                                        *
                                                    </span>
                                                </Label>
                                                <TextArea
                                                    className={'defaultInput'}
                                                    placeholder="Enter Details"
                                                    id="ticketDetails"
                                                    name="ticketDetails"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values
                                                            .ticketDetails
                                                    }
                                                />

                                                {formik.touched.ticketDetails &&
                                                formik.errors.ticketDetails ? (
                                                    <small className="error-cls">
                                                        {
                                                            formik.errors
                                                                .ticketDetails
                                                        }
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>

                                <hr className="mt-4 mb-4"></hr>
                                <Row>
                                    <Col className="col-xs-12 col-sm-6">
                                        <Button
                                            label="Discard"
                                            btnClass="secondary"
                                            size="small"
                                            onClick={handleDiscard}
                                            // onClick={() =>
                                            //     props.history.push(
                                            //         '/teacher/support-journey'
                                            //     )
                                            // }
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
                                            disabled={
                                                !(
                                                    formik.dirty &&
                                                    formik.isValid
                                                )
                                            }
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

export default withRouter(AddNewTicket);
