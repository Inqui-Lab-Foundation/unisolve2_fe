import React, { useState, useEffect, useRef} from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Table } from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import { getCurrentUser} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../Helpers/Select';
import axios from 'axios';
import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
//import { notification } from 'antd';

const TeacherDetailed = () => {
    const [district, setdistrict] = React.useState('');
    const [mentorDetailedReportsData, setmentorDetailedReportsData] = useState([]);
    const [chartTableData, setChartTableData] = useState([]);
    const [registeredChartData, setRegisteredChartData] = useState(null);
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const csvLinkRef = useRef();
    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector((state) => state?.studentRegistration?.dists);
    const barChartData = {
        labels: ['chennai', 'Coimbatore', 'Madurai', 'karur', 'Salem', 'Theni', 'Vellore', 'Bangalore', 'Ranipet', 'Erode'],
        datasets: [
            {
                label: 'No.of Students Enrolled',
                data: [15, 28, 10, 45, 32, 20, 37, 18, 25, 30],
                backgroundColor: 'rgba(75, 162, 192, 0.6)',
                borderWidth: 0.5,
            },
            {
                label: 'No. of Teams created',
                data: [5, 8, 5, 20, 17, 10, 32, 10, 13, 12],
                backgroundColor: 'rgba(255, 0, 0, 0.6)',
                borderWidth: 0.5,
            },
        ],
    };
    const stackedBarChartData = {
        labels: ['chennai', 'Coimbatore', 'Madurai', 'karur', 'Salem', 'Theni', 'Vellore', 'Bangalore', 'Ranipet', 'Erode'],
        datasets: [
            {
                label: 'No. of Teachers not started course',
                data: [10, 20, 30, 25, 15, 10, 5, 8, 12, 18],
                backgroundColor: 'rgba(0, 128, 0, 0.6)',
            },
            {
                label: 'No. of Teachers course inprogress',
                data: [5, 8, 5, 20, 17, 10, 32, 10, 13, 12],
                backgroundColor: 'rgba(255, 255, 0, 0.6)',
            },
            {
                label: 'No. of teachers completed course',
                data: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                backgroundColor: 'rgba(255, 0, 0, 0.6)',
            },
        ],
    };
    
    useEffect(() => {
        dispatch(getDistrictData());
        //fetchChartTableData();
        const fakeChartData = [
            { district: 'chennai', organization_count: 50,total_no_of_teams_created:2,total_no_of_students_enrolled:4, total_registered_teachers: 30, total_not_registered_teachers: 20,No_of_Teachers_Completed_the_course:20,No_of_Teachers_course_inprogress:5,No_of_Teachers_not_started_course:5},
            { district: 'Coimbatore', organization_count: 40,total_no_of_teams_created:5,total_no_of_students_enrolled:3, total_registered_teachers: 25, total_not_registered_teachers: 15,No_of_Teachers_Completed_the_course:15,No_of_Teachers_course_inprogress:8, No_of_Teachers_not_started_course:4},
            { district: 'Erode', organization_count: 50,total_no_of_teams_created:4,total_no_of_students_enrolled:5, total_registered_teachers: 30, total_not_registered_teachers: 20,No_of_Teachers_Completed_the_course:3,No_of_Teachers_course_inprogress:7,No_of_Teachers_not_started_course:5 },
            { district: 'Kannur', organization_count: 40,total_no_of_teams_created:3,total_no_of_students_enrolled:2, total_registered_teachers: 25, total_not_registered_teachers: 15,No_of_Teachers_Completed_the_course:5,No_of_Teachers_course_inprogress:10,No_of_Teachers_not_started_course:7},
        ];
        setChartTableData(fakeChartData);
        const male = 30; 
        const female = 20; 
        setRegisteredChartData({
            labels: ['Male', 'Female'],
            datasets: [
                {
                    data: [male, female],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                },
            ],
        });
    }, []);

    const chartOption = {
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black'
            }
        },
    };
    
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                },
            },
            x: {
                grid: {
                    display: true,
                    drawBorder: true, 
                    color: 'rgba(0, 0, 0, 0.2)', 
                    lineWidth: 0.5, 
                },
            },
        },
    };
    const stackedBarChartOptions = {
        ...options,
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
            },
            y: {
                stacked: true,
            },
        },
    };
    const handleDownload = () => {
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/reports/mentordeatilscsv',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setmentorDetailedReportsData(response?.data?.data || []);
                    csvLinkRef.current.link.click();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // const fetchChartTableData = () => {
    //     const config = {
    //         method: 'get',
    //         url: process.env.REACT_APP_API_BASE_URL + '/reports/mentorsummary',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${currentUser?.data[0]?.token}`
    //         }
    //     };

    //     axios(config)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 const chartTableData = [
    //                     { district: 'chennai', organization_count: 50, total_registered_teachers: 30, total_not_registered_teachers: 20 },
    //                     { district: 'Coimbatore', organization_count: 40, total_registered_teachers: 25, total_not_registered_teachers: 15 },
    //                     { district: 'Erode', organization_count: 50, total_registered_teachers: 30, total_not_registered_teachers: 20 },
    //                     { district: 'Kannur', organization_count: 40, total_registered_teachers: 25, total_not_registered_teachers: 15 },
    //                 ];
    //                 setChartTableData(chartTableData);

    //                 const lastRow = chartTableData[chartTableData.length - 1];
    //                 const regCount = lastRow?.total_registered_teachers || 0;
    //                 const regNotCount =lastRow?.total_not_registered_teachers || 0;

    //                 setRegisteredChartData({
    //                     labels: ['Registered', 'Not Registered'],
    //                     datasets: [
    //                         {
    //                             data: [regCount, regNotCount],
    //                             backgroundColor: ['#36A2EB','#FF6384'],
    //                             hoverBackgroundColor: ['#36A2EB','#FF6384']
    //                         }
    //                     ]
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('API error:', error);
    //         });
    // };
    
    return (
        <>
            <Layout>
                <Container className="RegReports mt-4 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col>
                            <h2>Teacher Progress Detailed Report</h2>
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
                                            setValue={setdistrict}
                                            placeHolder={'Select District'}
                                            value={district}
                                        />
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                        <Select
                                            list={['School']}
                                            setValue={'Select Category'}
                                            placeHolder={'Select Category'}
                                            //value={'Select Category'}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    {/* <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        onClick={() =>
                                            fetchData(
                                                'Teachers Course Completion List'
                                            )
                                        }
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    /> */}

                                    <Button
                                        onClick={handleDownload}
                                        label={'Download Report'}
                                        btnClass="primary mx-3"
                                        size={'small'}
                                        shape="btn-square"
                                        type="submit"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
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
                                                // onClick={() => {
                                                //     if (downloadTableData) {
                                                //         setIsDownloading(true);
                                                //         setDownloadTableData(null); // Reset data
                                                //         csvLinkRefTable.current.link.click();
                                                //     }
                                                // }}
                                                style={{
                                                    width: '150px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="table-wrapper bg-white">
                                                    <Table
                                                        id="dataTable"
                                                        className="table table-striped table-bordered responsive"
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>DistrictName</th>
                                                                <th>
                                                                    Total
                                                                    Registered
                                                                    Teachers
                                                                </th>
                                                                <th>
                                                                    Total of
                                                                    No.of Teams
                                                                    Created
                                                                </th>
                                                                <th>
                                                                    Total of 
                                                                    No.of Students
                                                                    Teachers
                                                                </th>
                                                                <th>
                                                                    No. of Female 
                                                                    Students
                                                                </th>
                                                                <th>
                                                                    No. of Male 
                                                                    Students
                                                                </th>
                                                                <th>
                                                                    No. of Teachers
                                                                    Completed 
                                                                    the course
                                                                </th>
                                                                <th>
                                                                    No. of Teachers
                                                                    course InProgress
                                                                </th>
                                                                <th>
                                                                    No. of Teachers
                                                                    not started course
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
                                                                                item.organization_count
                                                                            }
                                                                        </td>
                                                                        <td>{item.total_no_of_teams_created}</td>
                                                                        <td>{item.total_no_of_students_enrolled}</td>
                                                                        <td>{item.No_of_Teachers_Completed_the_course}</td>
                                                                        <td>{item.No_of_Teachers_course_inprogress}</td>
                                                                        <td>
                                                                            {
                                                                                item.total_registered_teachers
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.total_not_registered_teachers
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.male_mentor_count
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.female_mentor_count
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-11 text-center mt-1">
                                                        <p>
                                                            <b>
                                                            Students Male vs Female
                                                            </b>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-4 doughnut-chart-container">
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
                                                    <div>
                                                        <h3>Teams,Students Enrolled AS of Date</h3>
                                                        <Bar data={barChartData} options={options} />
                                                    </div>
                                                    <div>
                                                        <h3>Teacher Course Status As of Date</h3>
                                                        <Bar data={stackedBarChartData} options={stackedBarChartOptions} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {mentorDetailedReportsData && (
                                    <CSVLink
                                        data={mentorDetailedReportsData}
                                        filename={`Teacher Detailed Reports.csv`}
                                        className="hidden"
                                        ref={csvLinkRef}
                                    >
                                        Download Not Registered CSV
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
export default TeacherDetailed;

// const fetchData = (item) => {
//     const url =
//         item === 'Teachers Course Completion List'
//             ? '/reports/courseComplete'
//             : '';

//     const config = {
//         method: 'get',
//         url: process.env.REACT_APP_API_BASE_URL + url,
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${currentUser?.data[0]?.token}`
//         }
//     };
//     axios(config)
//         .then(function (response) {
//             if (response.status === 200) {
//                 setTeacherCourseReportsData(response?.data?.data);
//                 setTeacherCourseShowTable(true);
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// };
