import { Fragment } from 'react';
import Congo from '../../assets/media/survey-success.jpg';

const PostSurveyStatic = () => {

    return (
        <Fragment>
            <div className="text-center">
                <div>
                    <img
                        className="img-fluid w-25"
                        src={Congo}
                    ></img>
                </div>
                <div>
                    <h2 className='common-flex'>
                        Please ensure student teams complete the
                        course and submit the ideas to fill the post
                        survey. Course certificate will be generated
                        once you complete the post survey.
                    </h2>
                </div>
            </div>
        </Fragment>
    );
};

export default PostSurveyStatic;
