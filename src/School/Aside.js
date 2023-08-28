/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaBars } from 'react-icons/fa';
import DashboardIcon1 from '../assets/media/DashboardIcon1.png';
import { FaHouseUser } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import SmallLogo from '../assets/media/logo192.png';
import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { RiLockPasswordFill } from 'react-icons/ri';
import logoutIcon from '../assets/media/logoutIcon.png';

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
        logout(history, t, 'school');
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
                        <Link to={'/school/dashboard'} exact className="d-flex">
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
                            location.pathname === '/school/dashboard' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/school/dashboard'}
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
                        icon={<RiLockPasswordFill />}
                        className={
                            location.pathname === '/school-changePassword' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/school-changePassword'}>
                            {t('teacher.password')}
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaHouseUser />}
                        className={
                            location.pathname === '/school/my-profile' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/school/my-profile'}>
                            {t('teacher.profile')}
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
