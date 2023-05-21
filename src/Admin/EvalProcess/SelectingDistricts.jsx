/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import Layout from '../../Admin/Layout';
import { Row, Col, Label, Container, Card } from 'reactstrap';
import { Button } from '../../stories/Button';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues';
import Check from './Pages/Check';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrictData } from '../../redux/studentRegistration/actions';

const EditEvalProcess = (props) => {
    const evalID = JSON.parse(localStorage.getItem('eavlId'));
    //  where evalID= evaluation_process_id //
    const dispatch = useDispatch();
    const [clickedValue, setclickedValue] = useState({});
    const [selectedDistricts, setselectedDistricts] = useState([]);

    useEffect(() => {
        dispatch(getDistrictData());
    }, []);

    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );

    useEffect(() => {
        evalID && evalID.district
            ? evalID.district.split(',').length ===
                  fullDistrictsNames.length - 1 &&
              !evalID.district.includes('All Districts')
                ? setselectedDistricts(fullDistrictsNames)
                : setselectedDistricts(evalID.district.split(','))
            : '';
    }, []);

    useEffect(() => {
        if (clickedValue.name === 'All Districts') {
            if (selectedDistricts.includes('All Districts')) {
                setselectedDistricts(fullDistrictsNames);
            } else {
                setselectedDistricts([]);
            }
        } else if (
            clickedValue.name &&
            clickedValue.name !== 'All Districts' &&
            selectedDistricts.length === fullDistrictsNames.length - 1 &&
            !selectedDistricts.includes('All Districts')
        ) {
            setselectedDistricts(fullDistrictsNames);
        } else if (clickedValue.name && clickedValue.name !== 'All Districts') {
            setselectedDistricts(
                selectedDistricts?.filter((item) => item !== 'All Districts')
            );
        }
    }, [clickedValue]);

    async function handledistricts(value) {
        //  handledistricts Api where value = district //
        // where we can update the district //
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        await axios
            .put(
                `${URL.updateEvalProcess + evalID.evaluation_process_id}`,
                JSON.stringify(value, null, 2),
                axiosConfig
            )
            .then((response) => {
                if (response.status == 200) {
                    openNotificationWithIcon(
                        'success',
                        'Districts Update Successfully'
                    );
                    props.history.push('/admin/evaluationProcess');
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    const handleclick = () => {
        // where we can select  the districts //
        const value = { district: '' };
        selectedDistricts.includes('All Districts')
            ? (value.district = selectedDistricts
                  ?.filter((item) => item !== 'All Districts')
                  .toString())
            : (value.district = selectedDistricts.toString());
        handledistricts(value);
    };

    return (
        <Layout>
            <Container>
                <Card className="p-5 m-5">
                    <Row>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                                Level Name :{' '}
                                <span className="text-muted">
                                    {evalID && evalID.level_name}
                                </span>{' '}
                            </Label>
                        </Col>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                                No Of Evaluation :{' '}
                                <span className="text-muted">
                                    {evalID && evalID.no_of_evaluation}
                                </span>
                            </Label>
                        </Col>
                        <Col md={4}>
                            <Label className="mb-2 text-info">
                                Evaluation Schema :{' '}
                                <span className="text-muted">
                                    {evalID && evalID.eval_schema}
                                </span>
                            </Label>
                        </Col>
                    </Row>
                    <Row>
                        <Label className="mb-2">Districts:</Label>
                        <Check
                            list={fullDistrictsNames}
                            value={selectedDistricts}
                            setValue={setselectedDistricts}
                            selValue={setclickedValue}
                        />
                    </Row>
                </Card>
                <Row>
                    <Col className="col-xs-12 col-sm-6">
                        <Button
                            label="Discard"
                            btnClass="secondary"
                            size="small"
                            onClick={() =>
                                props.history.push('/admin/evaluationProcess')
                            }
                        />
                    </Col>
                    <Col className="submit-btn col-xs-12 col-sm-6 text-right">
                        <Button
                            label="Save"
                            onClick={() => handleclick()}
                            btnClass={'primary'}
                            size="small"
                        />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
export default EditEvalProcess;
