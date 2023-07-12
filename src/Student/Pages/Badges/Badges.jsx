import React, { useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import './style.scss';
import { Figure } from 'react-bootstrap';
import Layout from '../../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentBadges } from '../../../redux/studentRegistration/actions';
import { getCurrentUser } from '../../../helpers/Utils';
import moment from 'moment/moment';
const BadgesComp = () => {
    const {badges} = useSelector(state=>state.studentRegistration);
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const currentUser = getCurrentUser('current_user');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStudentBadges(currentUser?.data[0]?.user_id,language));
    }, []);

    return (
        <Layout>
            <div className="badges-page mt-5 mb-50">
                <Container className=" mt-2 ">
                    <Row>
                        <Col md={12} className="w-100 d-block">
                            <h2 className="title mb-4">My Badges</h2>
                        </Col>
                    </Row>
                    <Row
                        className="myBadges equal mt-0 mb-50"
                        style={{ gap: '1.5rem' }}
                    >
                        {badges && badges.length>0 && badges.map((badge, i) => {
                            return (
                                <div
                                    key={i}
                                    className="badgesCard  col-xs-12 col-sm-6  col-xl-2 mb-3"
                                >
                                    <Card className="badge-card py-5 h-100" style={{backgroundColor:`${badge?.student_status ? "":"lightgrey"}`}}>
                                        <Figure className="w-100 text-center">
                                            <CardImg
                                                alt={badge.icon}
                                                src={process.env.REACT_APP_API_IMAGE_BASE_URL + badge.icon}
                                                style={{ width: '7.4rem' }}
                                            />
                                        </Figure>
                                        <CardBody>
                                            <CardTitle className="badge-name mb-3">
                                                {badge.name}
                                            </CardTitle>
                                            <CardSubtitle className="badge-date">
                                                EARNED ON:{' '}
                                                <span className="badge-time">
                                                    {badge?.student_status ? moment(badge?.student_status).format("DD MMM YYYY") :"Locked"}
                                                </span>
                                            </CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </div>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default BadgesComp;
