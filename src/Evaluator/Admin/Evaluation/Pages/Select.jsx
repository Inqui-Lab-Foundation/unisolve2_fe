const Select = ({ list, setValue, placeHolder, value }) => {
    return (
        <select onChange={(e) => setValue(e.target.value)} value={value} className="border rounded-3 px-4 pointer w-100" style={{height:'4rem',outline:'none'}}>
            <option value={''} disabled>{placeHolder}</option>
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
