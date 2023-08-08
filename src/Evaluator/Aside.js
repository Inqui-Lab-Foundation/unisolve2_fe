import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaBars, FaLightbulb, FaInfo } from 'react-icons/fa';
import SmallLogo from '../assets/media/logo192.png';

import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { useHistory } from 'react-router-dom';
import { RiLogoutBoxRFill, RiLockPasswordFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { logout } from '../helpers/Utils';

const Aside = ({ rtl, toggled, handleToggleSidebar }) => {
    // const intl = useIntl();

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

    const handleLogout = (e) => {
        logout(history, t, 'EVALUATOR');
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
                            to={'/evaluator/submitted-ideas'}
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
                        icon={<FaInfo />}
                        className={
                            location.pathname === '/evaluator/instructions' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/evaluator/instructions'}>
                            Instructions
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaLightbulb />}
                        className={
                            location.pathname ===
                                '/evaluator/submitted-ideas' && 'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/evaluator/submitted-ideas'}>
                            Evaluation
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<FaLightbulb />}
                        className={
                            location.pathname ===
                                '/evaluator/evaluated-ideas' && 'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/evaluator/evaluated-ideas'}>
                            Evaluated Ideas
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<RiLockPasswordFill />}
                        className={
                            location.pathname ===
                                '/evaluator/change-password' && 'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/evaluator/change-password'}>
                            Change Password
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
