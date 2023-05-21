/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Row, Col, Form, Label } from 'reactstrap';
import { useLocation, withRouter } from 'react-router-dom';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { InputBox } from '../../stories/InputBox/InputBox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { openNotificationWithIcon, getCurrentUser } from '../../helpers/Utils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { teacherCreateMultipleStudent } from '../store/teacher/actions';

const studentBody = {
    full_name: '',
    Age: '',
    Grade: '',
    Gender: ''
};
const grades = [6, 7, 8, 9, 10, 11, 12];
const allowedAge = [10, 11, 12, 13, 14, 15, 16, 17, 18];

const CreateMultipleMembers = ({ id }) => {
    const tempStudentData = {
        team_id: id,
        role: 'STUDENT',
        full_name: '',
        Age: '',
        Grade: '',
        Gender: ''
    };
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [itemDataErrors, setItemDataErrors] = useState([studentBody]);
    const history = useHistory();
    const [isClicked, setIsClicked] = useState(false);
    const [studentData, setStudentData] = useState([
        {
            team_id: id,
            role: 'STUDENT',
            full_name: '',
            Age: '',
            Grade: '',
            Gender: ''
        },
        {
            team_id: id,
            role: 'STUDENT',
            full_name: '',
            Age: '',
            Grade: '',
            Gender: ''
        }
    ]);
    let pattern = /[A-Za-z0-9 ]*$/;

    const handleChange = (e, i) => {
        let newItem = [...studentData];
        const dataKeys = Object.keys(studentBody);
        if (e.target) {
            dataKeys.some((item) => {
                if (e.target.name === item) {
                    newItem[i][e.target.name] = e.target.value;
                    let errCopy = [...itemDataErrors];
                    if (item === 'full_name') {
                        let check = e.target.value;
                        if (check && check.match(pattern)) {
                            const { index } = check.match(pattern);
                            if (index) {
                                const foo = { ...errCopy[i] };
                                foo[e.target.name] =
                                    'Only alphanumeric are allowed';
                                errCopy[i] = { ...foo };
                                setItemDataErrors(errCopy);
                                return;
                            }
                        }
                    }
                    const foo = { ...errCopy[i] };
                    foo[e.target.name] = '';
                    errCopy[i] = { ...foo };
                    setItemDataErrors(errCopy);
                }
            });
        }
        setStudentData(newItem);
    };
    const validateItemData = () => {
        const errors = studentData.map((item, i) => {
            let err = {};
            if (!item.full_name.trim())
                err['full_name'] = 'Full name is Required';
            if (item.full_name && item.full_name.match(pattern)) {
                const { index } = item.full_name.match(pattern);
                if (index) {
                    err['full_name'] = 'Only alphanumeric are allowed';
                }
            }
            if (!item.Age) err['Age'] = 'Age is Required';
            if (!item.Grade) err['Grade'] = 'Class is Required';
            if (!item.Gender) err['Gender'] = 'Gender is Required';
            if (Object.values(err).length === 0) {
                return { ...studentBody, i };
            }
            return { ...err, i };
        });
        setItemDataErrors(
            errors.filter((item) => Object.values(item).length > 0)
        );
        const filterEmpty = errors.filter((item) => {
            const ce = { ...item };
            delete ce.i;
            return Object.values(ce).filter(Boolean).length > 0;
        });
        if (filterEmpty.length > 0) {
            return false;
        } else {
            return true;
        }
    };
    const addItem = () => {
        if (!validateItemData()) {
            return;
        } else {
            setStudentData([...studentData, tempStudentData]);
        }
    };
    const containsDuplicates = (array) => {
        if (array.length !== new Set(array).size) {
            return true;
        }
        return false;
    };
    const removeItem = (i) => {
        let newItems = [...studentData];
        newItems.splice(i, 1);
        setStudentData(newItems);
    };
    const handleSumbit = () => {
        if (!validateItemData()) return;
        setIsClicked(true);
        const checkDuplicateName = containsDuplicates(
            studentData.map((item) => item.full_name)
        );
        if (checkDuplicateName) {
            openNotificationWithIcon('error', 'Student already exists');
            setIsClicked(false);
            return;
        }
        dispatch(
            teacherCreateMultipleStudent(studentData, history, setIsClicked)
        );
    };
    return (
        <div className="create-ticket register-blockt">
            {studentData.map((item, i) => {
                const foundErrObject = { ...itemDataErrors[i] };
                return (
                    <div key={i + item} className="mb-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="">Student {i + 1} Details</h6>
                            {i > 1 && (
                                <Button
                                    label={'Remove'}
                                    onClick={() => removeItem(i)}
                                    btnClass={'secondary float-end'}
                                    size="small"
                                />
                            )}
                        </div>
                        <hr />
                        <Row className="mb-3">
                            <Col md={4}>
                                <Label
                                    className="name-req-create-member"
                                    htmlFor="fullName"
                                >
                                    {t('teacher_teams.student_name')}
                                </Label>
                                <InputBox
                                    className={'defaultInput'}
                                    placeholder={t(
                                        'teacher_teams.student_name_pl'
                                    )}
                                    id="full_name"
                                    name="full_name"
                                    onChange={(e) => {
                                        handleChange(e, i);
                                    }}
                                    value={item.full_name}
                                />
                                {foundErrObject?.full_name ? (
                                    <small className="error-cls">
                                        {foundErrObject.full_name}
                                    </small>
                                ) : null}
                            </Col>
                            <Col md={2} className="mb-5 mb-xl-0">
                                <Label
                                    className="name-req-create-member"
                                    htmlFor="age"
                                >
                                    {t('teacher_teams.age')}
                                </Label>
                                <div className="dropdown CalendarDropdownComp ">
                                    <select
                                        name="Age"
                                        className="form-control custom-dropdown"
                                        value={item.Age}
                                        onChange={(e) => handleChange(e, i)}
                                    >
                                        <option value={''}>Select Age</option>
                                        {allowedAge.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {foundErrObject?.Age ? (
                                    <small className="error-cls">
                                        {foundErrObject.Age}
                                    </small>
                                ) : null}
                            </Col>
                            <Col md={3}>
                                <Label
                                    className="name-req-create-member"
                                    htmlFor="grade"
                                >
                                    Class
                                </Label>
                                <div className="dropdown CalendarDropdownComp ">
                                    <select
                                        name="Grade"
                                        className="form-control custom-dropdown"
                                        value={item.Grade}
                                        onChange={(e) => handleChange(e, i)}
                                    >
                                        <option value="">Select Class</option>
                                        {grades.map((item) => (
                                            <option key={item} value={item}>
                                                Class {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {foundErrObject?.Grade ? (
                                    <small className="error-cls">
                                        {foundErrObject?.Grade}
                                    </small>
                                ) : null}
                            </Col>
                            <Col md={3} className="mb-5 mb-xl-0">
                                <Label
                                    className="name-req-create-member"
                                    htmlFor="gender"
                                >
                                    {t('teacher_teams.gender')}
                                </Label>

                                <select
                                    name="Gender"
                                    className="form-control custom-dropdown"
                                    value={item.Gender}
                                    onChange={(e) => handleChange(e, i)}
                                >
                                    <option value="">
                                        {t('teacher_teams.student_gender')}
                                    </option>
                                    <option value="Male">
                                        {t('teacher_teams.student_gender_male')}
                                    </option>
                                    <option value="Female">
                                        {t(
                                            'teacher_teams.student_gender_female'
                                        )}
                                    </option>
                                    <option value="OTHERS">
                                        Prefer not to mention
                                    </option>
                                </select>
                                {foundErrObject?.Gender ? (
                                    <small className="error-cls">
                                        {foundErrObject?.Gender}
                                    </small>
                                ) : null}
                            </Col>
                        </Row>
                    </div>
                );
            })}
            <Row>
                <Col className="col-xs-12 col-sm-6">
                    <Button
                        label={t('teacher_teams.discard')}
                        btnClass="secondary "
                        size="small"
                        onClick={() => history.push('/teacher/teamlist')}
                    />
                </Col>
                <Col className="col-xs-12 col-sm-6">
                    {!isClicked ? (
                        <Button
                            label={t('teacher_teams.submit')}
                            type="submit"
                            onClick={handleSumbit}
                            btnClass={'primary float-end'}
                            size="small"
                        />
                    ) : (
                        <Button
                            label={t('teacher_teams.submit')}
                            type="button"
                            btnClass={'default float-end'}
                            size="small"
                            disabled={true}
                        />
                    )}
                    {studentData.length < 5 && (
                        <div className="mx-5">
                            <Button
                                label={'Add More'}
                                onClick={addItem}
                                btnClass={'primary me-3 float-end'}
                                size="small"
                            />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

const CreateTeamMember = (props) => {
    const loc = useLocation();
    const params = loc.pathname.split('/');
    const pl = params.length;
    const { t } = useTranslation();
    const id = params[pl - 2];
    const studentCount = params[pl - 1];
    const currentUser = getCurrentUser('current_user');
    const [teamMemberData, setTeamMemberData] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    const headingDetails = {
        title: t('teacher_teams.create_team_members'),

        options: [
            {
                title: t('teacher_teams.teamslist'),
                path: '/teacher/teamlist'
            },
            {
                title: t('teacher_teams.create_team_members')
            }
        ]
    };
    useEffect(() => {
        handleCreateMemberAPI(id);
    }, [id]);

    async function handleCreateMemberAPI(teamId) {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/teams/' +
                teamId +
                '?status=ACTIVE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTeamMemberData(response.data && response.data.data[0]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const formik = useFormik({
        initialValues: {
            fullName: '',
            age: '',
            grade: '',
            gender: ''
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .required('Please Enter valid Full Name')
                .max(40)
                .required()
                .matches(
                    /^[A-Za-z0-9 ]*$/,
                    'Please enter only alphanumeric characters'
                )
                .trim(),
            age: Yup.number()
                .integer()
                .min(10, 'Min age is 10')
                .max(18, 'Max age is 18')
                .required('required'),
            gender: Yup.string().required('Please select valid gender'),
            grade: Yup.string()
                .matches('', 'Please enter valid class')
                .max(40)
                .required('Please enter valid class')
        }),

        onSubmit: (values) => {
            if (
                process.env.REACT_APP_TEAM_LENGTH ==
                teamMemberData.student_count
            ) {
                openNotificationWithIcon(
                    'warning',
                    'Team Members Maximum Count All Ready Exist'
                );
            } else {
                setIsClicked(true);
                const body = {
                    team_id: id,
                    role: 'STUDENT',
                    full_name: values.fullName,
                    qualification: '',
                    Age: values.age,
                    Grade: values.grade,
                    Gender: values.gender,
                    country: values.country
                };
                var config = {
                    method: 'post',
                    url:
                        process.env.REACT_APP_API_BASE_URL +
                        '/students/addStudent',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser?.data[0]?.token}`
                    },
                    data: body
                };
                axios(config)
                    .then(function (response) {
                        if (response.status === 201) {
                            openNotificationWithIcon(
                                'success',
                                'Team Member Created Successfully'
                            );
                            props.history.push('/teacher/teamlist');
                        } else {
                            openNotificationWithIcon(
                                'error',
                                'Opps! Something Wrong'
                            );
                            setIsClicked(false);
                        }
                    })
                    .catch(function (error) {
                        if (error.response.status === 406) {
                            openNotificationWithIcon(
                                'error',
                                error?.response?.data?.message
                            );
                        } else {
                            openNotificationWithIcon(
                                'error',
                                'Opps! Something Wrong'
                            );
                        }
                        setIsClicked(false);
                    });
            }
        }
    });
    return (
        <Layout>
            <div className="EditPersonalDetails new-member-page">
                <Row>
                    <Col className="col-xl-10 offset-xl-1 offset-md-0">
                        <BreadcrumbTwo {...headingDetails} />
                        {studentCount &&
                        (studentCount === 'new' || studentCount < 2) ? (
                            <CreateMultipleMembers id={id} />
                        ) : (
                            <div>
                                <Form
                                    onSubmit={formik.handleSubmit}
                                    isSubmitting
                                >
                                    <div className="create-ticket register-blockt">
                                        <Row>
                                            <Col md={4}>
                                                <Label
                                                    className="name-req-create-member"
                                                    htmlFor="fullName"
                                                >
                                                    {t(
                                                        'teacher_teams.student_name'
                                                    )}
                                                </Label>
                                                <InputBox
                                                    className={'defaultInput'}
                                                    placeholder={t(
                                                        'teacher_teams.student_name_pl'
                                                    )}
                                                    id="fullName"
                                                    name="fullName"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    value={
                                                        formik.values.fullName
                                                    }
                                                />
                                                {formik.touched.fullName &&
                                                formik.errors.fullName ? (
                                                    <small className="error-cls">
                                                        {formik.errors.fullName}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col
                                                md={2}
                                                className="mb-5 mb-xl-0"
                                            >
                                                <Label
                                                    className="name-req-create-member"
                                                    htmlFor="age"
                                                >
                                                    {t('teacher_teams.age')}
                                                </Label>
                                                <div className="dropdown CalendarDropdownComp ">
                                                    <select
                                                        className="form-control custom-dropdown"
                                                        id="age"
                                                        name="age"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        value={
                                                            formik.values.age
                                                        }
                                                    >
                                                        <option value={''}>
                                                            Select Age
                                                        </option>
                                                        {allowedAge.map(
                                                            (item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                >
                                                                    {item}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                {formik.touched.age &&
                                                formik.errors.age ? (
                                                    <small className="error-cls">
                                                        {formik.errors.age}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col md={3}>
                                                <Label
                                                    className="name-req-create-member"
                                                    htmlFor="grade"
                                                >
                                                    Class
                                                </Label>
                                                <div className="dropdown CalendarDropdownComp ">
                                                    <select
                                                        name="grade"
                                                        className="form-control custom-dropdown"
                                                        value={
                                                            formik.values.grade
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Class..
                                                        </option>
                                                        <option value="6">
                                                            Class 6
                                                        </option>
                                                        <option value="7">
                                                            Class 7
                                                        </option>
                                                        <option value="8">
                                                            Class 8
                                                        </option>
                                                        <option value="9">
                                                            Class 9
                                                        </option>
                                                        <option value="10">
                                                            Class 10
                                                        </option>
                                                        <option value="11">
                                                            Class 11
                                                        </option>
                                                        <option value="12">
                                                            Class 12
                                                        </option>
                                                    </select>
                                                </div>
                                                {formik.touched.grade &&
                                                formik.errors.grade ? (
                                                    <small className="error-cls">
                                                        {formik.errors.grade}
                                                    </small>
                                                ) : null}
                                            </Col>
                                            <Col
                                                md={3}
                                                className="mb-5 mb-xl-0"
                                            >
                                                <Label
                                                    className="name-req-create-member"
                                                    htmlFor="gender"
                                                >
                                                    {t('teacher_teams.gender')}
                                                </Label>

                                                <select
                                                    name="gender"
                                                    className="form-control custom-dropdown"
                                                    value={formik.values.gender}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                >
                                                    <option value="">
                                                        {t(
                                                            'teacher_teams.student_gender'
                                                        )}
                                                    </option>
                                                    <option value="Male">
                                                        {t(
                                                            'teacher_teams.student_gender_male'
                                                        )}
                                                    </option>
                                                    <option value="Female">
                                                        {t(
                                                            'teacher_teams.student_gender_female'
                                                        )}
                                                    </option>
                                                    <option value="OTHERS">
                                                        Prefer not to mention
                                                    </option>
                                                </select>

                                                {formik.touched.gender &&
                                                formik.errors.gender ? (
                                                    <small className="error-cls">
                                                        {formik.errors.gender}
                                                    </small>
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </div>

                                    <hr className="mt-4 mb-4"></hr>
                                    <Row>
                                        <Col className="col-xs-12 col-sm-6">
                                            <Button
                                                label={t(
                                                    'teacher_teams.discard'
                                                )}
                                                btnClass="secondary"
                                                size="small"
                                                onClick={() =>
                                                    props.history.push(
                                                        '/teacher/teamlist'
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col className="submit-btn col-xs-12 col-sm-6">
                                            {!isClicked ? (
                                                <Button
                                                    label={t(
                                                        'teacher_teams.submit'
                                                    )}
                                                    type="submit"
                                                    btnClass={
                                                        !(
                                                            formik.dirty &&
                                                            formik.isValid
                                                        )
                                                            ? 'default'
                                                            : 'primary'
                                                    }
                                                    size="small"
                                                    disabled={
                                                        !(
                                                            formik.dirty &&
                                                            formik.isValid
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <Button
                                                    label={t(
                                                        'teacher_teams.submit'
                                                    )}
                                                    type="button"
                                                    btnClass="default"
                                                    size="small"
                                                    disabled={true}
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default withRouter(CreateTeamMember);
