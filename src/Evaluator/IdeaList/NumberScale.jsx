/* eslint-disable indent */
import React from 'react';

const NumberScale = (props) => {
    return (
        <div className='number_scale_wrapper'>
            <div className="d-lg-flex">
                <div className='d-flex'>
                    <button className="rating-btn btn btn-lg btn-danger rating-btn-1 me-1" onClick={()=>props.setScore(1)}>1</button>
                    <button className="rating-btn btn btn-lg btn-danger rating-btn-2 me-1" onClick={()=>props.setScore(2)}>2</button>
                    <button className="rating-btn btn btn-lg btn-danger rating-btn-3 me-1" onClick={()=>props.setScore(3)}>3</button>
                    <button className="rating-btn btn btn-lg btn-danger rating-btn-4 me-1" onClick={()=>props.setScore(4)}>4</button>
                    <button className="rating-btn btn btn-lg btn-danger  rating-btn-5 me-1" onClick={()=>props.setScore(5)}>5</button>
                    <button className="rating-btn btn btn-lg btn-danger rating-btn-1 me-1" onClick={()=>props.setScore(6)}>6</button>
                </div>
                <div className="d-lg-none d-flex mb-3 mt-2">
                    <span className="text-muted fst-italic fs-5 desc-text-1">{props?.text1}</span>
                </div>
                <div className='d-flex'>
                    <button className="rating-btn btn btn-lg btn-warning rating-btn-2 me-1" onClick={()=>props.setScore(7)}>7</button>
                    <button className="rating-btn btn btn-lg btn-warning rating-btn-3 me-1" onClick={()=>props.setScore(8)}>8</button>
                    <button className="rating-btn btn btn-lg btn-success rating-btn-4 me-1" onClick={()=>props.setScore(9)}>9</button>
                    <button className="rating-btn btn btn-lg btn-success rating-btn-5 me-1" onClick={()=>props.setScore(10)}>10</button>
                </div>
            </div>
            <div className="d-flex mt-2">
                <span className="text-muted fst-italic fs-5 desc-text-1 d-lg-block d-none">{props?.text1}</span>
                <span className="text-muted fst-italic fs-5 desc-text-2">{props?.text2}</span>
                <span className="text-muted fst-italic fs-5 desc-text-3">{props?.text3}</span>
            </div>

        </div>
    );
};

export default NumberScale;