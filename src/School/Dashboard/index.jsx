import React from 'react';
import Layout from '../Layout';
import './dashboard.scss';

function index() {
    return (
        <Layout>
            <div className="container dashboard-wrapper mt-5 mb-50">
                <h2 className="mb-5">Dashboard</h2>
                <div className="dashboard">
                    <p>content</p>
                </div>
            </div>
        </Layout>
    );
}

export default index;
