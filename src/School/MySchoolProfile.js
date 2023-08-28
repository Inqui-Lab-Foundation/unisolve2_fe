/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable indent */
import React, { useLayoutEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardText } from 'reactstrap';
import 'sweetalert2/src/sweetalert2.scss';
import Layout from './Layout.jsx';
import { getCurrentUser } from '../helpers/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getSchoolByID } from '../School/store/school/actions';
import { Button } from '../stories/Button';
import { useHistory } from 'react-router-dom';
const MySchoolProfile = () => {
    // here we can see all the details of details of teacher //
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const school = useSelector((state) => state.school);

    const dispatch = useDispatch();
    // console.log(school);
    useLayoutEffect(() => {
        if (currentUser?.data[0]?.organization_id) {
            dispatch(getSchoolByID(currentUser?.data[0]?.organization_id));
        }
    }, [currentUser?.data[0]?.organization_id]);
    const handleEdit = () => {
        // alert('hii');
        history.push({
            pathname: '/EditSchoolProfile',
            item: {
                principal_name: school?.school.principal_name,
                principal_mobile: school?.school.principal_mobile,
                city: school?.school.city,
                organization_name: school?.school.organization_name,
                category: school?.school.category,
                district: school?.school.district,
                organization_code: school?.school.organization_code,
                organization_id: school?.school.organization_id,
                state: school?.school.state
            }
        });
        // console.log(item, 'item');
    };
    return (
        <Layout>
            <Container className="MyProfile pt-3 pt-xl-5 mb-50">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <div className="d-flex justify-content-between mb-3">
                            <h2>My Profile</h2>
                            <Button
                                onClick={() => handleEdit()}
                                size="small"
                                label={'Edit'}
                                btnClass={'primary'}
                            ></Button>
                        </div>
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
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>UDISE</b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .organization_code
                                                                            ? school
                                                                                  ?.school
                                                                                  .organization_code
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        School
                                                                        Name
                                                                    </b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .organization_name
                                                                            ? school
                                                                                  ?.school
                                                                                  .organization_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Name
                                                                    </b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .principal_name
                                                                            ? school
                                                                                  ?.school
                                                                                  .principal_name
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Email
                                                                    </b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .principal_email
                                                                            ? school
                                                                                  ?.school
                                                                                  .principal_email
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Principal
                                                                        Mobile
                                                                    </b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .principal_mobile
                                                                            ? school
                                                                                  ?.school
                                                                                  .principal_mobile
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>City</b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .city
                                                                            ? school
                                                                                  ?.school
                                                                                  .city
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        Category
                                                                    </b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .category
                                                                            ? school
                                                                                  ?.school
                                                                                  .category
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>
                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        District
                                                                    </b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .district
                                                                            ? school
                                                                                  ?.school
                                                                                  .district
                                                                            : '-'}
                                                                    </b>
                                                                </Col>
                                                            </Row>

                                                            <Row className="pt-3 pb-3">
                                                                <Col
                                                                    xs={5}
                                                                    sm={5}
                                                                    md={5}
                                                                    xl={5}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>State</b>
                                                                </Col>
                                                                <Col
                                                                    xs={1}
                                                                    sm={1}
                                                                    md={1}
                                                                    xl={1}
                                                                >
                                                                    :
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    sm={6}
                                                                    md={6}
                                                                    xl={6}
                                                                    className="my-auto profile-detail"
                                                                >
                                                                    <b>
                                                                        {school
                                                                            ?.school
                                                                            .state
                                                                            ? school
                                                                                  ?.school
                                                                                  .state
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

export default MySchoolProfile;
