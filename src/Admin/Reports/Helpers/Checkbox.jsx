const Checkbox = ({ value, setValue, selectedValues }) => {
    const handleCheckbox = (e) => {
        let indexOfChecked = selectedValues.indexOf(e.target.value);
        let temp = [...selectedValues];
        if (e.target.checked && indexOfChecked === -1) {
            temp.push(value[0]);
        } else {
            temp.splice(indexOfChecked, 1);
        }
        setValue(temp);
    };
    return (
        <div className="d-flex flex-wrap">
            <div className="check-flex mb-2">
                <input
                    name={value[0]}
                    type="checkbox"
                    className="mx-2"
                    id={value[0]}
                    onChange={handleCheckbox}
                />
                <label htmlFor={value[0]} className="my-auto mx-3">
                    {value[1]}
                </label>
            </div>
        </div>
    );
};

export default Checkbox;
