/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Layout from '../Pages/Layout';
import { Container, Row, Col, Badge } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../../helpers/Utils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Evalprocess = () => {
    const history = useHistory();
    const [evalList, setEvalList] = useState([]);
    const currentUser = getCurrentUser('current_user');
    useEffect(async () => {
        await handleEvalList();
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

    const handleDic = (item) => {
        // where we can select district //
        // where item = district //
        history.push({
            pathname: '/eadmin/selectingDistricts-evaluationProcess'
        });
        localStorage.setItem('eavlId', JSON.stringify(item));
    };

    
    const evalData = {
        data: evalList && evalList.length > 0 ? evalList : [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                // sortable: true,
                width: '6%'
            },

            {
                name: 'Level Name',
                // selector: 'level_name',
                // sortable: true,
                selector: (row) => row.level_name,
                sortable: true,
                width: '10%'
            },
            {
                name: 'Evaluation Schema',
                // selector: 'eval_schema',
                selector: (row) => row.eval_schema,

                width: '15%'
            },
            {
                name: 'No of Evaluations',
                // selector: 'no_of_evaluation',
                selector: (row) => row.no_of_evaluation,

                width: '15%'
            },
            {
                name: 'Status',
                // cellExport: (row) => row.status,

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
            },
            {
                name: 'Actions',
                selector: 'action',
                center: true,
                width: '40%',
                cell: (record) => [
                    <>
                       
                        <div
                            key={record}
                            onClick={() => handleDic(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-success btn-lg mx-2">
                                DISTRICTS
                            </div>
                        </div>
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
                    </Row>

                    <div className="my-2">
                        <DataTableExtensions
                            {...evalData}
                            exportHeaders
                            print={false}
                        >
                            <DataTable
                                data={setEvalList}
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
        </Layout>
    );
};

export default Evalprocess;
