/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './style.scss';
import Layout from '../Layout.jsx';
import { Container, Row, Col } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getNormalHeaders } from '../../helpers/Utils';
import axios from 'axios';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { KEY, URL } from '../../constants/defaultValues';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { Button } from '../../stories/Button';

const FaqByCategory = () => {
    // eslint-disable-next-line no-unused-vars
    const [rows, setRows] = useState([]);
    const history = useHistory();
    const search = useLocation().search;

    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('teacher');
    const getFaqByCategory = async (id) => {
        if(id === 1){
            setActiveButton('teacher');
        }else if(id===2){
            setActiveButton('student');
        }
        setData([]);
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/faqs/getbyCategoryid/${id}`, axiosConfig)
            .then((res) => {
                if (res?.status === 200) {
                    const updatedWithKey =
                        res?.data?.data &&
                        res?.data?.data.map((item, i) => {
                            const upd = { ...item };
                            upd['key'] = i + 1;
                            return upd;
                        });
                    setData(updatedWithKey);
                }
            })
            .catch((err) => {
                console.log(
                    '🚀 ~ file: ManageFaq.jsx ~ line 91 ~ useEffect ~ err',
                    err.response
                );
            });
    };

    useEffect(async () => {
        await getFaqByCategory(1);
    }, []);
    const deleteFaq = async (faqID,catId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const axiosConfig = getNormalHeaders(KEY.User_API_Key);
                axios
                    .delete(`${process.env.REACT_APP_API_BASE_URL}/faqs/deletefaqandtranslation?faq_id=${faqID}`, axiosConfig)
                    .then(async (faqDeleteRes) => {
                        if (faqDeleteRes?.status == 200) {
                            Swal.fire(
                                'Faq Deleted Successfully..!!',
                                '',
                                'success'
                            );
                            await getFaqByCategory(catId);
                        }
                    })
                    .catch((err) => {
                        console.log(
                            '🚀 ~ file: ManageFaq.jsx ~ line 68 ~ useEffect ~ err',
                            err.response
                        );
                    });
            }
        });
    };
    const dataProps = {
        data: data,
        columns: [
            {
                name: 'No.',
                selector: 'key',
                sortable: true,
                width: '9rem'
            },
            {
                name: 'Category',
                selector: (row) =>
                    row.faq_category_id === 1 ? 'Teacher' : 'Student',
                width: '13rem'
            },
            {
                name: 'Questions',
                selector: 'question',
                width: '70rem',
                sortable: true
            },
            {
                name: 'Status',
                selector: (params) => (
                    <div
                        className={`btn ${
                            params.status === 'ACTIVE'
                                ? 'btn-primary'
                                : 'btn-danger'
                        }`}
                    >
                        {params.status}
                    </div>
                ),
                width: '10rem',
                right: true
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div key={params.key}>
                            <a
                                onClick={() =>
                                    history.push(
                                        `/admin/edit-faq/${params.faq_id}`
                                    )
                                }
                            >
                                <i
                                    className="fa fa-edit"
                                    style={{ marginRight: '10px' }}
                                />
                            </a>
                            <a onClick={() => deleteFaq(params.faq_id,params.faq_category_id)}>
                                <i
                                    //key={params.faq_id}
                                    className="fa fa-trash"
                                    style={{ marginRight: '10px' }}
                                />
                            </a>
                        </div>
                    ];
                },
                width: '10rem'
            }
        ]
    };

    return (
        <Layout>
            <Container className="ticket-page mt-5 mb-50 userlist faqList">
                <Row className="pt-2">
                    <Col className="col-auto mb-5 mb-sm-5 mb-md-5 mb-lg-0">
                        <h2>FAQ’s</h2>
                    </Col>
                </Row>
                <Row>
                    <div className="ticket-data p-3 bg-white">
                        <div className="my-5">
                            <Button
                                label={`Add FAQ`}
                                btnClass="primary float-end mb-3"
                                size="small"
                                style={{ marginLeft: '.3rem' }}
                                onClick={() => history.push('/admin/New-faq')}
                            />
                            <Button
                                label={`Student FAQ`}
                                //btnClass={`primary float-end mb-3 ${activeButton === 'student' ? 'active' : ''}`}
                                btnClass="primary float-end mb-3"
                                size="small"
                                style={{
                                    backgroundColor:
                                        activeButton === 'student'
                                            ? '#0d6efd'
                                            : '#ffcb34',
                                    color:
                                        activeButton === 'student'
                                            ? 'white'
                                            : 'black'
                                }}
                                onClick={() => {
                                    setActiveButton('student');
                                    getFaqByCategory(2);
                                }}
                            />
                            <Button
                                label={`Teacher FAQ`}
                                //btnClass={`primary float-end mb-3 ${activeButton === 'teacher' ? 'active' : ''}`}
                                btnClass="primary  float-end mb-3"
                                style={{
                                    backgroundColor:
                                        activeButton === 'teacher'
                                            ? '#0d6efd'
                                            : '#ffcb34',
                                    color:
                                        activeButton === 'teacher'
                                            ? 'white'
                                            : 'black',
                                    marginLeft: '.3rem'
                                }}
                                size="small"
                                onClick={() => {
                                    setActiveButton('teacher');
                                    getFaqByCategory(1);
                                }}
                            />
                            <DataTableExtensions
                                exportHeaders
                                print={false}
                                export={false}
                                {...dataProps}
                            >
                                <DataTable
                                    data={data}
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    pagination
                                    highlightOnHover
                                    fixedHeader
                                    //subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    </div>
                </Row>
            </Container>
        </Layout>
    );
};

export default FaqByCategory;
