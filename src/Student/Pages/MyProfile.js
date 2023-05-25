/* eslint-disable indent */
import './Student.scss'
import React, { useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    Label
} from 'reactstrap'
import Layout from '../Layout.jsx'
import 'sweetalert2/src/sweetalert2.scss'
import { getCurrentUser } from '../../helpers/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentByIdData } from '../../redux/studentRegistration/actions'
import { t } from 'i18next'

const MyProfile = () => {
    const currentUser = getCurrentUser('current_user')
    const { teamMember } = useSelector((state) => state.studentRegistration)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStudentByIdData(currentUser?.data[0]?.student_id))
    }, [dispatch, currentUser?.data[0]?.student_id])

    return (
      <Layout>
        <Container className='MyProfile pt-3 pt-xl-5 mb-50'>
          {/* <UsersPage /> */}
          <Row>
            <Col className='col-xl-10 offset-xl-1 offset-md-0'>
              <Label>{t('student.profile')}</Label>
              <Row>
                <Col md={12}>
                  <Card className='w-100  mb-5 p-4'>
                    <CardBody>
                      <Row>
                        <Col
                            md={12}
                            className='my-auto profile-detail '
                          >
                            <CardText>
                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>Name</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember?.full_name
                                                                    ? teamMember?.full_name
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>

                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>Class</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember?.Grade
                                                                    ? teamMember?.Grade
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>

                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>Age</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember?.Age
                                                                    ? teamMember?.Age
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>

                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>Gender</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember?.Gender
                                                                    ? teamMember?.Gender
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>
                              </CardText>
                          </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Card className='w-100  mb-5 p-4'>
                    <CardBody>
                      <Row>
                        <Col
                            md={12}
                            className='my-auto profile-detail'
                          >
                            <CardText>
                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>UDISE</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization_code
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization_code
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>
                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>School Name</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.organization_name
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.organization_name
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>

                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>Team Name</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember.team
                                                                    ?.team_name
                                                                    ? teamMember
                                                                          .team
                                                                          ?.team_name
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>

                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>Teacher Name</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember.team
                                                                    ?.mentor
                                                                    ?.full_name
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.full_name
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>
                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>City</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.city
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.city
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>

                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>District</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.district
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.district
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>
                                <Row className='pt-3 pb-3'>
                                    <Col
                                        md={3}
                                        className='my-auto profile-detail'
                                      >
                                        <b>State</b>
                                      </Col>
                                    <Col md={1}>:</Col>
                                    <Col
                                        md={8}
                                        className='my-auto profile-detail'
                                      >
                                        <b>
                                            {teamMember.team
                                                                    ?.mentor
                                                                    ?.organization
                                                                    ?.state
                                                                    ? teamMember
                                                                          .team
                                                                          ?.mentor
                                                                          ?.organization
                                                                          ?.state
                                                                    : '-'}
                                          </b>
                                      </Col>
                                  </Row>
                              </CardText>
                          </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
}

export default MyProfile
