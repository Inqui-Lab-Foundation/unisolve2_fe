/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { openNotificationWithIcon, getCurrentUser } from '../../helpers/Utils';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import logout from '../../assets/media/logout.svg';
import { useHistory } from 'react-router-dom';
const Translation = (props) => {
    const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const [translationList, setTranslationList] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        handletranslationList();
    }, [count]);
    async function handletranslationList() {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/translations',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTranslationList(response.data && response.data.data[0] && response.data.data[0].dataValues);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    var translationsListArray = {
        data: translationList && translationList.length > 0 ? translationList : [],
        columns: [
            {
                name: 'From',
                selector: 'from_locale',
                width: '8%'
            },
            {
                name: 'To',
                selector: 'to_locale',
                width: '5%'
            },
            {
                name: 'From _Key',
                selector: 'key',
                width: '35%'
            },
            {
                name: 'To_value',
                selector: 'value',
                width: '35%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <a onClick={() => handleEditTranslationById (params)}>
                            <i
                                // key={params.translation_id}
                                className="fa fa-edit"
                                style={{ marginRight: '10px' }}
                            />
                        </a>,
                         <a onClick={() => handleDeleteTranslationById(params)}>
                            <i
                                // key={params.translation_id}
                                className="fa fa-trash"
                                style={{ marginRight: '10px' }}
                            />
                        </a>
                    ];
                },
                width: '17%',
                center: true
            }
        ]
    };
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(translationsListArray.data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    const handleEditTranslationById = (item) => {
        history.push({
            pathname: '/admin/edit-translation',
            item: item
        });
    };
    const handleDeleteTranslationById = (item) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons
            .fire({
                title: 'You are attempting to Delete Translation',
                text: 'Are You Sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    var config = {
                        method: 'delete',
                        url:
                            process.env.REACT_APP_API_BASE_URL +
                            '/translations/' +
                            item.translation_id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${currentUser?.data[0]?.token}`
                        },
                    };
                    axios(config)
                        .then(function (response) {
                            if (response.status === 200) {
                                setCount(count + 1);
                                openNotificationWithIcon(
                                    'success',
                                    'Translation succesfully delete'
                                );
                            } else {
                                openNotificationWithIcon(
                                    'error',
                                    'Opps! Something Wrong'
                                );
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'You are attempting to Delete Translation',
                        'error'
                    );
                }
            });
    };
    return (
        <Layout>
            <Container className="mt-5 pt-5 mb-5">
                <Row className='mb-2'>
                    <Col>
                        <div>
                            <h2>Translation</h2>
                        </div>
                    </Col>
                    <Col className='text-right'>
                        <Button
                            label="Add"
                            btnClass="primary mx-3"
                            size="small"
                            shape="btn-square"
                            onClick={() =>history.push("/admin/create-translation")}
                        />
                    </Col>
                </Row>
                <Row>
                    <div className="my-2">
                        <DataTableExtensions
                            print={false}
                            export={false}
                            {...translationsListArray}
                        >
                            <DataTable
                                data={rows}
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
export default Translation;