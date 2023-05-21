/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import './ViewFinalSelectedideas.scss';
import Layout from '../../../Admin/Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
//import moment from 'moment';
import ViewDetail from './ViewFinalDetail';
import { useHistory, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { KEY, URL } from '../../../constants/defaultValues';
import { Button } from '../../../stories/Button';
import Select from '../Pages/Select';
import { Col, Container, Row } from 'reactstrap';
import { cardData } from '../../../Student/Pages/Ideas/SDGData.js';
import { useSelector } from 'react-redux';
import { getDistrictData } from '../../../redux/studentRegistration/actions';
import { useDispatch } from 'react-redux';
import { getCurrentUser, getNormalHeaders } from '../../../helpers/Utils';
import { Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { FaDownload, FaHourglassHalf } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import TableDetailPdf from './TableDetailPdf';

const ViewSelectedIdea = () => {
    const { search } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const title = new URLSearchParams(search).get('title');
    const level = new URLSearchParams(search).get('level');
    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const [tableData, settableData] = React.useState({});
    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');
    const [currentRow, setCurrentRow] = React.useState(1);
    const [tablePage, setTablePage] = React.useState(1);
    const [showspin, setshowspin] = React.useState(false);

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    SDGDate.unshift('ALL SDGs');
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    const filterParamsfinal =
        (district && district !== 'All Districts'
            ? '&district=' + district
            : '') + (sdg && sdg !== 'ALL SDGs' ? '&sdg=' + sdg : '');
    // const filterParamsfinal = (district && district !== 'All Districts' ? '&district=' + district : '') +
    // (sdg && sdg !== 'ALL SDGs' ? '&sdg=' + sdg : '')+(title && title == '0' ? '&final_status=0' : '&final_status=1');

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const handlePromotelFinalEvaluated = (item) => {
        promoteapi(item.challenge_response_id);
    };

    async function promoteapi(id) {
        const body = JSON.stringify({ final_result: '1' });
        var config = {
            method: 'put',
            url: `${
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/updateEntry/' +
                id
            }`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    handleclickcall();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleclickcall = () => {
        setshowspin(true);
        handleideaList();
    };

    async function handleideaList() {
        settableData({});
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(
                `${URL.getFinalEvaluation}?key=${
                    title && title == '0' ? '0' : '1'
                }${filterParamsfinal}`,
                axiosConfig
            )
            .then(function (response) {
                if (response.status === 200) {
                    const updatedWithKey =
                        response.data &&
                        response.data.data.map((item, i) => {
                            const upd = { ...item };
                            upd['key'] = i + 1;
                            return upd;
                        });
                    settableData(updatedWithKey && updatedWithKey);
                    setshowspin(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setshowspin(false);
            });
    }
    // const average = arr => arr.reduce((p,c) => p+c,0)/arr.length;
    const evaluatedIdeafinal = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row) => row.key,
                sortable: true,
                width: '6%'
            },
            {
                name: 'CID',
                selector: (row) => row.challenge_response_id,
                width: '6%'
            },
            {
                name: 'Team Name',
                selector: (row) => row?.team_name || '',
                sortable: true
                //width: '11.5%'
            },
            {
                name: 'SDG',
                selector: (row) => row?.sdg,
                width: '10%'
            },
            // {
            //     name: 'Submitted By',
            //     selector: (row) => row.evaluator_ratings[0]?.challenge_response?.initiated_name,
            //     width: '11.5%'
            // },

            {
                name: 'Novelty',
                selector: (row) => {
                    return [
                        row.evaluator_ratings
                            ? row.evaluator_ratings.length > 0
                                ? row.evaluator_ratings[0].param_1_avg
                                : ' '
                            : ' '
                    ];
                },
                //  width : '8%'
                sortable: true
            },
            {
                name: 'Usefulness',
                selector: (row) => {
                    return [
                        row.evaluator_ratings
                            ? row.evaluator_ratings.length > 0
                                ? row.evaluator_ratings[0].param_2_avg
                                : ' '
                            : ' '
                    ];
                },
                //  width : '9%'
                sortable: true
            },
            {
                name: 'Feasability',
                selector: (row) => {
                    return [
                        row.evaluator_ratings
                            ? row.evaluator_ratings.length > 0
                                ? row.evaluator_ratings[0].param_3_avg
                                : ' '
                            : ' '
                    ];
                },
                //  width : '9%'
                sortable: true
            },
            {
                name: 'Scalability',
                selector: (row) => {
                    return [
                        row.evaluator_ratings
                            ? row.evaluator_ratings.length > 0
                                ? row.evaluator_ratings[0].param_4_avg
                                : ' '
                            : ' '
                    ];
                },
                //  width : '9%'
                sortable: true
            },
            {
                name: 'Sustainability',
                selector: (row) => {
                    return [
                        row.evaluator_ratings
                            ? row.evaluator_ratings.length > 0
                                ? row.evaluator_ratings[0].param_5_avg
                                : ' '
                            : ' '
                    ];
                },
                //  width : '11%'
                sortable: true
            },
            {
                name: 'Overall',
                selector: (row) => {
                    return [
                        row.evaluator_ratings
                            ? row.evaluator_ratings.length > 0
                                ? row.evaluator_ratings[0].overall_avg
                                : ' '
                            : ' '
                    ];
                },
                //  width : '7%'
                sortable: true
            },

            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
                                    console.warn(params);
                                    setIdeaDetails(params);
                                    setIsDetail(true);
                                    let index = 0;
                                    tableData?.forEach((item, i) => {
                                        if (
                                            item?.challenge_response_id ==
                                            params?.challenge_response_id
                                        ) {
                                            index = i;
                                        }
                                    });
                                    setCurrentRow(index + 1);
                                }}
                            >
                                View
                            </div>
                            <div className="mx-2 pointer d-flex align-items-center">
                                {!pdfLoader ? (
                                    <FaDownload
                                        size={22}
                                        onClick={() => {
                                            downloadPDF(params);
                                        }}
                                        className="text-danger"
                                    />
                                ) : (
                                    <FaHourglassHalf
                                        size={22}
                                        className="text-info"
                                    />
                                )}
                            </div>
                            {params.final_result === '0' && (
                                <Link
                                    //exact="true"
                                    // key={record}
                                    onClick={() =>
                                        handlePromotelFinalEvaluated(params)
                                    }
                                    style={{ marginRight: '12px' }}
                                >
                                    <div className="btn btn-info btn-lg mx-2">
                                        Promote
                                    </div>
                                </Link>
                            )}
                        </div>
                    ];
                },
                width: '18%',
                left: true
            }
        ]
    };
    const [sortid, setsortid] = useState();
    const handlesortid = (e) => {
        setsortid(e.id);
    };

    const showbutton = district && sdg;

    const handleNext = () => {
        if (tableData && currentRow < tableData?.length) {
            setIdeaDetails(tableData[currentRow]);
            setIsDetail(true);
            setCurrentRow(currentRow + 1);
        }
    };
    const handlePrev = () => {
        if (tableData && currentRow >= 1) {
            setIdeaDetails(tableData[currentRow - 2]);
            setIsDetail(true);
            setCurrentRow(currentRow - 1);
        }
    };

    const [pdfLoader, setPdfLoader] = React.useState(false);
    const [teamResponse, setTeamResponse] = React.useState([]);
    const [details, setDetails] = React.useState();
    const downloadPDF = async (params) => {
        await setDetails(params);
        if (params?.response) {
            await setTeamResponse(
                Object.entries(params?.response).map((e) => e[1])
            );

            setPdfLoader(true);
            const domElement = document.getElementById('pdfIdd');
            await html2canvas(domElement, {
                onclone: (document) => {
                    document.getElementById('pdfIdd').style.display = 'block';
                },
                scale: 1.13
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'px', [2580, 3508]);
                pdf.addImage(
                    imgData,
                    'JPEG',
                    20,
                    20,
                    2540,
                    pdf.internal.pageSize.height,
                    undefined,
                    'FAST'
                );
                pdf.save(`${new Date().toISOString()}.pdf`);
            });
            setPdfLoader(false);
        }
    };

    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div id="pdfIdd" style={{ display: 'none' }}>
                    <TableDetailPdf
                        ideaDetails={details}
                        teamResponse={teamResponse}
                        level={level}
                    />
                </div>
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && (
                            <div>
                                <h2 className="ps-2 pb-3">
                                    {title == '0'
                                        ? 'Final Evaluated'
                                        : 'Final Winners'}{' '}
                                    Challenges
                                </h2>

                                <Container fluid className="px-0">
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <div className="my-3 d-md-block d-flex justify-content-center">
                                                <Select
                                                    list={fullDistrictsNames}
                                                    setValue={setdistrict}
                                                    placeHolder={
                                                        'Select District'
                                                    }
                                                    value={district}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="my-3 d-md-block d-flex justify-content-center">
                                                <Select
                                                    list={SDGDate}
                                                    setValue={setsdg}
                                                    placeHolder={'Select SDG'}
                                                    value={sdg}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="text-center">
                                                <Button
                                                    btnClass={
                                                        showbutton
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    size="small"
                                                    label="Search"
                                                    disabled={!showbutton}
                                                    onClick={() =>
                                                        handleclickcall()
                                                    }
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="text-right">
                                                <Button
                                                    btnClass="primary"
                                                    size="small"
                                                    label="Back"
                                                    onClick={() =>
                                                        history.goBack()
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )}
                        {showspin && (
                            <div className="text-center mt-5">
                                <Spinner
                                    animation="border"
                                    variant="secondary"
                                />
                            </div>
                        )}
                        {!showspin &&
                            (!isDetail ? (
                                <div className="bg-white border card pt-3 mt-5">
                                    <DataTableExtensions
                                        print={false}
                                        export={false}
                                        {...evaluatedIdeafinal}
                                    >
                                        <DataTable
                                            data={tableData || []}
                                            //defaultSortField="id"
                                            defaultSortFieldId={sortid}
                                            defaultSortAsc={false}
                                            pagination
                                            highlightOnHover
                                            fixedHeader
                                            subHeaderAlign={Alignment.Center}
                                            paginationRowsPerPageOptions={[
                                                10, 25, 50, 100
                                            ]}
                                            paginationPerPage={10}
                                            onChangePage={(page) =>
                                                setTablePage(page)
                                            }
                                            paginationDefaultPage={tablePage}
                                            onSort={(e) => handlesortid(e)}
                                        />
                                    </DataTableExtensions>
                                </div>
                            ) : (
                                <ViewDetail
                                    ideaDetails={ideaDetails}
                                    setIsDetail={setIsDetail}
                                    handleNext={handleNext}
                                    handlePrev={handlePrev}
                                    currentRow={currentRow}
                                    dataLength={tableData && tableData?.length}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ViewSelectedIdea;
