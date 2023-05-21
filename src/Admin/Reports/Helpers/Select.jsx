const Select = ({ list, setValue, placeHolder }) => {
    return (
        <select onChange={(e) => setValue(e.target.value)}>
            <option value={''}>{placeHolder}</option>
            {list && list.length > 0 ? (
                list.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))
            ) : (
                <option>No Data found</option>
            )}
        </select>
    );
};

export default Select;
