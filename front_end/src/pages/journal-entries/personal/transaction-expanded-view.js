import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency, localizeDate } from '../../../utils/util-fns';
import LineItemsHeader from '../enterprise/line-items-header';
import LineItemViewPersonal from './line-item-view-personal';
import LineItemsFooterViewPersonal from './line-items-footer-view-personal';

function TransactionExpandedView({ lineItems, journalEntryDescription, journalEntryDate, fromAccountName }) {
    const appContext = React.useContext(PageSettings);

    return (
        <>
            <div className="row mb-2 px-2 px-lg-0">
                <div className="col-lg-2">
                    <strong>{journalEntriesText[appContext.locale]["From Account"]}</strong>
                </div> 
                <div className="col-lg-10">
                    {fromAccountName}
                </div>
            </div>

            <div className="row mb-2 px-2 px-lg-0">
                <div className="col-lg-2">
                    <strong>{journalEntriesText[appContext.locale]["Date"]}</strong>
                </div> 
                <div className="col-lg-10">
                    {localizeDate(journalEntryDate)}
                </div>
            </div>
            <div className="row px-2 px-lg-0">
                <div className="col-lg-2">
                    <strong>{journalEntriesText[appContext.locale]["Description"]}</strong>
                </div> 
                <div className="col-lg-10">
                    {journalEntryDescription}
                </div>
            </div>

            <div className="mt-3"> 
                <LineItemsHeader />
                <div>
                    {lineItems.map((lineItem, i) => {
                        return(
                            <LineItemViewPersonal
                                lineItem={lineItem}
                                key={i}
                            />
                        )
                    })}
                </div>
                <LineItemsFooterViewPersonal
                    lineItems={lineItems}
                />
            </div>
        </>
    )
}

export default TransactionExpandedView;
