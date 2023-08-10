import '../Student/Pages/Student.scss';
import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    CardText
} from 'reactstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import withReactContent from 'sweetalert2-react-content';
import { IoIosArrowBack } from 'react-icons/io';
import ChangePSWModal from './ChangePSWModal';
import { Link } from 'react-router-dom';

import Layout from './Layout';
const MySwal = withReactContent(Swal);

const onCancel = () => {
    Swal.close();
};
const btnSubmit = () => {
    Swal.close();
};

const MyProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));

    const [profileAction, setProfileAction] = useState(true);
    const showFormModal = (values) => {
        return new Promise((resolve, reject) => {
            MySwal.fire({
                reverseButtons: false,
                showCloseButton: true,
                allowOutsideClick: false,
                html: (
                    <ChangePSWModal
                        values={values}
                        onSubmit={(values) => {
                            resolve(values);
                            Swal.close();
                        }}
                        onCancel={onCancel}
                        btnSubmit={btnSubmit}
                    />
                ),
                onClose: () => reject(),
                showConfirmButton: false
            });
        });
    };
    function showModal() {
        showFormModal({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            lastName: ''
        })
            .then((values) => console.log(values))
            .catch(() => console.log('Modal closed'));
    }

    useEffect(() => {
        const search = window.location.search;

        if (search === '?id=teams') {
            setProfileAction(false);
        }
    });

    return (
        <Layout>
            <Container className="MyProfile pt-3 pt-xl-5 mb-50">
                {/* <UsersPage /> */}
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        {profileAction ? (
                            <h3 className="mb-5">My Profile</h3>
                        ) : (
                            <Link
                                to="/teams"
                                className="color-grey-1 mb-3 d-block"
                            >
                                <IoIosArrowBack />
                                Go Back
                            </Link>
                        )}

                        <Row>
                            <Col md={12}>
                                <Card className="w-100  mb-5 p-4">
                                    <CardBody>
                                        <Row>
                                            <Col
                                                md={8}
                                                className="border-right my-auto "
                                            >
                                                <Row>
                                                    <Col
                                                        md={7}
                                                        className="my-auto profile-detail"
                                                    >
                                                        {' '}
                                                        <CardText>
                                                            <span>Name:</span>{' '}
                                                            <b>
                                                                {
                                                                    currentUser
                                                                        .data[0]
                                                                        .full_name
                                                                }
                                                            </b>
                                                        </CardText>
                                                        <CardText>
                                                            <span>Email:</span>{' '}
                                                            <b>
                                                                {
                                                                    currentUser
                                                                        .data[0]
                                                                        .name
                                                                }
                                                            </b>
                                                        </CardText>
                                                        <CardText>
                                                            <span>state :</span>{' '}
                                                            <b>Maldives</b>
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md={12}></Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col md={6}>
                                                <CardText>
                                                    <CardTitle className="pb-2">
                                                        Password
                                                    </CardTitle>
                                                </CardText>
                                                <CardText>
                                                    <div
                                                        onClick={showModal}
                                                        className="my-auto pt-0 text-link text-primary"
                                                    >
                                                        Change Password
                                                    </div>
                                                </CardText>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default MyProfile;
