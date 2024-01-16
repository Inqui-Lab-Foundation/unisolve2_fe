/* eslint-disable indent */

import React, { useEffect } from 'react';
import './EvaluatedIdea.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getL1EvaluatedIdea } from '../store/evaluator/action';
import EvaluatedIdeaDetail from './EvaluatedIdeaDetail';
import { Container, Row, Col } from 'reactstrap';
import Select from '../Helper/Select';
import { getDistrictData } from '../../redux/studentRegistration/actions';
import { cardData } from '../../Student/Pages/Ideas/SDGData';
import { Button } from '../../stories/Button';
import Spinner from 'react-bootstrap/Spinner';

const EvaluatedIdea = () => {
    // here we can see all the EvaluatedIdeas in  status wise , district wise , SDG wise   //
    const dispatch = useDispatch();
    const [showspin, setshowspin] = React.useState(false);
    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');
    const evaluatedIdeaList = useSelector(
        (state) => state?.evaluator.evaluatedIdeaL1
    );

    const SDGDate = cardData.map((i) => {
        return i.goal_title;
    });
    SDGDate.unshift('ALL SDGs');
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    const [tabledate, settabledate] = React.useState([]);

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);
    useEffect(() => {
        if (district === '') {
            settabledate([]);
        } else {
            settabledate(evaluatedIdeaList);
        }
    }, [evaluatedIdeaList]);

    const handleclickcall = () => {
        // here we can select status , district , SDG //
        setshowspin(true);
        dispatch(getL1EvaluatedIdea(filterParams, setshowspin));
    };
    const levelparam = '?evaluation_status=SELECTEDROUND1&level=L2';
    const districtparam =
        district && district !== 'All Districts' ? '&district=' + district : '';
    const sdgparam = sdg && sdg !== 'ALL SDGs' ? '&sdg=' + sdg : '';
    const filterParams = levelparam + districtparam + sdgparam;
    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState([]);
    const [currentRow, setCurrentRow] = React.useState(1);
    const [tablePage, setTablePage] = React.useState(1);

    const evaluatedIdea = {
        data: tabledate || [],
        columns: [
            {
                name: 'No',
                cell: (params, index) => {
                    return [
                        <div className="ms-3" key={params}>
                            {index + 1}
                        </div>
                    ];
                },
                sortable: true,
                width: '9rem'
            },
            // {
            //     name: 'Udise Code',
            //     selector: (row) => row.organization_code || '',
            //     sortable: true,
            //     width: '15rem'
            // },
            // {
            //     name: 'Team Name',
            //     selector: (row) => row.team_name || '',
            //     sortable: true,
            //     width: '15rem'
            // },
            {
                name: 'CID',
                selector: (row) => row.challenge_response_id || '',
                sortable: true,
                width: '9rem'
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
                width: '20rem'
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
                        {row?.response[8]?.selected_option}
                    </div>
                ),
                // sortable: true,
                width: '25rem'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.initiated_name,
                width: '15rem'
            },
            {
                name: 'Submitted At',
                selector: (row) => row.submitted_at,
                cell: (row) => (
                    <div
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word'
                        }}
                    >
                        {row.submitted_at
                            ? moment(row.submitted_at).format(
                                  'DD-MM-YY h:mm:ss'
                              )
                            : row.submitted_at}
                    </div>
                ),
                width: '15rem'
            },
            {
                name: 'Evaluated At',
                selector: (row) =>
                    row?.evaluator_ratings[0]?.created_at
                        ? moment(row?.evaluator_ratings[0]?.created_at).format(
                              'DD-MM-YY h:mm:ss'
                          )
                        : row?.evaluator_ratings[0]?.created_at,
                width: '17rem'
            },
            {
                name: 'Overall',

                cell: (row) => {
                    return [
                        <div className="d-flex" key={row}>
                            <span>{row?.evaluator_ratings[0]?.overall}</span>
                        </div>
                    ];
                },
                width: '10rem'
            },
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
                                    evaluatedIdeaList?.forEach((item, i) => {
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
                                View Idea Details
                            </div>
                        </div>
                    ];
                },
                width: '17rem',
                left: true
            }
        ]
    };

    const handleNext = () => {
        // here we go for next page //
        if (evaluatedIdeaList && currentRow < evaluatedIdeaList?.length) {
            setIdeaDetails(evaluatedIdeaList[currentRow]);
            setIsDetail(true);
            setCurrentRow(currentRow + 1);
        }
    };
    const handlePrev = () => {
        // here we can go for previous page //
        if (evaluatedIdeaList && currentRow >= 1) {
            setIdeaDetails(evaluatedIdeaList[currentRow - 2]);
            setIsDetail(true);
            setCurrentRow(currentRow - 1);
        }
    };

    return (
        <Layout>
            <div className="container evaluated_idea_wrapper pt-5 mb-50">
                <div className="row">
                    <div className="col-12 p-0">
                        {!isDetail && (
                            <div>
                                <h2 className="ps-2 pb-3">L2 Evaluated Idea</h2>
                                <Container fluid className="px-0">
                                    <Row className="align-items-center">
                                        <Col md={3}>
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
                                        <Col md={3}>
                                            <div className="my-3 d-md-block d-flex justify-content-center">
                                                <Select
                                                    list={SDGDate}
                                                    setValue={setsdg}
                                                    placeHolder={'Select SDG'}
                                                    value={sdg}
                                                />
                                            </div>
                                        </Col>

                                        <Col md={1}>
                                            <div className="text-center">
                                                <Button
                                                    btnClass={
                                                        district && sdg
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    size="small"
                                                    label="Search"
                                                    disabled={
                                                        !(district && sdg)
                                                    }
                                                    onClick={() =>
                                                        handleclickcall()
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
                                        {...evaluatedIdea}
                                    >
                                        <DataTable
                                            data={evaluatedIdeaList || []}
                                            defaultSortField="id"
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
                                        />
                                    </DataTableExtensions>
                                </div>
                            ) : (
                                <EvaluatedIdeaDetail
                                    ideaDetails={ideaDetails}
                                    setIsDetail={setIsDetail}
                                    handleNext={handleNext}
                                    handlePrev={handlePrev}
                                    currentRow={currentRow}
                                    dataLength={
                                        evaluatedIdeaList &&
                                        evaluatedIdeaList?.length
                                    }
                                    levelName="L2"
                                />
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default EvaluatedIdea;
