/* eslint-disable indent */
import React, { useLayoutEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    // CardTitle,
    CardBody,
    CardText
    // CardImg
} from 'reactstrap';
//import { IoIosArrowBack } from 'react-icons/io';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
// import ChangePSWModal from './ChangePSWModal';
// import withReactContent from 'sweetalert2-react-content';

//import { Link } from 'react-router-dom';
//import { BreadcrumbTwo } from '../stories/BreadcrumbTwo/BreadcrumbTwo.jsx';

import Layout from './Layout.jsx';
import { getCurrentUser } from '../helpers/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherByID } from '../redux/actions';
// import moment from 'moment';

// const MySwal = withReactContent(Swal);

// const onCancel = () => {
//     Swal.close();
// };

// const btnSubmit = () => {
//     Swal.close();
// };

// const showFormModal = (values) => {
//     return new Promise((resolve, reject) => {
//         MySwal.fire({
//             title: "Enter values",
//             reverseButtons: false,
//             showCloseButton: true,
//             allowOutsideClick: false,
//             html: (
//                 <ChangePSWModal
//                     values={values}
//                     onSubmit={(values) => {
//                         resolve(values);
//                         Swal.close();
//                     }}
//                     onCancel={onCancel}
//                     btnSubmit={btnSubmit}
//                 />
//             ),
//             onClose: () => reject(),
//             showConfirmButton: false
//         });
//     });
// };

const MyProfile = () => {
    // here we can see all the details of details of teacher //
    const currentUser = getCurrentUser('current_user');
    //const [profileAction, setProfileAction] = useState(true);
    const { teacher } = useSelector((state) => state.teacher);
    const dispatch = useDispatch();

    // function showModal() {
    //     showFormModal({
    //         oldPassword: '',
    //         newPassword: '',
    //         confirmPassword: '',
    //         lastName: ''
    //     })
    //         .then((values) => console.log(values))
    //         .catch(() => console.log('Modal closed'));
    // }
    useLayoutEffect(() => {
        dispatch(getTeacherByID(currentUser?.data[0]?.mentor_id));
    }, [currentUser?.data[0]?.mentor_id]);
    // useEffect(() => {
    //     const search = window.location.search;
    //     // if (search === '?id=teams') {
    //     //     setProfileAction(false);
    //     // }
    // });
    // const headingDetails = {
    //     title: 'My Profile'

    //     // options: [
    //     //     {
    //     //         title: 'Home',
    //     //         path: '/teacher/dashboard'
    //     //     },
    //     //     {
    //     //         title: 'My Profile',
    //     //         path: '/teacher/my-profile'
    //     //     }
    //     // ]
    // };

    return (
        <Layout>
            <Container className="MyProfile pt-3 pt-xl-5 mb-50">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <h2>My Profile</h2>
                        {/* {profileAction ? (
                            <BreadcrumbTwo {...headingDetails} />
                        ) 
                        : (
                            <Link
                                to="/teams"
                                className="color-grey-1 mb-3 d-block"
                            >
                                <IoIosArrowBack />
                                Go Back
                            </Link>
                        )
                        } */}

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
                                                        className="my-auto profile-detail w-100"
                                                    >
                                                        <CardText>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>Name</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.full_name
                                                                            ? teacher?.full_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>Email</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.username_email
                                                                            ? teacher?.username_email
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            {/* <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Mobile
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.mobile
                                                                            ? teacher?.mobile
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row> */}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>

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
                                                        className="my-auto profile-detail w-100"
                                                    >
                                                        <CardText>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>UDISE</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher?.organization_code
                                                                            ? teacher?.organization_code
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        School
                                                                        Name
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.organization_name
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.organization_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Name
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.principal_name
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.principal_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Email
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.principal_email
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.principal_email
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            {/* <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Mobile
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.principal_mobile
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.principal_mobile
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row> */}

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>City</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.city
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.city
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        District
                                                                    </b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.district
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.district
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    md={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>State</b>
                                                                </Col>
                                                                <Col md={1}>
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    md={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {teacher
                                                                            .organization
                                                                            ?.state
                                                                            ? teacher
                                                                                  .organization
                                                                                  ?.state
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                        </CardText>
                                                    </Col>
                                                </Row>
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
