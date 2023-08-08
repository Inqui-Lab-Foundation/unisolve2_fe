import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { InputBox } from '../../stories/InputBox/InputBox';
import Csv from '../../assets/media/csv1.png';
import Pdf from '../../assets/media/pdf.png';
import { Button } from '../../stories/Button';
//const config = process.env.REACT_APP_API_IMAGE_BASE_URL;

const Question = (props) => {
    const quiz = props.adminQuizDetails ? props.adminQuizDetails : [];
    const { isSubmitted } = props;
    const [isCheck, setIsCheck] = useState([]);
    const [cAnswer, setAnswer] = useState('');
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState('');
    const [url, setUrl] = useState('');
    const qst =
        quiz[0] && quiz[0].question_image != null
            ? quiz[0].question_image.replace(/{{}}/g, ',')
            : '';
    var array = qst && qst.split(',');
    const qstL = array;

    const handleClick = (e) => {
        const { name, checked } = e.target;
        const optionNumber = parseInt(name.split('@')[1]);
        const optionName = name.split('@')[0];
      
        if (checked) {
            setIsCheck((prevIsCheck) => [
                ...prevIsCheck,
                { optionName, optionNumber }
            ]);
        } else {
            setIsCheck((prevIsCheck) =>
                prevIsCheck.filter((item) => item.optionName !== optionName || item.optionNumber !== optionNumber)
            );
        }
    };
       
    useEffect(() => {
        const selectedAns = isCheck.map((item) => item.optionName).toString();
        const allAns = selectedAns.replace(/,/g, '{{}}');
        // const selectedAns = isCheck.map((item) => item.name).join('{{}}');
        props.onSelectAnswer(allAns);
    }, [isCheck]);
      
      
      

    useEffect(() => {
        props.onSelectAnswer(cAnswer);
    }, [cAnswer]);

    useEffect(() => {
        props.onSelectAnswer(image);
        props.onSelectType(quiz[0] && quiz[0].type);
    }, [image]);

    const changeHandler = (event) => {
        const file = event.target.files[0].name.split('.', 2);
        if (file[1] === 'csv' || file[1] === 'pdf') {
            let img = event.target.files[0];
            setUrl(file[1]);
            setImage(img);
            setFileName(event.target.files[0].name);
        }
    };

    const removeSelectedImage = () => {
        setImage(null);
        setFileName('');
        setUrl('');
    };

    const ans = {
        type: 'text',
        className: 'defaultInput',
        placeholder: 'Please Answer',
    };

    useEffect(() => {
        const sortedIsCheck = [...isCheck].sort((a, b) => a.optionNumber - b.optionNumber);
        setIsCheck(sortedIsCheck);
    }, [isCheck.length]);
      

    return (
        <Fragment>
            {quiz[0] && quiz[0].question_image != null ? (
                <figure className="text-center">
                    {qstL.length > 0 &&
                        qstL.map((x, i) => {
                            return (
                                <img
                                    key={i}
                                    src={x}
                                    alt={x}
                                    className="img-fluid"
                                    style={{ height: '43rem' }}
                                />
                            );
                        })}
                </figure>
            ) : null}
            <div className="question quiz align-items-center">
                {quiz[0] && quiz[0].question_icon && (
                    <img
                        src={quiz[0].question_icon}
                        alt={quiz[0].question_icon}
                        className="img-fluid"
                        style={{ marginRight: '2rem', marginLeft: '2rem', width: '15%' }}
                    />
                )}
                <span
                    dangerouslySetInnerHTML={{
                        __html: quiz[0] && quiz[0].question,
                    }}
                ></span>
            </div>

            <div>
                {props.responceData && props.responceData.status === 200 ? null : (
                    <div>
                        {quiz[0] && quiz[0].type === 'TEXT' && (
                            <div className="answers">
                                <label className="my-auto mx-3">
                                    <InputBox
                                        {...ans}
                                        id="Ans"
                                        name="Please Answer"
                                        onChange={(e) => setAnswer(e.target.value)}
                                        value={cAnswer}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                )}
                {props.responceData && props.responceData.status === 200 ? null : (
                    <div>
                        {quiz[0] && quiz[0].type === 'DRAW' && (
                            <div className="answers">
                                <Row className="my-5">
                                    <Col md={3}>
                                        {!image ? (
                                            <div className="wrapper">
                                                <div className="btnimg">Upload File</div>
                                                <input
                                                    type="file"
                                                    name="file"
                                                    accept={'.pdf,.csv'}
                                                    onChange={(e) => changeHandler(e)}
                                                />
                                            </div>
                                        ) : null}
                                    </Col>
                                    <Col md={9}>
                                        <Row>
                                            <Col md={2} className="my-auto">
                                                {image && url === 'csv' ? (
                                                    <img
                                                        src={`${Csv}`}
                                                        className="img-fluid"
                                                        alt="Thumb"
                                                    />
                                                ) : image && url === 'pdf' ? (
                                                    <img
                                                        src={`${Pdf}`}
                                                        className="img-fluid"
                                                        alt="Thumb"
                                                    />
                                                ) : null}
                                            </Col>
                                            <Col md={6} className="my-auto">
                                                <p>{fileName}</p>
                                            </Col>
                                            <Col md={2} className="my-auto">
                                                {image ? (
                                                    <Button
                                                        onClick={removeSelectedImage}
                                                        btnClass="primary py-2 px-4"
                                                        size="small"
                                                        label="Remove"
                                                    >
                                                        Remove
                                                    </Button>
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>
                )}
                {((quiz[0] && quiz[0].type === 'MRQ') || (quiz[0] && quiz[0].type === 'MCQ')) && (
                    <div className="answers">
                        {quiz[0] &&
                            quiz[0].options.map((answer, i) => {
                                const file = answer.split('.', 2);

                                const optionNumber = i + 1;
                                const isCorrectAnswer =
                                    props.responceData?.data[0]?.correct_answer?.includes(answer) || false;

                                // const isCorrectAnswer = props.responceData &&
                                //      props.responceData.data[0] &&
                                //      props.responceData.data[0].correct_answer === answer;
                                // const isWrongAnswer =
                                //     props.responceData &&
                                //     props.responceData.data[0] &&
                                //     props.responceData.data[0].correct_answer !== answer;

                                const isWrongAnswer =
                                    answer === cAnswer &&
                                    !props.responceData?.data[0]?.correct_answer?.includes(answer) || false;

                                const areWrongAnswers =
                                    isCheck.find(item => item.optionName === answer && item.optionNumber === optionNumber) &&
                                    !props.responceData?.data[0]?.correct_answer?.includes(answer);

                                // const answerStyle = {
                                //     backgroundColor: isCorrectAnswer ? 'MediumSeaGreen' : isWrongAnswer ? 'Tomato' : '',
                                //     paddingTop: '1.75rem',
                                //     paddingBottom: '1.75rem',
                                // };

                                // Map option text to option numbers
                                
                                // const optionNumber = `option-${optionNumber}`;

                                return (
                                    <div className="answer" key={i}>
                                        {quiz[0] && quiz[0].type === 'MCQ' ? (
                                            <label
                                                htmlFor={answer}
                                                className="my-auto d-flex"
                                                style={{
                                                    backgroundColor: isCorrectAnswer
                                                        ? 'LightGreen'
                                                        : areWrongAnswers && isSubmitted
                                                            ? 'Orange'
                                                            : '',
                                                    border: isCorrectAnswer 
                                                        ? '2px solid green' 
                                                        : areWrongAnswers && isSubmitted
                                                            ? '2px solid red' 
                                                            : '',
                                                    paddingTop: '1.5rem',
                                                    paddingBottom: '1.5rem',
                                                    borderRadius: '1rem'
                                                }}
                                            >
                                                <Input
                                                    name={answer + '@' + optionNumber}
                                                    type="checkbox"
                                                    className="mx-2"
                                                    onChange={handleClick}
                                                    // style={{ margin: 'auto' }}
                                                    checked={isCheck.find(item => item.optionName === answer && item.optionNumber === optionNumber)}
                                                    id={answer}
                                                    disabled={props.responceData && props.responceData.status === 200}
                                                />
                                                <div className="flex-grow-1" 
                                                    style={{color: isCorrectAnswer
                                                        ? 'Green'
                                                        : areWrongAnswers && isSubmitted
                                                            ? 'Red'
                                                            : '',
                                                    }}>
                                                    {answer}
                                                </div>
                                            </label>
                                        ) : (
                                            <FormGroup
                                                check
                                                className="answer-text d-flex mx-2"
                                                style={{
                                                    backgroundColor: isCorrectAnswer
                                                        ? 'LightGreen'
                                                        : isWrongAnswer && isSubmitted
                                                            ? 'Orange'
                                                            : '',
                                                    border: isCorrectAnswer 
                                                        ? '2px solid green' 
                                                        : isWrongAnswer && isSubmitted
                                                            ? '2px solid red' 
                                                            : '',
                                                    paddingTop: '1.5rem',
                                                    paddingBottom: '1.5rem',
                                                    borderRadius: '1rem'
                                                }}
                                            >
                                                <Input
                                                    onChange={() => setAnswer(answer)}
                                                    className="my-auto"
                                                    name="radio1"
                                                    type="radio"
                                                    id={answer}
                                                    disabled={props.responceData &&
                                                        props.responceData.status === 200 ? true : false}
                                                />
                                                {file[1] === 'png' ? (
                                                    <figure htmlFor={answer} className="text-center my-auto mx-3">
                                                        <img
                                                            src={answer}
                                                            alt={answer}
                                                            className="img-fluid"
                                                            style={{ width: '50px' }}
                                                            htmlFor={answer}
                                                        />
                                                    </figure>
                                                ) : (
                                                    <Label htmlFor={answer} 
                                                        style={{color: isCorrectAnswer
                                                            ? 'Green'
                                                            : isWrongAnswer && isSubmitted
                                                                ? 'Red'
                                                                : '',
                                                        }}
                                                        className="px-3">
                                                        {answer}
                                                    </Label>
                                                )}
                                            </FormGroup>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Question;




