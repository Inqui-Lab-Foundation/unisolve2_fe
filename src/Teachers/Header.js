import React, { useLayoutEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Row, Col, Navbar } from 'reactstrap';
// import AvatarImg from '../assets/media/img/teacher.png';
import AvatarImg from '../assets/media/img/Avatar.png';

import {
    getAdminNotificationsList,
    getTeacherPresurveyStatus
} from '../redux/actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../helpers/Utils';

const Header = (props) => {
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    const presurveyStatus = useSelector(
        (state) => state?.mentors.teacherPresurveyStatus
    );
    // eslint-disable-next-line no-unused-vars
    window.onunload = function () {
        localStorage.setItem('headerOption', JSON.stringify('Home'));
    };

    useLayoutEffect(() => {
        if (!presurveyStatus) {
            dispatch(getTeacherPresurveyStatus());
        }
    }, [dispatch]);
    return (
        <header>
            <div
                className="header-comp sticky-top py-3"
                style={{ height: '7.3rem' }}
            >
                <div className="header-container">
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
                                    md={12}
                                    className="d-flex profile-section text-right"
                                >
                                    <div className="d-flex align-items-center profile">
                                        <img src={AvatarImg} />
                                        <span className="header-name-size">
                                            {currentUser?.data[0].full_name}
                                        </span>

                                        <span className="common-language-selc"></span>
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
    getAdminNotificationsListActions: getAdminNotificationsList
})(Header);
