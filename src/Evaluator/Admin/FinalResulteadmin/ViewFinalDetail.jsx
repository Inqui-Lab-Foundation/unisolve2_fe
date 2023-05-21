/* eslint-disable indent */
import React from 'react';
import './ViewFinalSelectedideas.scss';
import { Button } from '../../../stories/Button';
import LinkComponent from '../../IdeaList/LinkComponent';
import moment from 'moment';
import {useLocation } from 'react-router-dom';
import RatedDetailCard from '../Pages/RatedDetailCard';
import jsPDF from 'jspdf';
import {FaDownload, FaHourglassHalf} from 'react-icons/fa';
import DetailToDownload from '../../../Admin/Evaluation/FinalResults/DetailToDownload';
import html2canvas from "html2canvas";

const ViewDetail = (props) => {
    const { search } = useLocation();
    const level = new URLSearchParams(search).get('level');
    const [teamResponse, setTeamResponse] = React.useState([]);
    
    React.useEffect(()=>{
        if (props?.ideaDetails?.response) {
            setTeamResponse(
                Object.entries(props?.ideaDetails?.response).map((e) => e[1])
            );
        }
    },[props]);
console.warn('detail', props);


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
                        <DetailToDownload ideaDetails={props?.ideaDetails} teamResponse={teamResponse} level={level}/>
                    </div>
                    <div className="row idea_detail_card">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="mb-md-4 mb-3">
                                        SDG:{' '}
                                        <span className="text-capitalize fs-3">
                                            {props?.ideaDetails?.sdg.toLowerCase() ||
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
                        <div className="col-lg-4 order-lg-1 order-0 p-0 h-100 mt-3 status_info_col">
                            <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                                   
                                {props?.ideaDetails?.evaluation_status ? 
                                <p className={`${props?.ideaDetails?.evaluation_status=='SELECTEDROUND1'?'text-success':'text-danger'} fs-3 fw-bold text-center`}>
                                    <span className='fs-3 text-info'>L1: </span>{props?.ideaDetails?.evaluation_status=='SELECTEDROUND1'?'Accepted':'Rejected'}
                                </p> : ''}
                                
                    
                                {props?.ideaDetails?.evaluated_name ? <p className='text-center'>
                                    <span className='text-bold'>Evaluated By: </span> {props?.ideaDetails?.evaluated_name|| ''}
                                </p> : '' }

                                {props?.ideaDetails?.evaluated_at ? <p className='text-center'>
                                    <span className='text-bold'>Evaluated At: </span> {moment(props?.ideaDetails?.evaluated_at).format('DD-MM-YY h:mm:ss a')|| ''}
                                </p>: '' }
                                
                            </div>
                            {level!=='L1' && props?.ideaDetails?.evaluator_ratings.length > 0 &&(
                                <RatedDetailCard 
                                details={props?.ideaDetails}
                            />
                            )}
                            
                        </div>
                        
                        
                    
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
    </div>
  );
};

export default ViewDetail;