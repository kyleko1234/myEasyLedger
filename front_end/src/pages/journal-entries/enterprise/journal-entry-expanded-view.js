import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { localizeDate } from '../../../utils/util-fns';
import LineItemView from './line-item-view';
import LineItemsFooterView from './line-items-footer-view';
import LineItemsHeader from './line-items-header';

function JournalEntryExpandedView({ lineItems, journalEntryDate, journalEntryDescription, accountOptions, vendorOptions, customerOptions, journalEntryVendorId, journalEntryCustomerId }) {
    const appContext = React.useContext(PageSettings);

    return (
        <>
            <div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Date"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {localizeDate(journalEntryDate)}
                    </div>
                </div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Description"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {journalEntryDescription}
                    </div>
                </div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Vendor"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {journalEntryVendorId
                            ? vendorOptions
                                .find(vendorOption => vendorOption.object.vendorId === journalEntryVendorId)
                                .object.vendorName
                            : <div className="text-muted fw-light">
                                {journalEntriesText[appContext.locale]["None"]}
                            </div>
                        }
                    </div>
                </div>
                <div className="row px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Customer"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {journalEntryCustomerId
                            ? customerOptions
                                .find(customerOption => customerOption.object.customerId === journalEntryCustomerId)
                                .object.customerName
                            : <div className="text-muted fw-light">
                                {journalEntriesText[appContext.locale]["None"]}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <LineItemsHeader/>
                <div>
                    {lineItems.map((lineItem, i) => {
                        return (
                            <LineItemView
                                lineItem={lineItem}
                                accountOptions={accountOptions}
                                key={i}
                            />
                        )
                    })}
                </div>
                <LineItemsFooterView lineItems={lineItems}/>
            </div>
        </>
    )
}

export default JournalEntryExpandedView;