import React from 'react';
import { PageSettings } from '../../../config/page-settings';

/**
 * INCOME STATEMENT FORMAT
 * 
 * 21 Revenue
 *      Revenue account groups
 *          Total Revenue
 * empty
 * 23 Cost of sales
 *      COS account groups
 *          total COS
 *          Gross Margin 
 * empty
 * Operating Expenses
 *      24 R&D
 *      25 SG&A
 *      26 Depreciation
 *      27 Amortization
 *          Total operating expenses
 * empty
 * Operating income
 * 22 - 28 Other income/expense, net
 * Income before provision for income taxes
 * 29 Income taxes
 * empty
 * Net income
 */
function IncomeStatementRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();

    const [startDate, setStartDate] = React.useState(today.getFullYear() + "-01-01");
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);

    const handleChangeStartDate = date => {
        setStartDate(date);
    }
    const handleChangeEndDate = date => {
        setEndDate(date);
    }

    

    return (
        <div className="widget widget-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <div className="widget-header-title">
                    <div className="form-inline justify-content-between">
                        <div className="font-weight-600">Income Statement</div>    
                        <div className="form-group">
                            <label className="ml-sm-5 px-1">From: </label>
                            <input type="date" className="form-control form-control-sm width-125" value={startDate} onChange={event => handleChangeStartDate(event.target.value)} />
                            <label className="ml-sm-5 px-1">to: </label>
                            <input type="date" className="form-control form-control-sm width-125" value={endDate} onChange={event => handleChangeEndDate(event.target.value)} />
                        </div> 

                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeStatementRender;