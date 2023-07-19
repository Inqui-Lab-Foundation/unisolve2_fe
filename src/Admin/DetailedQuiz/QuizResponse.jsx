import React,{useEffect} from 'react';
var parse = require('html-react-parser');

const QuizResponse = ({ response, onQuizResponseSubmission }) => {
    const { accimg, msg, ar_image, ar_link, is_correct } = response;
    const config = process.env.REACT_APP_API_IMAGE_BASE_URL;

    const handleResponseSubmission = () => {
        if (is_correct) {
            onQuizResponseSubmission(response);
        } else {
            // Handle error for incorrect answer
            console.log('Incorrect answer!'); // You can customize the error handling here
        }
    };
    useEffect(() => {
        handleResponseSubmission();
    }, [response]); // Run the submission function on component mount

    return (
        <div className="w-100">
            <div className="row" style={{ fontSize: '1.4rem' }}>
                {accimg && (
                    <div className="col-3">
                        <img
                            src={config + accimg}
                            alt="star"
                            className="img-fluid w-75"
                        />
                    </div>
                )}
                <div className={`${!accimg ? 'col-12' : 'col-9'}`}>
                    <div className="row">
                        {parse("<p className = 'text-left'>" + msg + '</p>')}
                    </div>
                    {ar_image && (
                        <div className="row">
                            <img
                                src={config + ar_image}
                                alt="star"
                                className="img-fluid w-75"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="row">
                {ar_link && <div className="col-3">{ar_link}</div>}
            </div>
        </div>
    );
};

export default QuizResponse;
