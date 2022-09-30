import React from 'react';
import Select from 'react-select';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { isTreatedAsZero } from '../../../utils/util-fns';

function LineItemEdit({ lineItems, setLineItems, i, accountOptions, removeLineItem }) {
    const appContext=React.useContext(PageSettings);

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
    const handleChangeDebitInput = event => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems[i].creditAmount = 0;
        updatedLineItems[i].debitAmount = event.target.value;
        setLineItems(updatedLineItems);
    }
    const handleChangeCreditInput = event => {
        let updatedLineItems = lineItems.slice();
        updatedLineItems[i].debitAmount = 0;
        updatedLineItems[i].creditAmount = event.target.value;
        setLineItems(updatedLineItems);
    }

    return (
        <>
            {/** Desktop View */}
            <div className="pseudo-tr d-none d-lg-flex">
                <div className="pseudo-td col-4">
                    <input
                        type="text"
                        className="form-control"
                        value={lineItems[i].description ? lineItems[i].description : ''}
                        onChange={handleChangeMemoInput}
                    />
                </div>
                <div className="pseudo-td col-3">
                    <Select
                        classNamePrefix="form-control"
                        options={accountOptions}
                        value={accountOptions.find(accountOption => accountOption.object.accountId == lineItems[i].accountId)}
                        isSearchable={true}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPlacement={'auto'}
                        onChange={handleChangeAccount}
                    />
                </div>
                <div className="pseudo-td col-2">
                    <input
                        type="number"
                        className="form-control"
                        value={lineItems[i].debitAmount ? lineItems[i].debitAmount : ''}
                        step="any"
                        onChange={handleChangeDebitInput}
                    />
                </div>
                <div className="pseudo-td col-2">
                    <input
                        type="number"
                        className="form-control"
                        value={lineItems[i].creditAmount ? lineItems[i].creditAmount : ''}
                        step="any"
                        onChange={handleChangeCreditInput}
                    />
                </div>
                <div className="pseudo-td col-1">
                    <button className="btn btn-lg btn-icon btn-white border-0" onClick={() => removeLineItem(i)} type="button">
                        <i className="ion ion-md-close fa-fw fa-lg"></i>
                    </button>
                </div>
            </div>

            {/** Mobile View */}
            <div className="d-lg-none pseudo-tr d-flex align-items-center">
                <div className="pseudo-td">
                    <div className="mb-2">
                        <div className="fw-semibold font-size-compact">
                            {journalEntriesText[appContext.locale]["Account"]}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="w-100">
                                <Select
                                    classNamePrefix="form-control"
                                    options={accountOptions}
                                    value={accountOptions.find(accountOption => accountOption.object.accountId == lineItems[i].accountId)}
                                    isSearchable={true}
                                    menuPortalTarget={document.body}
                                    menuShouldScrollIntoView={false}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    menuPlacement={'auto'}
                                    onChange={handleChangeAccount}
                                />
                            </div>
                            <div>
                                <button className="btn btn-lg btn-white border-0 px-1 ms-2" onClick={() => removeLineItem(i)} type="button">
                                    <i className="ion ion-md-close fa-fw fa-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">
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
                    <div className="d-flex justify-content-between">
                        <div className="me-2">
                            <div className="fw-semibold font-size-compact">
                                {journalEntriesText[appContext.locale]["Debit"]}
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    className="form-control"
                                    value={!lineItems[i].debitAmount?  '' : lineItems[i].debitAmount}
                                    step="any"
                                    onChange={handleChangeDebitInput}

                                />
                            </div>
                        </div>
                        <div>
                            <div className="fw-semibold font-size-compact">
                                {journalEntriesText[appContext.locale]["Credit"]}
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    className="form-control"
                                    value={!lineItems[i].creditAmount? '' : lineItems[i].creditAmount}
                                    step="any"
                                    onChange={handleChangeCreditInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LineItemEdit;