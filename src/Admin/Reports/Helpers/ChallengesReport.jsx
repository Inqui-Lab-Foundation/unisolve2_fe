import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { Container, Row, Col} from 'reactstrap';
import { Button } from '../../../stories/Button';
import { CSVLink } from 'react-csv';
import {openNotificationWithIcon,getCurrentUser} from '../../../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from './Select';
import axios from 'axios';
import '../reports.scss';

const ChallengesReport = () => {
    const [district, setdistrict] = React.useState('');
    const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    const [reportsData, setReportsData] = useState([]);
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const handleDownload = (item) => {
        setMsg(item);
        var url = '';
        if (item === 'Submitted Challenges') {
            url = `/reports/challengesDistrictCount?level=SUBMITTED`;
        } else if (item == 'Draft Challenges') {
            url = `/reports/challengesDistrictCount?level=DRAFT`;
        } else if (item == 'Accepted Challenges') {
            url = `/reports/challengesDistrictCount?level=SELECTEDROUND1`;
        } else if (item == 'Rejected Challenges') {
            url = `/reports/challengesDistrictCount?level=REJECTEDROUND1`;
        } else if (item == 'L1 - Yet to Processed Challenges') {
            url = `/reports/challengesDistrictCount?level=L1YETPROCESSED`;
        } else if (item == 'L2 - Processed Challenges') {
            url = `/reports/challengesDistrictCount?level=L2PROCESSED`;
        } else if (item == 'L2 - Yet to  Processed Challenges') {
            url = `/reports/challengesDistrictCount?level=L2YETPROCESSED`;
        } else if (item == 'Final Evaluation Challenges') {
            url = `/reports/challengesDistrictCount?level=FINALCHALLENGES`;
        } else if (item == 'Final Winner Challenges') {
            url = `/reports/challengesDistrictCount?level=FINALACCEPTED`;
        }else{
            return;
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
                    var msg ='';
                    
                    if (item == 'Submitted Challenges') {
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
    
    return (
        <>
            <Layout>
                <Container className="Reports mt-5 mb-30 userlist">
                    <Row className="mt-0 pt-2">
                        <h2>Challenges Reports</h2>
                        <Col className="text-right mb-2">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() => history.push('/admin/reports')}
                            />
                        </Col>
                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Submitted Challenges List</h2>
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
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-6"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('Submitted Challenges');}}
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
                        </div>
                    </Row>
                </Container>

                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Draft Challenges List</h2>
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
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('Draft Challenges');}}
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
                        </div>
                    </Row>
                </Container>
                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Accepted Challenges List</h2>
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
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />
                                    <Button
                                        onClick={() => {handleDownload('Accepted Challenges');}}
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
                        </div>
                    </Row>
                </Container>
                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Rejected Challenges List</h2>
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
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('Rejected Challenges');}}
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
                        </div>
                    </Row>
                </Container>
                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>L1- Yet to Processed Challenges List</h2>
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
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('L1 - Yet to Processed Challenges');}}
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
                        </div>
                    </Row>
                </Container>
                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>L2-Processed Challenges List</h2>
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
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('L2 - Processed Challenges');}}
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
                        </div>
                    </Row>
                </Container>
                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>L2- Yet to Processed Challenges List</h2>
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
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('L2 - Yet to  Processed Challenges');}}
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
                        </div>
                    </Row>
                </Container>
                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Final Evaluation Challenges List</h2>
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
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('Final Evaluation Challenges');}}
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
                        </div>
                    </Row>
                </Container>
                <Container className="Reports mt-3 mb-50 userlist">
                    <Row className="mt-0 pt-2">
                        <Col className="text-right mb-2"></Col>

                        <div className="reports-data p-5 bg-white">
                            <Row className="align-items-center">
                                <h2>Final Winner Challenges List</h2>
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
                                <Col
                                    md={3}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <Button
                                        label="View Details"
                                        btnClass="primary mx-3"
                                        size="small"
                                        shape="btn-square"
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    />

                                    <Button
                                        onClick={() => {handleDownload('Final Winner Challenges');}}
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
                        </div>
                    </Row>
                </Container>
            </Layout>
            <div className="m-3 common-flex">
                <CSVLink
                    style={{ display: 'none' }}
                    id="CSVBtn"
                    data={
                        reportsData.length > 0
                            ? reportsData
                            : []
                    }
                    filename={
                        msg === 'Submitted Challenges'
                            ? 'Submitted Challenges.csv'
                            : msg === 'Draft Challenges'
                                ? 'Draft Challenges.csv'
                                : msg === 'Accepted Challenges'
                                    ? 'Accepted Challenges.csv'
                                    : msg === 'Rejected Challenges'
                                        ? 'Rejected Challenges.csv'
                                        : msg === 'L1 - Yet to Processed Challenges'
                                            ? 'L1 - Yet to Processed Challenges.csv'
                                            : msg === 'L2 - Processed Challenges'
                                                ? 'L2 - Processed Challenges.csv'
                                                : msg === 'L2 - Yet to  Processed Challenges'
                                                    ? 'L2 - Yet to  Processed Challenges.csv'
                                                    : msg === 'Final Evaluation Challenges'
                                                        ? 'Final Evaluation Challenges.csv'
                                                        : msg === 'Final Winner Challenges'
                                                            ? 'Final Winner Challenges.csv'
                                                            : 'Report.csv'
                    }
                />
            </div>
        </>
    );
};

export default ChallengesReport;
