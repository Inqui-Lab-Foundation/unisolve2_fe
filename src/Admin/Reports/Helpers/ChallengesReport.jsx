/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col, Card, CardBody } from 'reactstrap'; 
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {openNotificationWithIcon,getCurrentUser} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../reports.scss';

const ChallengesReport = () => {
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [reportsData, setReportsData] = useState([]);
    const [msg, setMsg] = useState('');
    const [detailsData, setDetailsData] = useState(null);
    const [selectedReportLevel, setSelectedReportLevel] = useState(null);

    const levels = [
        { label: 'Submitted Challenges', value: 'SUBMITTED' },
        { label: 'Draft Challenges', value: 'DRAFT' },
        { label: 'Accepted Challenges', value: 'SELECTEDROUND1' },
        { label: 'Rejected Challenges', value: 'REJECTEDROUND1' },
        { label: 'L1 - Yet to be Processed Challenges', value: 'L1YETPROCESSED' },
        { label: 'L2 - Processed Challenges', value: 'L2PROCESSED' },
        { label: 'L2 - Yet to be Processed Challenges', value: 'L2YETPROCESSED' },
        { label: 'Final Evaluation Challenges', value: 'FINALCHALLENGES' },
        { label: 'Final Winner Challenges', value: 'FINALACCEPTED' }
    ];

    const handleDownload = (item) => {
        setMsg(item);
        const level = levels.find((level) => level.label === item);
        if (!level) return;

        let url = `/reports/challengesDistrictCount?level=${level.value}`;

        const config = {
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
                    const msg = `${item} Download Successfully`;
                    openNotificationWithIcon('success', msg);
                    setReportsData(response?.data?.data);
                }
                const element = document.getElementById('CSVBtn');
                element.click();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleViewDetails = (item) => {
        setSelectedReportLevel(item);
        const level = levels.find((level) => level.label === item);
        if (!level) return;
      
        let url = `/reports/challengesDistrictCount?level=${level.value}`;
      
        const config = {
          method: 'get',
          url: process.env.REACT_APP_API_BASE_URL + url,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser?.data[0]?.token}`,
          },
        };
      
        axios(config)
          .then(function (response) {
            if (response.status === 200) {
              setDetailsData(response?.data?.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    const getFilename = () => {
        const selectedLevel = levels.find((level) => level.label === msg);
        return selectedLevel ? `${selectedLevel.label}.csv` : 'Report.csv';
    };

    const generateReportSection = (label) => {
        return (
          <div key={label} className='rep'>
            <Card className="reports-data">
              <CardBody className="p-3 bg-white">
                <Row className="align-items-center">
                  <Col md={9}>
                  <span style={{ fontSize: '16px' }}>{label}</span>
                  </Col>
                  <Col md={3} className="d-flex align-items-center justify-content-end">
                    <Button
                      label="View Details"
                      btnClass="primary mx-3"
                      size="small"
                      shape="btn-square"
                      style={{whiteSpace: 'nowrap'}}
                      onClick={() => handleViewDetails(label)}
                    />
                    <Button
                      onClick={() => {handleDownload(label);}}
                      label={'Download Report'}
                      btnClass="primary mx-3"
                      size={'small'}
                      shape="btn-square"
                      type="submit"
                      style={{whiteSpace: 'nowrap'}}
                    />
                  </Col>
                </Row>
                {selectedReportLevel === label && detailsData && (
                    <div className="reports-data p-5 bg-white">
                        <h2>Report Details</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>District</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailsData.map((details, index) => (
                                    <tr key={index}>
                                        <td>{details.district}</td>
                                        <td>{details.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
              </CardBody>
            </Card>
          </div>
        );
      };
    
      return (
        <>
          <Layout>
            <Container className="challenges-report mt-5 mb-30 userlist">
              <Row className="mt-0 pt-2 align-items-center">
                <Col><h2>Challenges Reports</h2></Col>
                <Col className="text-right mb-1">
                  <Button
                    label="Back"
                    btnClass="primary mx-3"
                    size="small"
                    shape="btn-square"
                    onClick={() => history.push('/admin/reports')}
                  />
                </Col>
                <div className="reports-list mt-5">
                  {levels.map((level) => generateReportSection(level.label))}
                </div>
              </Row>
            </Container>
          </Layout>
          <div className="m-3 common-flex">
            <CSVLink
              style={{ display: 'none' }}
              id="CSVBtn"
              data={reportsData}
              filename={getFilename()}
            />
          </div>
        </>
      );
    };
    
    export default ChallengesReport;