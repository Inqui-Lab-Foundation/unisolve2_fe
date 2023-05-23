/* eslint-disable indent */
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
import { Figure } from 'react-bootstrap';
import Layout from '../../Admin/Layout';
import axios from 'axios';

import { getCurrentUser } from '../../helpers/Utils';
const BadgesComp = () => {
    const [badgesRes, setBadgesRes] = useState({});

    const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/badges',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
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
                                        <Card className="badge-card py-5 h-100">
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
