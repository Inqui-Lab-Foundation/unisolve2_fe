import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthGuardActive } from '../constants/defaultValues';
import { getCurrentUser } from './Utils';

const ProtectedRoute = ({
    component: Component,
    user:user,
    ...rest
}) => {
    const setComponent = (props) => {
        if (isAuthGuardActive) {
            const currentUser = getCurrentUser();
            if (currentUser.data[0].role === user) {
                return <Component {...props} />;
            }
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            );
        }
        return <Component {...props} />;
    };

    return <Route {...rest} render={setComponent} />;
};

export { ProtectedRoute };
