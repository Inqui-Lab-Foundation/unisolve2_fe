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
// import badgesBg from '../../../assets/media/img/badge_header.svg';
// import { ProgressComp } from '../../../stories/Progress/Progress';
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
    // }, [dispatch,currentUser?.data[0]?.user_id,language]);
    
   
    return (
        <Layout>
            <div className="badges-page mt-5 mb-50">
                <Container className=" mt-2 ">
                    {/* <h2 className="mt-5">Badges</h2> */}
                    {/* <Row className="m-0 badges-head mb-50">
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            xl={6}
                            className="p-0 badges-content"
                        >
                            <div>
                                <h2>Learn more and earn Badges</h2>
                                <p className="pt-1">
                                    The more badges you earn, the higher your
                                    level - and the more you’re recognized in
                                    the community for your contributions.
                                </p>
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            xl={6}
                            className="p-0 badgeHeader"
                        >
                            <div className="courses-head">
                                <Figure className="my-0">
                                    <img
                                        className="w-100 img-fluid"
                                        src={badgesBg}
                                    />
                                </Figure>
                            </div>
                        </Col>
                    </Row> */}

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

                {/* <Container className="myBadges mb-50">
                    <Col>
                        <h2 className="title mb-4">Possible Badges</h2>
                        <Row className="progressCard ">
                            {ProgressCardList.map((progress, i) => {
                                return (
                                    <Col
                                        key={i}
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        xl={4}
                                        className="mb-4"
                                    >
                                        <Card className="progress-card p-3  p-md-5">
                                            <div className="d-flex">
                                                <Figure
                                                    className="my-auto"
                                                    style={{ width: '7.4rem' }}
                                                >
                                                    <CardImg
                                                        src={progress.icon}
                                                    />
                                                </Figure>
                                                <CardBody className="progress-section">
                                                    <CardTitle className="progress-name mt-3">
                                                        {progress.name}
                                                        <span className="progress-count w-100 text-right">
                                                            {progress.count}
                                                        </span>
                                                    </CardTitle>
                                                    <CardSubtitle className="progress-text">
                                                        <ProgressComp
                                                            {...progressProp}
                                                        />
                                                        <div className="progress-text mt-1">
                                                            {progress.text}
                                                        </div>
                                                    </CardSubtitle>
                                                </CardBody>
                                            </div>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Container> */}
            </div>
        </Layout>
    );
};

export default BadgesComp;
