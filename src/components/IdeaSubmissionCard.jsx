/* eslint-disable indent */
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Button } from '../stories/Button';

const LinkComponent = ({ item }) => {
    return (
        <>
            {item &&
                item.length > 0 &&
                item.map((ans, i) => {
                    let a_link = ans.split('/');
                    let count = a_link.length - 1;
                    return (
                        <a
                            key={i}
                            className="badge mb-2 bg-info p-3 ms-3"
                            href={ans}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {a_link[count]}
                        </a>
                    );
                })}
        </>
    );
};
const IdeaSubmissionCard = ({ handleClose, show, response }) => {
    const submittedResponse = response[0]?.response;
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        if (submittedResponse && submittedResponse !== {}) {
            const data = Object.entries(submittedResponse);
            const answerFormat = data.map((item) => {
                return {
                    question_no: item[1].question_no,
                    question: item[1].question,
                    answer: item[1]?.selected_option,
                    type: item[1]?.question_type
                };
            });
            setAnswers(answerFormat);
        }
    }, [submittedResponse]);
    const answersSort = [...answers].sort(
        (a, b) => a.question_no - b.question_no
    );
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-evaluator ChangePSWModal teacher-register-modal"
            backdrop="static"
        >
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="w-100 d-block text-center"
                >
                    {response[0].sdg}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {answersSort.length > 0 &&
                    answersSort.map((item, i) => (
                        <Card key={i} className="p-2 mb-3">
                            <CardTitle className="fw-bold">
                                {item.question}
                            </CardTitle>
                            <CardBody>
                                {item.type === 'DRAW' ? (
                                    <LinkComponent item={item.answer} />
                                ) : (
                                    item.answer
                                )}
                            </CardBody>
                        </Card>
                    ))}
                <div className="common-flex">
                    <p className="fw-bold me-3">
                        Initiated By: {response[0]?.initiated_name}
                    </p>
                    <p className="fw-bold">
                        Submitted at:{' '}
                        {response[0]?.submitted_at
                            ? moment(response[0]?.submitted_at).format(
                                  'DD-MM-YYYY'
                              )
                            : '-'}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    size="small"
                    label={'Close'}
                    btnClass="primary ms-auto"
                    onClick={handleClose}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default IdeaSubmissionCard;
