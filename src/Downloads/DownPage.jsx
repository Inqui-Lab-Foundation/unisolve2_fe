
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../helpers/Utils';
import TeacherCertificate from '../assets/media/img/certificates/TeacherCourseCompletionCertificate.jpg';
import courseCompletionCertificate from '../assets/media/img/certificates/StudentCourseCompletionCertificate.jpg';
import ideaSubmissionCertificate from '../assets/media/img/certificates/StudentIdeaSubmissioCertificate.jpg';
import { Button } from '../stories/Button';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrictData } from '../redux/studentRegistration/actions';
import Select from './Select';
const DownPage = () => {
    const [dataList, setDataList] = useState({});
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const [org, setOrg] = useState('');
    const [district, setdistrict] = useState('');
    const [certificate, setcertificate] = useState('');
    const dispatch = useDispatch();
    const [apilistCount,setapilistCount] = useState('');
    const currentUser = getCurrentUser('current_user');
    const cerList = ['teacher', 'studentIdea', 'studentCourse'];
    const fullDistrictsNames = useSelector(
        (state) => state?.studentRegistration?.dists
    );
    useEffect(() => {
        dispatch(getDistrictData());
    }, []);
    const pdfRef = useRef(null);
    const handleCertificateDownload = () => {
        // here we can download the certificates //
        const content = pdfRef.current;
        const doc = new jsPDF('l', 'px', [211, 298]);
        doc.html(content, {
            callback: function (doc) {
                doc.save(`certificate_${name}.pdf`);
            }
        });
    };
    const handelsearch = async () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/admins/Cgetdata?district=${district}&ctype=${certificate}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setapilistCount(response.data.count);
                    setDataList(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    useEffect(() => {
        if (org !== '' && org !== undefined) {
            handleCertificateDownload();
        }
    }, [org]);

    const handlestart = () => {
        let ctestCount = 0;
        const myInterval = setInterval(() => {
            if (ctestCount < dataList.length) {
                setName(dataList[ctestCount]?.full_name);
                setOrg(dataList[ctestCount]?.organization_name);
                setCount(ctestCount + 1);
                ctestCount = ctestCount + 1;
            } else {
                clearInterval(myInterval);
            }
        }, 3000);
    };
    return (
        <>
            <div className='p-5 d-flex'>
                <Select
                    list={cerList}
                    setValue={setcertificate}
                    placeHolder={
                        'Select certificate'
                    }
                    value={certificate}
                />
                <Select
                    list={fullDistrictsNames}
                    setValue={setdistrict}
                    placeHolder={
                        'Select District'
                    }
                    value={district}
                />
            </div>
            <div>
                <Button
                    button="submit"
                    label='SEARCH'
                    btnClass="primary mt-4"
                    size="small"
                    style={{ marginRight: '2rem' }}
                    onClick={handelsearch}
                />
                <Button
                    button="submit"
                    label='download'
                    btnClass="primary mt-4"
                    size="small"
                    style={{ marginRight: '2rem' }}
                    onClick={handleCertificateDownload}
                />
                <Button
                    button="submit"
                    label='START'
                    btnClass="primary mt-4"
                    size="small"
                    style={{ marginRight: '2rem' }}
                    onClick={handlestart}
                />
            </div>

            <div className='d-flex justify-content-around'>
                <h2>
                    Total count : {apilistCount}
                </h2>
                <h2>
                    Current Count :{count}
                </h2>
            </div>
            {certificate === 'teacher' && (<div
                ref={pdfRef}
                style={{ position: 'relative' }}
            >
                <span
                    className="text-capitalize"
                    style={{
                        position: 'absolute',
                        top: '9rem',
                        left: '15.8rem',
                        fontSize: '0.5rem',
                        fontFamily: 'Times New Roman'
                    }}
                >
                    {/* {currentUser?.data[0]?.title}{' '} */}
                    {name}
                </span>
                <span
                    className="text-capitalize"
                    style={{
                        position: 'absolute',
                        top: '9.9rem',
                        left: '5rem',
                        fontSize: '0.5rem',
                        fontFamily: 'Times New Roman'
                    }}
                >
                    {
                        org
                    }
                </span>
                <img
                    src={TeacherCertificate}
                    alt="certificate"
                    style={{
                        width: '297px',
                        height: '210px',
                        border: '1px solid #cccccc'
                    }}
                />
            </div>)}
            {certificate === 'studentIdea' && (
                <div
                    ref={pdfRef}
                    className="position-relative"
                    style={{ width: 'fit-content' }}
                >
                    <span
                        className="text-capitalize"
                        style={{
                            position: 'absolute',
                            top: `9.8rem`,
                            left: `12.8rem`,
                            fontSize: '0.5rem',
                            fontFamily: 'Times New Roman'
                        }}
                    >
                        {name}
                    </span>
                    <span
                        className="text-capitalize"
                        style={{
                            position: 'absolute',
                            top: `10.7rem`,
                            left: `3.3rem`,
                            fontSize: '0.5rem',
                            fontFamily: 'Times New Roman'
                        }}
                    >
                        {
                            org
                        }
                    </span>
                    <img
                        src={
                            ideaSubmissionCertificate
                        }
                        alt="certificate"
                        // className="img-fluid mx-auto"
                        style={{
                            width: '297px',
                            height: '210px',
                            border: '1px solid #cccccc'
                        }}
                    />
                </div>
            )}
            {certificate === 'studentCourse' && (
                <div
                    ref={pdfRef}
                    className="position-relative"
                    style={{ width: 'fit-content' }}
                >
                    <span
                        className="text-capitalize"
                        style={{
                            position: 'absolute',
                            top: `9.8rem`,
                            left: `12.8rem`,
                            fontSize: '0.5rem',
                            fontFamily: 'Times New Roman'
                        }}
                    >
                        {name}
                    </span>
                    <span
                        className="text-capitalize"
                        style={{
                            position: 'absolute',
                            top: `10.7rem`,
                            left: `3.3rem`,
                            fontSize: '0.5rem',
                            fontFamily: 'Times New Roman'
                        }}
                    >
                        {
                            org
                        }
                    </span>
                    <img
                        src={
                            courseCompletionCertificate
                        }
                        alt="certificate"
                        // className="img-fluid mx-auto"
                        style={{
                            width: '297px',
                            height: '210px',
                            border: '1px solid #cccccc'
                        }}
                    />
                </div>
            )}
        </>




    );
};

export default DownPage;
