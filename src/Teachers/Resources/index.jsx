/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const TeacherResources = () => {
    const [resList, setResList] = useState([]);
    const currentUser = getCurrentUser('current_user');

    useEffect(() => {
        fetchResourceList();
    }, []);

    async function fetchResourceList() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/resource/list?role=mentor`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    }
                }
            );
            if (response.status === 200) {
                setResList(response.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const resData = {
        data: resList || [],
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '10%'
            },
            {
                name: 'Details',
                selector: 'description',
                width: '65%'
            },
            // {
            //     name: 'Type',
            //     selector: 'type',
            //     width: '25%'
            // },
            {
                name: 'File/Link',
                selector: 'attachments',
                width: '25%',
                cell: (record) => {
                    if (record.type === 'file') {
                        return (
                            <button className="btn btn-warning btn-lg mx-2">
                                <a href={record.attachments} target="_blank" rel="noopener noreferrer" style={{color: 'black'}}>
                                    Navigate
                                </a>
                            </button>
                        );
                    } else if (record.type === 'link') {
                        return (
                            <button className="btn btn-warning btn-lg mx-2">
                                <a href={record.attachments} target="_blank" rel="noopener noreferrer" style={{color: 'black'}}>
                                    Navigate
                                </a>
                            </button>
                        );
                    }
                    return null;
                }
            }
        ]
    };

    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50">
                <Row className="pt-3">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <h2>Resources</h2>
                        </Col>
                    </Row>

                    <div className="my-2">
                        <DataTableExtensions 
                            print={false}
                            export={false}
                            {...resData} 
                            exportHeaders
                        >
                            <DataTable
                                defaultSortField="id"
                                defaultSortAsc={false}
                                pagination
                                highlightOnHover
                                fixedHeader
                                subHeaderAlign="center"
                            />
                        </DataTableExtensions>
                    </div>
                </Row>
            </Container>
        </Layout>
    );
};

export default TeacherResources;
