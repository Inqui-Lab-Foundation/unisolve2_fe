/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col, Badge } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';
const evalprocess = () => {
    const history = useHistory();
    const [evalList, setEvalList] = useState([]);
    const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        handleEvalList();
    }, []);
    async function handleEvalList() {
        //  handleEvalList Api where we can see list of all evaluationProcess //
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/evaluationProcess?status=ALL',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setEvalList(
                        response.data &&
                            response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleEdit = (item) => {
        // where we can edit level name, no of evaluation //
        history.push({
            pathname: '/admin/edit-evaluationProcess'
        });
        localStorage.setItem('eavlId', JSON.stringify(item));
    };

    const handleDic = (item) => {
        // where we can select district //
        // where item = district //
        history.push({
            pathname: '/admin/selectingDistricts-evaluationProcess'
        });
        localStorage.setItem('eavlId', JSON.stringify(item));
    };

    const handleActiveStatusUpdate = (item, itemA) => {
        // where we can update the evaluation status //
        // where item = evaluation process id //
        // where itemA = status //
        const body = {
            status: itemA,
            level_name: item.level_name,
            no_of_evaluation: item.no_of_evaluation
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/evaluationProcess/' +
                item.evaluation_process_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                // console.log(response);
                if (response.status === 200) {
                    handleEvalList();

                    openNotificationWithIcon(
                        'success',
                        'Status update successfully'
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                openNotificationWithIcon('error', 'Something went wrong');
            });
    };
    const evalData = {
        data: evalList && evalList.length > 0 ? evalList : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '6%'
                // center: true,
            },
            // {
            //     name: 'Evaluation Id',
            //     selector: 'evaluation_process_id',
            //     // cellExport: (row) => row.evaluation_process_id,

            //     sortable: true,
            //     width: '12%'
            //     // center: true,
            // },
            {
                name: 'Level Name',
                selector: 'level_name',
                width: '10%'
                // center: true,
            },
            {
                name: 'Evaluation Schema',
                selector: 'eval_schema',
                width: '15%'
            },
            {
                name: 'No of Evaluations',
                selector: 'no_of_evaluation',
                width: '15%'
            },
            {
                name: 'Status',
                cellExport: (row) => row.status,

                cell: (row) => [
                    <Badge
                        key={row.evaluation_process_id}
                        bg={`${
                            row.status === 'ACTIVE' ? 'secondary' : 'danger'
                        }`}
                    >
                        {row.status}
                    </Badge>
                ],
                width: '7%'
                // center: right,
            },
            {
                name: 'Actions',
                selector: 'action',
                center: true,
                width: '40%',
                cell: (record) => [
                    <>
                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </Link>

                        <Link
                            exact="true"
                            key={record}
                            onClick={() => handleDic(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-success btn-lg mx-2">
                                DISTRICTS
                            </div>
                        </Link>
                        {record.status == 'ACTIVE' ? (
                            <Link
                                exact="true"
                                key={record}
                                onClick={() =>
                                    handleActiveStatusUpdate(record, 'INACTIVE')
                                }
                                style={{ marginRight: '5px' }}
                            >
                                <div className="btn btn-danger btn-lg  mx-2">
                                    INACTIVE
                                </div>
                            </Link>
                        ) : (
                            <Link
                                exact="true"
                                key={record}
                                onClick={() =>
                                    handleActiveStatusUpdate(record, 'ACTIVE')
                                }
                                style={{ marginRight: '12px' }}
                            >
                                <div className="btn btn-warning btn-lg  mx-2">
                                    ACTIVE
                                </div>
                            </Link>
                        )}
                    </>
                ]
            }
        ]
    };
    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50">
                <Row className="pt-3">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <h2>Evaluation Process</h2>
                        </Col>
                        <Col className="text-right">
                            <Button
                                label="Create EvalProcess"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() =>
                                    history.push(
                                        '/admin/create-evaluationProcess'
                                    )
                                }
                            />
                        </Col>
                    </Row>

                    <div className="my-2">
                        <DataTableExtensions
                            // print={false}
                            // export={false}
                            {...evalData}
                            exportHeaders
                        >
                            <DataTable
                                data={setEvalList}
                                // noHeader
                                defaultSortField="id"
                                defaultSortAsc={false}
                                pagination
                                highlightOnHover
                                fixedHeader
                                subHeaderAlign={Alignment.Center}
                            />
                        </DataTableExtensions>
                    </div>
                </Row>
            </Container>
            {/* <h1>hi</h1> */}
        </Layout>
    );
};

export default evalprocess;
