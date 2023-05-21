/* eslint-disable indent */
import React from 'react';
import './ViewSelectedChallenges.scss';
import { Button } from '../../stories/Button';
import LinkComponent from './pages/LinkComponent';
import { getCurrentUser, openNotificationWithIcon } from '../../helpers/Utils';
import moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Select from './pages/Select';
//import { useHistory } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import jsPDF from 'jspdf';
import {FaDownload, FaHourglassHalf} from 'react-icons/fa';
import DetailToDownload from '../Evaluation/ViewSelectedIdea/DetailToDownload';
import html2canvas from "html2canvas";

const ViewDetail = (props) => {
    //const dispatch = useDispatch();
    //const history = useHistory();
    const currentUser = getCurrentUser('current_user');
    const [teamResponse, setTeamResponse] = React.useState([]);
    const [isReject, setIsreject]=React.useState(false);
    const [reason, setReason]=React.useState('');
    const selectData = [
        'Idea is very common and already in use.',
        'Idea does not have proper details and information to make a decision.',
        'Idea does not solve the problem identified/the solution and problem are not connected.',
        'Not very clear about the idea and solution.',
        'Inaccurate Data (Form is not filled properly)'
    ];
    React.useEffect(()=>{
        if (props?.ideaDetails?.response) {
            setTeamResponse(
                Object.entries(props?.ideaDetails?.response).map((e) => e[1])
            );
        }
    },[props]);


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
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire('Cancelled', '', 'error');
            }
        });
};

const handleL1Round = (handledText) => {
    const body = JSON.stringify({
        status:
            handledText == 'accept' ? 'SELECTEDROUND1' : 'REJECTEDROUND1',
        rejected_reason:handledText == 'reject' ? reason : ''
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
            openNotificationWithIcon('success', response?.data?.message=='OK'?'Idea processed successfully!':response?.data?.message);
            props?.setIsDetail(false);
            // props?.settableData([]);
            // props?.setdistrict('');
            // props?.setsdg('');
        })
        .catch(function (error) {
            openNotificationWithIcon(
                'error',
                error?.response?.data?.message
            );
        });
};

const handleReject=()=>{
    if(reason){
        handleAlert('reject'); 
        setIsreject(false);
    }
};

const [pdfLoader, setPdfLoader]=React.useState(false);
const downloadPDF = async() => {
  
    setPdfLoader(true);
    const domElement = document.getElementById("pdfId");
    await html2canvas(domElement,{
            onclone: document => {
                document.getElementById("pdfId").style.display = "block";
            }, scale:1.13
        }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF('p', 'px', [2580,3508]);
        pdf.addImage(imgData, "JPEG", 20, 20,2540, pdf.internal.pageSize.height, undefined,'FAST');
        pdf.save(`${new Date().toISOString()}.pdf`);
      });
      setPdfLoader(false);
};

  return (
    <div>
        {teamResponse && teamResponse?.length > 0 ? (
                <>
                    <div id='pdfId' style={{display:'none'}}>
                        <DetailToDownload ideaDetails={props?.ideaDetails} teamResponse={teamResponse} level={'Draft'}/>
                    </div>
                    <div className="row idea_detail_card">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-md-4 mb-3">
                                        SDG:{' '}
                                        <span className="text-capitalize fs-3">
                                            {props?.ideaDetails?.sdg?.toLowerCase() ||
                                                ''}
                                        </span>
                                    </h2>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end">
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass="primary"
                                            size="small"
                                            label='Back to List'
                                            onClick={() =>
                                                props?.setIsDetail(false)
                                            }
                                        />
                                    </div>
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass={props?.currentRow > 1 ? "primary":'default'}
                                            size="small"
                                            label={'Previous'}
                                            onClick={() =>
                                                props?.handlePrev()
                                            }
                                            disabled={props?.currentRow==1}
                                        />
                                    </div>
                                    <div className="ms-auto me-sm-3 p-0">
                                        <Button
                                            btnClass={props?.dataLength!=props?.currentRow?"primary":'default'}
                                            size="small"
                                            label={'Next'}
                                            onClick={() =>
                                                props?.handleNext()
                                            }
                                            disabled={props?.dataLength==props?.currentRow}
                                        />
                                    </div>
                                    <div className='mx-2 pointer d-flex align-items-center'>
                                        {
                                            !pdfLoader?
                                            <FaDownload size={22} onClick={()=>{downloadPDF();}}/>:
                                            <FaHourglassHalf size={22}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 order-lg-0 order-1 p-0 h-100">
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
                        </div>
                        {props?.ideaDetails?.status ==='SUBMITTED' && (
                        <div className="col-lg-4 order-lg-1 order-0 p-0 h-100 mt-3 status_info_col">
                            <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                                   
                                {props?.ideaDetails?.evaluation_status ? <p className={`${props?.ideaDetails?.evaluation_status=='SELECTEDROUND1'?'text-success':'text-danger'} fs-3 fw-bold text-center`}>
                                    <span className='fs-3 text-dark'>L1: </span>{props?.ideaDetails?.evaluation_status=='SELECTEDROUND1'?'Accepted':'Rejected'}
                                </p> : ''}
                                
                    
                                {props?.ideaDetails?.evaluated_name ? <p className='text-center'>
                                    <span className='text-bold'>Evaluated By: </span> {props?.ideaDetails?.evaluated_name|| ''}
                                </p> : '' }

                                {props?.ideaDetails?.evaluated_at ? <p className='text-center'>
                                    <span className='text-bold'>Evaluated At: </span> {moment(props?.ideaDetails?.evaluated_at).format('DD-MM-YY h:mm:ss a')|| ''}
                                </p>: '' }
                                
                                {
                                    props?.ideaDetails?.evaluation_status=='REJECTEDROUND1' && 

                                    <p className="text-center">
                                        <span className='text-bold'>Rejected Reason: </span> {props?.ideaDetails?.rejected_reason || ''}
                                    </p>
                                }
                                {props?.ideaDetails?.evaluation_status 
                                ? 
                                            props?.ideaDetails?.evaluation_status=='SELECTEDROUND1' ?
                                            <button
                                                        className="btn btn-lg px-5 py-2 btn-danger me-3 rounded-pill"
                                                        onClick={() => {
                                                            // handleAlert('reject');
                                                            setIsreject(true);
                                                            setReason('');
                                                        }}
                                                    >
                                                        <span className="fs-4">Reject</span>
                                                    </button>
                                            :
                                            <button
                                                        className="btn btn-lg px-5 py-2 btn-success me-3 rounded-pill"
                                                        onClick={() => {
                                                            handleAlert('accept');
                                                            setReason('');
                                                        }}
                                                    >
                                                        <span className="fs-4">Accept</span>
                                            </button> 
                                : 
                                <><button
                                className="btn btn-lg px-5 py-2 btn-danger me-3 rounded-pill m-2"
                                onClick={() => {
                                    // handleAlert('reject');
                                    setIsreject(true);
                                    setReason('');
                                }}
                            >
                                <span className="fs-4">Reject</span>
                            </button>
                            <button
                                            className="btn btn-lg px-5 py-2 btn-success me-3 rounded-pill m-2"
                                            onClick={() => {
                                                handleAlert('accept');
                                                setReason('');
                                            }}
                                        >
                                            <span className="fs-4">Accept</span>
                                </button></>}
                            </div>
                        </div>
                        )}
                    </div>
                        <div>
                            <Button
                                btnClass="primary"
                                size="small"
                                label="Back"
                                onClick={() => {
                                    props?.setIsDetail(false);
                                }}
                            />
                        </div>

                  
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
                            label="Back"
                            onClick={() => {
                                props?.setIsDetail(false);
                            }}
                        />
                    </div>
                </>
            )}
            <Modal
            show={isReject}
            onHide={()=>setIsreject(false)}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-evaluator ChangePSWModal teacher-register-modal"
            backdrop="static"
            scrollable={true}
        >
            <Modal.Header closeButton onHide={()=>setIsreject(false)}>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="w-100 d-block text-center"
                >
                    Reject
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className='my-3 text-center'>
                    <h3 className='mb-sm-4 mb-3'>Please Select the reason for rejection.</h3>
                    <Select 
                    list={selectData}
                    setValue={setReason}
                    placeHolder={'Please Select'}
                    value={reason}
                    />
                </div>
                <div className='text-center'>
                    <Button
                        label={'Submit'}
                        btnClass={!reason?'default':'primary'}
                        size="small "
                        onClick={()=>handleReject()}
                       disabled={!reason}
                    />
                </div>
            </Modal.Body>
        </Modal>
    </div>
  );
};

export default ViewDetail;