export const languageOptions = [
    {
        code: 'en',
        name: 'English',
        country_code: 'in'
    },

    {
        code: process.env.REACT_APP_LOCAL_LANGUAGE_CODE,
        name: process.env.REACT_APP_LOCAL_LANGUAGE_NAME,
        country_code: 'in'
    }
];

export const getLanguage = (lang) => {
    if (lang?.code == 'en' || lang?.code == '' || lang?.code == undefined) return `locale=en`;
    else return `locale=tn`;
};
