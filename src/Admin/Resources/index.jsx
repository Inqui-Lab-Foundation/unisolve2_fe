/* eslint-disable indent */
import { useState } from 'react';
import React, { useEffect } from 'react';
import Layout from '../Layout';
import { Container, Row, Col } from 'reactstrap';
import DataTableExtensions from 'react-data-table-component-extensions';
import DataTable, { Alignment } from 'react-data-table-component';
import { getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { openNotificationWithIcon } from '../../helpers/Utils';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';
// import { ReactDOM } from 'react-dom';
// import * as ReactDOM from 'react-dom';

const AdminResources = () => {
    const history = useHistory();
    const [resList, setResList] = useState([]);
    const currentUser = getCurrentUser('current_user');
    useEffect(() => {
        handleResList();
    }, []);
    async function handleResList() {
        //  handleResList Api where we can see list of all resource //
        let config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + '/resource',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResList(
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
            pathname: '/admin/Resources/editResource'
        });
        localStorage.setItem('resID', JSON.stringify(item));
    };

    const handleDelete = async (item) => {
        const resourceID = item.resource_id;
        const confirmed = window.confirm(
            'Are you sure you want to delete this resource?'
        );
        if (!confirmed) {
            return;
        }
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_BASE_URL}/resource/${resourceID}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    }
                }
            );
            if (response.status === 200) {
                openNotificationWithIcon(
                    'success',
                    'Resource succesfully deleted'
                );
                handleResList();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const handleDic = (item) => {
    //     // where we can select district //
    //     // where item = district //
    //     history.push({
    //         pathname: '/admin/selectingDistricts-evaluationProcess'
    //     });
    //     localStorage.setItem('eavlId', JSON.stringify(item));
    // };

    // const handleActiveStatusUpdate = (item, itemA) => {
    //     // where we can update the evaluation status //
    //     // where item = evaluation process id //
    //     // where itemA = status //
    //     const body = {
    //         status: itemA,
    //         role: item.role,
    //         details: item.details,
    //         type: item.type
    //     };
    //     var config = {
    //         method: 'put',
    //         url:
    //             process.env.REACT_APP_API_BASE_URL +
    //             '/resource/' +
    //             item.evaluation_process_id,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${currentUser?.data[0]?.token}`
    //         },
    //         data: body
    //     };
    //     axios(config)
    //         .then(function (response) {
    //             // console.log(response);
    //             if (response.status === 200) {
    //                 handleResList();

    //                 openNotificationWithIcon(
    //                     'success',
    //                     'Status update successfully'
    //                 );
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             openNotificationWithIcon('error', 'Something went wrong');
    //         });
    // };

    // let staticData = [
    //     {
    //       id: 1,
    //       role: 'Schema 1',
    //       details: 'd1',
    //       type: 'file',
    //       file: 'f1.pdf',
    //       link: ''
    //       // other properties...
    //     },
    //     {
    //       id: 2,
    //       role: 'Schema 2',
    //       details: 'd2',
    //       type: 'link',
    //       file: '',
    //       link: 'https://drive.google.com/file/d/1X_VjJzR1RpGdpPotYNknpCNPm4DZgmzt/view?usp=sharing'
    //       // other properties...
    //     },
    //     // Add more objects as needed
    //   ];

    //   ReactDOM.render(
    //     <createResource staticData={staticData} />,
    //     document.getElementById('root')
    // );

    const resData = {
        data: resList && resList.length > 0 ? resList : [],
        // data: staticData,
        columns: [
            {
                name: 'No',
                selector: (row, key) => key + 1,
                sortable: true,
                width: '10%'
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
                name: 'Role',
                selector: 'role',
                width: '10rem'
                // center: true,
            },
            {
                name: 'Details',
                selector: 'description',
                width: '35rem'
            },
            // {
            //     name: 'Type',
            //     selector: 'type',
            //     width: '15%',
            //     // cell: (record) => {
            //     //     if (record.type === 'file') {
            //     //         return (
            //     //             <a href={record.file} download>
            //     //                 <button className="btn btn-primary">Download</button>
            //     //             </a>
            //     //         );
            //     //     } else if (record.type === 'link') {
            //     //         return (
            //     //             <a href={record.navigation}>
            //     //                 <button className="btn btn-primary">Navigate</button>
            //     //             </a>
            //     //         );
            //     //     }
            //     //     return null;
            //     // },
            // },
            {
                name: 'File/Link',
                selector: 'attachments',
                width: '15rem',
                cell: (record) => {
                    if (record.type === 'file') {
                        return (
                            <button className="btn btn-warning  mx-2">
                                <a
                                    href={record.attachments}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Navigate
                                </a>
                            </button>
                        );
                    } else if (record.type === 'link') {
                        return (
                            <button className="btn btn-warning  mx-2">
                                <a
                                    href={record.attachments}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'black' }}
                                >
                                    Navigate
                                </a>
                            </button>
                        );
                    }
                    return null;
                }
            },
            {
                name: 'Actions',
                selector: 'action',
                center: true,
                width: '30rem',
                cell: (record) => [
                    <>
                        <div
                            key={record}
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                EDIT
                            </div>
                        </div>

                        <div
                            key={record}
                            onClick={() => handleDelete(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-primary btn-lg mx-2">
                                DELETE
                            </div>
                        </div>
                        {/* <Link
                            exact="true"
                            key={record}
                            onClick={() => handleDic(record)}
                            style={{ marginRight: '12px' }}
                        >
                            <div className="btn btn-success btn-lg mx-2">
                                DISTRICTS
                            </div>
                        </Link> */}
                        {/* {record.status == 'ACTIVE' ? (
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
                        )} */}
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
                            <h2>Resources</h2>
                        </Col>
                        <Col className="text-right">
                            <Button
                                label="Create Resources"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() =>
                                    history.push(
                                        '/admin/Resources/createResource'
                                    )
                                }
                            />
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
                                data={setResList}
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

export default AdminResources;
