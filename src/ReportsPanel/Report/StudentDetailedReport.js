/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../stories/Button';
import { CSVLink } from 'react-csv';
import { openNotificationWithIcon, getCurrentUser } from '../../helpers/Utils';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { categoryValue } from '../../Admin/Schools/constentText';

import Select from '../../Admin/Reports/Helpers/Select';
import '../../Admin/Reports/reports.scss';

import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';

const StudentDetailedReport = () => {
    const stackedBarChart = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Districts',
                    color: 'blue'
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 85
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                stepSize: 20,
                title: {
                    display: true,
                    text: 'Number of Students',
                    color: 'blue'
                },
                grid: {
                    display: true,
                    drawBorder: true,
                    color: 'rgba(0, 0, 0, 0.2)',
                    lineWidth: 0.5
                }
            }
        }
    };
    const stackedBarChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Districts',
                    color: 'blue'
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 85
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                stepSize: 20,
                title: {
                    display: true,
                    text: 'Number of Teachers',
                    color: 'blue'
                },
                grid: {
                    display: true,
                    drawBorder: true,
                    color: 'rgba(0, 0, 0, 0.2)',
                    lineWidth: 0.5
                }
            }
        }
    };
    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [category, setCategory] = useState('');
    const categoryData =
        categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];

    const [downloadData, setDownloadData] = useState(null);
    const csvLinkRef = useRef();
    const csvLinkRefTable = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [combinedArray, setCombinedArray] = useState([]);
    const [downloadTableData, setDownloadTableData] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [newFormat, setNewFormat] = useState('');

    const [doughnutChart1Data, setDoughnutChart1Data] = useState(null);
    const [doughnutChart2Data, setDoughnutChart2Data] = useState(null);
    const [barChart1Data, setBarChart1Data] = useState({
        labels: [],
        datasets: []
    });
    const [barChart2Data, setBarChart2Data] = useState({
        labels: [],
        datasets: []
    });
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    const studentTableHeaders = [
        {
            label: 'District Name',
            key: 'district'
        },
        {
            label: 'Total No.Of TEAMS created',
            key: 'totalTeams'
        },
        {
            label: 'Total No.Of STUDENTS enrolled',
            key: 'totalStudents'
        },
        {
            label: 'No.Of Students completed the Course',
            key: 'courseCompleted'
        },
        {
            label: 'No.Of Students course In Progress',
            key: 'courseInProgress'
        },
        {
            label: 'No.Of students NOT STARTED Course',
            key: 'courseNotStarted'
        },
        {
            label: ' No.Of TEAMS SUBMITTED IDEAS',
            key: 'submittedCount'
        },
        {
            label: 'No.Of Teams IDEAS IN DRAFT',
            key: 'draftCount'
        },
        {
            label: 'No.Of Teams NOT STARTED IDEAS SUBMISSION',
            key: 'ideaNotStarted'
        },
        {
            label: 'Course Completion Percentage',
            key: 'coursePercentage'
        },
        {
            label: 'IDEA Submission Percentage',
            key: 'ideaSubmissionPercentage'
        }
    ];

    const studentDetailsHeaders = [
        {
            label: 'UDISE CODE',
            key: 'UDISE code'
        },
        {
            label: 'School Name',
            key: 'School Name'
        },
        {
            label: 'School Type/Category',
            key: 'category'
        },
        {
            label: 'District',
            key: 'district'
        },
        {
            label: 'City',
            key: 'city'
        },
        {
            label: 'HM Name',
            key: 'HM Name'
        },
        {
            label: 'HM Contact',
            key: 'HM Contact'
        },
        {
            label: 'Teacher Name',
            key: 'Teacher Name'
        },
        {
            label: 'Teacher Gender',
            key: 'Teacher Gender'
        },
        {
            label: 'Teacher Contact',
            key: 'Teacher Contact'
        },
        {
            label: 'Teacher WhatsApp Contact',
            key: 'Teacher WhatsApp Contact'
        },
        {
            label: 'Team Name',
            key: 'Team Name'
        },
        {
            label: 'Student Name',
            key: 'Student Name'
        },
        {
            label: 'Student Username',
            key: 'Student Username'
        },
        {
            label: 'Age',
            key: 'Age'
        },
        {
            label: 'Gender',
            key: 'gender'
        },
        {
            label: 'Grade',
            key: 'Grade'
        },
        {
            label: 'Pre-Survey Status',
            key: 'Pre Survey Status'
        },
        {
            label: 'Course Completion%',
            key: 'Course Completion'
        },
        {
            label: 'Course Status',
            key: 'Course Status'
        },
        {
            label: 'Idea Status',
            key: 'Idea Status'
        },
        {
            label: 'Post-Survey Status',
            key: 'Post Survey Status'
        }
    ];
    useEffect(() => {
        dispatch(getDistrictData());
        fetchChartTableData();
    }, []);

    const chartOption = {
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black'
            }
        },
        plugins: {
            legend: {
                labels: {
                    generateLabels: function (chart) {
                        return chart.data.labels.map(function (label, i) {
                            const value = chart.data.datasets[0].data[i];
                            const backgroundColor =
                                chart.data.datasets[0].backgroundColor[i];
                            return {
                                text: label + ': ' + value,
                                fillStyle: backgroundColor
                            };
                        });
                    }
                }
            }
        }
    };
    const chartOptions = {
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black'
            }
        },
        plugins: {
            legend: {
                labels: {
                    generateLabels: function (chart) {
                        return chart.data.labels.map(function (label, i) {
                            const value = chart.data.datasets[0].data[i];
                            const backgroundColor =
                                chart.data.datasets[0].backgroundColor[i];
                            return {
                                text: label + ': ' + value,
                                fillStyle: backgroundColor
                            };
                        });
                    }
                }
            }
        }
    };

    const fetchData = () => {
        const url = `/reports/studentdetailsreport?district=${RegTeachersdistrict}&category=${category}`;

        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    const newdatalist = response.data.data.map((item) => {
                        const dataList = { ...item };
                        if (item['Post Survey Status'] === 'ACTIVE') {
                            dataList['Post Survey Status'] = 'Completed';
                        }
                        if (item['Pre Survey Status'] === 'ACTIVE') {
                            dataList['Pre Survey Status'] = 'Completed';
                        }
                        const coursePre = Math.round(
                            (item.course_status / 34) * 100
                        );
                        dataList['Course Completion'] = `${coursePre}%`;
                        if (coursePre >= 100) {
                            dataList['Course Status'] = 'Completed';
                        } else if (coursePre < 100 && coursePre > 0) {
                            dataList['Course Status'] = 'In Progress';
                        } else {
                            dataList['Course Status'] = 'Not Started';
                        }
                        return dataList;
                    });
                    setDownloadData(newdatalist);
                    csvLinkRef.current.link.click();
                    openNotificationWithIcon(
                        'success',
                        `Student Detailed Reports Downloaded Successfully`
                    );
                    setIsDownloading(false);
                }
            })
            .catch((error) => {
                console.log('API error:', error);
                setIsDownloading(false);
            });
    };

    const handleDownload = () => {
        if (!RegTeachersdistrict || !category) {
            notification.warning({
                message:
                    'Please select a district and category type before Downloading Reports.'
            });
            return;
        }
        setIsDownloading(true);
        fetchData();
    };

    useEffect(() => {
        if (downloadComplete) {
            setDownloadComplete(false);
            setRegTeachersdistrict('');
        }
        const newDate = new Date();
        const formattedDate = `${newDate.getUTCDate()}/${
            1 + newDate.getMonth()
        }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
        setNewFormat(formattedDate);
    }, [downloadComplete]);

    const fetchChartTableData = () => {
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/reports/studentdetailstable',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    const summary = response.data.data[0].summary;
                    const studentCountDetails =
                        response.data.data[0].studentCountDetails;
                    const courseCompleted =
                        response.data.data[0].courseCompleted;
                    const courseINprogesss =
                        response.data.data[0].courseINprogesss;
                    const submittedCount = response.data.data[0].submittedCount;
                    const draftCount = response.data.data[0].draftCount;

                    const combinedArray = summary.map((summaryItem) => {
                        const district = summaryItem.district;
                        const totalTeams = summaryItem.totalTeams;
                        const studentCountItem = studentCountDetails.find(
                            (item) => item.district === district
                        );
                        const courseCompletedItem = courseCompleted.find(
                            (item) => item.district === district
                        );
                        const courseInProgressItem = courseINprogesss.find(
                            (item) => item.district === district
                        );
                        const courseNotStarted = studentCountItem
                            ? studentCountItem.totalstudent -
                              (courseCompletedItem
                                  ? courseCompletedItem.studentCourseCMP
                                  : 0) -
                              (courseInProgressItem
                                  ? courseInProgressItem.studentCourseIN
                                  : 0)
                            : 0;

                        const submittedCountItem = submittedCount.find(
                            (item) => item.district === district
                        );
                        const draftCountItem = draftCount.find(
                            (item) => item.district === district
                        );
                        const ideaNotStarted =
                            summaryItem.totalTeams -
                            ((submittedCountItem
                                ? submittedCountItem.submittedCount
                                : 0) +
                                (draftCountItem
                                    ? draftCountItem.draftCount
                                    : 0));

                        const coursePercentage =
                            studentCountItem &&
                            studentCountItem.totalstudent > 0
                                ? Math.round(
                                      ((courseCompletedItem
                                          ? courseCompletedItem.studentCourseCMP
                                          : 0) /
                                          studentCountItem.totalstudent) *
                                          100
                                  )
                                : 0;
                        const ideaSubmissionPercentage =
                            totalTeams > 0
                                ? Math.round(
                                      ((submittedCountItem
                                          ? submittedCountItem.submittedCount
                                          : 0) /
                                          totalTeams) *
                                          100
                                  )
                                : 0;

                        return {
                            district,
                            totalTeams,
                            totalStudents: studentCountItem
                                ? studentCountItem.totalstudent
                                : 0,
                            courseCompleted: courseCompletedItem
                                ? courseCompletedItem.studentCourseCMP
                                : 0,
                            courseInProgress: courseInProgressItem
                                ? courseInProgressItem.studentCourseIN
                                : 0,
                            courseNotStarted,
                            submittedCount: submittedCountItem
                                ? submittedCountItem.submittedCount
                                : 0,
                            draftCount: draftCountItem
                                ? draftCountItem.draftCount
                                : 0,
                            ideaNotStarted,
                            coursePercentage,
                            ideaSubmissionPercentage
                        };
                    });

                    const total = combinedArray.reduce(
                        (acc, item) => {
                            acc.totalTeams += item.totalTeams;
                            acc.totalStudents += item.totalStudents;
                            acc.courseCompleted += item.courseCompleted;
                            acc.courseInProgress += item.courseInProgress;
                            acc.submittedCount += item.submittedCount;
                            acc.draftCount += item.draftCount;
                            acc.courseNotStarted =
                                acc.totalStudents -
                                (acc.courseCompleted + acc.courseInProgress);
                            acc.ideaNotStarted =
                                acc.totalTeams -
                                (acc.submittedCount + acc.draftCount);
                            return acc;
                        },
                        {
                            totalTeams: 0,
                            totalStudents: 0,
                            courseCompleted: 0,
                            courseInProgress: 0,
                            submittedCount: 0,
                            draftCount: 0,
                            courseNotStarted: 0,
                            ideaNotStarted: 0
                        }
                    );
                    console.log('Combined Array:', combinedArray);
                    console.log('Total count', total);

                    const doughNutData1 = {
                        labels: ['Completed', 'IN Progress', 'NOT Started'],
                        datasets: [
                            {
                                data: [
                                    total.courseCompleted,
                                    total.courseInProgress,
                                    total.courseNotStarted
                                ],
                                backgroundColor: [
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#FF6384'
                                ],
                                hoverBackgroundColor: [
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#FF6384'
                                ]
                            }
                        ]
                    };
                    const doughNutData2 = {
                        labels: [
                            'Submitted Ideas',
                            'IN Draft Ideas',
                            'NOT Started Idea Submission'
                        ],
                        datasets: [
                            {
                                data: [
                                    total.submittedCount,
                                    total.draftCount,
                                    total.ideaNotStarted
                                ],
                                backgroundColor: [
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#FF6384'
                                ],
                                hoverBackgroundColor: [
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#FF6384'
                                ]
                            }
                        ]
                    };

                    const stackedBarChart1Data = {
                        labels: combinedArray.map((item) => item.district),
                        datasets: [
                            {
                                label: 'No of Students Completed Course',
                                data: combinedArray.map(
                                    (item) => item.courseCompleted
                                ),
                                backgroundColor: 'Lightgreen'
                            },
                            {
                                label: 'No of Students Course In progress',
                                data: combinedArray.map(
                                    (item) => item.courseInProgress
                                ),
                                backgroundColor: 'Yellow'
                            },
                            {
                                label: 'No of Students Not Started Course',
                                data: combinedArray.map(
                                    (item) => item.courseNotStarted
                                ),
                                backgroundColor: 'Red'
                            }
                        ]
                    };

                    const stackedBarChart2Data = {
                        labels: combinedArray.map((item) => item.district),
                        datasets: [
                            {
                                label: 'No of Teams Submitted Ideas',
                                data: combinedArray.map(
                                    (item) => item.submittedCount
                                ),
                                backgroundColor: 'Lightgreen'
                            },
                            {
                                label: 'No of Team Ideas in Draft',
                                data: combinedArray.map(
                                    (item) => item.draftCount
                                ),
                                backgroundColor: 'Yellow'
                            },
                            {
                                label: 'No of Teams Not Started Idea Submission',
                                data: combinedArray.map(
                                    (item) => item.ideaNotStarted
                                ),
                                backgroundColor: 'Red'
                            }
                        ]
                    };
                    var array = combinedArray;
                    array.push({ district: 'Total Count', ...total });
                    setCombinedArray(array);
                    setDownloadTableData(combinedArray);
                    setDoughnutChart1Data(doughNutData1);
                    setDoughnutChart2Data(doughNutData2);
                    setBarChart1Data(stackedBarChart1Data);
                    setBarChart2Data(stackedBarChart2Data);
                    setTotalCount(total);
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };
    console.log(downloadTableData);

    return (
        <>
            <Layout>
                <Container className="RegReports mt-4 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col>
                            <h2>Students Progress Detailed Report</h2>
                        </Col>
                        <Col className="text-right mb-1">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() => history.push('/report/category')}
                            />
                        </Col>
                        <div className="reports-data p-5 mt-4 mb-5 bg-white">
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={fullDistrictsNames}
                                            setValue={setRegTeachersdistrict}
                                            placeHolder={'Select District'}
                                            value={RegTeachersdistrict}
                                        />
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={categoryData}
                                            setValue={setCategory}
                                            placeHolder={'Select Category'}
                                            value={category}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        onClick={handleDownload}
                                        label={
                                            downloadComplete
                                                ? 'Download Complete'
                                                : isDownloading
                                                ? 'Downloading...'
                                                : 'Download Report'
                                        }
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        type="submit"
                                        style={{
                                            width: '160px',
                                            whiteSpace: 'nowrap',
                                            pointerEvents: isDownloading
                                                ? 'none'
                                                : 'auto'
                                        }}
                                        disabled={isDownloading}
                                    />
                                </Col>
                            </Row>

                            <div className="chart">
                                {combinedArray.length > 0 && (
                                    <div className="mt-5">
                                        <div className="d-flex align-items-center mb-3">
                                            <h3>OVERVIEW</h3>
                                            <Button
                                                label="Download Table"
                                                btnClass="primary mx-2"
                                                size="small"
                                                shape="btn-square"
                                                onClick={() => {
                                                    if (downloadTableData) {
                                                        setDownloadTableData(
                                                            null
                                                        );
                                                        csvLinkRefTable.current.link.click();
                                                    }
                                                }}
                                                style={{
                                                    width: '150px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mx-10 px-10">
                                                <div
                                                    className="table-wrapper bg-white "
                                                    style={{
                                                        overflowX: 'auto'
                                                    }}
                                                >
                                                    <Table
                                                        id="dataTable"
                                                        className="table table-striped table-bordered responsive"
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>
                                                                    District
                                                                    Name
                                                                </th>
                                                                <th>
                                                                    Total No.Of
                                                                    TEAMS
                                                                    created
                                                                </th>
                                                                <th>
                                                                    Total No.Of
                                                                    STUDENTS
                                                                    enrolled
                                                                </th>
                                                                <th>
                                                                    No.Of
                                                                    Students
                                                                    completed
                                                                    the Course
                                                                </th>
                                                                <th>
                                                                    No.Of
                                                                    Students
                                                                    course In
                                                                    Progress
                                                                </th>
                                                                <th>
                                                                    No.Of
                                                                    students NOT
                                                                    STARTED
                                                                    Course
                                                                </th>
                                                                <th>
                                                                    No.Of TEAMS
                                                                    SUBMITTED
                                                                    IDEAS
                                                                </th>
                                                                <th>
                                                                    No.Of Teams
                                                                    IDEAS IN
                                                                    DRAFT
                                                                </th>
                                                                <th>
                                                                    No.Of Teams
                                                                    NOT STARTED
                                                                    IDEAS
                                                                    SUBMISSION
                                                                </th>
                                                                <th>
                                                                    Course
                                                                    Completion
                                                                    Percentage
                                                                </th>
                                                                <th>
                                                                    IDEA
                                                                    Submission
                                                                    Percentage
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {combinedArray.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {index +
                                                                                1}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.district
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.totalTeams
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.totalStudents
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.courseCompleted
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.courseInProgress
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.courseNotStarted
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.submittedCount
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.draftCount
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.ideaNotStarted
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.coursePercentage
                                                                            }
                                                                            %
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.ideaSubmissionPercentage
                                                                            }
                                                                            %
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                            {/* <tr>
                                                                <td>{}</td>
                                                                <td>
                                                                    {
                                                                        'Total Count'
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.totalTeams
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.totalStudents
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.courseCompleted
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.courseInProgress
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.courseNotStarted
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.submittedCount
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.draftCount
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.ideaNotStarted
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {Math.round(
                                                                        (totalCount.courseCompleted /
                                                                            totalCount.totalStudents) *
                                                                            100
                                                                    )}
                                                                    %
                                                                </td>
                                                                <td>
                                                                    {Math.round(
                                                                        (totalCount.submittedCount /
                                                                            totalCount.totalTeams) *
                                                                            100
                                                                    )}
                                                                    %
                                                                </td>
                                                            </tr> */}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-6 text-center mt-5">
                                                    <p
                                                        style={{
                                                            whiteSpace:
                                                                'nowrap',
                                                            paddingLeft: '50px'
                                                        }}
                                                    >
                                                        <b>
                                                            Student Course
                                                            Status As of{' '}
                                                            {newFormat}
                                                        </b>
                                                    </p>
                                                </div>
                                                <div className="col-md-6 doughnut-chart-container">
                                                    {doughnutChart1Data && (
                                                        <Doughnut
                                                            data={
                                                                doughnutChart1Data
                                                            }
                                                            options={
                                                                chartOptions
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="col-md-6 text-center mt-5">
                                                    <p
                                                        style={{
                                                            whiteSpace:
                                                                'nowrap',
                                                            paddingLeft: '30px'
                                                        }}
                                                    >
                                                        <b>
                                                            Student Idea
                                                            Submission As of{' '}
                                                            {newFormat}
                                                        </b>
                                                    </p>
                                                </div>
                                                <div className="col-md-6 doughnut-chart-container">
                                                    {doughnutChart2Data && (
                                                        <Doughnut
                                                            data={
                                                                doughnutChart2Data
                                                            }
                                                            options={
                                                                chartOption
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div
                                                    className="col-md-6 chart-container mt-2"
                                                    style={{
                                                        width: '100%',
                                                        height: '370px'
                                                    }}
                                                >
                                                    <div className="chart-box">
                                                        <Bar
                                                            data={barChart1Data}
                                                            options={
                                                                stackedBarChart
                                                            }
                                                        />
                                                        <div className="chart-title">
                                                            <p>
                                                                <b>
                                                                    Student
                                                                    Course
                                                                    Completion
                                                                    Status As Of
                                                                    {newFormat}
                                                                </b>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="col-md-6 chart-container mt-5"
                                                style={{
                                                    width: '100%',
                                                    height: '370px'
                                                }}
                                            >
                                                <div className="chart-box">
                                                    <Bar
                                                        data={barChart2Data}
                                                        options={
                                                            stackedBarChartOptions
                                                        }
                                                    />
                                                    <div className="chart-title">
                                                        <p>
                                                            <b>
                                                                Idea Submission
                                                                Status Status As
                                                                Of {newFormat}
                                                            </b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {downloadTableData && (
                                    <CSVLink
                                        data={downloadTableData}
                                        headers={studentTableHeaders}
                                        // filename={`Student_Detailed_Summary_Reports.csv`}
                                        filename={`StudentDetailedSummaryReport_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefTable}
                                    >
                                        Download Table CSV
                                    </CSVLink>
                                )}

                                {downloadData && (
                                    <CSVLink
                                        headers={studentDetailsHeaders}
                                        data={downloadData}
                                        filename={`StudentDetailedReport_${newFormat}.csv`}
                                        // filename={`Student Detailed Reports.csv`}
                                        className="hidden"
                                        ref={csvLinkRef}
                                        onDownloaded={() => {
                                            setIsDownloading(false);
                                            setDownloadComplete(true);
                                        }}
                                    >
                                        Download CSV
                                    </CSVLink>
                                )}
                            </div>
                        </div>
                    </Row>
                </Container>
            </Layout>
        </>
    );
};
export default StudentDetailedReport;
