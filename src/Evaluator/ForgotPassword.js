/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import '../Student/Pages/SignUp.scss';
import React from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { InputBox } from '../stories/InputBox/InputBox';
import { Button } from '../stories/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import signuplogo from '../assets/media/logo-rect.svg';
import ellipse_1 from '../assets/media/ellipse.svg';

const ForgotPassword = () => {
    const inputMob = {
        type: 'text',
        className: 'defaultInput'
    };

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const formik = useFormik({
        initialValues: {
            mobile: ''
        },

        validationSchema: Yup.object({
            mobile: Yup.string()
                .matches(phoneRegExp, 'Phone Number is not valid')
                .required('Phone Number is Required')
        }),

        onSubmit: async (values) => {
            // console.log(JSON.stringify(values));
            // const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            // await axios
            //     .put(
            //         `${URL.putResetPassword}`,
            //         JSON.stringify(values, null, 2),
            //         axiosConfig
            //     )
            //     .then((checkOrgRes) => {
            //         if (checkOrgRes.status == 202) {
            //             props.setShow(false);
            //             openNotificationWithIcon(
            //                 'success',
            //                 'Temporary Password Sent Successfully'
            //             );
            //         }
            //     })
            //     .catch((err) => {
            //         openNotificationWithIcon(
            //             'error',
            //             'Opps... something went wrong'
            //         );
            //         return err.response;
            //     });
        }
    });
    return (
        <React.Fragment>
            <div className="container-fluid  SignUp Login vh-100">
                <Row>
                    <div className="col-md-4 aside mobile-header">
                        <div className="row">
                            <Col md={12} className=" mr-auto mobile_tab-hide">
                                {' '}
                                <h2 className="text-white">
                                    <img
                                        src={signuplogo}
                                        alt="Signup logo"
                                        className="img-fluid"
                                    />
                                    Unisolve
                                </h2>
                            </Col>
                        </div>

                        <h1 className="text-left pb-5 mobile_tab-hide">
                            Together let’s learn and build something amazing.
                        </h1>
                        <p className="mobile_tab-hide">
                            Creating change makers of tomorrow
                        </p>
                        <div className="mobile_tab-hide">
                            <figure>
                                <img
                                    src={ellipse_1}
                                    alt="ellipse_1"
                                    style={{ width: '70%' }}
                                    className="img-fluid img-1"
                                />
                            </figure>
                        </div>
                    </div>
                    <Col xs={12} sm={12} md={8} xl={8} className="article">
                        <Row className="mb-0 h-100">
                            <Col
                                xs={12}
                                sm={12}
                                md={10}
                                xl={8}
                                className="my-auto"
                            >
                                <h4>Did you forgot your password?</h4>
                                <span className=" sub mt-2 w-100">
                                    Don’t worry! Resetting your password is
                                    easy, just type Mobile Number you registered
                                    to Unisolve
                                </span>
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className="form-row row my-5">
                                        <Col className="form-group">
                                            <Label
                                                className="mb-2"
                                                htmlFor="mobile"
                                            >
                                                Enter Mobile Number
                                            </Label>
                                            <InputBox
                                                {...inputMob}
                                                id="mobile"
                                                name="mobile"
                                                placeholder="Please enter mobile number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mobile}
                                            />
                                            {formik.touched.mobile &&
                                            formik.errors.mobile ? (
                                                <small className="error-cls">
                                                    {formik.errors.mobile}
                                                </small>
                                            ) : null}
                                        </Col>
                                    </div>
                                    <div className="w-100 clearfix" />

                                    <div className="form-row row mb-5">
                                        <Col className="form-group">
                                            {/* <Link exact='true' to='/verifypassword'>
                                                <Button {...logInBtn} type='submit' />
                                            </Link> */}
                                            <Button
                                                label="Generate Password"
                                                // btnClass='primary w-100'
                                                btnClass={
                                                    !(
                                                        formik.dirty &&
                                                        formik.isValid
                                                    )
                                                        ? 'default'
                                                        : 'primary'
                                                }
                                                size="large "
                                                type="submit"
                                                disabled={
                                                    !(
                                                        formik.dirty &&
                                                        formik.isValid
                                                    )
                                                }
                                            />
                                        </Col>
                                    </div>
                                </Form>
                                <p className="d-flex text-center ">
                                    {/* <NavLink className="p-0 blue">Back to Login</NavLink> */}
                                    <Link
                                        exact="true"
                                        to="/evaluator"
                                        className="p-0 blue text-link w-100"
                                    >
                                        Back to Login
                                    </Link>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            {/* </div> */}
        </React.Fragment>
    );
};

export default ForgotPassword;
