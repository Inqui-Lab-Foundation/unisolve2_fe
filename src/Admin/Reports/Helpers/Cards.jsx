/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Button } from 'reactstrap';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import {
    openNotificationWithIcon,
    getCurrentUser
} from '../../../helpers/Utils';
import './table.css';
import './button.css';
import { useHistory } from 'react-router-dom';

const Cards = ({ heading, list, reports, props, distList }) => {
    // here list = student reports ; reports = teacher reports ; distList = district wise challenges reports //
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [reportsData, setReportsData] = useState([]);
    const [msg, setMsg] = useState('');
    const report = [
        {
            Name: 'Teacher-one',
            Address: 'Address-one',
            Contact: '9801775504'
        },
        {
            Name: 'Teacher-two',
            Address: 'Address-two',
            Contact: '9801775505'
        }
    ];

    const handleDownload = (item) => {
        // where we can download the reports //
        // here item = list //

        setMsg(item);
        var url = '';
        if (item == 'Registered Teachers List') {
            url = '/reports/mentorRegList';
        } else if (item == 'Not Registered Teachers List') {
            url = '/reports/notRegistered';
        } else if (item == 'Teachers Course Completion List') {
            url = '/reports/courseComplete';
        } else if (item == 'Teachers Pre Survey Completed List') {
            url = '/reports/preSurvey?role=MENTOR';
        } else if (item == 'Submitted Challenges') {
            url = '/reports/challengesDistrictCount?level=SUBMITTED';
        } else if (item == 'Draft Challenges') {
            url = '/reports/challengesDistrictCount?level=DRAFT';
        } else if (item == 'Accepted Challenges') {
            url = '/reports/challengesDistrictCount?level=SELECTEDROUND1';
        } else if (item == 'Rejected Challenges') {
            url = '/reports/challengesDistrictCount?level=REJECTEDROUND1';
        } else if (item == 'L1 - Yet to Processed Challenges') {
            url = '/reports/challengesDistrictCount?level=L1YETPROCESSED';
        } else if (item == 'L2 - Processed Challenges') {
            url = '/reports/challengesDistrictCount?level=L2PROCESSED';
        } else if (item == 'L2 - Yet to  Processed Challenges') {
            url = '/reports/challengesDistrictCount?level=L2YETPROCESSED';
        } else if (item == 'Final Evaluation Challenges') {
            url = '/reports/challengesDistrictCount?level=FINALCHALLENGES';
        } else if (item == 'Final Winner Challenges') {
            url = '/reports/challengesDistrictCount?level=FINALACCEPTED';
        }
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    var msg = '';

                    if (item == 'Registered Teachers List') {
                        msg = 'Registered Teachers List Download Successfully';
                    } else if (item == 'Not Registered Teachers List') {
                        msg =
                            'Not  Registered Teachers List Download Successfully';
                    } else if (item == 'Teachers Course Completion') {
                        msg =
                            'Teachers Course Completion  Download Successfully';
                    } else if (item == 'Teachers Pre Survey') {
                        msg = 'Teachers Pre Survey Download successfully';
                    } else if (item == 'Students Pre Survey') {
                        msg = 'Students Pre Survey Download Successfully';
                    } else if (item == 'Submitted Challenges') {
                        msg = 'Submitted Challenges  Download Successfully';
                    } else if (item == 'Draft Challenges') {
                        msg = 'Draft Challenges Download Successfully';
                    } else if (item == 'Accepted Challenges') {
                        msg = 'Accepted Challenges  Download Successfully';
                    } else if (item == 'Rejected Challenges') {
                        msg = 'Rejected Challenges  Download Successfully';
                    } else if (item == 'L1 - Yet to Processed Challenges') {
                        msg =
                            'L1 - Yet to Processed Challenges  Download Successfully';
                    } else if (item == 'L2 - Processed Challenges') {
                        msg =
                            'L2 - Processed Challenges  Download Successfully';
                    } else if (item == 'L2 - Yet to  Processed Challenges') {
                        msg =
                            'L2 - Yet to  Processed Challenges  Download Successfully';
                    } else if (item == 'Final Evaluation Challenges') {
                        msg =
                            'Final Evaluation Challenges  Download Successfully';
                    } else if (item == 'Final Winner Challenges') {
                        msg = 'Final Winner Challenges  Download Successfully';
                    }

                    openNotificationWithIcon('success', msg);
                    setReportsData(
                        response && response.data && response.data.data
                    );
                }
                const element = document.getElementById('CSVBtn');
                element.click();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleView = (item) => {
        // where we can see all challenges reports in districtwise //
        // here item = challenges type //
        var url = '';
        if (item == 'Submitted Challenges') {
            url = 'SUBMITTED';
        } else if (item == 'Draft Challenges') {
            url = 'DRAFT';
        } else if (item == 'Accepted Challenges') {
            url = 'SELECTEDROUND1';
        } else if (item == 'Rejected Challenges') {
            url = 'REJECTEDROUND1';
        } else if (item == 'L1 - Yet to Processed Challenges') {
            url = 'L1YETPROCESSED';
        } else if (item == 'L2 - Processed Challenges') {
            url = 'L2PROCESSED';
        } else if (item == 'L2 - Yet to  Processed Challenges') {
            url = 'L2YETPROCESSED';
        } else if (item == 'Final Evaluation Challenges') {
            url = 'FINALCHALLENGES';
        } else if (item == 'Final Winner Challenges') {
            url = 'FINALACCEPTED';
        }
        history.push({
            pathname: '/admin/reports-view'
            // item: item
        });
        localStorage.setItem('district', JSON.stringify(url));
    };
    return (
        <Card className="p-4 mb-8">
            {/* <h3 className="text-muted">{heading}</h3> */}
            <Card md={8}>
                <div className="App">
                    <table>
                        <tr className="th-background-color">
                            <th className="column-size">Teacher Reports</th>
                            <th>Actions</th>
                        </tr>
                        {reports.map((val, key) => {
                            const slug = val.replaceAll(' ', '-');
                            return (
                                <tr key={key} className="table_data_row">
                                    <td>{val}</td>
                                    <td>
                                        {key > 4 ? (
                                            <Link
                                                to={`/admin/selected-report?report=${slug}`}
                                                exact
                                                className="d-flex"
                                            >
                                                <button className="btn btn-outline-dark rounded-3 px-sm-4">
                                                    <i className="fa fa-filter me-2"></i>
                                                    Filter
                                                </button>
                                            </Link>
                                        ) : (
                                            <button
                                                className="btn btn-primary rounded-3"
                                                onClick={() => {
                                                    handleDownload(val);
                                                }}
                                            >
                                                <i className="fa fa-download me-2"></i>
                                                Download
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </Card>
            <br />
            <Card md={8}>
                <div className="App">
                    <table>
                        <tr className="th-background-color">
                            <th className="column-size">Student Reports</th>
                            <th>Actions</th>
                        </tr>
                        {list.map((val, key) => {
                            const slug = val.replaceAll(' ', '-');
                            return (
                                <tr key={key} className="table_data_row">
                                    <td>{val}</td>
                                    <td>
                                        <Link
                                            to={`/admin/selected-report?report=${slug}`}
                                            exact
                                            className="d-flex"
                                        >
                                            <button className="btn btn-outline-dark rounded-3 px-sm-4">
                                                <i className="fa fa-filter me-2"></i>
                                                Filter
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </Card>
            <Card>
                <div className="App">
                    <table>
                        <tr className="th-background-color">
                            <th className="column-size">Challenges Reports</th>
                            <th>Actions</th>
                        </tr>
                        {distList.map((val, key) => {
                            // const slug = val.replaceAll(' ', '-');
                            return (
                                <tr key={key} className="table_data_row">
                                    <td>{val}</td>

                                    <td className="d-flex justify-content-around">
                                        <button
                                            className="btn btn-primary  px-4 btn-lg text-white "
                                            onClick={() => {
                                                handleView(val);
                                            }}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-primary  rounded-3"
                                            onClick={() => {
                                                handleDownload(val);
                                            }}
                                        >
                                            <i className="fa fa-download me-2"></i>
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </Card>
            <div className="m-3 common-flex">
                <CSVLink
                    style={{ display: 'none' }}
                    id={'CSVBtn'}
                    data={reportsData}
                    filename={
                        msg == 'Registered Teachers List'
                            ? 'Registered Teachers List.csv'
                            : msg == 'Not Registered Teachers List'
                            ? 'Not Registered Teachers List.csv'
                            : msg == 'Teachers Course Completion'
                            ? 'Teachers Course Completion.csv'
                            : msg == 'Teachers Pre Survey'
                            ? 'Teachers Pre Survey.csv'
                            : msg == 'Students Pre Survey'
                            ? 'Students Pre Survey.csv'
                            : msg ==
                              'Submitted Challenges  Download Successfully'
                            ? 'Submitted Challenges.csv'
                            : msg == 'Draft Challenges  Download Successfully'
                            ? 'Draft Challenges.csv'
                            : msg ==
                              'Accepted Challenges  Download Successfully'
                            ? 'Accepted Challenges.csv'
                            : msg ==
                              'Rejected Challenges  Download Successfully'
                            ? 'Rejected Challenges.csv'
                            : msg ==
                              'L1 - Yet to Processed Challenges  Download Successfully'
                            ? 'L1 - Yet to Processed Challenges.csv'
                            : msg ==
                              'L2 - Processed Challenges  Download Successfully'
                            ? 'L2 - Processed Challenges.csv'
                            : msg ==
                              'Final Evaluation Challenges  Download Successfully'
                            ? 'Final Evaluation Challenges.csv'
                            : msg ==
                              'Final Winner Challenges  Download Successfully'
                            ? 'Final Winner Challenges.csv'
                            : 'Report.csv'
                    }
                />
            </div>
        </Card>
    );
};

export default Cards;
