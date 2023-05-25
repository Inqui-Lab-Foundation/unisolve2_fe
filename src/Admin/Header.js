/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './Header.scss'
import { FaBars } from 'react-icons/fa'
import { Row, Col, Navbar } from 'reactstrap'
import { VscBell } from 'react-icons/vsc'
import AvatarImg from '../assets/media/img/Avatar.png'
import { getAdminNotificationsList } from '../redux/actions'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, logout } from '../helpers/Utils'
import { useTranslation } from 'react-i18next'

const Header = (props) => {
  const { t } = useTranslation()
  const history = useHistory()
  const currentUser = getCurrentUser('current_user')
  const profileOpt = {
    options: [
      { name: 'My Profile', path: '/admin/my-profile' },
      { name: 'Logout', path: '', onClick: () => logout(history, t) }
    ],
    name: currentUser?.data[0]?.full_name,
    img: AvatarImg
  }
  const notifyOpt = {
    options: [
      {
        name: 'You have a new Notification',
        path: '/admin/notifications',
        data:
                    props.notificationsList.length > 0
                      ? props.notificationsList
                      : []
      }
    ],
    Icon: VscBell
  }

  const headerProps = {
    size: 'large',
    placeholder: 'Search',
    isLogin: false
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  // const open = Boolean(anchorEl);

  window.onunload = function () {
    localStorage.setItem('headerOption', JSON.stringify('Home'))
  }

  return (
    <header>
      <div className='header-comp sticky-top py-3'>
        <div className='header-container'>
          <div className='tollbar'>
            <div
              className='btn-toggle dfdf'
              onClick={() => props.handleToggleSidebar(true)}
            >
              <FaBars />
            </div>
            <Navbar>
              <Row className='justify-content-between w-100'>
                <Col
                  md={12}
                  className='d-flex profile-section text-right'
                >
                  <div className='d-flex align-items-center profile'>
                    <div className='d-flex align-items-center profile'>
                        <img
                            src={AvatarImg}
                            className='img-fluid'
                          />
                        <span className='header-name-size'>
                            {
                                                    currentUser?.data[0]
                                                      ?.full_name
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
  )
}

const mapStateToProps = ({ adminNotifications }) => {
  const { notificationsList, NotificationCount } = adminNotifications
  return { notificationsList, NotificationCount }
}

export default connect(mapStateToProps, {
  getAdminNotificationsListActions: getAdminNotificationsList
})(Header)
