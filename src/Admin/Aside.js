import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import CourseIcon from '../assets/media/CoursesIcon.svg';
import UserIcon from '../assets/media/UserListIcon.svg';
import DashboardIcon from '../assets/media/DashboardIcon.svg';
import BadgesIcon from '../assets/media/BadgesIcon.svg';

import TicketIcon from '../assets/media/ticket.png';
import ReportIcon from '../assets/media/reports.png';
// import LogoutIcon from '../assets/media/logout.png';
import FaqIcon from '../assets/media/faq.png';
import SchoolIcon from '../assets/media/schools.png';

import {
    ProSidebar,
    Menu,
    MenuItem,
    // SubMenu,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { FaBars, FaHouseUser, FaLightbulb, FaPen } from 'react-icons/fa';

import 'react-pro-sidebar/dist/css/styles.css';
import { useLocation } from 'react-router-dom';
// import Logo from "../../assets/img/Logo.png";
// import Logo from '../assets/media/img/Logo.svg';
import Logo from '../assets/media/tn-brands/UPSHIFT_BLACK.png';
import { useHistory } from 'react-router-dom';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

// import { getCurrentUser, logout } from "../helpers/Utils";
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

    useEffect(() => {
        if (location.pathname === '/admin/playvideo') {
            // document.querySelector(".pro-sidebar").classList.add("collapsed");
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
                    {/* <MenuItem className="static">
                        {menuCollapse ? '' : <span>MAIN MENU</span>}
                    </MenuItem> */}
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
                    {/* <MenuItem
                        icon={<img src={CourseIcon} />}
                        className={
                            (location.pathname === '/admin/all-courses' ||
                                location.pathname === '/admin/playvideo/*') &&
                            'sidebar-active'
                        }
                    >
                        <NavLink exact={true} to={'/admin/all-courses'}>
                            Courses
                        </NavLink>
                    </MenuItem> */}
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
                    {/* <MenuItem
            icon={<img src={ProblemIcon} />}
            className={
              location.pathname === "/admin/problem-categories" &&
              "sidebar-active"
            }
          >
            <NavLink exact={true} to={"/admin/problem-categories"}>
              Problem Categories
            </NavLink>
          </MenuItem> */}
                    <MenuItem
                        icon={<img src={UserIcon} />}
                        className={
                            // location.pathname === '/admin/userlist' &&
                            // 'sidebar-active'
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
                    {/* <SubMenu
                        title="Settings"
                        icon={<img src={TicketIcon} />}
                        data-element={location.pathname}
                    >
                        <MenuItem
                            icon={
                                <img
                                    src={FaqIcon}
                                    className="img-fluid"
                                    alt="faq"
                                />
                            }
                            className={
                                location.pathname === '/admin/road-map' &&
                                'sidebar-active'
                            }
                        >
                            <NavLink exact={true} to={'/admin/road-map'}>
                                Schedule Roadmap
                            </NavLink>
                        </MenuItem> */}
                    {/* <MenuItem
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
                        </MenuItem> */}
                    {/* </SubMenu> */}

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

                    {/* <MenuItem
                      
                        icon={
                            <img
                                src={LogoutIcon}
                                className="img-fluid"
                                alt="logout"
                            />
                        }
                        className={
                            location.pathname === '/admin/logout' &&
                            'sidebar-active'
                        }
                    >
                        <NavLink
                            exact={true}
                            to={'/admin/logout'}
                            
                            activeClassName="sidebar-active"
                        >
                            Logout
                        </NavLink>
                    </MenuItem> */}
                </Menu>

                {/* <Menu iconShape='circle'>
          <MenuItem className='static'>
            {menuCollapse ? "" : <span>GENERAL</span>}
          </MenuItem>
          <SubMenu
            suffix={<span className='badge yellow'>2</span>}
            title='Help'
            icon={<FaQuestionCircle />}
            data-element={location.pathname}
          >
            <MenuItem
              className={location.pathname === "/admin/faq" && "sidebar-active"}
            >
              <NavLink exact={true} to={"/admin/faq"}>
                Manage FAQ's
              </NavLink>
            </MenuItem>
            <MenuItem
              className={
                location.pathname === "/admin/tickets" && "sidebar-active"
              }
            >
              <NavLink to={"/admin/all-tickets"}>Tickets</NavLink>
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
