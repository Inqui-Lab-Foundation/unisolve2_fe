import { Fragment, useLayoutEffect, useRef } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import { Button } from '../../../stories/Button';
import Layout from '../../Layout';
import jsPDF from 'jspdf';
import { getCurrentUser } from '../../../helpers/Utils';
import courseCompletionCertificate from '../../../assets/media/img/certificates/TN-SIDP-Certificates-signed-2-1.png';
import ideaSubmissionCertificate from '../../../assets/media/img/certificates/TN-SIDP-Certificates-signed-3-1.png';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStudentChallengeSubmittedResponse,
    getStudentDashboardStatus,
    studentPostSurveyCertificate,
    updateStudentBadges,
    updateStudentCertificate
} from '../../../redux/studentRegistration/actions';
//import CommonPage from '../../../components/CommonPage';
import moment from 'moment';
import Congo from '../../../assets/media/survey-success.jpg';

const Certificate = ({
    type,
    currentUser,
    postSurveyStatus,
    certDate,
    language
}) => {
    const { t } = useTranslation();
    const pdfRef = useRef(null);
    const partRef = useRef(null);
    const dispatch = useDispatch();
    const handleCertificateDownload = () => {
        // here we can download the certificates //
        const content = type ? partRef.current : pdfRef.current;
        const badge = 'the_finisher';
        const size = type ? [298, 220] : [298, 220];
        // const size = type ? [210, 297] : [298, 200];
        const orientation = type ? 'l' : 'l';
        const doc = new jsPDF(orientation, 'px', size);
        const certName = `${currentUser?.data[0]?.full_name}_${
            type ? 'idea_certificate' : 'course_certificate'
        }`;
        doc.html(content, {
            callback: function (doc) {
                doc.save(certName);
            }
        });
        if (!type)
            dispatch(
                updateStudentBadges(
                    { badge_slugs: [badge] },
                    currentUser?.data[0]?.user_id,
                    language,
                    t
                )
            );
        if (!type)
            dispatch(
                updateStudentCertificate(currentUser?.data[0]?.student_id)
            );
    };
    const certDateCheck = () => {
        const check =
            type !== 'participate'
                ? certDate?.course_completed_date &&
                  moment(certDate?.course_completed_date).format('DD-MM-YYYY')
                : '';
        return check ? ' on ' + check : '';
    };
    return (
        <Card
            className="course-sec-basic p-5 m-4 w-100"
            style={{
                backgroundColor: `${postSurveyStatus ? '' : 'lightgrey'}`
            }}
        >
            <CardBody>
                <CardTitle className=" text-left pt-4 pb-4" tag="h2">
                    {type
                        ? t('teacher_certificate.participate_certificate')
                        : t('teacher_certificate.certificate')}
                </CardTitle>
                <div className="common-flex">
                    <div
                        ref={type ? partRef : pdfRef}
                        className="position-relative"
                        style={{ width: 'fit-content' }}
                    >
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: `${type ? '8.1rem' : '7.4rem'}`,
                                left: `${type ? '10.3rem' : '10rem'}`,
                                // top: `${type ? '9rem' : '12.8rem'}`,
                                // left: `${type ? '10.3rem' : '6.5rem'}`,
                                fontSize: '0.8rem',
                                fontFamily: 'Times New Roman'
                            }}
                        >
                            {currentUser?.data[0]?.full_name}
                        </span>
                        <span
                            className="text-capitalize"
                            style={{
                                position: 'absolute',
                                top: `${type ? '9.5rem' : '8.8rem'}`,
                                left: `${type ? '5rem' : '5rem'}`,
                                fontSize: '0.8rem',
                                fontFamily: 'Times New Roman'
                            }}
                        >
                            {currentUser?.data[0]?.organization_name +
                                certDateCheck()}
                        </span>
                        <img
                            src={
                                type
                                    ? ideaSubmissionCertificate
                                    : courseCompletionCertificate
                            }
                            alt="certificate"
                            className="img-fluid mx-auto"
                            style={{
                                width: '297px',
                                height: '210px',
                                // width: `${type ? '297px' : '200px'}`,
                                // height: `${type ? '209px' : '297px'}`,
                                border: '1px solid #cccccc'
                            }}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button
                        button="submit"
                        disabled={!postSurveyStatus}
                        label={
                            type
                                ? t('teacher_certificate.download_participate')
                                : t('teacher_certificate.download')
                        }
                        btnClass={`${
                            postSurveyStatus ? 'primary' : 'default'
                        } mt-4`}
                        size="small"
                        style={{ marginRight: '2rem' }}
                        onClick={handleCertificateDownload}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

const MyCertificate = () => {
    const showDummypage = false;
    const { t } = useTranslation();
    // const teamMember = useSelector((state) => state?.studentRegistration.teamMember);
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const postSurveyStatusGl = useSelector(
        (state) => state?.studentRegistration?.postSurveyStatusGl
    );
    const dashboardStatus = useSelector(
        (state) => state?.studentRegistration?.dashboardStatus
    );
    const ideaSubmissionStatus = useSelector(
        (state) => state?.studentRegistration.ideaSubmissionStatus
    );
    const ideaSubmissionsSubmittedAt = useSelector(
        (state) => state?.studentRegistration?.challengesSubmittedResponse[0]
    );
    let { all_topics_count, topics_completed_count } = dashboardStatus
        ? dashboardStatus
        : { all_topics_count: null, topics_completed_count: null };
    const currentUser = getCurrentUser('current_user');
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (!dashboardStatus)
            dispatch(
                getStudentDashboardStatus(
                    currentUser?.data[0]?.user_id,
                    language
                )
            );
        if (!ideaSubmissionStatus)
            dispatch(
                getStudentChallengeSubmittedResponse(
                    currentUser?.data[0]?.team_id,
                    language
                )
            );
        if (!ideaSubmissionsSubmittedAt)
            dispatch(
                getStudentChallengeSubmittedResponse(
                    currentUser?.data[0]?.team_id,
                    language
                )
            );
        if (!postSurveyStatusGl)
            dispatch(studentPostSurveyCertificate(language));
    }, [language]);
    const enablePostSurvey = ideaSubmissionStatus === 'SUBMITTED';
    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Fragment>
                    {showDummypage ? (
                        // all_topics_count === topics_completed_count || enablePostSurvey
                        <Row>
                            <Col className="d-lg-flex justify-content-center">
                                <Certificate
                                    type={'participate'}
                                    currentUser={currentUser}
                                    postSurveyStatus={enablePostSurvey}
                                    //certDate={ideaSubmissionsSubmittedAt}
                                    ideaDate={ideaSubmissionsSubmittedAt}
                                    language={language}
                                />
                                <Certificate
                                    language={language}
                                    currentUser={currentUser}
                                    certDate={dashboardStatus}
                                    postSurveyStatus={
                                        all_topics_count ===
                                        topics_completed_count
                                    }
                                />
                            </Col>
                        </Row>
                    ) : (
                        //<CommonPage text={t('dummytext.certificate_msg')+t('dummytext.student_my_cer')} />
                        <Card className="course-sec-basic p-5">
                            <div className="text-left">
                                <div>
                                    <img
                                        className={`${'w-25'} img-fluid `}
                                        src={Congo}
                                    ></img>
                                </div>
                                <h6
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            t('dummytext.name') +
                                            currentUser?.data[0].full_name
                                        // t('dummytext.school') + teamMember.team?.mentor?.organization?.organization_name
                                    }}
                                ></h6>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            t('dummytext.certificate_msg') +
                                            t('dummytext.student_my_cer')
                                    }}
                                ></p>
                            </div>
                        </Card>
                    )}
                </Fragment>
            </Container>
        </Layout>
    );
};

export default MyCertificate;
