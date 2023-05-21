/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import LinkComponent from '../Pages/LinkComponent';
// import moment from 'moment';

const detailToDownload = (props) => {

    // const average = arr => arr.reduce((p,c) => p+c,0)/arr.length;
  
    return (
        <div className="container bg-light">
            <div className="row">
                {/* --------personal-------detail---------- */}
                <div className="col-md-7 col-12 h-100">
                    <div className="personal-detail p-5 bg-white shadow rounded border h-100">
                        <p className='fs-2 fw-bold text-primary'>PERSONAL&nbsp;DETAILS</p>
                        <div className="row my-2">
                            <div className="col-4 fw-bold fs-4">Teacher Name</div>
                            <div className="col-8 text-capitalize fs-4">: {props?.ideaDetails?.mentor_name}</div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4 fw-bold fs-4">Team Name</div>
                            <div className="col-8 text-capitalize fs-4">: {props?.ideaDetails?.team_name}</div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4 fw-bold fs-4">Team Members</div>
                            <div className="col-8 text-capitalize fs-4">: {props?.ideaDetails?.team_members.toString()}</div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4 fw-bold fs-4">Organisation Code</div>
                            <div className="col-8 text-capitalize fs-4">: {props?.ideaDetails?.organization_code}</div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4 fw-bold fs-4">Oraganisation Name</div>
                            <div className="col-8 text-capitalize fs-4">: {props?.ideaDetails?.organization_name}</div>
                        </div>
                        <div className="row my-2">
                            <div className="col-4 fw-bold fs-4">CID</div>
                            <div className="col-8 text-capitalize fs-4">: {props?.ideaDetails?.challenge_response_id}</div>
                        </div>
                    </div>
                </div>
                {/* ---------------------------------- */}
                {/* ---------------status------------------ */}
                <div className="col-md-5 col-12 h1-100">
                    {
                        props?.ideaDetails?.evaluation_status &&
                        <div className="status p-5 bg-white shadow rounded border h-100">
                            <p className='fs-2 fw-bold text-primary'>STATUS</p>
                            <div className="row my-2">
                                <div className="col-2 fw-bold fs-4">L1</div>
                                <div className={`${props?.ideaDetails?.evaluation_status=='SELECTEDROUND1'?'text-success':'text-danger'} col-10 text-capitalize fs-4`}>
                                : {props?.ideaDetails?.evaluation_status ==
                                    'SELECTEDROUND1'
                                        ? 'Accepted'
                                        : 'Rejected'}
                                </div>
                            </div>
                            {
                                props?.level!=='L1' && props?.ideaDetails?.evaluator_ratings && props?.ideaDetails?.evaluator_ratings.length>0 &&(
                                        <div className='col-12 mb-2'>
                                            <div className="row my-2">
                                                <div className="col-2 fw-bold fs-4">L2</div>
                                                <div className="col-10 text-capitalize fs-4">: {props?.ideaDetails?.evaluator_ratings[0]?.overall_avg}</div>
                                            </div>
                                            <div className="row my-2">
                                                <div className="col-3 fw-bold fs-4">Novelty</div>
                                                <div className="col-9 text-capitalize fs-4">: {props?.ideaDetails?.evaluator_ratings[0]?.param_1_avg}</div>
                                            </div>
                                            <div className="row my-2">
                                                <div className="col-3 fw-bold fs-4">Usefullness</div>
                                                <div className="col-9 text-capitalize fs-4">: {props?.ideaDetails?.evaluator_ratings[0]?.param_2_avg}</div>
                                            </div>
                                            <div className="row my-2">
                                                <div className="col-3 fw-bold fs-4">Feasability</div>
                                                <div className="col-9 text-capitalize fs-4">: {props?.ideaDetails?.evaluator_ratings[0]?.param_3_avg}</div>
                                            </div>
                                            <div className="row my-2">
                                                <div className="col-3 fw-bold fs-4">Scalability</div>
                                                <div className="col-9 text-capitalize fs-4">: {props?.ideaDetails?.evaluator_ratings[0]?.param_4_avg}</div>
                                            </div>
                                            <div className="row my-2">
                                                <div className="col-3 fw-bold fs-4">Sustainability</div>
                                                <div className="col-9 text-capitalize fs-4">: {props?.ideaDetails?.evaluator_ratings[0]?.param_5_avg}</div>
                                            </div>
                                        </div>
                            
                                    
                                )
                            }
                            
                        </div>
                    }
              
                </div>
                {/* ----------------------------------------- */}
                {/* -------------questions answers---- */}
                <div className="col-12 my-4">
                    <div className="challange-details p-5 bg-white border rounded">
                    <p className='fs-2 fw-bold text-primary'>CHALLANGE&nbsp;DETAILS</p>
                    <div className="row my-2">
                        <div className="col-12 fw-bold fs-4">SDG <span className="col-10 text-capitalize fs-4"> : {props?.ideaDetails?.sdg}</span></div>
                     
                    </div>
                    {props?.teamResponse &&
                        props?.teamResponse?.length > 0 &&
                        props?.teamResponse?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="mb-4 my-3  px-5 py-3 me-md-3"
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
                                            {item?.question_type === 'MCQ' ? (
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
                                              item?.question_type === 'MRQ' ? (
                                                item?.selected_option
                                            ) : item?.question_type ===
                                              'DRAW' ? (
                                                <LinkComponent
                                                    item={item.selected_option}
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
                </div>
                {/* ----------------------------------- */}
            </div>
        </div>
    );
};

export default detailToDownload;
