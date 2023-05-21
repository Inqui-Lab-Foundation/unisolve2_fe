/* eslint-disable indent */
import React from 'react';
import Layout from '../../Admin/Layout';
import { useHistory, withRouter } from 'react-router-dom';
import { Container, Row, Card, CardBody, CardText } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../stories/Button';
import {
    // getNormalHeaders,
    getCurrentUser,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';

const CommonUserProfile = (props) => {
    // console.log('props', props);
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');

    const headingDetails = {
        title: 'User List Details',

        options: [
            {
                title: 'User List',
                path: '/admin/userlist'
            },
            {
                title: 'User List Profile',
                path: '/admin/userlist'
            }
        ]
    };

    const handleViewBack = () => {
        history.push({
            pathname: '/admin/userlist'
        });
        localStorage.setItem('dist', JSON.stringify(props.location.dist));
        localStorage.setItem('num', JSON.stringify(props.location.num));
        // localStorage.setItem(
        //     'mentor',
        //     JSON.stringify(mentor.organization_code)
        // );
    };
    const handleReset = () => {
        // where we can reset the password  as diesCode //
        
        const body = JSON.stringify({
            organization_code:
                props.location.data && props.location.data?.organization_code,
            mentor_id: props.location.data && props.location.data.mentor_id,
            otp: false
        });
        var config = {
            method: 'put',
            url: process.env.REACT_APP_API_BASE_URL + '/mentors/resetPassword',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                if (response.status === 202) {
                    openNotificationWithIcon(
                        'success',
                        'Reset Password Successfully Update!',
                        ''
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleEdit = () => {
        // where we can edit  the users data //
        history.push({
            pathname: '/admin/edit-user-profile',
            data: {
                username: props.location.data && props.location.data.username,
                full_name: props.location.data && props.location.data.full_name,
                organization_code:
                    props.location.data &&
                    props.location.data?.organization_code,
                mentor_id: props.location.data && props.location.data.mentor_id
                // where: 'Dashbord'
            }
        });
    };

    return (
        <Layout>
            <Container className="mt-5 pt-5 dynamic-form">
                <Row>
                    <div className="col-6">
                        <BreadcrumbTwo {...headingDetails} />
                    </div>
                    <div className="col-6 text-end">
                        <Button
                            btnClass="btn btn-primary"
                            size="small"
                            label="Edit"
                            onClick={handleEdit}
                        />
                        <Button
                            btnClass="btn btn-success"
                            size="small"
                            label="Reset"
                            onClick={handleReset}
                        />
                        {/* <Button
                            btnClass="btn btn-info"
                            size="small"
                            label="Download"
                        /> */}
                        {/* <Button
                            btnClass="btn btn-success"
                            size="small"
                            label="View Details"
                        /> */}
                        {/* <Button
                            btnClass="btn btn-danger"
                            size="small"
                            label="Delete"
                        /> */}
                        <Button
                            btnClass={'primary'}
                            size="small"
                            // onClick={() => history.push('/admin/userlist')}
                            label="Back"
                            onClick={handleViewBack}
                        />
                    </div>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            {/* <h2 className="mb-4">Personal Details</h2> */}

                            <CardText>
                                <span className="mx-3">
                                    <b>Name:</b>
                                </span>
                                <b>
                                    {props.location.data &&
                                    props.location.data.full_name
                                        ? props.location.data &&
                                          props.location.data.full_name
                                        : '-'}
                                </b>
                            </CardText>
                            {/* <CardText>
                                <span className="mx-3">
                                    <b>Mobile:</b>
                                </span>
                                <b>
                                    {props.location.data &&
                                    props.location.data.mobile
                                        ? props.location.data &&
                                          props.location.data.mobile
                                        : '-'}
                                </b>
                            </CardText> */}
                            <CardText>
                                <span className="mx-3">
                                    <b>Email:</b>
                                </span>
                                <b>
                                    {/* {props.location.data.organization &&
                                    props.location.data.organization.username
                                        ? props.location.data.organization &&
                                          props.location.data.organization
                                              .username
                                        : '-'} */}
                                    {props.location.data &&
                                    props.location.data?.username
                                        ? props.location.data &&
                                          props.location.data?.username
                                        : '-'}
                                </b>
                            </CardText>
                            {/* <Table bordered className="w-25">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="w-25">
                                            ID
                                        </th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.mentor_id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">NAME</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.full_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">MOBILE</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.mobile}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">STATUS</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.status}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CITY</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">DISTRICT</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.district}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">STATE</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">COUNTRY</th>
                                        <td>
                                            {props.location.data &&
                                                props.location.data.country}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table> */}
                        </CardBody>
                    </Card>
                </Row>
                <Row className="my-5">
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Institution Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b>Unique Code:</b>
                                </span>
                                <b>
                                    {props.location.data &&
                                    props.location.data?.organization_code
                                        ? props.location.data &&
                                          props.location.data?.organization_code
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>School Name:</b>
                                </span>

                                <b>
                                    {props.location.data &&
                                    props.location.data.organization &&
                                    props.location.data.organization
                                        .organization_name
                                        ? props.location.data.organization
                                              .organization_name
                                        : '-'}

                                    {/* {props.location.data &&
                                    props.location.data?.organization_name
                                        ? props.location.data &&
                                          props.location.organization
                                              ?.organization_name
                                        : '-'} */}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>City:</b>
                                </span>
                                <b>
                                    {props.location.data &&
                                    props.location.data?.city
                                        ? props.location.data &&
                                          props.location.name?.city
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>District:</b>
                                </span>
                                <b>
                                    {props.location.data &&
                                    props.location.data.organization &&
                                    props.location.data.organization.district
                                        ? props.location.data.organization
                                              .district
                                        : '-'}
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

export default withRouter(CommonUserProfile);
