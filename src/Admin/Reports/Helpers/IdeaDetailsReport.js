/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {
    openNotificationWithIcon,
    getCurrentUser
} from '../../../helpers/Utils';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../Helpers/Select';
import axios from 'axios';
import { categoryValue } from '../../Schools/constentText';
import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';
import { cardData } from '../../../Student/Pages/Ideas/SDGData';

const ReportsRegistration = () => {
    const [registeredGenderChartData, setRegisteredGenderChartData] =
        useState(null);
    const [registeredChartData, setRegisteredChartData] = useState(null);
    const [chartTableData, setChartTableData] = useState([]);
    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    SDGDate.unshift('ALL SDGs');
    const [sdg, setsdg] = React.useState('');

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
    const [doughnutChart1Data, setDoughnutChart1Data] = useState(null);
    const [doughnutChart2Data, setDoughnutChart2Data] = useState(null);
    const [newFormat, setNewFormat] = useState('');
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

    const summaryHeaders = [
        {
            label: 'District Name',
            key: 'district'
        },
        {
            label: 'No of Ideas Submitted',
            key: 'totalSubmited'
        },

        {
            label: 'AFFORDABLE AND CLEANENERGY',
            key: 'AFFORDABLEANDCLEANENERGY'
        },
        {
            label: 'CLEAN WATER AND SANITATION',
            key: 'CLEANWATERANDSANITATION'
        },
        {
            label: 'CLIMATE ACTION',
            key: 'CLIMATEACTION'
        },
        {
            label: 'DECENT WORK AND ECONOMIC GROWTH',
            key: 'DECENTWORKANDECONOMICGROWTH'
        },
        {
            label: 'GENDER EQUALITY',
            key: 'GENDEREQUALITY'
        },
        {
            label: 'GOOD HEALTH AND WELLBEING',
            key: 'GOODHEALTHANDWELLBEING'
        },
        {
            label: 'INDUSTRY INNOVATION AND INFRASTRUCTURE',
            key: 'INDUSTRYINNOVATIONANDINFRASTRUCTURE'
        },
        {
            label: 'LIFE BE LOW WATER',
            key: 'LIFEBELOWWATER'
        },
        {
            label: 'LIFE ON LAND',
            key: 'LIFEONLAND'
        },
        {
            label: 'NO POVERTY',
            key: 'NOPOVERTY'
        },
        {
            label: 'OTHERS',
            key: 'OTHERS'
        },
        {
            label: 'PARTNERSHIPS FOR THE GOALS',
            key: 'PARTNERSHIPSFORTHEGOALS'
        },
        {
            label: 'PEACE JUSTICE AND STRONG INSTITUTIONS',
            key: 'PEACEJUSTICEANDSTRONGINSTITUTIONS'
        },
        {
            label: 'QUALITY EDUCATION',
            key: 'QUALITYEDUCATION'
        },
        {
            label: 'REDUCED INEQUALITIES',
            key: 'REDUCEDINEQUALITIES'
        },
        {
            label: 'RESPONSIBLE CONSUMTION AND PRODUCTION',
            key: 'RESPONSIBLECONSUMTIONANDPRODUCTION'
        },
        {
            label: 'SUSTAINABLE CITES AND COMMUNITES',
            key: 'SUSTAINABLECITESANDCOMMUNITES'
        },
        {
            label: 'ZERO HUNGER',
            key: 'ZEROHUNGER'
        }
    ];

    const teacherDetailsHeaders = [
        // {
        //     label: 'ATL CODE',
        //     key: 'organization_code'
        // },
        {
            label: 'UDISE CODE',
            key: 'organization_code'
        },
        // {
        //     label: 'State',
        //     key: 'state'
        // },
        {
            label: 'District',
            key: 'district'
        },
        {
            label: 'CID',
            key: 'challenge_response_id'
        },
        {
            label: 'School Name',
            key: 'organization_name'
        },
        {
            label: 'School Type/Category',
            key: 'category'
        },
        // {
        //     label: 'Pin code',
        //     key: 'pin_code'
        // },
        // {
        //     label: 'Address',
        //     key: 'address'
        // },

        // {
        //     label: 'City',
        //     key: 'city'
        // },
        // {
        //     label: 'HM Name',
        //     key: 'HM Name'
        // },
        // {
        //     label: 'HM Contact',
        //     key: 'HM Contact'
        // },
        {
            label: 'Teacher Name',
            key: 'full_name'
        },
        // {
        //     label: 'Teacher Email',
        //     key: 'email'
        // },

        {
            label: 'Teacher Contact',
            key: 'mobile'
        },

        {
            label: 'Team Name',
            key: 'team_name'
        },
        {
            label: 'Student Name',
            key: 'Students names'
        },
        {
            label: 'SDG',
            key: 'sdg'
        },
        {
            label: 'Idea Title',
            key: '8'
        },
        // {
        //     label: 'Problem Statement',
        //     key: 'sub_category'
        // },
        {
            label: 'Write down the Current State and Desired State related to the problem. ',
            key: '1'
        },
        {
            label: 'Write down the Effects and Causes of the problem.',
            key: '2'
        },
        {
            label: 'Which of the following problem finding techniques did your team used to FIND a problem',
            key: '3'
        },
        {
            label: 'Which of the following problem finding techniques were difficult to use.',
            key: '4'
        },
        {
            label: 'Which of the following Activities/ techniques did your team use to EXPLORE  the problem deeper?',
            key: '5'
        },
        {
            label: 'Which of the following activities / techniques used to EXPLORE a problem were difficult to do or took a lot of time?',
            key: '6'
        },
        {
            label: 'What did you feel/think after talking to stakeholders',
            key: '7'
        },
        {
            label: 'Describe the solution to the problem your team found. ',
            key: '9'
        },
        // {
        //     label: ' Explain your solution clearly - how does it work, who is it helping, how will it solve the problem.',
        //     key: '10'
        // },
        {
            label: 'Which of the following IDEATION TECHNIQUES did your team make use of to come-up with a solution? ',
            key: '10'
        },
        {
            label: 'Which of the following IDEATION TECHNIQUES were difficult to use/took a lot of time while thinking of a solution?',
            key: '11'
        },
        {
            label: 'Pick the actions your team did in your problem solving journey',
            key: '12'
        },
        {
            label: 'Mention at least one feedback that your team found to be most helpful in creating the final solution to your problem. (not more than 500 characters)',
            key: '13'
        },

        {
            label: 'Which Prototyping Method did you choose to test your solution?',
            key: '14'
        },
        {
            label: 'Upload images/video of your prototype. (Upload all files at once. Not one after the other) ',
            key: '15'
        },
        {
            label: 'What are the materials you will need to make a working model of your solution?',
            key: '16'
        },
        {
            label: 'Did your team complete and submit the workbook to your school Guide teacher?',
            key: '17'
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
            display: true,
            position: 'bottom',
            labels: {
                fontColor: 'black',
                fontSize: 12, // Adjust the font size as needed
                rotation: 45 // Rotate the labels by 45 degrees
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
        const url = `/reports/ideadeatilreport?district=${RegTeachersdistrict}&category=${category}&sdg=${sdg}`;

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
                    // console.log(response, 'new');
                    const transformedData = response.data.data.map((entry) => {
                        const { response, ...rest } = entry;
                        const parsedResponse = JSON.parse(response);

                        Object.keys(parsedResponse).forEach((key) => {
                            const { challenge_question_id, selected_option } =
                                parsedResponse[key];
                            var newSelectedOption;
                            const tostringCovert = selected_option.toString();
                            if (
                                tostringCovert === null ||
                                tostringCovert === undefined
                            ) {
                                newSelectedOption = selected_option;
                            } else {
                                newSelectedOption = tostringCovert
                                    .replace(/\n/g, ' ')
                                    .replace(/,/g, ';');
                            }
                            entry[challenge_question_id] = newSelectedOption;
                        });

                        return {
                            ...entry
                        };
                    });

                    setDownloadData(transformedData);
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
    const distEx = RegTeachersdistrict ? RegTeachersdistrict : '';
    const handleDownload = () => {
        if (!RegTeachersdistrict || !category || !sdg) {
            notification.warning({
                message:
                    'Please select a district, sdg and category type before Downloading Reports.'
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
            setsdg('');
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
                process.env.REACT_APP_API_BASE_URL + '/reports/ideaReportTable',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        axios(config)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res, 'chart');
                    const chartTableData = res?.data?.data || [];

                    const total = chartTableData.reduce(
                        (acc, item) => {
                            (acc.totalSubmited += item.totalSubmited),
                                (acc.AFFORDABLEANDCLEANENERGY +=
                                    item.AFFORDABLEANDCLEANENERGY);
                            acc.CLEANWATERANDSANITATION +=
                                item.CLEANWATERANDSANITATION;
                            acc.CLIMATEACTION += item.CLIMATEACTION;
                            acc.DECENTWORKANDECONOMICGROWTH +=
                                item.DECENTWORKANDECONOMICGROWTH;
                            acc.GENDEREQUALITY += item.GENDEREQUALITY;
                            acc.GOODHEALTHANDWELLBEING +=
                                item.GOODHEALTHANDWELLBEING;
                            acc.INDUSTRYINNOVATIONANDINFRASTRUCTURE +=
                                item.INDUSTRYINNOVATIONANDINFRASTRUCTURE;
                            acc.LIFEBELOWWATER += item.LIFEBELOWWATER;

                            acc.OTHERS += item.OTHERS;
                            acc.NOPOVERTY += item.NOPOVERTY;
                            acc.PARTNERSHIPSFORTHEGOALS +=
                                item.PARTNERSHIPSFORTHEGOALS;
                            acc.PEACEJUSTICEANDSTRONGINSTITUTIONS +=
                                item.PEACEJUSTICEANDSTRONGINSTITUTIONS;
                            acc.QUALITYEDUCATION += item.QUALITYEDUCATION;
                            acc.REDUCEDINEQUALITIES += item.REDUCEDINEQUALITIES;
                            acc.RESPONSIBLECONSUMTIONANDPRODUCTION +=
                                item.RESPONSIBLECONSUMTIONANDPRODUCTION;
                            acc.SUSTAINABLECITESANDCOMMUNITES +=
                                item.SUSTAINABLECITESANDCOMMUNITES;
                            acc.ZEROHUNGER += item.ZEROHUNGER;

                            acc.LIFEONLAND += item.LIFEONLAND;
                            return acc;
                        },
                        {
                            totalSubmited: 0,
                            AFFORDABLEANDCLEANENERGY: 0,
                            CLEANWATERANDSANITATION: 0,
                            CLIMATEACTION: 0,
                            DECENTWORKANDECONOMICGROWTH: 0,
                            GENDEREQUALITY: 0,
                            GOODHEALTHANDWELLBEING: 0,
                            INDUSTRYINNOVATIONANDINFRASTRUCTURE: 0,
                            LIFEBELOWWATER: 0,
                            OTHERS: 0,
                            NOPOVERTY: 0,
                            PARTNERSHIPSFORTHEGOALS: 0,
                            PEACEJUSTICEANDSTRONGINSTITUTIONS: 0,
                            QUALITYEDUCATION: 0,
                            REDUCEDINEQUALITIES: 0,
                            RESPONSIBLECONSUMTIONANDPRODUCTION: 0,
                            SUSTAINABLECITESANDCOMMUNITES: 0,
                            ZEROHUNGER: 0,
                            LIFEONLAND: 0
                        }
                    );
                    // console.log('Total count', total);

                    setRegisteredGenderChartData({
                        labels: [
                            'AFFORDABLE AND CLEAN ENERGY'.toLocaleLowerCase(),
                            'CLEAN WATER AND SANITATION'.toLocaleLowerCase(),
                            'CLIMATE ACTION'.toLocaleLowerCase(),
                            'DECENT WORK AND ECONOMIC GROWTH'.toLocaleLowerCase(),
                            'GENDER EQUALITY'.toLocaleLowerCase(),
                            'INDUSTRY INNOVATION AND INFRASTRUCTURE'.toLocaleLowerCase(),
                            'GOOD HEALTH AND WELLBEING'.toLocaleLowerCase(),
                            'LIFE BE LOW WATER'.toLocaleLowerCase(),
                            'OTHERS'.toLocaleLowerCase(),
                            'NO POVERTY'.toLocaleLowerCase(),
                            'PARTNERSHIPS FOR THE GOALS'.toLocaleLowerCase(),
                            'PEACE JUSTICE AND STRONG INSTITUTIONS'.toLocaleLowerCase(),
                            'QUALITY EDUCATION'.toLocaleLowerCase(),
                            'REDUCED INEQUALITIES'.toLocaleLowerCase(),
                            'RESPONSIBLE CONSUMPTION AND PRODUCTION'.toLocaleLowerCase(),
                            'SUSTAINABLE CITES AND COMMUNITIES'.toLocaleLowerCase(),
                            'ZERO HUNGER'.toLocaleLowerCase(),
                            'LIFE ON LAND'.toLocaleLowerCase()
                        ],
                        datasets: [
                            {
                                data: [
                                    total.AFFORDABLEANDCLEANENERGY,
                                    total.CLEANWATERANDSANITATION,
                                    total.CLIMATEACTION,
                                    total.DECENTWORKANDECONOMICGROWTH,
                                    total.GENDEREQUALITY,
                                    total.GOODHEALTHANDWELLBEING,
                                    total.INDUSTRYINNOVATIONANDINFRASTRUCTURE,
                                    total.LIFEBELOWWATER,
                                    total.OTHERS,

                                    total.NOPOVERTY,
                                    total.PARTNERSHIPSFORTHEGOALS,
                                    total.PEACEJUSTICEANDSTRONGINSTITUTIONS,
                                    total.QUALITYEDUCATION,
                                    total.REDUCEDINEQUALITIES,
                                    total.RESPONSIBLECONSUMTIONANDPRODUCTION,
                                    total.SUSTAINABLECITESANDCOMMUNITES,
                                    total.ZEROHUNGER,
                                    total.LIFEONLAND
                                ],
                                backgroundColor: [
                                    '#36A2EB',
                                    '#FF6384',
                                    '#33FF00',
                                    '#993300',
                                    '#CCFF00',
                                    '#FF9900',
                                    '#FF0099',
                                    '#FFA07A',
                                    '#8A2BE2',
                                    '#7FFFD4',
                                    '#CD5C5C',
                                    '#20B2AA',
                                    '#191970',
                                    '#9ACD32',
                                    '#BC8F8F',
                                    '#00FFFF',
                                    '#DC143C',
                                    '#E9967A'
                                ],
                                hoverBackgroundColor: [
                                    '#36A2EB',
                                    '#FF6384',
                                    '#33FF00',
                                    '#993300',
                                    '#CCFF00',
                                    '#FF9900',
                                    '#FF0099',
                                    '#FFA07A',
                                    '#8A2BE2',
                                    '#7FFFD4',
                                    '#CD5C5C',
                                    '#20B2AA',
                                    '#191970',
                                    '#9ACD32',
                                    '#BC8F8F',
                                    '#00FFFF',
                                    '#DC143C',
                                    '#E9967A'
                                ]
                            }
                        ]
                    });

                    // setRegisteredChartData({
                    //     labels: ['ATL Ideas', 'NON ATL Ideas'],
                    //     datasets: [
                    //         {
                    //             data: [total.ATL_Count, total.NonATL_Count],
                    //             backgroundColor: ['#36A2EB', '#FF6384'],
                    //             hoverBackgroundColor: ['#36A2EB', '#FF6384']
                    //         }
                    //     ]
                    // });
                    var array = chartTableData;
                    array.push({ district: 'Total Count', ...total });
                    setChartTableData(array);
                    setDownloadTableData(chartTableData);
                    setTotalCount(total);
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };
    // console.log(downloadTableData);

    return (
        <>
            <Layout>
                <Container className="RegReports mt-4 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col>
                            <h2>IDEA STATUS Detailed Report</h2>
                        </Col>
                        <Col className="text-right mb-1">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() => history.push('/admin/reports')}
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
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={SDGDate}
                                            setValue={setsdg}
                                            placeHolder={'Select SDG'}
                                            value={sdg}
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
                                {chartTableData.length > 0 && (
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
                                                        // setIsDownloading(true);
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
                                                <div className="table-wrapper bg-white">
                                                    {/* <div
                                                        className="table-wrapper bg-white "
                                                        style={{
                                                            overflowX: 'auto'
                                                        }}
                                                    > */}
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
                                                                    No of Ideas
                                                                    Submitted
                                                                </th>
                                                                <th>
                                                                    AFFORDABLE
                                                                    AND CLEAN
                                                                    ENERGY
                                                                </th>
                                                                <th>
                                                                    CLEAN WATER
                                                                    AND
                                                                    SANITATION
                                                                </th>
                                                                <th>
                                                                    CLIMATE
                                                                    ACTION
                                                                </th>
                                                                <th>
                                                                    DECENT WORK
                                                                    AND ECONOMIC
                                                                    GROWTH
                                                                </th>
                                                                <th>
                                                                    GENDER
                                                                    EQUALITY
                                                                </th>
                                                                <th>
                                                                    GOOD HEALTH
                                                                    AND WELL
                                                                    BEING
                                                                </th>
                                                                <th>
                                                                    INDUSTRY
                                                                    INNOVATION
                                                                    AND
                                                                    INFRASTRUCTURE
                                                                </th>
                                                                <th>
                                                                    LIFE BE LOW
                                                                    WATER
                                                                </th>
                                                                <th>
                                                                    LIFE ON LAND
                                                                </th>
                                                                <th>
                                                                    NO POVERTY
                                                                </th>
                                                                <th>OTHERS</th>
                                                                <th>
                                                                    PARTNERSHIPS
                                                                    FOR THE
                                                                    GOALS
                                                                </th>
                                                                <th>
                                                                    PEACE
                                                                    JUSTICE AND
                                                                    STRONG
                                                                    INSTITUTIONS
                                                                </th>
                                                                <th>
                                                                    QUALITY
                                                                    EDUCATION
                                                                </th>
                                                                <th>
                                                                    REDUCED
                                                                    INEQUALITIES
                                                                </th>
                                                                <th>
                                                                    RESPONSIBLE
                                                                    CONSUMPTION
                                                                    AND
                                                                    PRODUCTION
                                                                </th>
                                                                <th>
                                                                    SUSTAINABLE
                                                                    CITES AND
                                                                    COMMUNITIES
                                                                </th>
                                                                <th>
                                                                    ZERO HUNGER
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {chartTableData.map(
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
                                                                                item.totalSubmited
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.AFFORDABLEANDCLEANENERGY
                                                                            }
                                                                        </td>

                                                                        <td>
                                                                            {
                                                                                item.CLEANWATERANDSANITATION
                                                                            }
                                                                        </td>

                                                                        <td>
                                                                            {
                                                                                item.CLIMATEACTION
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.DECENTWORKANDECONOMICGROWTH
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.GENDEREQUALITY
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.GOODHEALTHANDWELLBEING
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.INDUSTRYINNOVATIONANDINFRASTRUCTURE
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.LIFEBELOWWATER
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.LIFEONLAND
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.NOPOVERTY
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.OTHERS
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.PARTNERSHIPSFORTHEGOALS
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.PEACEJUSTICEANDSTRONGINSTITUTIONS
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.QUALITYEDUCATION
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.REDUCEDINEQUALITIES
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.RESPONSIBLECONSUMTIONANDPRODUCTION
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.SUSTAINABLECITESANDCOMMUNITES
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.ZEROHUNGER
                                                                            }
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
                                                                        totalCount.totalSubmited
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.ATL_Count
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.NonATL_Count
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        totalCount.Agriculture
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.DisasterManagement
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.EducationSkillDevelopment
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Health
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Inclusivity
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Mobility
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.OTHERS
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        totalCount.Space
                                                                    }
                                                                </td>
                                                            </tr> */}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-5 mt-5">
                                            <div className="row">
                                                <Row>
                                                    {/* <Col>
                                                            <div className="col-md-6 text-center mt-3">
                                                                <p>
                                                                    <b>
                                                                        Overall
                                                                        ATL
                                                                        Ideas vs
                                                                        Non ATL
                                                                        Ideas As
                                                                        of{' '}
                                                                        {
                                                                            newFormat
                                                                        }
                                                                    </b>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 doughnut-chart-container">
                                                                {registeredChartData && (
                                                                    <Doughnut
                                                                        data={
                                                                            registeredChartData
                                                                        }
                                                                        options={
                                                                            chartOption
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </Col> */}
                                                    <Col>
                                                        <div className="col-md-6 text-center mt-3">
                                                            <p>
                                                                <b>
                                                                    Ideas Theme
                                                                    As of{' '}
                                                                    {newFormat}
                                                                </b>
                                                            </p>
                                                        </div>
                                                        <div className="col-md-12 doughnut-chart-container">
                                                            {registeredGenderChartData && (
                                                                <Doughnut
                                                                    data={
                                                                        registeredGenderChartData
                                                                    }
                                                                    options={
                                                                        chartOptions
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                    // </div>
                                )}
                                {downloadTableData && (
                                    <CSVLink
                                        data={downloadTableData}
                                        headers={summaryHeaders}
                                        filename={`IdeaDetailedSummaryReport_${newFormat}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefTable}
                                    >
                                        Download Table CSV
                                    </CSVLink>
                                )}

                                {downloadData && (
                                    <CSVLink
                                        headers={teacherDetailsHeaders}
                                        data={downloadData}
                                        filename={`${distEx}_IdeaDetails_Report_${newFormat}.csv`}
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
export default ReportsRegistration;
