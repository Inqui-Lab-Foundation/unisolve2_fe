/* eslint-disable no-unused-vars */
import { Descriptions } from 'antd';
import React, { useState } from 'react';
import { Button } from '../../../stories/Button';
import Checkbox from './Checkbox';
import { allDistricts, allStatus, allTypes } from './reportConstants';
import Select from './Select';
import { CSVLink } from 'react-csv';
import { useDispatch } from 'react-redux';
import { getMentorReport } from '../../../redux/reports/actions';
import { useSelector } from 'react-redux';

const FilterCard = () => {
    const { mentorReport } = useSelector((state) => state.reports);
    const [district, setDistrict] = useState(null);
    const [type, setType] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDownload = () => {
        setLoading(true);
        let temp = [...type];
        let params = {};
        temp.forEach((element) => {
            params[element] = 1;
        });
        params.rs = status;
        dispatch(getMentorReport(params)).then(() => {
            const element = document.getElementById('CSVButton');
            element.click();
            setLoading(false);
        });
    };
    return (
        <>
            <Descriptions
                bordered
                className="mt-3 text-left p-4"
                column={{ xxl: 1, xl: 1, lg: 1, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="District">
                    <Select
                        placeHolder={'Select District'}
                        list={allDistricts}
                        setValue={setDistrict}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                    {Object.entries(allTypes).map((item, i) => (
                        <Checkbox
                            key={i}
                            setValue={setType}
                            selectedValues={type}
                            value={item}
                        />
                    ))}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Select
                        placeHolder={'Select Status'}
                        list={allStatus}
                        setValue={setStatus}
                    />
                </Descriptions.Item>
            </Descriptions>
            <div className="m-3 common-flex">
                <CSVLink
                    style={{ display: 'none' }}
                    id={'CSVButton'}
                    data={mentorReport}
                    filename="Teacher-report.csv"
                />
                <Button
                    onClick={handleDownload}
                    label={loading ? 'Loading...' : 'Download Report'}
                    btnClass="primary"
                    size={'small'}
                    type="submit"
                />
            </div>
        </>
    );
};

export default FilterCard;
