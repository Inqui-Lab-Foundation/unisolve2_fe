/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Layout from '../Layout';
// import './dashboard.scss';
import Vimeo from '@u-wave/react-vimeo';
import { getCurrentUser, getNormalHeaders } from '../../helpers/Utils';
import axios from 'axios';

import { Col, Container, Row, CardBody, CardText, Card } from 'reactstrap';

const HelpSchool = () => {
    const currentUser = getCurrentUser('current_user');
    const [videoId, setVideoId] = useState(0);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/videos/35',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setVideoId(
                        response?.data &&
                            response?.data?.data[0]?.video_stream_id
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Layout>
            <Container className="pt-3 pt-xl-5 mb-50">
                <h2>School Panel Walk Through </h2>
                <Row>
                    <Card style={{ height: '50rem' }}>
                        {videoId && (
                            <Vimeo video={videoId} style={{ height: '50%' }} />
                        )}
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

export default HelpSchool;
