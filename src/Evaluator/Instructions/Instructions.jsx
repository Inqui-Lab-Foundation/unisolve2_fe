import React from 'react';
import { Card } from 'reactstrap';
import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructions } from '../store/evaluator/action';

const Instructions = () => {
    // here we can start the evaluator  journey //
    const history = useHistory();
    const dispatch = useDispatch();
    const instructiondata = useSelector(
        (state) => state?.evaluator.instructionsData
    );

    React.useEffect(() => {
        dispatch(getInstructions());
    }, []);

    return (
        <Layout>
            <Card className="m-5 p-5">
                <h1>Instructions</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: instructiondata && instructiondata?.instructions
                    }}
                ></div>

                <div className="text-right">
                    <Button
                        label={"Let's Start"}
                        btnClass="primary mx-3"
                        size="small"
                        onClick={() =>
                            history.push('/evaluator/submitted-ideas')
                        }
                    ></Button>
                </div>
            </Card>
        </Layout>
    );
};

export default Instructions;
