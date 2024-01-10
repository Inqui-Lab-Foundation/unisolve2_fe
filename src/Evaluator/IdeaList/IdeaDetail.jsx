/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import { Button } from '../../stories/Button';
import LinkComponent from './LinkComponent';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import axios from 'axios';
import { Row, Col, Form, Label } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { getSubmittedIdeaList } from '../store/evaluator/action';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Modal } from 'react-bootstrap';
import Select from '../Helper/Select';
import RateIdea from './RateIdea';

const IdeaDetail = (props) => {
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const [teamResponse, setTeamResponse] = React.useState([]);

    const [isReject, setIsreject] = React.useState(false);
    const [reason, setReason] = React.useState('');
    const [reasonSec, setReasonSec] = React.useState('');

    const selectData = [
        'Not novel - Idea and problem common and already in use.',
        'Not novel - Idea has been 100% plagiarized.',
        'Not useful - Idea does not solve the problem identified / problem & solution not connected.',
        'Not understandable - Idea Submission does not have proper details to make a decision.',
        'Not clear (usefulness)',
        'Not filled - Inaccurate data (form is not filled properly)',
        'Not clear / Too generic a solution',
        'Not selected,Requires changing government polices'
    ];
    const reasondata2 = [
        'Lot of project effort visible (all of the 1, 2, 3,10, 14, 16 steps in the Idea Submission Format are clearly explained and are valid)',
        'Some project effort visible (at least the steps 2,3,10 inthe Idea Submission Format are clearly explained and are valid)',
        'Zero project effort visible (the steps 2,3 and 10 are not clear/relevant)'
    ];

    const [levelName, setLevelName] = React.useState('');
    const [evalSchema, setEvalSchema] = React.useState('');
    React.useEffect(() => {
        if (currentUser) {
            setLevelName(currentUser?.data[0]?.level_name);
            setEvalSchema(currentUser?.data[0]?.eval_schema);
        }
    }, [currentUser]);

    React.useEffect(() => {
        if (props?.ideaDetails?.response) {
            setTeamResponse(
                Object.entries(props?.ideaDetails?.response).map((e) => e[1])
            );
        }
    }, [props]);

    const handleAlert = (handledText) => {
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
                title:
                    handledText === 'accept'
                        ? 'You are attempting to accept this Idea'
                        : 'You are attempting to reject this Idea',
                text: 'Are you sure?',
                // imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        handleL1Round(handledText);
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
                }
            });
    };

    const handleL1Round = (handledText) => {
        const body = JSON.stringify({
            status:
                handledText == 'accept' ? 'SELECTEDROUND1' : 'REJECTEDROUND1',
            rejected_reason: handledText == 'reject' ? reason : '',
            rejected_reasonSecond: handledText == 'reject' ? reasonSec : ''
        });
        var config = {
            method: 'put',
            url: `${
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/' +
                props?.ideaDetails?.challenge_response_id
            }`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: body
        };
        axios(config)
            .then(function (response) {
                openNotificationWithIcon(
                    'success',
                    response?.data?.message == 'OK'
                        ? 'Idea processed successfully!'
                        : response?.data?.message
                );
                setTimeout(() => {
                    dispatch(getSubmittedIdeaList('L1'));
                    props?.setIsNextDiv(true);
                }, 100);
            })
            .catch(function (error) {
                openNotificationWithIcon(
                    'error',
                    error?.response?.data?.message
                );
            });
    };
    const handleReject = () => {
        if (reason && reasonSec) {
            handleAlert('reject');
            setIsreject(false);
        }
    };

    return (
        <>
            {teamResponse && teamResponse?.length > 0 ? (
                <>
                    <div className="row idea_detail_card">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <Row>
                                        <Col>
                                            <h2 className="mb-md-4 mb-3">
                                                SDG :
                                                <span className="text-capitalize fs-3">
                                                    {props?.ideaDetails?.sdg?.toLowerCase() ||
                                                        ''}
                                                </span>
                                            </h2>
                                        </Col>
                                        <Col>
                                            <h2 className="mb-md-4 mb-3">
                                                CID :
                                                <span className="text-capitalize fs-3">
                                                    {props?.ideaDetails
                                                        ?.challenge_response_id ||
                                                        ''}
                                                </span>
                                            </h2>
                                        </Col>
                                    </Row>
                                </div>
                                {/* <div className="col-sm-8">
                                    <h2 className="mb-md-4 mb-3">
                                        SDG:{' '}
                                        <span className="text-capitalize fs-3">
                                            {props?.ideaDetails?.sdg?.toLowerCase() ||
                                                ''}
                                        </span>
                                    </h2>
                                </div>
                                <div className="col-sm-8">
                                    <h2 className="mb-md-4 mb-3">
                                        Challenge Response Id :
                                        <span className="text-capitalize fs-3">
                                            {props?.ideaDetails
                                                ?.challenge_response_id || ''}
                                        </span>
                                    </h2>
                                </div> */}
                                <div className="col-sm-4 d-flex justify-content-end">
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass="primary"
                                            size="small"
                                            label="Skip"
                                            onClick={() => props?.handleSkip()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${
                                props?.ideaDetails?.status === 'SUBMITTED'
                                    ? 'col-12'
                                    : 'col-lg-8'
                            } order-lg-0 order-1 p-0 h-100`}
                        >
                            {teamResponse?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="mb-4 my-3 comment-card px-5 py-3 card me-md-3"
                                    >
                                        <div className="question quiz mb-0">
                                            <b
                                                style={{
                                                    fontSize: '1.6rem'
                                                }}
                                            >
                                                {item?.question_no || ''}.{' '}
                                                {item?.question || ''}
                                            </b>
                                        </div>
                                        <div className="bg-light rounded p-5">
                                            <p
                                                style={{
                                                    fontSize: '1.4rem'
                                                }}
                                            >
                                                {item?.question_type ===
                                                'MCQ' ? (
                                                    item?.selected_option?.map(
                                                        (data, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {data || ''}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : item?.question_type ===
                                                      'TEXT' ||
                                                  item?.question_type ===
                                                      'MRQ' ? (
                                                    item?.selected_option
                                                ) : item?.question_type ===
                                                  'DRAW' ? (
                                                    <LinkComponent
                                                        item={
                                                            item.selected_option
                                                        }
                                                    />
                                                ) : (
                                                    ''
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* -----level 1 accept/reject process---- */}
                            {/* {evalSchema?.toLowerCase() == 'accept_reject' && ( */}
                            <div className="d-md-flex">
                                {props?.ideaDetails?.status === 'SUBMITTED' && (
                                    <div className="d-flex ms-auto">
                                        <button
                                            className="btn btn-lg px-5 py-2 btn-success me-3 rounded-pill"
                                            onClick={() => {
                                                handleAlert('accept');
                                                setReason('');
                                                setReasonSec('');
                                            }}
                                        >
                                            <span className="fs-4">Accept</span>
                                        </button>
                                        <button
                                            className="btn btn-lg px-5 py-2 btn-danger me-3 rounded-pill"
                                            onClick={() => {
                                                // handleAlert('reject');
                                                setIsreject(true);
                                                setReason('');
                                                setReasonSec('');
                                            }}
                                        >
                                            <span className="fs-4">Reject</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* )} */}
                        </div>
                    </div>

                    {/* //-----------Rating section---- */}
                    {/* {evalSchema?.toLowerCase() == 'rating_scale' ? (
                        <RateIdea
                            challenge_response_id={
                                props?.ideaDetails?.challenge_response_id
                            }
                            evaluator_id={currentUser?.data[0]?.user_id}
                            level={levelName}
                            setIsNextDiv={props?.setIsNextDiv}
                        />
                    ) : (
                        <></>
                    )} */}
                </>
            ) : (
                <>
                    <h2 className="my-auto text-center mt-5">
                        Details Not Available.
                    </h2>
                    <div className="text-center mt-5">
                        <Button
                            btnClass="primary"
                            size="small"
                            label="Next Idea"
                            onClick={() => {
                                props?.handleSkip();
                            }}
                        />
                    </div>
                </>
            )}
            {/* ----------reject-modal----- */}
            <Modal
                show={isReject}
                onHide={() => setIsreject(false)}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="assign-evaluator ChangePSWModal teacher-register-modal"
                backdrop="static"
                scrollable={true}
            >
                <Modal.Header closeButton onHide={() => setIsreject(false)}>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className="w-100 d-block text-center"
                    >
                        Reject
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="my-3 text-center">
                        <h3 className="mb-sm-4 mb-3">
                            Please Select the reason for rejection.
                        </h3>
                        <Col>
                            <Col className="m-5">
                                <p className="text-left">
                                    <b>1. Novelty & Usefulness</b>
                                </p>
                                <Select
                                    list={selectData}
                                    setValue={setReason}
                                    placeHolder={'Please Select Reject Reason'}
                                    value={reason}
                                />
                            </Col>
                            <Col className="m-5">
                                <p className="text-left">
                                    <b>
                                        2. Does the submission show any evidence
                                        of efforts put in to complete the
                                        project?
                                    </b>
                                </p>
                                <Select
                                    list={reasondata2}
                                    setValue={setReasonSec}
                                    placeHolder={'Please Select Reject Reason'}
                                    value={reasonSec}
                                />
                            </Col>
                        </Col>
                    </div>
                    <div className="text-center">
                        <Button
                            label={'Submit'}
                            btnClass={
                                !reason && reasonSec ? 'default' : 'primary'
                            }
                            size="small "
                            onClick={() => handleReject()}
                            disabled={!reason && reasonSec}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default IdeaDetail;
