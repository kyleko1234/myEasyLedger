import React from 'react';
import { Alert } from 'reactstrap';
import Select from 'react-select';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import LineItemsHeader from './line-items-header';
import LineItemEdit from './line-item-edit';
import LineItemsFooterEdit from './line-items-footer-edit';

function JournalEntryExpandedEdit({
    lineItems, setLineItems,
    journalEntryDate, setJournalEntryDate,
    journalEntryDescription, setJournalEntryDescription,
    journalEntryVendorId, setJournalEntryVendorId,
    journalEntryCustomerId, setJournalEntryCustomerId,
    accountOptions,
    vendorOptions,
    customerOptions,
    alertMessages,
}) {
    const appContext = React.useContext(PageSettings);

    const addEmptyLineItem = () => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems.push({
            lineItemId: "",
            accountName: "",
            accountId: "",
            description: "",
            debitAmount: 0,
            creditAmount: 0,
        })
        setLineItems(updatedLineItems);
    }

    const removeLineItem = i => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems.splice(i, 1);
        setLineItems(updatedLineItems);
    }

    const copyDescriptionToLineItems = () => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems.forEach(lineItem => lineItem.description = journalEntryDescription);
        setLineItems(updatedLineItems);
    }

    return (
        <>
            <Alert
                color="danger"
                className="m-b-15"
                style={{ borderStyle: "solid", borderColor: "FireBrick", borderWidth: "1px" }}
                isOpen={alertMessages.length? true : false}
            >
                <div className="d-flex justify-content-center">
                    <ul className="my-0">
                        {alertMessages.map((alertMessage, i) => (
                            <li key={i}>{alertMessage}</li>
                        ))}
                    </ul>
                </div>
            </Alert>
            <div className="mb-3">
                <div className="row mb-2 align-items-center">
                    <div className="col-xl-1"><strong>{journalEntriesText[appContext.locale]["Date"]}</strong></div>
                    <div className="col-xl-2">
                        <input
                            type="date"
                            className="form-control"
                            value={journalEntryDate}
                            onChange={event => setJournalEntryDate(event.target.value)}
                        />
                    </div>
                </div>
                <div className="row mb-2 align-items-center">
                    <div className="col-xl-1">
                        <strong>{journalEntriesText[appContext.locale]["Description"]}</strong>
                    </div>
                    <div className="col-xl-8">
                        <input
                            type="text"
                            className="form-control"
                            value={journalEntryDescription}
                            onChange={event => setJournalEntryDescription(event.target.value)}
                        />
                    </div>
                    <div className="col-xl-3">
                        <button className="btn btn-white d-none d-xl-inline-block" onClick={copyDescriptionToLineItems} type="button">
                            {journalEntriesText[appContext.locale]["Copy description to line items"]}
                        </button>
                    </div>
                </div>
                <div className="row mb-2 align-items-center">
                    <div className="col-xl-1">
                        <strong>
                            {journalEntriesText[appContext.locale]["Vendor"]}
                        </strong>
                    </div>
                    <div className="col-xl-3 mb-2 mb-xl-0">
                        <Select
                            classNamePrefix="form-control"
                            options={vendorOptions}
                            value={vendorOptions.find(vendorOption => vendorOption.object.vendorId == journalEntryVendorId)}
                            isSearchable={true}
                            menuPortalTarget={document.body}
                            menuShouldScrollIntoView={false}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPlacement={'auto'}
                            onChange={(selectedOption) => {
                                setJournalEntryVendorId(selectedOption.object.vendorId);
                                if (selectedOption.object.vendorId !== null) {
                                    setJournalEntryCustomerId(null);
                                }
                            }}
                        />
                    </div>
                    <div className="col-xl-1 d-none d-xl-inline-block text-center fw-semibold">
                        {journalEntriesText[appContext.locale]["or"]}
                    </div>
                    <div className="col-xl-1">
                        <strong>
                            {journalEntriesText[appContext.locale]["Customer"]}
                        </strong>
                    </div>
                    <div className="col-xl-3">
                        <Select
                            classNamePrefix="form-control"
                            options={customerOptions}
                            value={customerOptions.find(customerOption => customerOption.object.customerId == journalEntryCustomerId)}
                            isSearchable={true}
                            menuPortalTarget={document.body}
                            menuShouldScrollIntoView={false}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPlacement={'auto'}
                            onChange={(selectedOption) => {
                                setJournalEntryCustomerId(selectedOption.object.customerId);
                                if (selectedOption.object.customerId != null) {
                                    setJournalEntryVendorId(null);
                                }
                            }}
                        />
                    </div>
                </div>
                <button className="btn btn-white my-3 d-block w-100 d-xl-none" onClick={copyDescriptionToLineItems} type="button">
                    {journalEntriesText[appContext.locale]["Copy description to line items"]}
                </button>
            </div>

            <LineItemsHeader editMode />
            {lineItems.map((lineItem, i) => {
                return (
                    <LineItemEdit
                        key={i}
                        lineItems={lineItems}
                        setLineItems={setLineItems}
                        i={i}
                        accountOptions={accountOptions}
                        removeLineItem={removeLineItem}
                    />
                )
            })}
            <div className="mb-2 d-none d-lg-block">
                <button type="button" className="btn btn-lg btn-white w-100" onClick={addEmptyLineItem}>
                    <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntriesText[appContext.locale]["Add a Line Item"]}
                </button>
            </div>
            <LineItemsFooterEdit
                lineItems={lineItems}
            />
            <div className="mb-2 d-block d-lg-none">
                <button type="button" className="btn btn-lg btn-white w-100" onClick={addEmptyLineItem}>
                    <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntriesText[appContext.locale]["Add a Line Item"]}
                </button>
            </div>
        </>
    )
}

export default JournalEntryExpandedEdit;