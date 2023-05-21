/* eslint-disable indent */
import React from 'react';
//import moment from 'moment';
//import {FaStar, FaStarHalf} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const RatedDetailCard = (props) => {
    const { search } = useLocation();
    const level = new URLSearchParams(search).get('level');
    console.warn(props);
    const [overAll, setOverAll]=React.useState('');
    const [novelity, setNovelity]=React.useState(0);
    const [usefulness, setUsefulness] = React.useState(0);
    const [feasability, setFeasability] = React.useState(0);
    const [scalability, setScalability] = React.useState(0);
    const [sustainability, setSustainability] = React.useState(0);
    //const [starCount, setStarCount]=React.useState(0);
  
    React.useEffect(()=>{
        if(props?.details?.evaluator_ratings.length>0){
        const average = arr => arr.reduce((p,c) => p+c,0)/arr.length;
        setOverAll(average(props?.details?.evaluator_ratings[0]?.overall));
        setNovelity(average(props?.details?.evaluator_ratings[0]?.param_1));
        setUsefulness(average(props?.details?.evaluator_ratings[0]?.param_2));
        setFeasability(average(props?.details?.evaluator_ratings[0]?.param_3));
        setScalability(average(props?.details?.evaluator_ratings[0]?.param_4));
        setSustainability(average(props?.details?.evaluator_ratings[0]?.param_5));
        //setStarCount(average(props?.details?.evaluator_ratings[0]?.overall) && Number(average(props?.details?.evaluator_ratings[0]?.overall))/2);
    }
    },[props]);
  return (
      <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
          <div className="row">
              <div className="col-12">
                  <p className="text-center fs-3 fw-bold m-0 mb-3">
                      {' '}
                      <span className="text-info">
                      {level}
                      </span>
                       - Rating Details
                  </p>
                  <hr />
              </div>
          </div>
          <div className="row">
          <div className="col-12">
                  <p className="fs-1 fw-bold text-center" style={{marginBottom:'5px'}}>
                      {overAll}
                  </p>
              </div>
              <div className="col-12">
                  {/* <div className="alert alert-warning" role="alert">
                      <p className="my-2">
                          <span className="text-bold">Evaluated At: </span>{' '}
                          {moment(
                              props?.details?.evaluator_ratings[0]?.created_at
                          ).format('DD-MM-YY h:mm:ss a') || ''}
                      </p>
                  </div> */}
                  <p className="text-muted my-3 text-center">OverAll Rating</p>
              </div>
              
              {/* --------star logic------ */}
              {/* <div className="col-12 mb-2">
                  {starCount > 4.5 ? (
                      <div className="d-flex justify-content-center w-100">
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                      </div>
                  ) : starCount > 4 && starCount < 4.6 ? (
                      <div className="d-flex justify-content-center w-100">
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStarHalf color="#ffcb34" size={22} />
                      </div>
                  ) : starCount >= 4 && starCount < 4.5 ? (
                      <div className="d-flex justify-content-center w-100">
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                          <FaStar color="#ffcb34" size={22} />
                      </div>
                  ) : starCount < 4 && starCount >=3.5 ?(
                    <div className="d-flex justify-content-center w-100">
                        <FaStar color="#ffcb34" size={22} />
                        <FaStar color="#ffcb34" size={22} />
                        <FaStar color="#ffcb34" size={22} />
                        <FaStarHalf color="#ffcb34" size={22} />
                    </div>
                  ): starCount >=3 && starCount <3.5 ?(
                    <div className="d-flex justify-content-center w-100">
                        <FaStar color="#ffcb34" size={22} />
                        <FaStar color="#ffcb34" size={22} />
                        <FaStar color="#ffcb34" size={22} />
                    </div>
                  ): starCount < 3 && starCount >=2.5 ?(
                    <div className="d-flex justify-content-center w-100">
                        <FaStar color="#ffcb34" size={22} />
                        <FaStar color="#ffcb34" size={22} />
                        <FaStarHalf color="#ffcb34" size={22} />
                    </div>
                  ): starCount >= 2 && starCount < 2.5 ?(
                    <div className="d-flex justify-content-center w-100">
                        <FaStar color="#ffcb34" size={22} />
                        <FaStar color="#ffcb34" size={22} />
                    </div>
                  ): starCount < 2 && starCount >=1.5 ?(
                    <div className="d-flex justify-content-center w-100">
                        <FaStar color="#ffcb34" size={22} />
                        <FaStarHalf color="#ffcb34" size={22} />
                    </div>
                  ): starCount >= 1 && starCount < 1.5 ?(
                    <div className="d-flex justify-content-center w-100">
                        <FaStar color="#ffcb34" size={22} />
                        <FaStarHalf color="#ffcb34" size={22} />
                    </div>
                  ): starCount < 1 && starCount >=0.5 ?(
                    <div className="d-flex justify-content-center w-100">
                        <FaStarHalf color="#ffcb34" size={22} />
                    </div>
                  ):(
                    <></>
                  )
                  }
              </div> */}
              {/* ----------------- */}
          </div>
          <div className="row mb-1">
              <div className="col-4">
                  <p className="my-0">Novelty:</p>
              </div>
              <div className="col-8 pt-3">
                  <div className="progress">
                      <div
                          className={
                              novelity < 7
                                  ? 'progress-bar bg-danger '
                                  : novelity < 9
                                  ? 'progress-bar bg-warning'
                                  : 'progress-bar bg-success'
                          }
                          role="progressbar"
                          style={{ width: `${Number(novelity) * 10 + '%'}` }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                      ></div>
                  </div>
              </div>
          </div>
          <div className="row mb-1">
              <div className="col-4">
                  <p className="my-0">Usefulness:</p>
              </div>
              <div className="col-8 pt-3">
                  <div className="progress">
                      <div
                          className={
                              usefulness < 7
                                  ? 'progress-bar bg-danger '
                                  : usefulness < 9
                                  ? 'progress-bar bg-warning'
                                  : 'progress-bar bg-success'
                          }
                          role="progressbar"
                          style={{ width: `${Number(usefulness) * 10 + '%'}` }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                      ></div>
                  </div>
              </div>
          </div>
          <div className="row mb-1">
              <div className="col-4">
                  <p className="my-0">Feasability:</p>
              </div>
              <div className="col-8 pt-3">
                  <div className="progress">
                      <div
                          className={
                              feasability < 7
                                  ? 'progress-bar bg-danger '
                                  : feasability < 9
                                  ? 'progress-bar bg-warning'
                                  : 'progress-bar bg-success'
                          }
                          role="progressbar"
                          style={{ width: `${Number(feasability) * 10 + '%'}` }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                      ></div>
                  </div>
              </div>
          </div>
          <div className="row mb-1">
              <div className="col-4">
                  <p className="my-0">Scalability:</p>
              </div>
              <div className="col-8 pt-3">
                  <div className="progress">
                      <div
                          className={
                              scalability < 7
                                  ? 'progress-bar bg-danger '
                                  : scalability < 9
                                  ? 'progress-bar bg-warning'
                                  : 'progress-bar bg-success'
                          }
                          role="progressbar"
                          style={{ width: `${Number(scalability) * 10 + '%'}` }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                      ></div>
                  </div>
              </div>
          </div>
          <div className="row mb-1">
              <div className="col-4">
                  <p className="my-0">Sustainability:</p>
              </div>
              <div className="col-8 pt-3">
                  <div className="progress">
                      <div
                          className={
                              sustainability < 7
                                  ? 'progress-bar bg-danger '
                                  : sustainability < 9
                                  ? 'progress-bar bg-warning'
                                  : 'progress-bar bg-success'
                          }
                          role="progressbar"
                          style={{
                              width: `${Number(sustainability) * 10 + '%'}`
                          }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                      ></div>
                  </div>
              </div>
          </div>
          <hr />
          <div className="row mb-1 mt-2">
              <div className="col-4">
                  <p className="my-0 fw-bold">Comments:</p>
              </div>
              <div className="col-8">
              {props?.details?.evaluator_ratings[0]?.comments.map((item,i)=>(
                      <p className="my-0 text-muted" key={i}>
                        {i+1} : {item}
                      </p> 
                ))} 
              </div>
          </div>
      </div>
  );
};

export default RatedDetailCard;