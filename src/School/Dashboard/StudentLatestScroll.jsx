/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, CardBody, CardText } from 'reactstrap';
import { getCurrentUser } from '../../helpers/Utils';
// import './scroll.scss';
import axios from 'axios';
import newIcon from '../../assets/media/blinking_new.gif';
import './StuContinousScroll.css';
function StudentLatestScroll({ usersdata }) {
    const currentUser = getCurrentUser('current_user');

    const [newsRes, setNewRes] = useState({});
    const [news, setNews] = useState([]);
    // const containerRef = useRef(null);
    // useEffect(() => {
    //     const container = containerRef.current;
    //     let scrollInterval;

    //     const startScrolling = () => {
    //         scrollInterval = setInterval(() => {
    //             if (
    //                 container.scrollTop + container.offsetHeight >=
    //                 container.scrollHeight
    //             ) {
    //                 // Reached the bottom of the list, scroll back to the top
    //                 container.scrollTop = 0;
    //             } else {
    //                 container.scrollTop += 1; // Adjust scrolling speed as desired
    //             }
    //         }, 30); // Adjust scrolling interval as desired
    //     };

    //     const stopScrolling = () => {
    //         clearInterval(scrollInterval);
    //     };
    //     container.addEventListener('mouseenter', stopScrolling);
    //     container.addEventListener('mouseleave', startScrolling);

    //     startScrolling();

    //     return () => {
    //         clearInterval(scrollInterval);
    //         container.removeEventListener('mouseenter', stopScrolling);
    //         container.removeEventListener('mouseleave', startScrolling);
    //     };
    // }, []);
    const [isPaused, setIsPaused] = useState(false);
    const togglePause = () => {
        setIsPaused(!isPaused);
    };
    useEffect(async () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/latest_news/list?category=student',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setNews(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={8} className="border-right my-auto">
                            <Row>
                                <h2 style={{ color: 'black' }}>
                                    {' '}
                                    Student Latest News
                                </h2>
                            </Row>
                            <div
                                // id="boxflow"
                                // ref={containerRef}
                                className="continuous-scroll-list"
                                onMouseEnter={togglePause}
                                onMouseLeave={togglePause}
                                style={{
                                    height: '200px',
                                    width: '500px'
                                    //overflow: 'auto'
                                }}
                            >
                                <div
                                    className={`scrolling-container ${
                                        isPaused ? 'paused' : ''
                                    }`}
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
                                                            className="fa fa-bell p-1 "
                                                            style={{
                                                                color: 'blue'
                                                            }}
                                                        ></i>
                                                        {''}
                                                        {item?.details}
                                                        {/* </Col> */}
                                                        {/* <Col
                                                   
                                                > */}
                                                        {item?.file_name !=
                                                            null &&
                                                        item?.file_name !=
                                                            '' ? (
                                                            <a
                                                                className="link-item  m-2 p-2"
                                                                // rel="noopener noreferrer"
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
                                                        {item?.url != null &&
                                                        item?.url != '' ? (
                                                            <a
                                                                target="_blank"
                                                                className="link-item"
                                                                href={item?.url}
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
                                                        {item?.new_status ==
                                                        1 ? (
                                                            <img
                                                                className="m-2 p-2"
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
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
export default StudentLatestScroll;
