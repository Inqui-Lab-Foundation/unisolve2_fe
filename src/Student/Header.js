import React, { useEffect, useLayoutEffect } from 'react';
import './Header.scss';
import { FaBars } from 'react-icons/fa';
import { Row, Col, Navbar } from 'reactstrap';
// import { useHistory } from 'react-router-dom';
// import { CommonDropDownComp } from '../stories/CommonDropdown/CommonDropdownComp.jsx';
//import LanguageSelectorComp from '../components/LanguageSelectorComp';

import AvatarImg from '../assets/media/img/Avatar.png';

import {getCurrentUser} from "../helpers/Utils"; 
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { getPresurveyData, getStudentGlobalLanguage } from '../redux/studentRegistration/actions';

const Header = (props) => {
    const dispatch= useDispatch();
    const currentUser = getCurrentUser("current_user");
    const presuveyStatusGl = useSelector(
        (state) =>
            state?.studentRegistration?.presuveyStatusGl
    );
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    useLayoutEffect(() => {
        if(!presuveyStatusGl && currentUser)
            dispatch(getPresurveyData(language));
    }, [presuveyStatusGl,language,dispatch]);
    
    const localLang = JSON.parse(localStorage.getItem("s_language"));
    useEffect(() => {
        if(localLang){
            i18next.changeLanguage(localLang.code);
            dispatch(getStudentGlobalLanguage(localLang));
        }
    }, []);
    
    window.onunload = function () {
        localStorage.setItem('headerOption', JSON.stringify('Home'));
    };
    
    return (
        <header>
            <div className="header-comp sticky-top py-4">
                <div className="header-container">
                    <div className="tollbar">
                        <div
                            className={'btn-toggle dfdf'}
                            onClick={() => props.handleToggleSidebar(true)}
                        >
                            <FaBars />
                        </div>
                        <Navbar>
                            <Row className="justify-content-between w-100">
                                {/* <Col md={6}>
                                    <InputWithSearch {...headerProps} />
                                </Col> */}
                                <Col md={12} className="d-flex profile-section">
                                    {/* <Badge
                                        status="success"
                                        count={1}
                                        className="notify-sec"
                                    >
                                        <CommonDropDownComp {...notifyOpt} />
                                        <NavLink exact to={"/notification"}>
                      <VscBell />
                    </NavLink>
                                    </Badge> */}

                                    {/* <div className="d-flex align-items-center profile">
                                        <CommonDropDownComp {...profileOpt} /> 
                                        <span className="common-language-selc">
                                            <LanguageSelectorComp />
                                        </span>
                                    </div> */}
                                    <div className="d-flex align-items-center profile">
                                        <img src={AvatarImg} />
                                        <span className='header-name-size'>
                                            {currentUser?.data[0].full_name}
                                        </span> 
                                        {/* <CommonDropDownComp {...profileOpt} /> */}
                                        {window.location.pathname === '/student/pre-survey' && presuveyStatusGl && presuveyStatusGl !=="COMPLETED" && <span className="common-language-selc">
                                            {/* <LanguageSelectorComp module="student" /> */}
                                        </span>}
                                    </div>
                                </Col>
                            </Row>
                        </Navbar>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
