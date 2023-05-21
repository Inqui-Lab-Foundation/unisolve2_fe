/* eslint-disable indent */
import React from 'react';

const RangeSlider = (props) => {
    const handleChange = (value) => {
        props.setScore(value);
    };
    return (
        <div className="range-slider-wrapper">
            <input
                className={`${props?.name} range`}
                type="range"
                min="0"
                max="5"
                defaultValue={0}
                step="1"
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default RangeSlider;
