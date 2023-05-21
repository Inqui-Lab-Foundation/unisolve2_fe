/* eslint-disable indent */
import React from 'react';
import './EvaluatedIdea.scss';
import { Button } from '../../stories/Button';
import LinkComponent from '../IdeaList/LinkComponent';
import moment from 'moment';
import { getCurrentUser } from '../../helpers/Utils';
import RatedDetailCard from './RatedDetailCard';

const EvaluatedIdeaDetail = (props) => {
    const [teamResponse, setTeamResponse] = React.useState([]);
    const currentUser = getCurrentUser('current_user');
    React.useEffect(()=>{
        if (props?.ideaDetails?.response) {
            setTeamResponse(
                Object.entries(props?.ideaDetails?.response).map((e) => e[1])
            );
        }
    },[props]);
    const [levelName, setLevelName]=React.useState('');
    React.useEffect(()=>{
        if(currentUser){
            setLevelName(currentUser?.data[0]?.level_name);
        }
    },[currentUser]);

  return (
    <div>
        {teamResponse && teamResponse?.length > 0 ? (
                <>
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
                                <p className={`${props?.ideaDetails?.evaluation_status=='SELECTEDROUND1'?'text-success':'text-danger'} fs-3 fw-bold text-center`}>
                                <span className='fs-2 text-info'>L1 - </span>{props?.ideaDetails?.evaluation_status=='SELECTEDROUND1'?'Accepted':'Rejected'}
                                </p>
                                <p className='text-center'>
                                    <span className='text-bold'>Evaluated At: </span> {moment(props?.ideaDetails?.evaluated_at).format('DD-MM-YY h:mm:ss a')|| ''}
                                </p>
                                {
                                    props?.ideaDetails?.evaluation_status=='REJECTEDROUND1' && 

                                    <p className="text-center">
                                        <span className='text-bold'>Rejected Reason: </span> {props?.ideaDetails?.rejected_reason || ''}
                                    </p>
                                }
                            </div>
                            {levelName !== 'L1' && ( 
                            //     <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
                            //     <p className='text-center fs-3 fw-bold'>
                            //     <span className='fs-2 text-info'>{props?.ideaDetails?.evaluator_ratings[0]?.level} - </span> <span className='fs-3'>Overall Rating: </span>{props?.ideaDetails?.evaluator_ratings[0]?.overall}
                            //     </p>
                            //     <p className='text-center'>
                            //         <span className='text-bold'>Evaluated At: </span> {moment(props?.ideaDetails?.evaluator_ratings[0]?.created_at).format('DD-MM-YY h:mm:ss a')|| ''}
                            //     </p>
                            //     <p className='text-center'>
                            //         <span className='text-bold'>Novelty Score: </span> {props?.ideaDetails?.evaluator_ratings[0]?.param_1}
                            //     </p>
                            //     <p className='text-center'>
                            //         <span className='text-bold'>Usefulness Score: </span> {props?.ideaDetails?.evaluator_ratings[0]?.param_2}
                            //     </p>
                            //     <p className='text-center'>
                            //         <span className='text-bold'>Feasability Score: </span> {props?.ideaDetails?.evaluator_ratings[0]?.param_3}
                            //     </p>
                            //     <p className='text-center'>
                            //         <span className='text-bold'>Scalability Score: </span> {props?.ideaDetails?.evaluator_ratings[0]?.param_4}
                            //     </p>
                            //     <p className='text-center'>
                            //         <span className='text-bold'>Sustainability Score: </span> {props?.ideaDetails?.evaluator_ratings[0]?.param_5}
                            //     </p>
                            //     <p className='text-center'>
                            //         <span className='text-bold'>Comments: </span>{props?.ideaDetails?.evaluator_ratings[0]?.comments} 
                            //     </p>
                            // </div>
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

export default EvaluatedIdeaDetail;