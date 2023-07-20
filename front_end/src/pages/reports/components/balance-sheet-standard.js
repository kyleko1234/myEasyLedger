import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';

function BalanceSheetStandard({balanceSheetDto}) {
    return(
        <>
            {balanceSheetDto
                ? <div>
                    <div className="pseudo-tr d-flex justify-content-between">
                        <div className="pseudo-th">
                            Balance Sheet as of:
                        </div>
                        <div className="pseudo-th text-end d-flex">
                            {balanceSheetDto.dateRanges.map((dateRange, i) => {
                                return(
                                    <div key={i} className="width-175">
                                        {dateRange.endDate}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default BalanceSheetStandard;