/* eslint-disable indent */
import React from 'react';
import moment from 'moment';

const RatedDetailCard = (props) => {
    console.warn(props);
    const [overAll, setOverAll] = React.useState('');
    const [novelity, setNovelity] = React.useState(0);
    const [usefulness, setUsefulness] = React.useState(0);
    const [feasability, setFeasability] = React.useState(0);
    const [scalability, setScalability] = React.useState(0);
    const [sustainability, setSustainability] = React.useState(0);
    React.useEffect(() => {
        setOverAll(props?.details?.evaluator_ratings[0]?.overall);
        setNovelity(props?.details?.evaluator_ratings[0]?.param_1);
        setUsefulness(props?.details?.evaluator_ratings[0]?.param_2);
        setFeasability(props?.details?.evaluator_ratings[0]?.param_3);
        setScalability(props?.details?.evaluator_ratings[0]?.param_4);
        setSustainability(props?.details?.evaluator_ratings[0]?.param_5);
    }, [props]);
    return (
        <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
            <div className="row">
                <div className="col-12">
                    <p className="text-center fs-3 fw-bold m-0 mb-3">
                        {' '}
                        <span className="text-info">
                            {props?.details?.evaluator_ratings[0]?.level}
                        </span>
                        - Rating Details
                    </p>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-warning" role="alert">
                        <p className="my-2">
                            <span className="text-bold">Evaluated At: </span>{' '}
                            {moment(
                                props?.details?.evaluator_ratings[0]?.created_at
                            ).format('DD-MM-YY h:mm:ss a') || ''}
                        </p>
                    </div>
                    <p className="text-muted my-3 text-center">
                        OverAll Rating
                    </p>
                </div>
                <div className="col-12">
                    <p className="fs-1 fw-bold mb-3 mt-1 text-center">
                        {overAll}
                    </p>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-6">
                    <p className="my-0">
                        Novelty :{' '}
                        <span style={{ fontSize: 'bold' }}>
                            {' '}
                            {novelity.toFixed(2)}{' '}
                        </span>
                    </p>
                </div>
                <div className="col-6 pt-3">
                    <div className="progress">
                        <div
                            className={
                                novelity < 7
                                    ? 'progress-bar bg-danger '
                                    : novelity < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{ width: `${Number(novelity) * 10 + '%'}` }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-6">
                    <p className="my-0">
                        Useful :{' '}
                        <span style={{ fontSize: 'bold' }}>
                            {' '}
                            {usefulness.toFixed(2)}{' '}
                        </span>
                    </p>
                </div>
                <div className="col-6 pt-3">
                    <div className="progress">
                        <div
                            className={
                                usefulness < 7
                                    ? 'progress-bar bg-danger '
                                    : usefulness < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(usefulness) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-6">
                    <p className="my-0">
                        Feasibility :{' '}
                        <span style={{ fontSize: 'bold' }}>
                            {' '}
                            {feasability.toFixed(2)}{' '}
                        </span>
                    </p>
                </div>
                <div className="col-6 pt-3">
                    <div className="progress">
                        <div
                            className={
                                feasability < 7
                                    ? 'progress-bar bg-danger '
                                    : feasability < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(feasability) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-6">
                    <p className="my-0">
                        Scalability and Impact :{' '}
                        <span style={{ fontSize: 'bold' }}>
                            {' '}
                            {scalability.toFixed(2)}{' '}
                        </span>
                    </p>
                </div>
                <div className="col-6 pt-3">
                    <div className="progress">
                        <div
                            className={
                                scalability < 7
                                    ? 'progress-bar bg-danger '
                                    : scalability < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(scalability) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-6">
                    <p className="my-0">
                        Sustainability :{' '}
                        <span style={{ fontSize: 'bold' }}>
                            {' '}
                            {sustainability.toFixed(2)}{' '}
                        </span>
                    </p>
                </div>
                <div className="col-6 pt-3">
                    <div className="progress">
                        <div
                            className={
                                sustainability < 7
                                    ? 'progress-bar bg-danger '
                                    : sustainability < 9
                                    ? 'progress-bar bg-warning'
                                    : 'progress-bar bg-success'
                            }
                            role="progressbar"
                            style={{
                                width: `${Number(sustainability) * 10 + '%'}`
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row mb-1 mt-2">
                <div className="col-4">
                    <p className="my-0 fw-bold">Comments:</p>
                </div>
                <div className="col-8">
                    <p className="my-0 text-muted">
                        {props?.details?.evaluator_ratings[0]?.comments}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RatedDetailCard;
