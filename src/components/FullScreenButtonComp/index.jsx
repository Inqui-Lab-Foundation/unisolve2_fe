import React from 'react';
import { Button } from '../../stories/Button';
import { useTranslation } from 'react-i18next';

const FullScreenButton = ({fullScreen,setFullScreen}) => {
    const { t } = useTranslation();
    return (
        <div className="d-flex justify-content-end">
            <Button
                label={`${
                    fullScreen.isFullSCreen ? t('student_course.exitfullscreen') : t('student_course.full screen')
                }`}
                btnClass="primary mt-4 mb-3"
                size="small"
                onClick={() => {
                    if (fullScreen.isFullSCreen) {
                        setFullScreen({
                            isFullSCreen: false,
                            width: ''
                        });
                    } else {
                        setFullScreen({
                            isFullSCreen: true,
                            width: '100%'
                        });
                    }
                }}
            />
        </div>
    );
};

export default FullScreenButton;
