/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import DashboardIcon from '../assets/media/DashboardIcon.svg';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import {
    FaBars,
    FaTh,
    FaQuestionCircle,
    FaCaretSquareRight,
    FaCertificate,
    FaHouseUser
} from 'react-icons/fa';
import {
    RiSurveyFill,
    RiTeamFill,
    RiLogoutBoxRFill,
    RiLockPasswordFill
} from 'react-icons/ri';
import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { compareDates, logout } from '../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

const Aside = ({ rtl, toggled, handleToggleSidebar }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { schedules } = useSelector((state) => state.schedules);
    const presurveyStatus = useSelector(
        (state) => state?.mentors.teacherPresurveyStatus
    );

    const location = useLocation();

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = (val) => {
        //condition checking to change state from true to false and vice versa
        setMenuCollapse(val);
        // menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    useEffect(() => {
        if (location.pathname === '/admin/playvideo') {
            // document.querySelector(".pro-sidebar").classList.add("collapsed");
            setMenuCollapse(true);
        }
    });
    const handleClick = (e, type) => {
        const typeFilter = type && schedules[0].teacher[type];
        if (presurveyStatus !== 'COMPLETED') e.preventDefault();

        if (type) {
            if (presurveyStatus === 'COMPLETED' && !compareDates(typeFilter))
                e.preventDefault();
        }
    };
    const handleLogout = (e) => {
        logout(history, t, 'teacher', dispatch);
        e.preventDefault();
    };
    return (
        <ProSidebar
            rtl={rtl}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
            collapsed={menuCollapse}
        >
            <SidebarHeader>
                <div className="sidebar-header header-comp sticky-top">
                    <div
                        className="d-flex logo-section"
                        style={{ height: '5rem' }}
                    >
                        <Link
                            to={'/teacher/dashboard'}
                            exact
                            className="d-flex"
                        >
                            {menuCollapse ? (
                                <img
                                    src={Logo}
                                    alt="logo"
                                    className="img-fluid img-close"
                                />
                            ) : (
                                <>
                                    <img
                                        src={Logo}
                                        alt="logo"
                                        className="img-fluid img-open w-100"
                                    />
                                </>
                            )}
                        </Link>
                    </div>
                </div>
                <div className="closemenu">
                    {/* changing menu collapse icon on click */}
                    {menuCollapse ? (
                        <FaBars onClick={() => menuIconClick(false)} />
                    ) : (
                        <FaBars onClick={() => menuIconClick(true)} />
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<RiSurveyFill />}
                        className={
                            location.pathname === '/teacher/pre-survey' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/teacher/pre-survey'}>
                            {t('teacher.pre_survey')}
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={DashboardIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            location.pathname === '/teacher/dashboard' &&
                            'sidebar-active'
                        }
                        // suffix={<span className="badge red">new1</span>}
                    >
                        <NavLink
                            exact={true}
                            onClick={(e) => handleClick(e, '')}
                            to={'/teacher/dashboard'}
                        >
                            {t('teacher.dashboard')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaTh />}
                        className={
                            location.pathname === `/teacher/playvideo/${1}` &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={(e) => handleClick(e, '')}
                            to={`/teacher/playvideo/${1}`}
                        >
                            {t('teacher.course')}
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<RiTeamFill />}
                        className={
                            (location.pathname === '/teacher/teamlist' ||
                                location.pathname ===
                                    '/teacher/create-team-member' ||
                                location.pathname ===
                                    '/teacher/view-team-member' ||
                                location.pathname === '/teacher/create-team') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={(e) => handleClick(e, '')}
                            to={'/teacher/teamlist'}
                        >
                            {t('teacher.team')}
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<FaQuestionCircle />}
                        className={
                            location.pathname === '/teacher/faq' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/teacher/faq'}
                            onClick={(e) => handleClick(e, '')}
                        >
                            {' '}
                            {t('teacher.faq')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaCaretSquareRight />}
                        className={
                            (location.pathname === '/teacher/support-journey' ||
                                location.pathname ===
                                    '/teacher/support-journey/add-ticket' ||
                                location.pathname ===
                                    `/teacher/support-journey/ans-ticket`) &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={(e) => handleClick(e, '')}
                            to={'/teacher/support-journey'}
                        >
                            {' '}
                            {t('teacher.support')}
                        </NavLink>
                    </MenuItem>
                    {/* post */}

                    <MenuItem
                        icon={<RiSurveyFill />}
                        className={
                            location.pathname === '/teacher/post-survey' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={(e) => handleClick(e, '')}
                            to={'/teacher/post-survey'}
                        >
                            {t('teacher.post_survey')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaCertificate />}
                        className={
                            location.pathname === '/teacher/my-certificate' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={(e) => handleClick(e, '')}
                            to={'/teacher/my-certificate'}
                        >
                            {t('teacher.certificate')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaHouseUser />}
                        className={
                            location.pathname === '/teacher/my-profile' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/teacher/my-profile'}>
                            {t('teacher.profile')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<RiLockPasswordFill />}
                        className={
                            location.pathname === '/teacher/change-password' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/teacher/change-password'}>
                            {t('teacher.password')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<RiLogoutBoxRFill />}
                        className={location.pathname === '' && 'sidebar-active'}
                    >
                        <NavLink exact={true} onClick={handleLogout} to={''}>
                            {t('teacher.logout')}
                        </NavLink>
                    </MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
};

export default Aside;
