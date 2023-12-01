import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import EvaluationIcon from '../../../assets/media/EvaluationIcon.png';
import EvalConifIcon from '../../../assets/media/EvalConifIcon.png';
import ChallengesIcon from '../../../assets/media/ChallengesIcon.png';
import logoutIcon from '../../../assets/media/logoutIcon.png';
import { FaBars } from 'react-icons/fa';
import SmallLogo from '../../../assets/media/logo192.png';
import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
import Logo from '../../../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { useHistory } from 'react-router-dom';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { logout } from '../../../helpers/Utils';
import ReportIcon1 from '../../../assets/media/ReportIcon1.png';

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

    const handleLogout = (e) => {
        logout(history, t, 'EADMIN');
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
                                src={ChallengesIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            (location.pathname === '/eadmin/dashboard' ||
                                location.pathname === '/eadmin/listofideas') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/eadmin/dashboard'}
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
                            (location.pathname === '/eadmin/evaluationStatus' ||
                                location.pathname ===
                                    '/admin/evaluationStatus/viewlist') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/eadmin/evaluationStatus'}
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
                                src={EvalConifIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            location.pathname === '/eadmin/evaluationProcess' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/eadmin/evaluationProcess'}
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
                                src={ChallengesIcon}
                                style={{ width: '20px' }}
                            />
                        }
                        className={
                            location.pathname === '/eadmin/evaluator' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/eadmin/evaluator'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Evaluator
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
                            location.pathname === '/eadmin/reports' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/eadmin/reports'}
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
                            location.pathname === '/eadmin/change-password' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/eadmin/change-password'}
                            style={{
                                color: 'black !important',
                                '--override-color': 'black'
                            }}
                        >
                            <span style={{ color: 'var(--override-color)' }}>
                                Change Password
                            </span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img src={logoutIcon} style={{ width: '20px' }} />
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
