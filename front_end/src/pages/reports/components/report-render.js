import React from 'react';
import { Link } from 'react-router-dom';

function ReportRender(props) {
//required props: title(string), dateRange(boolean)
//dateRange: false for single date (report as of [endDate]); true for two dates (for the period from [startDate] to [endDate]); dates are inclusive

    const today = new Date();
    const [startDate, setStartDate] = React.useState(today.getFullYear() + '-01-01');
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    return (
        <div className="widget widget-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title width-half">{props.title}</h4>
                <span className="widget-header-title width-half text-right">
                    {props.dateRange? 
                        <div>
                            For the period from {startDate} to {endDate}
                        </div> : 
                        <div>
                            As of this date: {endDate}
                        </div>
                    }
                </span>
            </div>
            <div className="px-5">
                PLEASE SEND HELP
            </div>
        </div>


    )
}

export default ReportRender;