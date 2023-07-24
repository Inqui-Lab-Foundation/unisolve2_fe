/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, CardBody, CardText } from 'reactstrap';
import { getCurrentUser } from '../../helpers/Utils';
import './scroll.scss';
import axios from 'axios';
import newIcon from '../../assets/media/blinking_new.gif';

function LatestNewsNew({ usersdata }) {
    const currentUser = getCurrentUser('current_user');

    const [newsRes, setNewRes] = useState({});
    const [news, setNews] = useState([]);
    console.log(news);
    const containerRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        let scrollInterval;

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                if (
                    container.scrollTop + container.offsetHeight >=
                    container.scrollHeight
                ) {
                    // Reached the bottom of the list, scroll back to the top
                    container.scrollTop = 0;
                } else {
                    container.scrollTop += 1; // Adjust scrolling speed as desired
                }
            }, 5); // Adjust scrolling interval as desired
        };

        const stopScrolling = () => {
            clearInterval(scrollInterval);
        };
        container.addEventListener('mouseenter', stopScrolling);
        container.addEventListener('mouseleave', startScrolling);

        startScrolling();

        return () => {
            clearInterval(scrollInterval);
            container.removeEventListener('mouseenter', stopScrolling);
            container.removeEventListener('mouseleave', startScrolling);
        };
    }, []);

    useEffect(async () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/latest_news/list?category=mentor',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    setNews(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className="latest-news-container">
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={8} className="border-right my-auto">
                            <h2 style={{ color: 'black' }}>Latest News</h2>
                            <div
                                id="boxflow"
                                ref={containerRef}
                                style={{
                                    height: '200px',
                                    width: '500px'
                                    //overflow: 'auto'
                                }}
                            >
                                <ul>
                                    {news?.map((item, index) => (
                                        <div key={index}>
                                            <Row>
                                                <Col
                                                    className="form-group"
                                                    col-6
                                                >
                                                    <i
                                                        className="fa fa-bell"
                                                        style={{
                                                            color: 'blue'
                                                        }}
                                                    ></i>{' '}
                                                    {item?.details}
                                                    {/* </Col> */}
                                                    {/* <Col
                                                   
                                                > */}
                                                    {item?.file_name != null ? (
                                                        <a
                                                            className="link-item"
                                                            rel="noopener noreferrer"
                                                            href={
                                                                item?.file_name
                                                            }
                                                            target="_blank"
                                                        >
                                                            <button className="btn btn-warning ">
                                                                File
                                                            </button>
                                                        </a>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {/* </Col> */}
                                                    {/* <Col
                                                   
                                                > */}
                                                    {item?.url != null ? (
                                                        <a
                                                            className="link-item"
                                                            rel="noopener noreferrer"
                                                            href={item?.url}
                                                            target="_blank"
                                                        >
                                                            <button className="btn btn-success ">
                                                                Url
                                                            </button>
                                                        </a>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {/* </Col> */}
                                                    {/* <Col
                                                   
                                                > */}
                                                    {item?.new_status != 0 ? (
                                                        <img
                                                            src={newIcon}
                                                            style={{
                                                                width: '30px'
                                                            }}
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                    <hr />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
export default LatestNewsNew;
