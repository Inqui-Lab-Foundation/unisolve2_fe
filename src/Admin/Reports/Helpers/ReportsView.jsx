import React, { useEffect, useState } from 'react';
import { getNormalHeaders } from '../../../helpers/Utils';

import Layout from '../../Layout';
import { Container, Row, Col } from 'reactstrap';
import { BreadcrumbTwo } from '../../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../../stories/Button';

import axios from 'axios';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { useHistory } from 'react-router-dom';
import { URL, KEY } from '../../../constants/defaultValues';
const ReportsView = () => {
    // her we can see challenges reports view in district wise and count //
    // const currentUser = getCurrentUser('current_user');
    const history = useHistory();
    // const [rows, setRows] = React.useState([]);
    const [listData, setListData] = useState([]);
    const disTrict = JSON.parse(localStorage.getItem('district'));

    const headingDetails = {
        title: 'View Reports',
        options: []
    };

    useEffect(() => {
        handleDistAPI(disTrict);
    }, []);

    async function handleDistAPI(disTrict) {
        // handleDistAPI where disTrict  = district //
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axiosConfig['params'] = {
            level: disTrict
        };
        await axios
            .get(`${URL.getReportsView}`, axiosConfig)
            .then((res) => {
                if (res?.status == 200) {
                    setListData(res && res.data && res.data.data);
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    var reportList = {
        data: listData,
        columns: [
            {
                name: 'District',
                selector: 'district',
                width: '50%'
            },
            {
                name: 'Count',
                selector: 'count',
                width: '16%'
            }
        ]
    };
    return (
        <Layout>
            <Container className="ReportsView pt-3 pt-xl-5">
                <Row className="pt-5">
                    <Row className="mb-2 mb-sm-5 mb-md-5 mb-lg-0">
                        <Col className="col-auto">
                            <BreadcrumbTwo {...headingDetails} />
                        </Col>
                        <Col className="text-right">
                            <Button
                                label="Back"
                                btnClass="primary mx-3"
                                size="small"
                                shape="btn-square"
                                onClick={() => history.push('/admin/reports')}
                            />
                        </Col>
                    </Row>
                    <Col>
                        <div className="my-2">
                            <DataTableExtensions
                                print={false}
                                export={false}
                                {...reportList}
                            >
                                <DataTable
                                    // data={rows}
                                    defaultSortField="id"
                                    defaultSortAsc={false}
                                    // pagination
                                    highlightOnHover
                                    fixedHeader
                                    subHeaderAlign={Alignment.Center}
                                />
                            </DataTableExtensions>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
export default ReportsView;
