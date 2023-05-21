/* eslint-disable indent */
// import React from 'react';
// import './style.scss';
// import Layout from '../../Admin/Layout';
// import PageConstruction from '../../components/PageUnderConstrcution';

// const BadgesComp = () => {
//     return (
//         <Layout>
//             <PageConstruction />
//         </Layout>
//     );
// };

// export default BadgesComp;
import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle
} from 'reactstrap';
import './style.scss';
// import badgesBg from '../../../assets/media/img/badge_header.svg';
// import { ProgressComp } from '../../../stories/Progress/Progress';
import { Figure } from 'react-bootstrap';
import Layout from '../../Admin/Layout';
// import { useDispatch, useSelector } from 'react-redux';
// import { getStudentBadges } from '../../redux/studentRegistration/actions';
import axios from 'axios';

import { getCurrentUser } from '../../helpers/Utils';
// import moment from 'moment/moment';
const BadgesComp = () => {
    // const { badges } = useSelector((state) => state.studentRegistration);
    // const language = useSelector(
    //     (state) => state?.studentRegistration?.studentLanguage
    // );
    const [badgesRes, setBadgesRes] = useState({});

    const currentUser = getCurrentUser('current_user');
    // const dispatch = useDispatch();
    useEffect(() => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/badges',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
            // data: finalObj,
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setBadgesRes(response.data.data[0].dataValues);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <Layout>
            <div className="badges-page mt-5 mb-50">
                <Container className=" mt-2 ">
                    <Row>
                        <Col md={12} className="w-100 d-block">
                            <h2 className="title mb-4">Available Badges</h2>
                        </Col>
                    </Row>

                    <Row
                        className="myBadges equal mt-0 mb-50"
                        style={{ gap: '1.5rem' }}
                    >
                        {badgesRes &&
                            badgesRes.length > 0 &&
                            badgesRes.map((badge, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="badgesCard  col-xs-12 col-sm-6  col-xl-2 mb-3"
                                    >
                                        <Card
                                            className="badge-card py-5 h-100"
                                            // style={{
                                            //     backgroundColor: `${
                                            //         badge?.student_status
                                            //             ? ''
                                            //             : 'lightgrey'
                                            //     }`
                                            // }}
                                        >
                                            <Figure className="w-100 text-center">
                                                <CardImg
                                                    alt={badge.icon}
                                                    src={
                                                        process.env
                                                            .REACT_APP_API_IMAGE_BASE_URL +
                                                        badge.icon
                                                    }
                                                    style={{ width: '7.4rem' }}
                                                />
                                            </Figure>
                                            <CardBody>
                                                <CardTitle className="badge-name mb-3">
                                                    {badge.name}
                                                </CardTitle>
                                                {/* <CardSubtitle className="badge-date">
                                                    EARNED ON:{' '}
                                                    <span className="badge-time">
                                                        {badge?.student_status
                                                            ? moment(
                                                                  badge?.student_status
                                                              ).format(
                                                                  'DD MMM YYYY'
                                                              )
                                                            : 'Locked'}
                                                    </span>
                                                </CardSubtitle> */}
                                            </CardBody>
                                        </Card>
                                    </div>
                                );
                            })}
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default BadgesComp;
