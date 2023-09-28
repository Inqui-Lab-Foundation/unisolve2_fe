/* eslint-disable no-unused-vars */
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Row, Col, Navbar } from 'reactstrap';
import AvatarImg from '../assets/media/img/Avatar.png';
import { getCurrentUser } from '../helpers/Utils';

const Header = (props) => {
    const currentUser = getCurrentUser('current_user');

    window.onunload = function () {
        localStorage.setItem('headerOption', JSON.stringify('Home'));
    };

    return (
        <header>
            <div className="header-comp sticky-top py-3">
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
                                        <div className="d-flex align-items-center profile">
                                            <img
                                                src={AvatarImg}
                                                className="img-fluid"
                                            />
                                            <span className="header-name-size">
                                                {
                                                    currentUser?.data[0]
                                                        ?.organization_name
                                                }
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
export default Header;
