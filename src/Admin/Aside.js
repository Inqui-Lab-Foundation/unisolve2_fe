import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UsersIcon1 from '../assets/media/UsersIcon1.png';
import DashboardIcon1 from '../assets/media/DashboardIcon1.png';
import ChallengesIcon from '../assets/media/ChallengesIcon.png';
import EvaluationIcon from '../assets/media/EvaluationIcon.png';
import BadgesIcon from '../assets/media/BadgesIcon.png';
import SupportIcon from '../assets/media/SupportIcon.png';
import ReportIcon1 from '../assets/media/ReportIcon1.png';
import FAQICON from '../assets/media/FAQICON.png';
import InstituionsIcon from '../assets/media/InstitutionsIcon.jpg';
import ProfileIcon from '../assets/media/ProfileIcon.png';
import logoutIcon from '../assets/media/logoutIcon.png';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaBars, FaHotel, FaClipboard } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { useHistory } from 'react-router-dom';
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
                                src={DashboardIcon1}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            location.pathname === '/admin/dashboard' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/dashboard'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Dashboard
                            </span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={ChallengesIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            (location.pathname === '/admin/challenges' ||
                                location.pathname ===
                                    '/admin/challenges/viewlistofchallenges') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/challenges'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Challenges
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={EvaluationIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            (location.pathname === '/admin/evaluationStatus' ||
                                location.pathname ===
                                    '/admin/evaluationStatus/viewlist') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/evaluationStatus'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Evaluation Status
                            </span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={EvaluationIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            location.pathname === '/admin/evaluationProcess' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/evaluationProcess'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Evaluation Config
                            </span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={InstituionsIcon}
                                style={{ width: '20px' }}
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
                        <NavLink
                            exact={true}
                            to={'/admin/registered-schools'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Institutions
                            </span>
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
                        icon={<FaClipboard />}
                        className={
                            location.pathname === '/admin/LatestNews/index' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/LatestNews/index'}>
                            LatestNews
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img src={UsersIcon1} style={{ width: '20px' }} />
                        }
                        className={
                            (location.pathname === '/admin/userlist' ||
                                location.pathname === '/admin/add-mentor' ||
                                location.pathname === '/admin/add-evaluator') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/userlist'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Users
                            </span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img src={BadgesIcon} style={{ width: '20px' }} />
                        }
                        className={
                            location.pathname === '/admin/badges' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/badges'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Badges
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={FAQICON}
                                style={{ width: '20px' }}
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
                        <NavLink
                            exact={true}
                            to={'/admin/faq'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                FAQs
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={SupportIcon}
                                style={{ width: '20px' }}
                                className="img-fluid"
                                alt="ticket"
                            />
                        }
                        className={
                            location.pathname === '/admin/tickets' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/tickets'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Support
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={FAQICON}
                                style={{ width: '20px' }}
                                className="img-fluid"
                                alt="faq"
                            />
                        }
                        className={
                            location.pathname === '/admin/translation' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/translation'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Translation
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={ReportIcon1}
                                style={{ width: '20px' }}
                                className="img-fluid"
                                alt="report"
                            />
                        }
                        className={
                            location.pathname === '/admin/reports' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/reports'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Reports
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={ProfileIcon}
                                style={{ width: '20px' }}
                                className="img-fluid"
                                alt="report"
                            />
                        }
                        className={
                            location.pathname === '/admin/my-profile' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/my-profile'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                My Profile
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        icon={
                            <img
                                src={logoutIcon}
                                style={{ width: '20px' }}
                                className="img-fluid"
                                alt="report"
                            />
                        }
                        className={location.pathname === '' && 'sidebar-active'}
                    >
                        <NavLink
                            exact={true}
                            onClick={handleLogout}
                            to={''}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Logout
                            </span>
                        </NavLink>
                    </MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
};

export default Aside;
