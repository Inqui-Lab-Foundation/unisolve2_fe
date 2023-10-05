import React, { useState } from 'react';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaBars, FaPhotoVideo } from 'react-icons/fa';
import DashboardIcon1 from '../assets/media/DashboardIcon1.png';
import SmallLogo from '../assets/media/logo192.png';
import 'react-pro-sidebar/dist/css/styles.css';

import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { RiLockPasswordFill } from 'react-icons/ri';
import logoutIcon from '../assets/media/logoutIcon.png';
import ReportIcon1 from '../assets/media/ReportIcon1.png';

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
    };

    const handleLogout = (e) => {
        logout(history, t, '/COORDINATOR');
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
                            to={'/coordinator/dashboard'}
                            exact
                            className="d-flex"
                        >
                            {menuCollapse ? (
                                <img
                                    src={SmallLogo}
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
                <div className="closemenu" style={{ paddingRight: '1rem' }}>
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
                            location.pathname === '/coordinator/dashboard' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/coordinator/dashboard'}
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
                                src={ReportIcon1}
                                style={{ width: '20px' }}
                                className="img-fluid"
                                alt="report"
                            />
                        }
                        className={
                            location.pathname === '/coordinator/report' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/coordinator/report'}
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
                        icon={<RiLockPasswordFill />}
                        className={
                            location.pathname ===
                                '/coordinator-changePassword' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/coordinator-changePassword'}
                        >
                            {t('teacher.password')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaPhotoVideo />}
                        className={
                            location.pathname === '/coordinator/help' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/coordinator/help'}>
                            Help
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
