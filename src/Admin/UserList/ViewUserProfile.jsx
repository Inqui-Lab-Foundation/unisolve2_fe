/* eslint-disable indent */
import React from 'react';
import { Container, Row, Card, CardBody, CardText } from 'reactstrap';
import { Button } from '../../stories/Button';

const ViewUserProfile = (props) => {
    React.useEffect(()=>{

    },[props]);
  return (
    <Container className="pt-1 dynamic-form">
    <Row className='mb-2'>
        {/* <div className="col-6">
            <BreadcrumbTwo {...headingDetails} />
        </div> */}
        <div className="col-6">
        <h3>Profile</h3>
        </div>
        <div className="col-6 d-flex justify-content-end">
            <Button btnClass={"primary"} size="small" onClick={()=>props?.setView(false)} label="Back"/>
        </div>
    </Row>
    <Row>
        <Card className="py-5">
            <CardBody>

                {/* <h2 className="mb-4">Personal Details</h2> */}
                
                <CardText>
                    <span className='mx-3'><b>Name:</b></span>
                    <b>
                        {props.data &&
                                    props.data.full_name ? props.data &&
                                    props.data.full_name : "-"}
                    </b>
                </CardText>
                <CardText>
                    <span className='mx-3'><b>Mobile:</b></span>
                    <b>
                        {props.data &&
                                    props.data.mobile ? props.data &&
                                    props.data.mobile : "-"}
                    </b>
                </CardText>
                <CardText>
                    <span className='mx-3'><b>Email:</b></span>
                    <b>
                        
                        {props.data &&
                                    props.data?.email ? props.data &&
                                    props.data?.email : "-"}
                    </b>
                </CardText>
                {/* <Table bordered className="w-25">
                    <tbody>
                        <tr>
                            <th scope="row" className="w-25">
                                ID
                            </th>
                            <td>
                                {props.data &&
                                    props.data.mentor_id}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">NAME</th>
                            <td>
                                {props.data &&
                                    props.data.full_name}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">MOBILE</th>
                            <td>
                                {props.data &&
                                    props.data.mobile}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">STATUS</th>
                            <td>
                                {props.data &&
                                    props.data.status}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">CITY</th>
                            <td>
                                {props.data &&
                                    props.data.city}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">DISTRICT</th>
                            <td>
                                {props.data &&
                                    props.data.district}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">STATE</th>
                            <td>
                                {props.data &&
                                    props.data.state}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">COUNTRY</th>
                            <td>
                                {props.data &&
                                    props.data.country}
                            </td>
                        </tr>
                    </tbody>
                </Table> */}
            </CardBody>
        </Card>
    </Row>
    <Row className='my-5'>
        <Card className="py-5">
            <CardBody>

                <h2 className="mb-4">Institution  Details</h2>
                
                
                <CardText>
                    <span className='mx-3'><b>UDISE Code:</b></span>
                    <b>
                        {props.data &&
                                    props.data?.organization_code ? props.data &&
                                    props.data?.organization_code : "-"}
                    </b>
                </CardText>
                <CardText>
                    <span className='mx-3'><b>School Name:</b></span>
                    <b>
                        {props.data &&
                                    props.data?.organization_name ? props.data &&
                                    props.name?.organization_code : "-"}
                    </b>
                </CardText>
                <CardText>
                    <span className='mx-3'><b>City:</b></span>
                    <b>
                        {props.data &&
                                    props.data?.city ? props.data &&
                                    props.name?.city : "-"}
                    </b>
                </CardText>
                <CardText>
                    <span className='mx-3'><b>District:</b></span>
                    <b>
                        {props.data &&
                                    props.data?.district ? props.data &&
                                    props.name?.district : "-"}
                    </b>
                </CardText>
                
            </CardBody>
        </Card>
    </Row>
</Container>
  );
};

export default ViewUserProfile;