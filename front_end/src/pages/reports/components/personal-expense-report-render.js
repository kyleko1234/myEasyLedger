import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import StripedRow from '../../../components/tables/striped-row';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';

function PersonalExpenseReportRender({loading, columnLabels, incomeStatementObjects, formatNumber, detailedView}) {
    const appContext = React.useContext(PageSettings);

    return(
        <div>                
            <div className="d-flex justify-content-between font-weight-semibold text-right">
                <div>{/*empty div for spacing*/}</div>
                <div className="text-right d-flex">
                    {columnLabels.map((columnLabel, i) => {
                            return(
                                <div className="td width-175" key={i}>
                                    {columnLabel.label === "Custom"
                                    ?   <>
                                            <div>
                                                {incomeStatementRenderText[appContext.locale]["From:"] + " " + columnLabel.startDate}
                                            </div>
                                            <div>
                                                {incomeStatementRenderText[appContext.locale]["To:"] + " " + columnLabel.endDate}
                                            </div>
                                        </>
                                    : columnLabel.label}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                {(loading || !incomeStatementObjects.length)
                    ? <LoadingSpinner big />
                    : <>
                        <StripedRow className="font-weight-semibold">
                            {incomeStatementRenderText[appContext.locale]["Expenses"]}
                        </StripedRow>
                        {incomeStatementObjects[0].accounts
                            .filter(account => account.accountTypeId == 5)
                            .map(account => {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <StripedRow className="indent justify-content-between font-weight-semibold">
                                            <div>
                                                {account.accountName}
                                            </div>
                                            <div className="text-right d-flex">
                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                    let specificAccount = incomeStatement.accounts.find(specificAccount => specificAccount.accountId === account.accountId);
                                                    return(
                                                        <div key={i} className={"width-175"}>
                                                            {formatNumber(specificAccount.debitsMinusCredits)}
                                                        </div>    
                                                    )
                                                })}
                                            </div>
                                        </StripedRow>
                                        {detailedView
                                            ? incomeStatementObjects[0].accounts
                                                .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                .map(childAccount => {
                                                    return(
                                                        <StripedRow className="indent-2 justify-content-between" key={childAccount.accountId}>
                                                            <div>
                                                                {childAccount.accountName}
                                                            </div>
                                                            <div className="text-right d-flex">
                                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                                    let specificChildAccount = incomeStatement.accounts.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId);
                                                                    return(
                                                                        <div key={i} className={"width-175 "}>
                                                                            {formatNumber(specificChildAccount.debitsMinusCredits)}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </StripedRow> 
                                                    )
                                                })
                                            : null
                                        }
                                    </React.Fragment>
                                )
                        })}
                        <StripedRow>
                            <div className="invisible">{/** empty row */} empty row </div>
                        </StripedRow>
                         <StripedRow className="font-weight-semibold justify-content-between">
                            <div>
                                {incomeStatementRenderText[appContext.locale]["Total Expenses"]}
                            </div>
                            <div className="text-right d-flex">
                                {incomeStatementObjects.map((incomeStatement, i) => {
                                    return(
                                        <div key={i} className={"width-175 "}>
                                            {formatNumber(incomeStatement.totalExpenses)}
                                        </div>              
                                    )
                                })}
                            </div>
                        </StripedRow>
                    </>
                }
            </div>
        </div>
    )
}
export default PersonalExpenseReportRender;