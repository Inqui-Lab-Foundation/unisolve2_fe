/* eslint-disable indent */

import React, { useEffect } from 'react';
import './EvaluatedIdea.scss';
import Layout from '../Layout';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
// import { Button } from '../../stories/Button';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getL1EvaluatedIdea } from '../store/evaluator/action';
import EvaluatedIdeaDetail from './EvaluatedIdeaDetail';
import { Container, Row, Col } from 'reactstrap';
import Select from '../Helper/Select';
import { getDistrictData } from '../../redux/studentRegistration/actions';
import { ReasonsOptions } from '../Admin/Pages/ReasonForRejectionData';
import { cardData } from '../../Student/Pages/Ideas/SDGData';
import { Button } from '../../stories/Button';
import { getCurrentUser } from '../../helpers/Utils';
import Spinner from 'react-bootstrap/Spinner';

const EvaluatedIdea = () => {
    // here we can see all the EvaluatedIdeas in  status wise , district wise , SDG wise   //
    const dispatch = useDispatch();
    const [showspin, setshowspin] = React.useState(false);
    const currentUser = getCurrentUser('current_user');
    const [reason, setReason] = React.useState('');
    const [district, setdistrict] = React.useState('');
    const [sdg, setsdg] = React.useState('');
    const [status, setstatus] = React.useState('');
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
    const statusdata = ['Accepted', 'Rejected', 'Both'];

    React.useEffect(() => {
        if (status && status === 'Accepted') {
            setReason('');
        }
    }, [status]);
    const [levelName, setLevelName] = React.useState('');
    const [evalSchema, setEvalSchema] = React.useState('');
    const [tabledate, settabledate] = React.useState([]);

    React.useEffect(() => {
        if (currentUser) {
            setLevelName(currentUser?.data[0]?.level_name);
            setEvalSchema(currentUser?.data[0]?.eval_schema);
        }
    }, [currentUser]);

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);
    useEffect(() => {
        if (levelName !== '' && evalSchema !== '') {
            settabledate(evaluatedIdeaList);
        }
    }, [evaluatedIdeaList]);

    const handleclickcall = () => {
        // here we can select status , district , SDG //
        setshowspin(true);
        dispatch(getL1EvaluatedIdea(filterParams, setshowspin));
    };
    const levelparam =
        levelName === 'L1'
            ? '?level=L1'
            : '?evaluation_status=SELECTEDROUND1&level=L2';
    const statusparam =
        status && status !== 'Both'
            ? '&evaluation_status=' +
              (status === 'Accepted' ? 'SELECTEDROUND1' : 'REJECTEDROUND1')
            : '';
    const districtparam =
        district && district !== 'All Districts' ? '&district=' + district : '';
    const sdgparam = sdg && sdg !== 'ALL SDGs' ? '&sdg=' + sdg : '';
    const filterParams =
        levelparam +
        statusparam +
        districtparam +
        sdgparam +
        (reason && '&rejected_reason=' + reason);
    const [isDetail, setIsDetail] = React.useState(false);
    const [ideaDetails, setIdeaDetails] = React.useState([]);
    const [currentRow, setCurrentRow] = React.useState(1);
    const [tablePage, setTablePage] = React.useState(1);
    // const evaluatedIdeaList = [
    //     {
    //         team_name: 'Test Team 1',
    //         sdg: 'Idea Name 1',
    //         initiated_name: 'Test Name'
    //     }
    // ];
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
                width: '6%'
            },
            {
                name: 'Team Name',
                selector: (row) => row.team_name || '',
                sortable: true,
                width: '15%'
            },
            {
                name: 'SDG',
                selector: (row) => row.sdg,
                width: '20%'
            },
            {
                name: 'Submitted By',
                selector: (row) => row.initiated_name,
                width: '15%'
            },
            {
                name: 'Evaluated At',
                selector: (row) =>
                    evalSchema && evalSchema?.toLowerCase() == 'accept_reject'
                        ? row.evaluated_at
                            ? moment(row.evaluated_at).format(
                                  'DD-MM-YY h:mm:ss a'
                              )
                            : row.evaluated_at
                        : row?.evaluator_ratings[0]?.created_at
                        ? moment(row?.evaluator_ratings[0]?.created_at).format(
                              'DD-MM-YY h:mm:ss a'
                          )
                        : row?.evaluator_ratings[0]?.created_at,
                width: '17%'
            },
            {
                name:
                    evalSchema && evalSchema?.toLowerCase() == 'accept_reject'
                        ? 'Status'
                        : 'Overall',
                // selector: (row) => row.evaluation_status && row.evaluation_status=='SELECTEDROUND1'?'Accepted':row.evaluation_status=='REJECTEDROUND1'?'Rejected':'',
                cell: (row) => {
                    return evalSchema &&
                        evalSchema?.toLowerCase() == 'accept_reject'
                        ? [
                              <div className="d-flex" key={row}>
                                  {row.evaluation_status &&
                                      row.evaluation_status ==
                                          'SELECTEDROUND1' && (
                                          <span className="text-success">
                                              Accepted
                                          </span>
                                      )}
                                  {row.evaluation_status ==
                                      'REJECTEDROUND1' && (
                                      <span className="text-danger">
                                          Rejected
                                      </span>
                                  )}
                              </div>
                          ]
                        : [
                              <div className="d-flex" key={row}>
                                  <span>
                                      {row?.evaluator_ratings[0]?.overall}
                                  </span>
                              </div>
                          ];
                },
                width: '10%'
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
                width: '17%',
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
                                <h2 className="ps-2 pb-3">Evaluated Idea</h2>
                                <Container fluid className="px-0">
                                    <Row className="align-items-center">
                                        {evalSchema &&
                                            evalSchema?.toLowerCase() ==
                                                'accept_reject' && (
                                                <Col md={2}>
                                                    <div className="my-3 d-md-block d-flex justify-content-center">
                                                        <Select
                                                            list={statusdata}
                                                            setValue={setstatus}
                                                            placeHolder={
                                                                'Select Status'
                                                            }
                                                            value={status}
                                                        />
                                                    </div>
                                                </Col>
                                            )}

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
                                        {status && status !== 'Accepted' && (
                                            <Col md={3}>
                                                <div className="my-3 d-md-block d-flex justify-content-center">
                                                    <Select
                                                        list={ReasonsOptions}
                                                        setValue={setReason}
                                                        placeHolder={
                                                            'Select Reason for rejection'
                                                        }
                                                        value={reason}
                                                    />
                                                </div>
                                            </Col>
                                        )}
                                        <Col md={1}>
                                            <div className="text-center">
                                                <Button
                                                    btnClass={
                                                        evalSchema &&
                                                        evalSchema?.toLowerCase() ==
                                                            'accept_reject'
                                                            ? status &&
                                                              district &&
                                                              sdg
                                                                ? 'primary'
                                                                : 'default'
                                                            : district && sdg
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    size="small"
                                                    label="Search"
                                                    disabled={
                                                        !(evalSchema &&
                                                        evalSchema?.toLowerCase() ==
                                                            'accept_reject'
                                                            ? status &&
                                                              district &&
                                                              sdg
                                                            : district && sdg)
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
                                />
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default EvaluatedIdea;
