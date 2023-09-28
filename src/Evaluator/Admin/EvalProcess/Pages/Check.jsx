import { Col } from 'reactstrap';

const Check = ({ list, setValue, value, selValue }) => {
    const handleClick = (e) => {
        const { name, checked } = e.target;
        selValue({name:name,checked:checked});
        setValue([...value, name]);
        if (!checked) {
            setValue(value.filter((item) => item !== name));
        }
    };
    return list.map((name, i) => {
        return (
            <Col md={3} key={i}>
                <div className="d-flex mb-2">
                    <input
                        name={name}
                        type="checkbox"
                        className="mx-2 w-auto"
                        onChange={(e) => handleClick(e)}
                        checked={value.includes(name)}
                        id={name}
                    />
                    <label htmlFor={name} className="my-auto mx-3">
                        {name}
                    </label>
                </div>
            </Col>
        );
    });
};

export default Check;
