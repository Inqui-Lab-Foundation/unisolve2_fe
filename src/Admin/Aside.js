import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserIcon from '../assets/media/UserListIcon.svg';
import DashboardIcon from '../assets/media/DashboardIcon.svg';
import BadgesIcon from '../assets/media/BadgesIcon.svg';
import TicketIcon from '../assets/media/ticket.png';
import ReportIcon from '../assets/media/reports.png';
import FaqIcon from '../assets/media/faq.png';
import SchoolIcon from '../assets/media/schools.png';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaBars, FaHotel, FaHouseUser, FaLightbulb, FaPen } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { useHistory } from 'react-router-dom';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { logout } from '../helpers/Utils';

const Aside = ({ rtl, toggled, handleToggleSidebar }) => {
    const location = useLocation();
    const history = useHistory();
    const { t } = useTranslation();

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
            setMenuCollapse(true);
        }
    });
    const handleLogout = (e) => {
        logout(history, t, 'ADMIN');
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
                        <Link to={'/admin/dashboard'} exact className="d-flex">
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
                        icon={
                            <img
                                src={DashboardIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            location.pathname === '/admin/dashboard' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/dashboard'}>
                            Dashboard
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaLightbulb />}
                        className={
                            (location.pathname === '/admin/challenges' ||
                                location.pathname ===
                                    '/admin/challenges/viewlistofchallenges') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/challenges'}>
                            Challenges
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<FaPen />}
                        className={
                            (location.pathname === '/admin/evaluationStatus' ||
                                location.pathname ===
                                    '/admin/evaluationStatus/viewlist') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/evaluationStatus'}>
                            Evaluation Status
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaPen />}
                        className={
                            location.pathname === '/admin/evaluationProcess' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/evaluationProcess'}>
                            Evaluation Config
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={SchoolIcon}
                                className="img-fluid"
                                alt="school"
                            />
                        }
                        className={
                            (location.pathname ===
                                '/admin/registered-schools' ||
                                location.pathname ===
                                    '/admin/register-new-schools') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/registered-schools'}>
                            Institutions
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaHotel />}
                        className={
                            location.pathname === '/admin/Resources/index' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/Resources/index'}>
                            Resources
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<img src={UserIcon} />}
                        className={
                            (location.pathname === '/admin/userlist' ||
                                location.pathname === '/admin/add-mentor' ||
                                location.pathname === '/admin/add-evaluator') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/userlist'}>
                            Users
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<img src={BadgesIcon} />}
                        className={
                            location.pathname === '/admin/badges' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/badges'}>
                            Badges
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
                            (location.pathname === '/admin/faq' ||
                                location.pathname === '/admin/New-faq') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/faq'}>
                            FAQs
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
                            location.pathname === '/admin/tickets' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/tickets'}>
                            Support
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
                            location.pathname === '/admin/translation' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/translation'}>
                            Tranlsation
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={ReportIcon}
                                className="img-fluid"
                                alt="report"
                            />
                        }
                        className={
                            location.pathname === '/admin/reports' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/reports'}>
                            Reports
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<FaHouseUser />}
                        className={
                            location.pathname === '/admin/my-profile' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/my-profile'}>
                            My Profile
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={<RiLogoutBoxRFill />}
                        className={location.pathname === '' && 'sidebar-active'}
                    >
                        <NavLink exact={true} onClick={handleLogout} to={''}>
                            Logout
                        </NavLink>
                    </MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
};

export default Aside;
