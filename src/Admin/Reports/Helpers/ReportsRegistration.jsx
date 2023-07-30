import React, { useState,useEffect,useRef} from 'react';
import Layout from '../../Layout';
import { Container, Row, Col,Table} from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import { openNotificationWithIcon,getCurrentUser } from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch,useSelector } from 'react-redux';
import Select from '../Helpers/Select';
import axios from 'axios';
import '../reports.scss';
import { Doughnut } from 'react-chartjs-2';
import { notification } from 'antd';

const ReportsRegistration = () => {
    
    const [RegTeachersdistrict, setRegTeachersdistrict] = React.useState('');
    const [filterType, setFilterType] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [notRegisteredData, setNotRegisteredData] = useState([]);
    const filterOptions = ['Registered','Not Registered'];
    const [downloadData, setDownloadData] = useState(null); 
    const [downloadNotRegisteredData, setDownloadNotRegisteredData] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [statsshowTable, setStatsShowTable] = useState(false);
    const csvLinkRef = useRef();
    const csvLinkRefNotRegistered = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const fullDistrictsNames = useSelector((state) => state?.studentRegistration?.dists);
    const [regChartTableData, setRegChartTableData] = useState([]);
    const [nonRegChartTableData, setNonRegChartTableData] = useState([]);
    const [chartData, setChartData] = useState({
        labels: ['Registered', 'Not Registered'],
        datasets: [
            {
                label: 'Teacher Registration Status',
                data: [regChartTableData.length, nonRegChartTableData.length],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    });
       
    useEffect(() => {
        dispatch(getDistrictData());
        fetchChartTableData();
        setStatsShowTable(true);
    }, []);

    const chartOptions = {
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
            labels: {
                fontColor: 'black',
            },
        },
    };
    
    const fetchData = (item) => {
        const url = item === 'Registered'
            ? `/reports/mentorRegList`
            : item === 'Not Registered'
                ? `/reports/notRegistered`
                : '';

        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
        };
        
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    if (item === 'Registered') {
                        setFilteredData(response?.data?.data || []);
                        setDownloadData(response?.data?.data || []);
                    } else if (item === 'Not Registered') {
                        setNotRegisteredData(response?.data?.data || []);
                        setDownloadNotRegisteredData(response?.data?.data || []);
                    }
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };

    const fetchChartTableData = () => {
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/reports/mentorRegNONregCount', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`,
            },
        };
    
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    const firstDataItem = response?.data?.data[0];

                    const notRegisteredCount = firstDataItem?.Count?.[0]?.notRegisteredCount || 0;
                    const registeredCount = firstDataItem?.Count?.[1]?.RegisteredCount || 0;


                    const allDistricts = Array.from(new Set([
                        ...(firstDataItem?.reglist?.map(item => item.district) || []),
                        ...(firstDataItem?.nonreglist?.map(item => item.district) || []),
                    ]));

                    const registeredDistricts = {};
                    firstDataItem?.reglist?.forEach(item => {
                        registeredDistricts[item.district] = item.RegisteredCount;
                    });

                    const notRegisteredDistricts = {};
                    firstDataItem?.nonreglist?.forEach(item => {
                        notRegisteredDistricts[item.district] = item.notRegisteredCount;
                    });

                    const chartTableData = allDistricts.map(district => {
                        return {
                            district,
                            RegisteredCount: registeredDistricts[district] || 0,
                            notRegisteredCount: notRegisteredDistricts[district] || 0,
                        };
                    });
                    setRegChartTableData(chartTableData);
                    setNonRegChartTableData(chartTableData);

                    setChartData({
                        labels: ['Registered', 'Not Registered'],
                        datasets: [
                            {
                                label: 'Teacher Registration Status',
                                data: [notRegisteredCount,registeredCount],
                                // [    
                                //     firstDataItem?.reglist?.length || 0,
                                //     firstDataItem?.nonreglist?.length || 0,
                                // ],
                                
                                backgroundColor: ['#36A2EB', '#FF6384'],
                                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                            },
                        ],
                    });
                }
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };
    
    const handleViewDetails = () => {
        if (!filterType) {
            notification.warning({
                message: 'Please select a filter type before viewing details.',
            });
            return;
        }
        setShowTable(true);
        setStatsShowTable(false);
        fetchData(filterType);
    };

    const handleDownload = () => {
        if (!filterType) {
            return;
        }
        fetchData(filterType);

        if (filterType === 'Registered') {
            csvLinkRef.current.link.click();
        } else if (filterType === 'Not Registered') {
            csvLinkRefNotRegistered.current.link.click();
        }
        openNotificationWithIcon('success',`${filterType} Downloaded Successfully`);
    };

    useEffect(() => {
        if (filteredData.length > 0) {
            setDownloadData(filteredData);
        }
    }, [filteredData]);

    console.log('regChartTableData length:', regChartTableData.length);
    console.log('nonRegChartTableData length:', nonRegChartTableData.length);

    return (
        <>
            <Layout>
                <Container className="RegReports mt-5 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <Col><h2>Teacher Registration Status</h2></Col>
                        <Col className="text-right mb-1">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() => history.push('/admin/reports')}
                            />
                        </Col>
                        <div className="reports-data p-5  mt-5 bg-white">
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

                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-6"
                                        size="small"
                                        shape="btn-square"
                                        onClick={handleViewDetails}
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />
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
                                {statsshowTable && regChartTableData.length > 0 && nonRegChartTableData.length > 0 && (
                                    <div className="mt-5">
                                        <h3>STATISTICS OVERVIEW</h3>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="table-wrapper bg-white">
                                                    <Table
                                                        id="dataTable"
                                                        className="table table-striped table-bordered responsive"
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>District Name</th>
                                                                <th>Reg. Count</th>
                                                                <th>Not Reg. Count</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {regChartTableData.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index+1}</td>
                                                                    <td>{item.district}</td>
                                                                    <td>{item.RegisteredCount || 0}</td>
                                                                    <td>{item.notRegisteredCount || 0}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                                <Doughnut data={chartData} options={chartOptions} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showTable && filterType === 'Registered' && (
                                    <div className="mt-5">
                                        <h3>Data based on Filter: {filterType}</h3>
                                        <div className="table-wrapper bg-white">
                                            <div className="table-wrapper">
                                                <Table id="dataTable" className="table table-striped table-bordered responsive">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Phone Number</th>
                                                            <th>Organization Code</th>
                                                            <th>Organization District</th>
                                                            <th>Organization Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.full_name}</td>
                                                                <td>{item.mobile}</td>
                                                                <td>{item['organization.organization_code']}</td>
                                                                <td>{item['organization.district']}</td>
                                                                <td>{item['organization.organization_name']}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div> 
                                    </div>  
                                )}   
                                {showTable && filterType === 'Not Registered' && (
                                    <div className="mt-5">
                                        <h3>Data based on Filter: Not Registered</h3>
                                        <div className="table-wrapper bg-white">
                                            <div className="table-wrapper">
                                                <Table id="dataTable" className="table table-striped table-bordered responsive">
                                                    <thead>
                                                        <tr>
                                                            <th>Organization ID</th>
                                                            <th>Organization Name</th>
                                                            <th>Organization Code</th>
                                                            <th>District</th>
                                                            <th>City</th>
                                                            <th>State</th>
                                                            <th>Principal Name</th>
                                                            <th>Principal Mobile</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {notRegisteredData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.organization_id}</td>
                                                                <td>{item.organization_name}</td>
                                                                <td>{item.organization_code}</td>
                                                                <td>{item.district}</td>
                                                                <td>{item.city}</td>
                                                                <td>{item.state}</td>
                                                                <td>{item.principal_name}</td>
                                                                <td>{item.principal_mobile}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {downloadData && (
                                    <CSVLink
                                        data={downloadData}
                                        filename={`Teacher_Registration_Status_${filterType}.csv`}
                                        className="hidden"
                                        ref={csvLinkRef}
                                    >
                                    Download CSV
                                    </CSVLink>
                                )} 
                                {downloadNotRegisteredData && (
                                    <CSVLink
                                        data={downloadNotRegisteredData}
                                        filename={`Teacher_Registration_Status_${filterType}.csv`}
                                        className="hidden"
                                        ref={csvLinkRefNotRegistered}
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
                
