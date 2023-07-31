import { React, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

function VideoPopup(props) {
    const [popupimg,setPopupimg] = useState('');
    useEffect(() => {
        if ( props.refQst!== undefined){
            setPopupimg(props?.refQst[0]?.question_image);
        }
    }, [props]);

    return (
        <Modal
            show={props.show}
            size="lg"
            centered
            className="modal-popup text-center"
            onHide={props.handleClose}
            backdrop={true}
        >
            <Modal.Header closeButton></Modal.Header>

            <Modal.Body>
                <figure>
                    <img src={popupimg} alt="quiz popoup image" className="img-fluid" />
                </figure>
            </Modal.Body>
        </Modal>
    );
}

export default VideoPopup;
