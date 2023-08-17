import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
    return (
        <div className="Footer" style={{ backgroundColor: '#fff' }}>
            <Container>
                <Row className="py-4">
                    <Col md={12}>
                        <p className="p-0 my-auto">
                            &copy; UNISOLVE, UNICEF {new Date().getFullYear()}{' '}
                            <span className="my-auto">&reg;</span> All Rights
                            Reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
