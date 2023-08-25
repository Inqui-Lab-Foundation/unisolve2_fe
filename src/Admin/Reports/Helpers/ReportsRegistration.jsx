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
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../Helpers/Select';
import axios from 'axios';
import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';

const ReportsRegistration = () => {
    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [filterType, setFilterType] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const filterOptions = ['Registered', 'Not Registered'];
    const [downloadData, setDownloadData] = useState(null);
    console.log(downloadData, 'Data');
    const [downloadNotRegisteredData, setDownloadNotRegisteredData] =
        useState(null);
    const [chartTableData, setChartTableData] = useState([]);
    const csvLinkRefTable = useRef();
    const csvLinkRef = useRef();
    const csvLinkRefNotRegistered = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const [registeredGenderChartData, setRegisteredGenderChartData] =
        useState(null);
    const [registeredChartData, setRegisteredChartData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    const [downloadTableData, setDownloadTableData] = useState(null);
    const summaryHeaders=[
        {
            label: "District Name",
            key: "district"
        },
        {
            label: "Total Eligible Schools",
            key: "organization_count"
        },
        {
            label: "Total Registered Teachers",
            key: "total_registered_teachers"
        },
        {
            label: "Total Not Registered Teachers",
            key: "total_not_registered_teachers"
        },
        {
            label: "Registered Male Teachers",
            key: "male_mentor_count"
        },
        {
            label: "Registered Female Teachers",
            key: "female_mentor_count"
        },
    ];
    const RegHeaders=[
        {
            label: "UDISE CODE",
            key: "organization.organization_code"
        },
        {
            label: "School Name",
            key: "organization.organization_name"
        },
        {
            label: "School Type/Category",
            key: "organization.category"
        },
        {
            label: "District",
            key: "organization.district"
        },
        {
            label: "City",
            key: "organization.city"
        },
        {
            label: "HM Name",
            key: "organization.principal_name"
        },
        {
            label: "HM Contact",
            key: "organization.principal_mobile"
        },
        {
            label: "Teacher Name",
            key: "full_name"
        },
        {
            label: "Teacher Gender",
            key: "gender"
        },
        {
            label: "Teacher Contact",
            key: "mobile"
        },
        {
            label: "Teacher WhatsApp Contact",
            key: "whatapp_mobile"
        },
        
    ];
    const notRegHeaders=[
        {
            label: "Organization_Id",
            key: "organization_id"
        },
        {
            label: "UDISE CODE",
            key: "organization_code"
        },
        {
            label: "School Name",
            key: "organization_name"
        },
        {
            label: "School Type/Category",
            key: "category"
        },
        {
            label: "District",
            key: "district"
        },
        {
            label: "City",
            key: "city"
        },
        {
            label: "State",
            key: "state"
        },
        {
            label: "Country",
            key: "country"
        },
        {
            label: "HM Name",
            key: "principal_name"
        },
        {
            label: "HM Contact",
            key: "principal_mobile"
        },
        {
            label: "HM Email",
            key: "principal_email"
        },
    ];
    

    useEffect(() => {
        dispatch(getDistrictData());
        fetchChartTableData();
        //setStatsShowTable(true);
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

    const fetchData = (item) => {
        const url =
            item === 'Registered'
                ? `/reports/mentorRegList?district=${RegTeachersdistrict}`
                : item === 'Not Registered'
                ? `/reports/notRegistered?district=${RegTeachersdistrict}`
                : '';

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
                    if (item === 'Registered') {
                        setFilteredData(response?.data?.data || []);
                        setDownloadData(response?.data?.data || []);

                        csvLinkRef.current.link.click();
                    } else if (item === 'Not Registered') {
                        //setNotRegisteredData(response?.data?.data || []);
                        setDownloadNotRegisteredData(
                            response?.data?.data || []
                        );
                        csvLinkRefNotRegistered.current.link.click();
                    }
                    openNotificationWithIcon(
                        'success',
                        `${filterType} Report Downloaded Successfully`
                    );
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };

    const handleDownload = () => {
        if (!RegTeachersdistrict || !filterType) {
            notification.warning({
                message:
                    'Please select a district and filter type before Downloading Reports.'
            });
            return;
        }
        setIsDownloading(true);
        fetchData(filterType);
    };

    useEffect(() => {
        if (filteredData.length > 0) {
            setDownloadData(filteredData);
            setIsDownloading(false);
        }
    }, [filteredData, downloadNotRegisteredData]);

    useEffect(() => {
        if (downloadComplete) {
            setDownloadComplete(false);
            setRegTeachersdistrict('');
            setFilterType('');
        }
    }, [downloadComplete]);

    console.log("Not Registered Data:", downloadNotRegisteredData);

    const fetchChartTableData = () => {
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/reports/mentorsummary',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    const chartTableData = response?.data?.data || [];
                    setChartTableData(chartTableData);
                    setDownloadTableData(chartTableData);

                    const lastRow = chartTableData[chartTableData.length - 1];
                    const maleCount = lastRow?.male_mentor_count || 0;
                    const femaleCount = lastRow?.female_mentor_count || 0;
                    const regCount = lastRow?.total_registered_teachers || 0;
                    const regNotCount =
                        lastRow?.total_not_registered_teachers || 0;

                    setRegisteredGenderChartData({
                        labels: ['Male', 'Female'],
                        datasets: [
                            {
                                data: [maleCount, femaleCount],
                                backgroundColor: ['#36A2EB','#FF6384'],
                                hoverBackgroundColor: ['#36A2EB','#FF6384']
                            }
                        ]
                    });

                    setRegisteredChartData({
                        labels: ['Registered', 'Not Registered'],
                        datasets: [
                            {
                                data: [regCount, regNotCount],
                                backgroundColor: ['#36A2EB','#FF6384'],
                                hoverBackgroundColor: ['#36A2EB','#FF6384']
                            }
                        ]
                    });
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };

    return (
        <>
            <Layout>
                <Container className="RegReports mt-4 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col>
                            <h2>Teacher Registration Status</h2>
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
                                            list={filterOptions}
                                            setValue={setFilterType}
                                            placeHolder={'Select Filter'}
                                            value={filterType}
                                        />
                                    </div>
                                </Col>

                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    {/* <Button
                                        label="View Details"
                                        btnClass="primary mx-6"
                                        size="small"
                                        shape="btn-square"
                                        onClick={handleViewDetails}
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    /> */}
                                    <Button
                                        onClick={handleDownload}
                                        //label={'Download Report'}
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
                                                        setIsDownloading(true);
                                                        setDownloadTableData(null); // Reset data
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
                                            <div className="col-md-7">
                                                <div className="table-wrapper bg-white">
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
                                                                    Total
                                                                    Eligible
                                                                    Schools
                                                                </th>
                                                                <th>
                                                                    Total
                                                                    Registered
                                                                    Teachers
                                                                </th>
                                                                <th>
                                                                    Total Not
                                                                    Registered
                                                                    Teachers
                                                                </th>
                                                                <th>
                                                                    Registered
                                                                    Male
                                                                    Teachers
                                                                </th>
                                                                <th>
                                                                    Registered
                                                                    Female
                                                                    Teachers
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
                                            <div className="col-md-5">
                                                <div className="row">
                                                    <div className="col-md-12 doughnut-chart-container">
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
                                                    <div className="col-md-11 text-center mt-3">
                                                        <p>
                                                            <b>
                                                                Overall
                                                                Registered and
                                                                Not Registered
                                                                Count
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
                                                    <div className="col-md-11 text-center mt-3">
                                                        <p>
                                                            <b>
                                                                Overall
                                                                Registered Male
                                                                vs Female
                                                                Teachers
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
                                        headers={summaryHeaders}
                                        filename={`Mentor_Summary_Table.csv`}
                                        className="hidden"
                                        ref={csvLinkRefTable}
                                        onDownloaded={() => {
                                            setIsDownloading(false);
                                            setDownloadComplete(true);
                                        }}
                                    >
                                        Download Table CSV
                                    </CSVLink>
                                )}
                                {downloadData && (
                                    <CSVLink
                                        data={downloadData}
                                        headers={RegHeaders}
                                        filename={`Teacher_Registration_Status_${filterType}.csv`}
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
                                {downloadNotRegisteredData && (
                                    <CSVLink
                                        data={downloadNotRegisteredData}
                                        headers={notRegHeaders}
                                        filename={`Teacher_Registration_Status_${filterType}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefNotRegistered}
                                        onDownloaded={() => {
                                            setIsDownloading(false);
                                            setDownloadComplete(true);
                                        }}
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
export default ReportsRegistration;
