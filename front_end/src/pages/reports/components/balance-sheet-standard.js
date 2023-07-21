import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { arrayIsAllZeroes, subtypeIsEmpty } from '../../../utils/util-fns';
import ReportRow from './report-row';

function BalanceSheetStandard({balanceSheetDto, detailedView}) {
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
                        label={"Balance sheet as of:"}
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/** Assets */}
                    <ReportRow
                        label={"Assets"}
                        className="fw-semibold"
                    />
                    <ReportRow
                        label={"Current assets"}
                        values={balanceSheetDto.totalCurrentAssets}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {balanceSheetDto.currentAssetsSubtypes
                        ? balanceSheetDto.currentAssetsSubtypes.map((subtype, i)=> {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <ReportRow
                                        label={subtype.accountSubtypeName /**remember to translate */}
                                        values={subtype.totalDebitsMinusCredits}
                                        isCurrency
                                        indentLevel={2}
                                        key={i}
                                    />
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={"Non-current assets"}
                        values={balanceSheetDto.totalNonCurrentAssets}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {balanceSheetDto.nonCurrentAssetsSubtypes
                        ? balanceSheetDto.nonCurrentAssetsSubtypes.map((subtype, i) => {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <ReportRow
                                        label={subtype.accountSubtypeName}
                                        values={subtype.totalDebitsMinusCredits}
                                        isCurrency
                                        indentLevel={2}
                                        key={i}
                                    />
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={"Total assets"}
                        className="fw-semibold"
                        isCurrency
                        values={balanceSheetDto.totalAssets}
                    />

                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default BalanceSheetStandard;