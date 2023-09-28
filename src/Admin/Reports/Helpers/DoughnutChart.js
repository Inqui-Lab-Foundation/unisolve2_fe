import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChartComponent = ({ chartConfig }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ maxWidth: '500px', maxHeight: '500px' }}>
            <Doughnut data={chartConfig.data} options={options} />
        </div>
    );
};

export default DoughnutChartComponent;
