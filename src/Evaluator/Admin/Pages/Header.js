/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect } from "react";
import "./Header.scss";
import { FaBars } from "react-icons/fa";
import { Row, Col, Navbar } from "reactstrap";
import AvatarImg from "../../../assets/media/img/Avatar.png";

import { getAdminNotificationsList } from "../../../redux/actions";
import { connect } from "react-redux";
import { getCurrentUser} from "../../../helpers/Utils";


const Header = (props) => {

    const currentUser = getCurrentUser("current_user");

    return (
        <header>
            <div className="header-comp sticky-top py-3">
                <div className="header-container py-2">
                    <div className="tollbar">
                        <div
                            className={`btn-toggle dfdf`}
                            onClick={() => props.handleToggleSidebar(true)}
                        >
                            <FaBars />
                        </div>
                        <Navbar>
                            <Row className="justify-content-between w-100">
                                <Col
                                    className="d-flex profile-section text-right order-lg-1 order-0"
                                >
                                    <div className="d-flex align-items-center profile">
                                        <div className="d-flex align-items-center profile">
                                            <img
                                                src={AvatarImg}
                                                className="img-fluid"
                                            />
                                            <span className="header-name-size text-capitalize">
                                                {currentUser?.data[0]
                                                    ?.full_name || ''}
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Navbar>
                    </div>
                </div>
            </div>
        </header>
    );
};

const mapStateToProps = ({ adminNotifications }) => {
    const { notificationsList, NotificationCount } = adminNotifications;
    return { notificationsList, NotificationCount };
};

export default connect(mapStateToProps, {
    getAdminNotificationsListActions: getAdminNotificationsList,
})(Header);
// export default Header;
