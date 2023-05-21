import Confetti from 'react-confetti';
import { useHistory } from 'react-router-dom';
import ResultStar from '../../../assets/media/quiz-result-star.png';
import { Button } from '../../../stories/Button';
import succesImg from "../../../assets/media/success1.jpeg";
import { useTranslation } from 'react-i18next';
import { getStudentDashboardStatus } from '../../../redux/studentRegistration/actions';
import { getCurrentUser } from '../../../helpers/Utils';
import { useDispatch, useSelector } from 'react-redux';

const CourseSuccessMessage = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );

    const handleClick =(type)=>{
        dispatch(getStudentDashboardStatus(currentUser?.data[0]?.user_id, language));
        setTimeout(() => {
            type ? history.push("/challenges") : history.push("/student/my-certificate");
        }, 300);
    };
    return (
        <div className="container new-result">
            <Confetti className="w-100" />
            <div className="row justify-content-md-center ">
                <div className="col col-lg-9">
                    <div className="results-heading">
                        <img src={ResultStar} alt="star" />
                    </div>
                    <div className="congratulations text-center">
                        <div className="success_img text-center w-100">
                            <img src={succesImg} alt=".." /><br />
                        </div>
                        <h2>{t('student_course.course_completed_succ')}</h2>
                        <p>{t('student_course.continue_to_idea')}</p>
                    </div>
                    <div className='d-sm-flex justify-content-center mb-3 text-center'>
                        {/* <Button
                            label={t('student_course.go_certificate')}
                            btnClass="primary mt-4 mx-4"
                            size="small"
                            onClick={() => handleClick(false)}
                        /> */}
                        <Button
                            label={t('student_course.go_idea_submission')}
                            btnClass="primary mt-4 mx-4"
                            size="small"
                            onClick={() => handleClick(true)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSuccessMessage;
