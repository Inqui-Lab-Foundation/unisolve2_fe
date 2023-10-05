/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Layout from '../../Layout';
// import '../../Admin/Reports/reports.scss';
import axios from 'axios';
import { getCurrentUser } from '../../../helpers/Utils';

import Vimeo from '@u-wave/react-vimeo';
const CooHelp = () => {
    const currentUser = getCurrentUser('current_user');
    const [videoId, setVideoId] = useState(0);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/videos/32',
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
                <h2>Student Panel Walk Through </h2>
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
export default CooHelp;
