import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import {
    FaTh,
    FaThLarge,
    FaLightbulb,
    FaShieldVirus,
    // FaQuestionCircle,
    FaBars,
    FaHouseUser,
    FaCertificate
} from 'react-icons/fa';
import { RiSurveyFill, RiLockPasswordFill } from 'react-icons/ri';

import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';

import TicketIcon from '../assets/media/ticket.png';
import FaqIcon from '../assets/media/faq.png';
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { logout } from '../helpers/Utils';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Aside = ({ rtl, toggled, handleToggleSidebar }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch =useDispatch();
    const presuveyStatusGl = useSelector(
        (state) =>
            state?.studentRegistration.presuveyStatusGl
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
        if (
            location.pathname === '/playCourse' ||
            location.pathname === '/admin/add-course'
        ) {
            setMenuCollapse(true);
        }
    },[]);
    const handleClick = (e) => {
        if (presuveyStatusGl !== 'COMPLETED') e.preventDefault();
    };
    const handleLogout = (e) => {
        logout(history, t, 'student',dispatch);
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
                        <Link to={'/dashboard'} exact className="d-flex">
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
                    {/* <MenuItem className="static">
                        {menuCollapse ? '' : <span>MAIN MENU</span>}
                    </MenuItem> */}
                    <MenuItem
                        icon={<RiSurveyFill />}
                        className={
                            location.pathname === '/student/pre-survey' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/student/pre-survey'}>
                            {/* <NavLink exact={true} to={'/student/pre-survey'} className={`${setpresurveyStatus ? 'noHover' : ""}`}> */}
                            {/* Pre Survey */}
                            {t('home.pre_survey')}
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<FaThLarge />}
                        className={
                            location.pathname === '/dashboard' &&
                            'sidebar-active'
                        }
                        // suffix={<span className="badge red">new1</span>}
                    >
                        <NavLink
                            exact={true}
                            onClick={handleClick}
                            to={'/dashboard'}
                        >
                            {/* Dashboard */}
                            {t('home.dashboard')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaTh />}
                        className={
                            location.pathname === `/playCourse/${1}` &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={handleClick}
                            to={`/playCourse/${1}`}
                        >
                            {/* Courses */}
                            {t('home.courses')}
                        </NavLink>
                    </MenuItem>
                    {/* <MenuItem
                        icon={<FaBriefcase />}
                        className={
                            location.pathname === '/teams' && 'sidebar-active'
                        }
                    >
                        <NavLink exact={true} onClick={handleClick} to={'/teams'}>
                            {t('home.teams')}
                        </NavLink>
                    </MenuItem> */}
                    <MenuItem
                        icon={<FaShieldVirus />}
                        className={
                            location.pathname === '/badges' && 'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={handleClick}
                            to={'/badges'}
                        >
                            {t('home.badges')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaLightbulb />}
                        className={
                            (location.pathname === '/challenges'|| location.pathname === '/challenge-initiation') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} onClick={handleClick} to={'/challenges'}>
                            {t('home.idea_submission')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={FaqIcon}
                                className="img-fluid"
                                alt="faq"
                            />
                        }
                        className={
                            location.pathname === '/faq' && 'sidebar-active'
                        }
                    >
                        <NavLink exact={true} onClick={handleClick} to={'/faq'}>
                            {/* FAQ */}
                            {t('home.faq')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={TicketIcon}
                                className="img-fluid"
                                alt="ticket"
                            />
                        }
                        className={
                            location.pathname === '/student/post-survey' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={handleClick}
                            to={'/student/post-survey'}
                        >
                            {/* PostSurvey */}
                            {t('home.post_survey')}
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<FaCertificate />}
                        className={
                            location.pathname === '/student/my-certificate' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            onClick={(e) => handleClick(e, '')}
                            // onClick={(e) => handleClick(e, 'certificate')}
                            to={'/student/my-certificate'}
                        >
                            {t('teacher.certificate')}
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<FaHouseUser />}
                        className={
                            location.pathname === '/my-profile' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            // onClick={(e) => handleClick(e, '')}
                            to={'/my-profile'}
                        >
                            {t('home.my_profile')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<RiLockPasswordFill />}
                        className={
                            location.pathname === '/change-password' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            //onClick={(e) => handleClick(e, '')}
                            to={'/change-password'}
                        >
                            {t('home.change_pass')}
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
                {/* <Menu iconShape="circle">
                    <MenuItem className="static">
                        {menuCollapse ? '' : <span>GENERAL</span>}
                    </MenuItem>
                    <SubMenu
                        suffix={<span className="badge yellow">2</span>}
                        title="Help"
                        icon={<FaQuestionCircle />}
                        data-element={location.pathname}
                    >
                        <MenuItem
                            className={
                                location.pathname === '/faq' && 'sidebar-active'
                            }
                        >
                            <NavLink exact={true} to={'/faq'}>
                                FAQ
                            </NavLink>
                        </MenuItem>
                        <MenuItem
                            className={
                                location.pathname === '/tickets' &&
                                'sidebar-active'
                            }
                        >
                            <NavLink to={'/tickets'}>Tickets</NavLink>
                        </MenuItem>
                    </SubMenu>
                </Menu> */}
            </SidebarContent>

            {/* <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <a
            href="#"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <span> Footer</span>
          </a>
        </div>
      </SidebarFooter> */}
        </ProSidebar>
    );
};

export default Aside;
