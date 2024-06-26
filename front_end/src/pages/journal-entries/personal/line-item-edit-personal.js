import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { isTreatedAsZero } from '../../../utils/util-fns';
import StyledSelect from '../../../components/misc/styled-select';

function LineItemEditPersonal({ lineItems, setLineItems, i, accountOptions, removeLineItem, transactionTypeOptions }) {
    const appContext = React.useContext(PageSettings);
    const handleChangeMemoInput = event => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems[i].description = event.target.value;
        setLineItems(updatedLineItems);
    }
    const handleChangeAccount = selectedOption => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems[i].accountId = selectedOption.object.accountId;
        updatedLineItems[i].accountName = selectedOption.object.accountName;
        setLineItems(updatedLineItems);
    }
    const handleChangeAmountInput = event => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems[i].amount = event.target.value;
        setLineItems(updatedLineItems);
    }
    const handleChangeTransactionType = selectedOption => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems[i].transactionTypeId = selectedOption.value;
        updatedLineItems[i].transactionTypeName = selectedOption.label;
        updatedLineItems[i].transactionType = selectedOption;
        updatedLineItems[i].accountId = '';
        updatedLineItems[i].accountName = '';
        setLineItems(updatedLineItems);
    }

    return (
        <>
            {/**Desktop View */}
            <div className="pseudo-tr d-none d-lg-flex">
                <div className="pseudo-td col-3">
                    <StyledSelect
                        options={transactionTypeOptions}
                        value={transactionTypeOptions.find(transactionType => transactionType.value == lineItems[i].transactionTypeId)}
                        menuShouldScrollIntoView={false}
                        onChange={handleChangeTransactionType}
                    />
                </div>
                <div className="pseudo-td col-3">
                    <StyledSelect
                        options={accountOptions.filter(accountOption => lineItems[i].transactionType.accountTypeIds.includes(accountOption.object.accountTypeId))}
                        value={lineItems[i].accountId == false
                            ? null
                            : accountOptions.find(accountOption => accountOption.object.accountId == lineItems[i].accountId)
                            /**The conditional checking for a false-y accountId is necessary if you want this select dropdown to reset when transactionTypeOption is changed. */
                        }
                        isSearchable={true}
                        menuShouldScrollIntoView={false}
                        onChange={handleChangeAccount}
                    />
                </div>
                <div className="pseudo-td col-3">
                    <input
                        type="text"
                        className="form-control"
                        value={lineItems[i].description ? lineItems[i].description : ''}
                        onChange={handleChangeMemoInput}
                    />
                </div>
                <div className="pseudo-td col-2">
                    <input
                        type="number"
                        step="any"
                        className="form-control"
                        value={isTreatedAsZero(lineItems[i].amount) ? '' : lineItems[i].amount}
                        onChange={handleChangeAmountInput}
                    />
                </div>
                <div className="pseudo-td col-1 px-0">
                    <button className="btn btn-lg btn-white border-0" onClick={() => removeLineItem(i)} type="button">
                        <i className="ion ion-md-close fa-fw fa-lg"></i>
                    </button>
                </div>
            </div>
            {/**Mobile View */}
            <div className="pseudo-tr d-flex d-lg-none">
                <div className="pseudo-td w-100">
                    <div className="d-flex mb-2 align-items-center">
                        <div className="col-5 px-0 me-2">
                            <div className="fw-semibold font-size-compact">
                                {journalEntriesText[appContext.locale]["Transaction Type"]}
                            </div>
                            <div>
                                <StyledSelect
                                    options={transactionTypeOptions}
                                    value={transactionTypeOptions.find(transactionType => transactionType.value == lineItems[i].transactionTypeId)}
                                    menuShouldScrollIntoView={false}
                                    onChange={handleChangeTransactionType}
                                />
                            </div>
                        </div>
                        <div className="col-5 px-0 me-2">
                            <div className="fw-semibold font-size-compact">
                                {journalEntriesText[appContext.locale]["Category or Account"]}
                            </div>
                            <div>
                                <StyledSelect
                                    options={accountOptions.filter(accountOption => lineItems[i].transactionType.accountTypeIds.includes(accountOption.object.accountTypeId))}
                                    value={lineItems[i].accountId == false
                                        ? null
                                        : accountOptions.find(accountOption => accountOption.object.accountId == lineItems[i].accountId)
                                        /**The conditional checking for a false-y accountId is necessary if you want this select dropdown to reset when transactionTypeOption is changed. */
                                    }
                                    isSearchable={true}
                                    menuShouldScrollIntoView={false}
                                    onChange={handleChangeAccount}
                                />
                            </div>
                        </div>
                        <div className="col-1 px-0">
                            <div className="fw-semibold font-size-compact invisible">
                                space {/**invisible text to align button */}
                            </div>
                            <div>
                                <button className="btn btn-lg btn-white border-0" onClick={() => removeLineItem(i)} type="button">
                                    <i className="ion ion-md-close fa-fw fa-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mb-2 align-items-center">
                        <div className="col-6 px-0 me-2">
                            <div className="fw-semibold font-size-compact">
                                {journalEntriesText[appContext.locale]["Memo"]}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lineItems[i].description ? lineItems[i].description : ''}
                                    onChange={handleChangeMemoInput}
                                />
                            </div>
                        </div>
                        <div className="col-4 px-0 me-2">
                            <div className="fw-semibold font-size-compact">
                                {journalEntriesText[appContext.locale]["Amount"]}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    step="any"
                                    className="form-control"
                                    value={lineItems[i].amount}
                                    onChange={handleChangeAmountInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LineItemEditPersonal;