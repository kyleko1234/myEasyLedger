import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import ReportRow from './report-row';

function BalanceSheetStandard({balanceSheetDto}) {
    const dateLabels = () => {
        let labels = []
        balanceSheetDto.dateRanges.map(dateRange => {
            labels.push(dateRange.endDate)
        })
        return labels;
    }
    return(
        <>
            {balanceSheetDto
                ? <div>
                    {/** Report Header */}
                    <ReportRow
                        label={"Balance Sheet as of:"}
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/** Assets */}
                    <ReportRow
                        label={"Assets"}
                        className="fw-semibold"
                    />
                    <ReportRow
                        label={"Current Assets"}
                        values={balanceSheetDto.totalCurrentAssets}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default BalanceSheetStandard;