/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { Tabs } from 'antd';
import Layout from '../Layout';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
const { TabPane } = Tabs;

const TicketsPage = () => {
    const currentUser = getCurrentUser('current_user');
    const [allTicketResponse, setAllTicketResponse] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [fetchData, setFetchData] = useState(false);

    useEffect(async () => {
        await listApi();
    }, []);

    async function listApi() {
        // where we can see all tickets //
        setFetchData(true);
        // alert('hii');
        const config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/supportTickets',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                    // setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function openListApi() {
        setFetchData(true);
        // where we can see all open tickets //
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/supportTickets?status=OPEN',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function inProgressApi() {
        setFetchData(true);
        // where  we can see  all inprogress tickets //
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/supportTickets?status=INPROGRESS',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function resolvedApi() {
        setFetchData(true);
        // where we ca see all resolved tickets //
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/supportTickets?status=RESOLVED',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                    setFetchData(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function invalidApi() {
        // where we can see all invalid tickets //
        const config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/supportTickets?status=INVALID',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setAllTicketResponse(
                        response.data.data[0] &&
                            response.data.data[0].dataValues
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const allData = {
        data: allTicketResponse,
        columns: [
            {
                name: 'No',
                // selector: (row) => row.index,
                selector: (row, key) => key + 1,
                // cellExport: (row) => row.index,
                width: '10rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                cellExport: (row) => row.district,
                sortable: true,
                width: '20rem'
            },

            {
                name: 'UDISE Code',
                selector: (row) => row.organization_code,
                cellExport: (row) => row.organization_code,
                sortable: true,
                width: '20rem'
            },

            {
                name: ' Query Details',
                selector: (row) => row.query_details,
                cellExport: (row) => row.query_details,

                width: '45rem',
                // center: true,
                cell: (params) => [
                    <Link
                        key={params.support_ticket_id}
                        to={`/report/support-journey/ans-ticket?id=${params.support_ticket_id}`}
                    >
                        {params?.query_details} <FaComments />{' '}
                        {params.replies_count}{' '}
                    </Link>
                ]
            },

            {
                name: 'Status',
                selector: (row) => row.status,
                cellExport: (row) => row.status,

                width: '20rem',
                cell: (params) => [
                    params.status === 'OPEN' ? (
                        <span className="py-2 px-4 rounded-pill bg-danger bg-opacity-25 text-danger fw-bold">
                            Open
                        </span>
                    ) : params.status === 'INPROGRESS' ? (
                        <span className="py-2 px-4 rounded-pill bg-info bg-opacity-25 text-info fw-bold">
                            Inprogress
                        </span>
                    ) : params.status === 'RESOLVED' ? (
                        <span className="bg-success bg-opacity-25 px-4 py-2 rounded-pill text-success fw-bold">
                            Resolved
                        </span>
                    ) : params.status === 'INVALID' ? (
                        <span className="bg-warning bg-opacity-25 px-4 py-2 rounded-pill text-warning fw-bold">
                            Invalid
                        </span>
                    ) : (
                        ''
                    )
                ]
            }
        ]
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(allData.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    const changeTab = async (e) => {
        if (e === '1') {
            await listApi();
        } else if (e === '2') {
            await openListApi();
        } else if (e === '3') {
            await inProgressApi();
        } else if (e === '4') {
            await resolvedApi();
        } else {
            await invalidApi();
        }
    };

    return (
        <Layout>
            {/* <PageConstruction /> */}
            <Container className="ticket-page mb-50">
                <Row className="mt-5 pt-5">
                    <h2>Support</h2>
                    <div className="ticket-data">
                        <Tabs
                            defaultActiveKey="1"
                            onChange={(key) => changeTab(key)}
                        >
                            <TabPane tab="All Tickets" key="1">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane tab="Open" key="2">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane tab="Inprogress" key="3">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane tab="Resolved" key="4">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            export={true}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                            <TabPane tab="Invalid" key="5">
                                {fetchData ? (
                                    <ClipLoader
                                        // fetchData={fetchData}
                                        color={'blue'}
                                        size={20}
                                    />
                                ) : (
                                    <div className="my-2">
                                        <DataTableExtensions
                                            print={false}
                                            // export={false}
                                            {...allData}
                                            exportHeaders
                                        >
                                            <DataTable
                                                data={rows}
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                            />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </TabPane>
                        </Tabs>
                    </div>
                </Row>
            </Container>
        </Layout>
    );
};

export default TicketsPage;
