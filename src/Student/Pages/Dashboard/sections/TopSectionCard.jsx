import { Col } from 'reactstrap';

const TopSectionCard = ({
    heading,
    deadline,
    footerText,
    subHeading,
    teamImages,
    rightImage,
    footerLabels,
    name,
    email,
    position,
    type,
    mentorData,
    organiZation,
}) => {
    return (
        <Col className="dashboard--top--card">
            <h2>{heading}</h2>
            <div className="bg-white card-height d-flex rounded p-3">
                {position === 1 ? (
                    <div className="card-left">
                        {/* <p className="dead-line">
                            <span className="text-muted">DEADLINE</span> :{' '}
                            <span>{deadline},</span>
                        </p>
                        <p className="sub-heading">{subHeading}</p>
                        <div className="dashboard-card-footer">
                            <p className="text-muted small">{footerText}</p>
                            <div className="d-flex">
                                {teamImages &&
                                    teamImages.map((item, i) => (
                                        <img
                                            key={i}
                                            src={item}
                                            alt={item + i}
                                            className="img-fluid"
                                        />
                                    ))}
                            </div>
                        </div> */}
                        <h5 style={{fontSize:"2rem", fontWeight: '600'}}>All the best for your journey</h5>
                    </div>
                ) : position === 2 ? (
                    <div className="card-left">
                        <div className="d-flex align-items-center">
                            {/* <img
                                src={rightImage}
                                alt="card"
                                className="img-fluid w-30"
                            /> */}
                            {type !== 'teacher' ? (
                                <div className="d-flex flex-column">
                                    <p className="sub-heading"> {name}</p>
                                    {/* <p>UDISE:{mentorData?.organization_code}</p> */}
                                    <p className="small">{email}</p>
                                </div>
                            ) : (
                                <div className="d-flex flex-column">
                                    <p className="sub-heading">{mentorData?.full_name}</p>
                                    <p className="sub-heading">{organiZation?.organization_name}</p>
                                    <p>{organiZation?.state}</p>
                                    <p className="small">{organiZation?.city},{organiZation?.district} </p>
                                </div>
                            )}
                        </div>
                        <div className="dashboard-card-footer">
                            {type !== 'teacher' && (
                                <p className="badges">
                                    <span>{footerLabels.heading}</span> :{' '}
                                    <span>{footerLabels.value}</span>
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="card-left">
                        <p className="dead-line">
                            <span className="text-muted">DEADLINE</span> :{' '}
                            <span>{deadline},</span>
                        </p>
                        <p className="sub-heading">{subHeading}</p>
                        <div className="dashboard-card-footer">
                            <p className="text-muted small">{footerText}</p>
                            <div className="d-flex">sfffs
                                {teamImages.map((item, i) => (
                                    <img
                                        key={i}
                                        src={item}
                                        alt={item + i}
                                        className="img-fluid"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <img
                    src={rightImage}
                    alt="card"
                    className="img-fluid w-30 card-right"
                />
            </div>
        </Col>
    );
};

export default TopSectionCard;
