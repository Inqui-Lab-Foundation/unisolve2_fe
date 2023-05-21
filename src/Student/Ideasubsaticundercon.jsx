import { Fragment } from 'react';
import { Card, Container } from 'reactstrap';
import Layout from '../Student/Layout';
import Congo from '../assets/media/survey-success.jpg';
import { useTranslation } from 'react-i18next';

const IdeasubUC = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <Container className="presuervey mb-50 mt-5 ">
                <Fragment>
                    <Card className="course-sec-basic p-5">
                        <div className="text-center">
                            <div>
                                <img
                                    className="img-fluid w-25"
                                    src={Congo}
                                ></img>
                            </div>
                            <div>
                                <h2 className="common-flex">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: t(
                                                'dummytext.student_idea_sub'
                                            )
                                        }}
                                    ></div>
                                </h2>
                            </div>
                        </div>
                    </Card>
                </Fragment>
            </Container>
        </Layout>
    );
};

export default IdeasubUC;
