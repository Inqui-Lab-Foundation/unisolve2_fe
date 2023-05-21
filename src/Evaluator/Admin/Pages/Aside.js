import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaBars, FaLightbulb } from 'react-icons/fa';

import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import Logo from '../../../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { useHistory } from 'react-router-dom';
import {RiLogoutBoxRFill, RiLockPasswordFill} from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import {  logout } from "../../../helpers/Utils";
// import DashboardIcon from '../assets/media/DashboardIcon.svg';

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

    // useEffect(() => {
    //     if (location.pathname === '/admin/playvideo') {
    //         // document.querySelector(".pro-sidebar").classList.add("collapsed");
    //         setMenuCollapse(true);
    //     }
    // });
    // console.log("-----57", location);
    // console.log("-----50", location.pathname === '/admin/registered-schools' || location.pathname === '/admin/register-new-schools');
    const handleLogout = (e) => {
        logout(history, t,"EADMIN");
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
                        <Link to={'/eadmin/dashboard'} exact className="d-flex">
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
                    
                    {/* <MenuItem
                        icon={<img src={DashboardIcon} style={{width:"20px"}}/>}
                        className={
                            location.pathname === '/evaluator/dashboard' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/evaluator/dashboard'}>
                            Dashboard
                        </NavLink>
                    </MenuItem> */}
                    <MenuItem
                        icon={ <FaLightbulb />}
                        className={
                            (location.pathname === '/eadmin/dashboard' || location.pathname ==='/eadmin/listofideas') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/eadmin/dashboard'}>
                            Dashboard
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<RiLockPasswordFill />}
                        className={
                            location.pathname === '/eadmin/change-password' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            //onClick={(e) => handleClick(e, '')}
                            to={'/eadmin/change-password'}
                        >
                            Change Password
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={<RiLogoutBoxRFill  />}
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
