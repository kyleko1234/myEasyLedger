import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody } from "reactstrap";
import { PageSettings } from "../../../config/page-settings";
import axios from 'axios';
import { API_BASE_URL } from "../../../utils/constants";
import { yearMonthDayToDateString } from "../../../utils/util-fns";
import JournalEntryExpandedView from "./journal-entry-expanded-view";
import { journalEntriesText } from "../../../utils/i18n/journal-entries-text";

function JournalEntryEditHistory(props) {
    //required props: journalEntryId, isOpen, toggle, vendorOptions, customerOptions, accountOptions
    //should be used for enterprise view only; non-enterprise should use TransactionEditHistory
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const [journalEntryLogs, setJournalEntryLogs] = React.useState([]);

    const modalOnClosed = () => {
        setJournalEntryLogs([]);
    }

    React.useEffect(() => {
        async function fetchData() {
            await axios.get(`${API_BASE_URL}/journalEntry/${props.journalEntryId}/log`).then(response => {
                response.data.forEach(journalEntryLog => {
                    journalEntryLog.snapshot = JSON.parse(journalEntryLog.snapshot);
                    let formattedLineItems = []
                    journalEntryLog.snapshot.lineItems.forEach(lineItem => {
                        let formattedLineItem = {
                            lineItemId: lineItem.lineItemId,
                            accountName: lineItem.accountName,
                            accountId: lineItem.accountId,
                            description: lineItem.description,
                            debitAmount: (lineItem.isCredit ? null : lineItem.amount),
                            creditAmount: (lineItem.isCredit ? lineItem.amount : null)
                        }
                        formattedLineItems.push(formattedLineItem);
                    })
                    formattedLineItems.sort((a, b) => a.lineItemId > b.lineItemId ? 1 : -1) //sort by LineItemId to preserve insertion order
                    journalEntryLog.snapshot.lineItems = formattedLineItems;
                });
                setJournalEntryLogs(response.data);
                setLoading(false);
            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                    setLoading(false);
                }
            })
        }
        if (props.isOpen) {
            setLoading(true);
            fetchData();
        }
    }, [props.isOpen]) //fetch data every time props.isOpen changes from false to true, i.e. when modal is opened. Because this component can only be opened in a JournalEntryViewMode window, props.journalEntryId can be assumed to not be undefined.

    return (
        <Modal
            scrollable
            isOpen={props.isOpen}
            toggle={props.toggle}
            size="xl"
            centered={true}
            onClosed={modalOnClosed}
        >
            <ModalHeader>
                {journalEntriesText[appContext.locale]["Edit History"]}
            </ModalHeader>
            <ModalBody>
                {loading
                    ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>
                    : <>
                        {journalEntryLogs.map(journalEntryLog => {
                            return (
                                <Card className="very-rounded shadow-sm mb-3" key={journalEntryLog.id}>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <b>{journalEntriesText[appContext.locale]["TIMESTAMP OF EDIT:"]}</b>
                                                <p>{journalEntryLog.datetimeOfEdit}</p>
                                            </div>
                                            <div className="col-sm-6">
                                                <b>{journalEntriesText[appContext.locale]["AUTHOR OF EDIT:"]}</b>
                                                <p>{journalEntryLog.personFirstName + " " + journalEntryLog.personLastName}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <JournalEntryExpandedView
                                            journalEntryDescription={journalEntryLog.snapshot.description}
                                            journalEntryDate={yearMonthDayToDateString(...journalEntryLog.snapshot.journalEntryDate)}
                                            lineItems={journalEntryLog.snapshot.lineItems}
                                            accountOptions={props.accountOptions}
                                            journalEntryVendorId={journalEntryLog.snapshot.vendorId}
                                            journalEntryCustomerId={journalEntryLog.snapshot.customerId}
                                            vendorOptions={props.vendorOptions}
                                            customerOptions={props.customerOptions}
                                        />
                                    </CardBody>
                                </Card>
                            )
                        })}
                    </>
                }

            </ModalBody>
            <ModalFooter>
                <button className="btn btn-white width-10ch" onClick={props.toggle}>
                    {journalEntriesText[appContext.locale]["Close"]}
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default JournalEntryEditHistory;