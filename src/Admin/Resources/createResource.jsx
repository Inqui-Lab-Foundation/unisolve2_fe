// /* eslint-disable indent */
// import React from 'react';
// import Layout from '../../Admin/Layout';
// import { Row, Col, FormGroup, Label, Form } from 'reactstrap';
// import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Button } from '../../stories/Button';
// import { InputBox } from '../../stories/InputBox/InputBox';
// import {
//     getNormalHeaders,
//     openNotificationWithIcon
// } from '../../helpers/Utils';
// import axios from 'axios';
// import { URL, KEY } from '../../constants/defaultValues';

// const createResource = (props) => {
//     const inputDICE = {
//         type: 'text',
//         className: 'defaultInput'
//     };
//     const headingDetails = {
//         title: 'Add New Resource Details',

//         options: [
//             {
//                 title: 'Resources',
//                 path: '/admin/Resources'
//             },
//             {
//                 title: 'Add Resource',
//                 path: '/admin/Resources/createResource'
//             }
//         ]
//     };
//     // const phoneRegExp =
//     //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//     const formik = useFormik({
//         initialValues: {
//             role: '',
//             details: '',
//             type: '',
//             file: '',
//             link: ''
//         },
//         validationSchema: Yup.object({
//             role: Yup.string()
//                 .optional()
//                 .required('Role is Required'),
//             details: Yup.string()
//                 .optional()
//                 .required('Details is Required'),
//             type: Yup.string()
//                 .optional()
//                 .required(' Submission type is Required')
//         }),
//         onSubmit: async (values) => {
//             const axiosConfig = getNormalHeaders(KEY.User_API_Key);
//             await axios
//                 .post(
//                     `${URL.createEvalProcess}`,
//                     JSON.stringify(values, null, 2),
//                     axiosConfig
//                 )
//                 .then((response) => {
//                     if (response.status == 201) {
//                         openNotificationWithIcon(
//                             'success',
//                             'Resource Created Successfully'
//                         );
//                         props.history.push('/admin/Resources');
//                     }
//                 })
//                 .catch((err) => {
//                     openNotificationWithIcon(
//                         'error',
//                         err.response.data.message
//                     );
//                     return err.response;
//                 });
//         }
//     });
//     return (
//         <Layout>
//             <div className="EditPersonalDetails new-member-page">
//                 <Row>
//                     <Col className="col-xl-10 offset-xl-1 offset-md-0">
//                         <BreadcrumbTwo {...headingDetails} />

//                         <div>
//                             <Form onSubmit={formik.handleSubmit} isSubmitting>
//                                 <div className="create-ticket register-block">
//                                     <FormGroup className="form-group" md={12}>
//                                         <Label
//                                             className="mb-2"
//                                             htmlFor="role"
//                                             // style={{ fontSize: 15 }}
//                                         >
//                                             Role
//                                         </Label>
//                                         <InputBox
//                                             {...inputDICE}
//                                             id="role"
//                                             name="Role"
//                                             placeholder="Please enter your Role "
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             value={formik.values.role}
//                                         />
//                                         {formik.touched.role &&
//                                         formik.errors.role ? (
//                                             <small className="error-cls">
//                                                 {formik.errors.role}
//                                             </small>
//                                         ) : null}
//                                         <Label
//                                             className="mb-2"
//                                             htmlFor="details"
//                                         >
//                                             Details
//                                         </Label>
//                                         <InputBox
//                                             {...inputDICE}
//                                             id="details"
//                                             name="Details"
//                                             // type="number"
//                                             placeholder="Please enter your details"
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             value={
//                                                 formik.values.details
//                                             }
//                                         />
//                                         {formik.touched.details &&
//                                         formik.errors.details ? (
//                                             <small className="error-cls">
//                                                 {formik.errors.details}
//                                             </small>
//                                         ) : null}
//                                         <Label
//                                             className="mb-2"
//                                             htmlFor="type"
//                                         >
//                                             Type
//                                         </Label>
//                                         {/* <InputBox
//                                             {...inputDICE}
//                                             id="no_of_evaluation"
//                                             name="no_of_evaluation"
//                                             type="number"
//                                             placeholder="Please enter no of Evaluation"
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             value={
//                                                 formik.values.no_of_evaluation
//                                             }
//                                         />
//                                         {formik.touched.no_of_evaluation &&
//                                         formik.errors.no_of_evaluation ? (
//                                             <small className="error-cls">
//                                                 {formik.errors.no_of_evaluation}
//                                             </small> */}
//                                         <select
//                                             name="Type"
//                                             id="type"
//                                             placeholder="Please select submission type"
//                                             className="form-control custom-dropdown"
//                                             value={formik.values.type}
//                                             onChange={formik.handleChange}
//                                         >
//                                             <option disabled={true} value="">
//                                                 {' '}
//                                                 Select type
//                                             </option>
//                                             <option value="file">
//                                                 File
//                                             </option>
//                                             <option value="link">
//                                                 Link
//                                             </option>
//                                         </select>

//                                         {formik.touched.type &&
//                                         formik.errors.type ? (
//                                             <small className="error-cls">
//                                                 {formik.errors.type}
//                                             </small>
//                                         ) : null}
//                                     </FormGroup>
//                                 </div>

//                                 <hr className="mt-4 mb-4"></hr>
//                                 <Row>
//                                     <Col className="col-xs-12 col-sm-6">
//                                         <Button
//                                             label="Discard"
//                                             btnClass="secondary"
//                                             size="small"
//                                             onClick={() =>
//                                                 props.history.push(
//                                                     '/admin/Resources'
//                                                 )
//                                             }
//                                         />
//                                     </Col>
//                                     <Col className="submit-btn col-xs-12 col-sm-6">
//                                         <Button
//                                             label="Submit details"
//                                             type="submit"
//                                             btnClass={
//                                                 !(
//                                                     formik.dirty &&
//                                                     formik.isValid
//                                                 )
//                                                     ? 'default'
//                                                     : 'primary'
//                                             }
//                                             size="small"
//                                         />
//                                     </Col>
//                                 </Row>
//                             </Form>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>
//         </Layout>
//     );
// };
// export default createResource;


/* eslint-disable indent */
import React from 'react';
import Layout from '../../Admin/Layout';
import { Row, Col, FormGroup, Label, Form, Input } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../stories/Button';
import { InputBox } from '../../stories/InputBox/InputBox';
import {
  getNormalHeaders,
  openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import { URL, KEY } from '../../constants/defaultValues';
// import { staticData } from './index';



const createResource = (props) => {
  const inputDICE = {
    type: 'text',
    className: 'defaultInput'
  };
  const headingDetails = {
    title: 'Add New Resource Details',
    options: [
      {
        title: 'Resources',
        path: '/admin/Resources'
      },
      {
        title: 'Add Resource',
        path: '/admin/Resources/createResource'
      }
    ]
  };

  const [selectedType, setSelectedType] = React.useState('');
  const fileInputRef = React.useRef(null);


  const formik = useFormik({
    initialValues: {
      role: '',
      details: '',
      type: '',
      link: '',
      file: null
    },
    validationSchema: Yup.object({
      role: Yup.string()
        .optional()
        .required('Role is Required'),
      details: Yup.string()
        .optional()
        .required('Details is Required'),
      type: Yup.string()
        .optional()
        .oneOf(['file', 'link'], 'Submission type is Required'),
      link: Yup.string().when('type', {
        is: 'link',
        then: Yup.string().required('Link is Required')
      }),
      file: Yup.mixed().when('type', {
        is: 'file',
        then: Yup.mixed().required('File is Required')
      })
    }),
    onSubmit: async (values) => {
      const payload = {
        ...formik.values,
        link: selectedType === 'link' ? values.link : '',
        file: selectedType === 'file' ? values.file : null
      };
    //   await axios
    //   .then((response)=>{
    //     const newRow = {
    //         id: response.data.id,
    //         role: payload.role,
    //         details: payload.details,
    //         type: payload.type,
    //         link: payload.link,
    //         file: payload.file
    //       };
    //       props.staticData.push(newRow);
    //   });
      

      const axiosConfig = getNormalHeaders(KEY.User_API_Key);
      const formData = new FormData();

      formData.append('role', payload.role);
      formData.append('details', payload.details);
      formData.append('type', payload.type);
      formData.append('link', payload.link);
      formData.append('file', payload.file);

      await axios
        .post(`${URL.createResources}`, formData, axiosConfig)
        .then((response) => {
          if (response.status === 201) {
            openNotificationWithIcon(
              'success',
              'Resource Created Successfully'
            );
            props.history.push('/admin/Resources');
          }
        })
        .catch((err) => {
          openNotificationWithIcon('error', err.response.data.message);
          return err.response;
        });
    }
  });

  const handleFileChange = (e) => {
    formik.setFieldValue('file', e.target.files[0]);
  };

  return (
    <Layout>
      <div className="EditPersonalDetails new-member-page">
        <Row>
          <Col className="col-xl-10 offset-xl-1 offset-md-0">
            <BreadcrumbTwo {...headingDetails} />

            <div>
              <Form onSubmit={formik.handleSubmit} isSubmitting>
                <div className="create-ticket register-block">
                  <FormGroup className="form-group" md={12}>
                    <Label className="mb-2" htmlFor="role">
                      Role
                    </Label>
                    <InputBox
                      {...inputDICE}
                      id="role"
                      name="role"
                      placeholder="Please enter your Role"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                    />
                    {formik.touched.role && formik.errors.role && (
                      <small className="error-cls">{formik.errors.role}</small>
                    )}

                    <Label className="mb-2" htmlFor="details">
                      Details
                    </Label>
                    <InputBox
                      {...inputDICE}
                      id="details"
                      name="details"
                      placeholder="Please enter your details"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details}
                    />
                    {formik.touched.details && formik.errors.details && (
                      <small className="error-cls">
                        {formik.errors.details}
                      </small>
                    )}

                    <Label className="mb-2" htmlFor="type">
                      Type
                    </Label>
                    <select
                      name="type"
                      id="type"
                      placeholder="Please select submission type"
                      className="form-control custom-dropdown"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value.toLowerCase())}
                    >
                      <option disabled={true} value="">
                        Select type
                      </option>
                      <option value="file">File</option>
                      <option value="link">Link</option>
                    </select>
                    {formik.touched.type && formik.errors.type && (
                      <small className="error-cls">{formik.errors.type}</small>
                    )}

                    {selectedType === 'file' && (
                    <>
                        <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        />
                        <div className="mt-2">
                            <Button
                                label="Upload File"
                                btnClass="primary"
                                size="small"
                                onClick={() => fileInputRef.current.click()}
                            />
                            {formik.values.file && formik.values.file.name && (
                                <span className="ml-2">{formik.values.file.name}</span>
                            )}
                        </div>
                    </>
                    )}


                    {selectedType === 'link' && (
                      <FormGroup className="form-group" md={12}>
                        <Label className="mb-2" htmlFor="link">
                          Link
                        </Label>
                        <Input
                          type="text"
                          name="link"
                          id="link"
                          placeholder="Please enter the link"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.link}
                        />
                        {formik.touched.link && formik.errors.link && (
                          <small className="error-cls">
                            {formik.errors.link}
                          </small>
                        )}
                      </FormGroup>
                    )}
                  </FormGroup>
                </div>

                <hr className="mt-4 mb-4" />
                <Row>
                  <Col className="col-xs-12 col-sm-6">
                    <Button
                      label="Discard"
                      btnClass="secondary"
                      size="small"
                      onClick={() => props.history.push('/admin/Resources')}
                    />
                  </Col>
                  <Col className="submit-btn col-xs-12 col-sm-6">
                    <Button
                      label="Submit details"
                      type="submit"
                      btnClass={
                        !formik.dirty && !formik.isValid ? 'default' : 'primary'
                      }
                      size="small"
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default createResource;
