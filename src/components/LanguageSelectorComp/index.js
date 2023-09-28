import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './style.scss';
import i18next from 'i18next';
import { FaGlobeAsia } from 'react-icons/fa';
import { languageOptions } from '../../constants/languageOptions';
import { getStudentGlobalLanguage } from '../../redux/studentRegistration/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAdminGlobalLanguage,
    getMentorGlobalLanguage
} from '../../redux/actions';
import { getGlobalLanguage } from '../../redux/home/actions';

const LanguageSelectorComp = ({ module }) => {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector(
        (state) => state?.mentors.mentorLanguage
    );
    const studentLanguage = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const globalLang = useSelector((state) => state?.home.globalLanguage);
    const [language, setLanguage] = useState(module === 'student' ? studentLanguage.name :
        selectedLanguage && selectedLanguage?.name
            ? selectedLanguage?.name
            : globalLang?.name
    );
    const localLang = JSON.parse(localStorage.getItem("s_language"));
    useEffect(() => {
        if(localLang){
            i18next.changeLanguage(localLang.code);
            dispatch(getStudentGlobalLanguage(localLang));
        }
    }, []);
    
    const handleSelector = (item) => {
        let forMentor;
        if (item && item.code !== "en") {
            forMentor = { ...item };
            forMentor.code = "en";
            forMentor.name = "English";
        }
        setLanguage(item.name);
        i18next.changeLanguage(item.code);
        if (module === 'admin') {
            dispatch(getAdminGlobalLanguage(item));
        } else if (module === 'mentor') {
            dispatch(getMentorGlobalLanguage(forMentor));
        } else if (module === 'general') {
            dispatch(getGlobalLanguage(item));
            dispatch(getStudentGlobalLanguage(item));
            dispatch(getMentorGlobalLanguage(forMentor));
        } else {
            dispatch(getStudentGlobalLanguage(item));
            if(module==='student'){
                localStorage.setItem("s_language", JSON.stringify(item));
            }
        }
    };
    return (
        <DropdownButton
            id="language-selector-btn"
            title={
                <span>
                    <FaGlobeAsia /> { (localLang && localLang.name) || language}
                </span>
            }
        >
            {languageOptions.map((item, i) => {
                return (
                    <Dropdown.Item
                        key={i}
                        href="#/action-1"
                        onClick={() => handleSelector(item)}
                        label="English"
                    >
                        <span> {item.name}</span>
                    </Dropdown.Item>
                );
            })}
        </DropdownButton>
    );
};

export default LanguageSelectorComp;
