import React from 'react';
import { Alert } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import Select from 'react-select';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import LineItemsHeader from '../enterprise/line-items-header';
import { PERSONAL_TRANSACTION_TYPES } from '../../../utils/constants';
import LineItemEditPersonal from './line-item-edit-personal';
import LineItemsFooterEditPersonal from './line-items-footer-edit-personal';

function TransactionExpandedEdit({
    lineItems, setLineItems,
    journalEntryDescription, setJournalEntryDescription,
    journalEntryDate, setJournalEntryDate,
    fromAccountId, setFromAccountId,
    fromAccountName, setFromAccountName,
    accountOptions, alertMessages
}) {
    const appContext = React.useContext(PageSettings);
    const transactionTypeOptions = PERSONAL_TRANSACTION_TYPES(appContext.locale);

    const removeLineItem = i => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems.splice(i, 1);
        setLineItems(updatedLineItems);
    }

    const addEmptyLineItem = () => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems.push({
            lineItemId: "",
            accountName: "",
            accountId: "",
            description: "",
            transactionType: transactionTypeOptions[0],
            transactionTypeName: transactionTypeOptions[0].label,
            amount: 0
        })
        setLineItems(updatedLineItems);
    }


    return (
        <>
            <Alert
                color="danger"
                className="m-b-15"
                style={{ borderStyle: "solid", borderColor: "FireBrick", borderWidth: "1px" }}
                isOpen={alertMessages.length ? true : false}
            >
                <div className="d-flex justify-content-center">
                    <ul className="my-0">
                        {alertMessages.map((alertMessage, i) => (
                            <li key={i}>{alertMessage}</li>
                        ))}
                    </ul>
                </div>
            </Alert>
            <div className="row mb-2 align-items-center">
                <div className="col-lg-2">
                    <strong>{journalEntriesText[appContext.locale]["From Account"]}</strong>
                </div>
                <div className="col-lg-4">
                    <Select
                        classNamePrefix="form-control"
                        options={accountOptions.filter(accountOption => transactionTypeOptions[2].accountTypeIds.includes(accountOption.object.accountTypeId))}
                        value={accountOptions.find(accountOption => accountOption.object.accountId == fromAccountId)}
                        isSearchable={true}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPlacement={'auto'}
                        onChange={(selectedOption) => {
                            setFromAccountId(selectedOption.object.accountId);
                            setFromAccountName(selectedOption.object.accountName);
                        }}
                    />
                </div>
            </div>
            <div className="row mb-2 align-items-center">
                <div className="col-lg-2">
                    <strong>{journalEntriesText[appContext.locale]["Date"]}</strong>
                </div>
                <div className="col-lg-4">
                    <input
                        type="date"
                        className="form-control"
                        value={journalEntryDate}
                        onChange={event => setJournalEntryDate(event.target.value)} />
                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-lg-2">
                    <strong>{journalEntriesText[appContext.locale]["Description"]}</strong>
                </div>
                <div className="col-lg-8">
                    <input
                        type="text"
                        className="form-control"
                        value={journalEntryDescription}
                        onChange={event => setJournalEntryDescription(event.target.value)} />
                </div>
            </div>
            <LineItemsHeader editMode />
            {lineItems.map((lineItem, i) => {
                return (
                    <LineItemEditPersonal
                        lineItems={lineItems} setLineItems={setLineItems}
                        key={i} i={i}
                        accountOptions={accountOptions}
                        removeLineItem={removeLineItem}
                        transactionTypeOptions={transactionTypeOptions}
                    />
                )
            })}
            <div className="mb-2 d-none d-lg-block">
                <button type="button" className="btn btn-lg btn-white w-100" onClick={addEmptyLineItem}>
                    <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntriesText[appContext.locale]["Add a Line Item"]}
                </button>
            </div>
            <LineItemsFooterEditPersonal lineItems={lineItems} />
            <div className="mb-2 d-block d-lg-none">
                <button type="button" className="btn btn-lg btn-white w-100" onClick={addEmptyLineItem}>
                    <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntriesText[appContext.locale]["Add a Line Item"]}
                </button>
            </div>
        </>
    )


}

export default TransactionExpandedEdit;