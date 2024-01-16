/* eslint-disable indent */
import React from 'react';

import { useLocation } from 'react-router-dom';

const RatedDetailCard = (props) => {
    const { search } = useLocation();
    const level = new URLSearchParams(search).get('level');
    console.warn(props);
    const [overAll, setOverAll] = React.useState('');
    const [novelity, setNovelity] = React.useState(0);
    const [usefulness, setUsefulness] = React.useState(0);
    const [feasability, setFeasability] = React.useState(0);
    const [scalability, setScalability] = React.useState(0);
    const [sustainability, setSustainability] = React.useState(0);

    React.useEffect(() => {
        if (props?.details?.evaluator_ratings.length > 0) {
            const average = (arr) =>
                arr.reduce((p, c) => p + c, 0) / arr.length;
            setOverAll(average(props?.details?.evaluator_ratings[0]?.overall));
            setNovelity(average(props?.details?.evaluator_ratings[0]?.param_1));
            setUsefulness(
                average(props?.details?.evaluator_ratings[0]?.param_2)
            );
            setFeasability(
                average(props?.details?.evaluator_ratings[0]?.param_3)
            );
            setScalability(
                average(props?.details?.evaluator_ratings[0]?.param_4)
            );
            setSustainability(
                average(props?.details?.evaluator_ratings[0]?.param_5)
            );
        }
    }, [props]);
    return (
        <div className="level-status-card card border p-md-5 p-3 mb-3 me-lg-0 me-md-3">
            <div className="row">
                <div className="col-12">
                    <p className="text-center fs-3 fw-bold m-0 mb-3">
                        {' '}
                        <span className="text-info">{level}</span>- Rating
                        Details
                    </p>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p
                        className="fs-1 fw-bold text-center"
                        style={{ marginBottom: '5px' }}
                    >
                        {overAll}
                    </p>
                </div>
                <div className="col-12">
                    <p className="text-muted text-center">OverAll Rating</p>
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
                        Useful :
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
                    {props?.details?.evaluator_ratings[0]?.comments.map(
                        (item, i) => (
                            <p className="my-0 text-muted" key={i}>
                                {i + 1} : {item}
                            </p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default RatedDetailCard;
