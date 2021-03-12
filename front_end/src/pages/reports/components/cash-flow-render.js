import React from 'react';
import { Widget, WidgetHeader } from '../../../components/widget/widget';
import { PageSettings } from '../../../config/page-settings';

function CashFlowRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();
    const [startDate, setStartDate] = React.useState(today.getFullYear() + "-01-01");
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(true);

    const handleChangeStartDate = date => {
        setStartDate(date);
    }
    const handleChangeEndDate = date => {
        setEndDate(date);
    }

    return (
        <Widget>
            <WidgetHeader className="bg-light">
                <div className="align-self-center">Cash Flow Report</div>
                <div className="d-flex align-items-center">
                    <label className="ml-sm-5 px-1 m-b-0">From:  </label>
                    <input type="date" className="form-control form-control-sm width-125" value={startDate} onChange={event => handleChangeStartDate(event.target.value)} />
                    <label className="ml-sm-5 px-1 m-b-0">To:</label>
                    <input type="date" className="form-control form-control-sm width-125" value={endDate} onChange={event => handleChangeEndDate(event.target.value)} />
                </div> 
            </WidgetHeader>
        </Widget>
    )
}

export default CashFlowRender;