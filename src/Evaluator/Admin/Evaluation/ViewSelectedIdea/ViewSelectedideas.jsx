/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
import './ViewSelectedideas.scss';
import Layout from '../../Pages/Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import moment from 'moment';
import ViewDetail from './ViewDetail';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { KEY, URL } from '../../../../constants/defaultValues';
import { Button } from '../../../../stories/Button';
import Select from '../Pages/Select';
import { Col, Container, Row } from 'reactstrap';
import { cardData } from '../../../../Student/Pages/Ideas/SDGData.js';
import { useSelector } from 'react-redux';
import { getDistrictData } from '../../../../redux/studentRegistration/actions';
import { useDispatch } from 'react-redux';
import {
    ReasonsOptions,
    reasondata2
} from '../../../../Evaluator/Admin/Pages/ReasonForRejectionData';
import { getCurrentUser, getNormalHeaders } from '../../../../helpers/Utils';
import { getAdminEvalutorsList } from '../../../../Admin/store/adminEvalutors/actions';
import { getAdminList } from '../../../../Admin/store/admin/actions';
import { Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { FaDownload, FaHourglassHalf } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import TableDetailPdf from './TableDetailPdf';
import { useReactToPrint } from 'react-to-print';
import DetailToDownload from '../../Challenges/DetailToDownload';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import logout from '../../../../assets/media/logout.svg';
import { categoryValue } from '../../../../Admin/Schools/constentText.js';

const ViewSelectedIdea = () => {
    const { search } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const title = new URLSearchParams(search).get('title');
    const level = new URLSearchParams(search).get('level');
    const evaluation_status = new URLSearchParams(search).get(
        'evaluation_status'
    );
    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const [tableData, settableData] = React.useState({});
    const [reason, setReason] = React.useState('');
    const [reasonSec, setReasonSec] = React.useState('');

    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');
    const [evalname, setevalname] = React.useState('');
    const [currentRow, setCurrentRow] = React.useState(1);
    const [tablePage, setTablePage] = React.useState(1);
    const [showspin, setshowspin] = React.useState(false);

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    SDGDate.unshift('ALL SDGs');
    const fullDistrictsNamesWithAllDistrict = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    let fullDistrictsNames = fullDistrictsNamesWithAllDistrict.filter(item => item !== 'All Districts');
    const [category, setCategory] = useState('');
    const categoryData =
        categoryValue[process.env.REACT_APP_LOCAL_LANGUAGE_CODE];

    const evallist = useSelector(
        (state) => state?.adminEvalutors?.evalutorsList
    );
    const adminlist = useSelector((state) => state?.admin?.adminList);
    const Allevalobj = {};

    const Allevalnamelist = evallist.map((i) => {
        Allevalobj[i.user.full_name] = i.user.user_id;
        return i.user.full_name;
    });
    adminlist?.map((i) => {
        Allevalobj[i.user.full_name] = i.user.user_id;
        Allevalnamelist.push(i.user.full_name);
    });

    const dataParam =
        level === 'L1' && title !== 'L1 - Yet to be Processed'
            ? '&evaluation_status=' + evaluation_status
            : level === 'L1' && title === 'L1 - Yet to be Processed'
            ? '&yetToProcessList=L1'
            : title === 'L2 - Yet to be Processed'
            ? '&yetToProcessList=L2'
            : '';
    const filterParams =
        (district && district !== 'All Districts'
            ? '&district=' + district
            : '') +
        (sdg && sdg !== 'ALL SDGs' ? '&sdg=' + sdg : '') +
        (category && category !== 'All Categorys' ? '&category=' + category :'') +
        (reason && '&rejected_reason=' + reason) +
        (reasonSec && '&rejected_reasonSecond=' + reasonSec) +
        (evalname && '&evaluator_id=' + Allevalobj[evalname]);
    const filterParamsfinal =
        (district && district !== 'All Districts'
            ? '?district=' + district
            : '') + (sdg && sdg !== 'ALL SDGs' ? '&sdg=' + sdg : '');
    useEffect(() => {
        dispatch(getDistrictData());
        dispatch(getAdminEvalutorsList());
        dispatch(getAdminList());
    }, []);

    const handlePromotel2processed = async (item) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });
    
        swalWithBootstrapButtons
            .fire({
                title: 'Promoting to BootCamp',
                text: 'Are you sure ?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Promote',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then(async(result) => {
                if (result.isConfirmed) {
                    await promoteapi(item.challenge_response_id);
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Promoting is cancelled',
                        'error'
                    );
                }
            });
    };

    async function promoteapi(id) {
        const body = JSON.stringify({ final_result: '0' });
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
            .then(async function (response) {
                if (response.status === 200) {
                    await handleclickcall();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleclickcall = async () => {
        setshowspin(true);
        await handleideaList();
    };

    async function handleideaList() {
        settableData({});
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .get(
                title === 'Final'
                    ? `${URL.getidealistfinal}${filterParamsfinal}`
                    : `${URL.getidealist}level=${level}${dataParam}${filterParams}`,
                axiosConfig
            )
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    // const val1 =
                    //     response?.data?.data[0]?.dataValues[0]
                    //         ?.evaluator_ratings[0]?.param_1;
                    // const sum = val1.reduce((acc, value) => acc + value, 0);
                    // const average = sum / val1.length;

                    // console.log('Average:', average);

                    const updatedWithKey =
                        response.data &&
                        response.data.data[0] &&
                        response.data.data[0].dataValues.map((item, i) => {
                            const upd = { ...item };
                            upd['key'] = i + 1;
                            return upd;
                        });
                    settableData(updatedWithKey);
                    setshowspin(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setshowspin(false);
            });
    }

    const evaluatedIdea = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row) => row.key,
                sortable: true,
                width: '8rem'
            },
            {
                name: 'Udise Code',
                selector: (row) => row.organization_code,
                width: '15rem'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name,
                width: '15rem'
            },
            {
                name: 'Idea Name',
                selector: (row) => row?.response[8]?.selected_option || '',
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row?.response[8]?.selected_option || ''}
                    </div>
                ),
                // sortable: true,
                width: '25rem'
            },
            {
                name: 'CID',
                selector: (row) => row.challenge_response_id,
                width: '10rem'
            },
            {
                name: 'Category',
                selector: (row) => row.category,
                width: '15rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                width: '15rem'
            },
            {
                name: 'SDG',
                selector: (row) => row.sdg,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row.sdg}
                    </div>
                ),
                width: '15%'
            },
            // {
            //     name: 'Submitted By',
            //     selector: (row) => row.initiated_name,
            //     width: '15%'
            // },
            // {
            //     name: 'Evaluated By',
            //     cell: (row) => {
            //         return [row.evaluated_name ? row.evaluated_name : ''];
            //     },
            //     width: '15%'
            // },
            // {
            //     name: 'Evaluated At',
            //     selector: (row) =>
            //         row.evaluated_at
            //             ? moment(row.evaluated_at).format('DD-MM-YY h:mm:ss a')
            //             : row.evaluated_at,
            //     width: '15%'
            // },

            {
                name: 'Status',

                cell: (row) => {
                    return [
                        <div className="d-flex" key={row}>
                            {row.evaluation_status &&
                                row.evaluation_status == 'SELECTEDROUND1' && (
                                    <span className="text-success">
                                        Accepted
                                    </span>
                                )}
                            {row.evaluation_status == 'REJECTEDROUND1' && (
                                <span className="text-danger">Rejected</span>
                            )}
                        </div>
                    ];
                },
                width: '10rem'
            },

            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <>
                            <div className="d-flex" key={params}>
                                <div
                                    className="btn btn-primary btn-lg mr-5 mx-2"
                                    onClick={() => {
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
                            </div>
                            <FaDownload
                                size={22}
                                onClick={() => {
                                    handleDownpdf(params);
                                }}
                            />
                        </>
                    ];
                },
                width: '20rem',
                left: true
            }
        ]
    };
    const l1yettoprocessed = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row) => row.key,
                sortable: true,
                width: '10rem'
            },
            {
                name: 'Udise Code',
                selector: (row) => row.organization_code,
                width: '15rem'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name,
                width: '15rem'
            },
            {
                name: 'Idea Name',
                selector: (row) => row?.response[8]?.selected_option || '',
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row?.response[8]?.selected_option || ''}
                    </div>
                ),
                // sortable: true,
                width: '25rem'
            },
            {
                name: 'CID',
                selector: (row) => row.challenge_response_id,
                width: '10rem'
            },
            {
                name: 'Category',
                selector: (row) => row.category,
                width: '15rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                width: '15rem'
            },
            // {
            //     name: 'CID',
            //     selector: (row) => row.challenge_response_id,
            //     width: '10%'
            // },
            {
                name: 'SDG',
                selector: (row) => row.sdg,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row.sdg}
                    </div>
                ),
                width: '15rem'
            },
            // {
            //     name: 'Submitted By',
            //     selector: (row) => row.initiated_name,
            //     width: '20%'
            // },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <div className="d-flex" key={params}>
                            <div
                                className="btn btn-primary btn-lg mr-5 mx-2"
                                onClick={() => {
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
                            <FaDownload
                                size={22}
                                onClick={() => {
                                    handleDownpdf(params);
                                }}
                            />
                        </div>
                    ];
                },
                width: '20rem',
                left: true
            }
        ]
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
        }
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
    };
    // console.log(tableData, 'Data');
    const evaluatedIdeaL2 = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row) => row.key,
                sortable: true,
                width: '8rem'
            },
            {
                name: 'Udise Code',
                selector: (row) => row.organization_code,
                width: '15rem'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name,
                width: '15rem'
            },
            {
                name: 'Idea Name',
                selector: (row) => row?.response[8]?.selected_option || '',
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row?.response[8]?.selected_option || ''}
                    </div>
                ),
                // sortable: true,
                width: '25rem'
            },
            {
                name: 'CID',
                selector: (row) => row.challenge_response_id,
                width: '7rem'
            },
            {
                name: 'Category',
                selector: (row) => row.category,
                width: '15rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                width: '15rem'
            },
            {
                name: 'SDG',
                selector: (row) => row.sdg,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row.sdg}
                    </div>
                ),
                width: '15rem'
            },
            {
                name: 'Quality Score',
                selector: (row) => {
                    return [
                        (
                            ((row.evaluator_ratings[0]?.param_1[0] +
                                row.evaluator_ratings[0]?.param_1[1] +
                                row.evaluator_ratings[0]?.param_1[2]) /
                                3 +
                                (row.evaluator_ratings[0]?.param_2[0] +
                                    row.evaluator_ratings[0]?.param_2[1] +
                                    row.evaluator_ratings[0]?.param_2[2]) /
                                    3) /
                            2
                        ).toFixed(2)
                    ];
                },
                sortable: true,

                // row.evaluator_ratings[0]?.param_2[Number[0 + 1 + 2]],
                width: '15rem'
            },
            {
                name: 'Feasibility Score',
                selector: (row) => {
                    return [
                        (
                            ((row.evaluator_ratings[0]?.param_3[0] +
                                row.evaluator_ratings[0]?.param_3[1] +
                                row.evaluator_ratings[0]?.param_3[2]) /
                                3 +
                                (row.evaluator_ratings[0]?.param_4[0] +
                                    row.evaluator_ratings[0]?.param_4[1] +
                                    row.evaluator_ratings[0]?.param_4[2]) /
                                    3 +
                                (row.evaluator_ratings[0]?.param_5[0] +
                                    row.evaluator_ratings[0]?.param_5[1] +
                                    row.evaluator_ratings[0]?.param_5[2]) /
                                    3) /
                            3
                        ).toFixed(2)
                    ];
                },
                sortable: true,

                // id: 'feasibility',
                // row.evaluator_ratings[0]?.param_2[Number[0 + 1 + 2]],
                width: '20rem'
            },
            // {
            //     name: 'CID',
            //     selector: (row) => row.challenge_response_id,
            //     width: '10%'
            // },
            // {
            //     name: 'Team Name',
            //     selector: (row) => row.team_name || '',
            //     sortable: true,
            //     width: '17%'
            // },

            // {
            //     name: 'Submitted By',
            //     selector: (row) => row.initiated_name,
            //     width: '22%'
            // },
            {
                name: 'Overall',

                selector: (row) =>
                    row.evaluator_ratings[0]?.overall_avg
                        ? row.evaluator_ratings[0]?.overall_avg
                        : '-',
                width: '15rem',
                sortable: true,
                id: 'overall'
            },

            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <>
                            <div className="d-flex" key={params}>
                                <div
                                    className="btn btn-primary btn-lg mr-5 mx-2"
                                    onClick={() => {
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
                            </div>
                            <div className="mx-2 pointer d-flex align-items-center">
                                {/* {!pdfLoader ? (
                                    <FaDownload
                                        size={22}
                                        onClick={async () => {
                                            await downloadPDF(params);
                                        }}
                                        className="text-danger"
                                    />
                                ) : (
                                    <FaHourglassHalf
                                        size={22}
                                        className="text-info"
                                    />
                                )} */}
                                <FaDownload
                                    size={22}
                                    onClick={() => {
                                        handleDownpdf(params);
                                    }}
                                />
                            </div>
                            {/* {!params.final_result && (
                                <div
                                    //exact="true"
                                    // key={record}
                                    onClick={() =>
                                        handlePromotel2processed(params)
                                    }
                                    style={{ marginRight: '12px' }}
                                >
                                    <div className="btn btn-info btn-lg mx-2">
                                        Promote
                                    </div>
                                </div>
                            )} */}
                        </>
                    ];
                },
                width: '15rem',
                left: true
            },
            {
                name: 'L2 Evaluation',
                cell: (params) => {
                    return [
                        <>
                            {!params.final_result && (
                                <div
                                    //exact="true"
                                    // key={record}
                                    onClick={() =>
                                        handlePromotel2processed(params)
                                    }
                                    style={{ marginRight: '12px' }}
                                >
                                    <div className="btn btn-info btn-lg mx-2">
                                        Promote
                                    </div>
                                </div>
                            )}
                        </>
                    ];
                },
                width: '15rem'
            }
        ]
    };

    const L2yettoprocessed = {
        data: tableData && tableData.length > 0 ? tableData : [],
        columns: [
            {
                name: 'No',
                selector: (row) => row.key,
                sortable: true,
                width: '8ren'
            },
            {
                name: 'Udise Code',
                selector: (row) => row.organization_code,
                width: '15rem'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name,
                width: '15rem'
            },
            {
                name: 'Idea Name',
                selector: (row) => row?.response[8]?.selected_option || '',
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row?.response[8]?.selected_option || ''}
                    </div>
                ),
                // sortable: true,
                width: '25rem'
            },
            {
                name: 'CID',
                selector: (row) => row.challenge_response_id,
                width: '10rem'
            },
            {
                name: 'Category',
                selector: (row) => row.category,
                width: '15rem'
            },
            {
                name: 'District',
                selector: (row) => row.district,
                width: '15rem'
            },
            {
                name: 'SDG',
                selector: (row) => row.sdg,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row.sdg}
                    </div>
                ),
                width: '15rem'
            },

            // {
            //     name: 'Submitted By',
            //     selector: (row) => row.initiated_name,
            //     width: '20%'
            // },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <>
                            <div className="d-flex" key={params}>
                                <div
                                    className="btn btn-primary btn-lg mr-5 mx-2"
                                    onClick={() => {
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
                            </div>
                            <div className="mx-2 pointer d-flex align-items-center">
                                {/* {!pdfLoader ? (
                                    <FaDownload
                                        size={22}
                                        onClick={async () => {
                                            await downloadPDF(params);
                                        }}
                                        className="text-danger"
                                    />
                                ) : (
                                    <FaHourglassHalf
                                        size={22}
                                        className="text-info"
                                    />
                                )} */}
                                <FaDownload
                                    size={22}
                                    onClick={() => {
                                        handleDownpdf(params);
                                    }}
                                />
                            </div>
                        </>
                    ];
                },
                width: '20rem',
                left: true
            }
        ]
    };
    // console.log(tableData, '1');
    const [sortid, setsortid] = useState();
    const handlesortid = (e) => {
        setsortid(e.id);
    };
    const sel =
        level === 'L1' && title !== 'L1 - Yet to be Processed'
            ? evaluatedIdea
            : level === 'L1' && title === 'L1 - Yet to be Processed'
            ? l1yettoprocessed
            : level === 'L2' && title !== 'L2 - Yet to be Processed'
            ? evaluatedIdeaL2
            : level === 'L2' && title === 'L2 - Yet to be Processed'
            ? L2yettoprocessed
            : ' ';
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

    ////////////////pdf////////////////
    const componentRef = useRef();
    const [pdfIdeaDetails, setPdfIdeaDetails] = useState('');
    const [pdfTeamResponse, setpdfTeamResponse] = useState('');
    const handleDownpdf = (params) => {
        setPdfIdeaDetails(params);
        if (params?.response) {
            setpdfTeamResponse(
                Object.entries(params?.response).map((e) => e[1])
            );
        }
    };
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${
            pdfIdeaDetails?.team_name ? pdfIdeaDetails?.team_name : 'temp'
        }_IdeaSubmission`
    });
    useEffect(() => {
        if (pdfIdeaDetails !== '' && pdfTeamResponse !== '') {
            handlePrint();
        }
    }, [pdfIdeaDetails, pdfTeamResponse]);

    /////////////////

    return (
        <>
            <div style={{ display: 'none' }}>
                <DetailToDownload
                    ref={componentRef}
                    ideaDetails={pdfIdeaDetails}
                    teamResponse={pdfTeamResponse}
                    level={'Draft'}
                />
            </div>
            <Layout>
                <div className="container evaluated_idea_wrapper pt-5 mb-50">
                    {/* <div id="pdfIdd" style={{ display: 'none' }}>
                        <TableDetailPdf
                            ideaDetails={details}
                            teamResponse={teamResponse}
                            level={level}
                        />
                    </div> */}
                    <div className="row">
                        <div className="col-12 p-0">
                            {!isDetail && (
                                <div>
                                    <h2 className="ps-2 pb-3">
                                        {title} Ideas
                                    </h2>

                                    <Container fluid className="px-0">
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <div className="my-3 d-md-block d-flex justify-content-center">
                                                    <Select
                                                        list={
                                                            fullDistrictsNames
                                                        }
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
                                                        list={categoryData}
                                                        setValue={setCategory}
                                                        placeHolder={
                                                            'Select Category'
                                                        }
                                                        value={category}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className="my-3 d-md-block d-flex justify-content-center">
                                                    <Select
                                                        list={SDGDate}
                                                        setValue={setsdg}
                                                        placeHolder={
                                                            'Select SDG'
                                                        }
                                                        value={sdg}
                                                    />
                                                </div>
                                            </Col>
                                            {level === 'L1' &&
                                                title !==
                                                    'L1 - Yet to be Processed' && (
                                                    <Col md={2}>
                                                        <div className="my-3 d-md-block d-flex justify-content-center">
                                                            <Select
                                                                list={
                                                                    Allevalnamelist
                                                                }
                                                                setValue={
                                                                    setevalname
                                                                }
                                                                placeHolder={
                                                                    'Select evaluator name'
                                                                }
                                                                value={evalname}
                                                            />
                                                        </div>
                                                    </Col>
                                                )}

                                            {title === 'L1 Rejected' ? (
                                                <Col md={2}>
                                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                                        <Select
                                                            list={
                                                                ReasonsOptions
                                                            }
                                                            setValue={setReason}
                                                            placeHolder={
                                                                'Select Reason 1 for rejection'
                                                            }
                                                            value={reason}
                                                        />
                                                    </div>
                                                </Col>
                                            ) : (
                                                ''
                                            )}
                                            {title === 'L1 Rejected' ? (
                                                <Col md={2}>
                                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                                        <Select
                                                            list={reasondata2}
                                                            setValue={
                                                                setReasonSec
                                                            }
                                                            placeHolder={
                                                                'Select Reason 2 for rejection'
                                                            }
                                                            value={reasonSec}
                                                        />
                                                    </div>
                                                </Col>
                                            ) : (
                                                ''
                                            )}
                                            <Col md={1}>
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
                                            <Col
                                                md={
                                                    title === 'L1 Rejected'
                                                        ? 11
                                                        : level === 'L1' &&
                                                          title !==
                                                              'L1 - Yet to be Processed'
                                                        ? 3
                                                        : 5
                                                }
                                            >
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
                                            {...sel}
                                        >
                                            <DataTable
                                                data={tableData || []}
                                                defaultSortFieldId={sortid}
                                                //defaultSortField='ID'
                                                defaultSortAsc={false}
                                                pagination
                                                highlightOnHover
                                                fixedHeader
                                                subHeaderAlign={
                                                    Alignment.Center
                                                }
                                                paginationRowsPerPageOptions={[
                                                    10, 25, 50, 100
                                                ]}
                                                paginationPerPage={10}
                                                onChangePage={(page) =>
                                                    setTablePage(page)
                                                }
                                                paginationDefaultPage={
                                                    tablePage
                                                }
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
                                        dataLength={
                                            tableData && tableData?.length
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default ViewSelectedIdea;
