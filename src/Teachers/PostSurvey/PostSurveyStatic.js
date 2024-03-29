import { Fragment } from 'react';
import Congo from '../../assets/media/survey-success.jpg';

const PostSurveyStatic = () => {
    return (
        <Fragment>
            <div className="text-center">
                <div>
                    <img className="img-fluid imgWidthSize" src={Congo}></img>
                </div>
                <div>
                    <h2 className="common-flex">
                        Please ensure all the student teams complete the course
                        and submit the ideas to fill the post survey.
                    </h2>
                    <h2 className="common-flex">
                        Certificate will be generated once you complete
                        the post survey.
                    </h2>
                </div>
            </div>
        </Fragment>
    );
};

export default PostSurveyStatic;
