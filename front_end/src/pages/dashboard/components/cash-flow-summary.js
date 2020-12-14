import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

function CashFlowSummary() {
    defaults.global.defaultFontColor = "black";
    
    const randomScalingFactor = () => {
        return Math.round(Math.random() * 100)
    };

    const barChart = {
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Dataset 1',
                borderWidth: 2,
                borderColor: '#727cb6',
                backgroundColor: 'rgba(114, 124, 182, 0.3)',
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
                label: 'Dataset 2',
                borderWidth: 2,
                borderColor: '#2d353c',
                backgroundColor: 'rgba(45, 53, 60, 0.3)',
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false
        }
    };






    return (
        <div className="card border-0 mb-3">
            <div className="card-body">
                <div className="mb-3">
                    <b>CASH FLOW SUMMARY</b>
                </div>
                <div style={{ height: '500px'}}>
					<Bar className="text-white" data={barChart.data} options={barChart.options} />
				</div>
            </div>
        </div>
    )
}

export default CashFlowSummary;