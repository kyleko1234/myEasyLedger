import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { PageSettings } from "../../../config/page-settings";
import axios from 'axios';
import { API_BASE_URL } from "../../../utils/constants";
import JournalEntryViewMode from "./journal-entry-view-mode";
import { journalEntryViewModeText } from "../../../utils/i18n/journal-entry-view-mode-text";

function JournalEntryEditHistory(props) {
//required props: journalEntryId, isOpen, toggle
//should be used for enterprise view only; non-enterprise should use TransactionEditHistory
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const [journalEntryLogs, setJournalEntryLogs] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            await axios.get(`${API_BASE_URL}/journalEntry/${props.journalEntryId}/log`).then(response => {
                console.log(response);
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

    return(
        <Modal
            scrollable
            isOpen={props.isOpen}
            toggle={props.toggle}
            size="xl"
            centered={true}
        >
            <ModalHeader style={{backgroundColor: "#e4e4e4"}}>
                {journalEntryViewModeText[appContext.locale]["Edit History"]}
            </ModalHeader>
            <ModalBody className="bg-light">
                {loading
                ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>
                :   <>
                        {journalEntryLogs.map(journalEntryLog => {
                            return (
                                <div className="card px-3 py-3 mb-3" key={journalEntryLog.id}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <b>{journalEntryViewModeText[appContext.locale]["TIMESTAMP OF EDIT:"]}</b>
                                            <p>{journalEntryLog.datetimeOfEdit}</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <b>{journalEntryViewModeText[appContext.locale]["AUTHOR OF EDIT:"]}</b>
                                            <p>{journalEntryLog.personFirstName + " " + journalEntryLog.personLastName}</p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <JournalEntryViewMode 
                                        journalEntryDescription={journalEntryLog.snapshot.description}
                                        journalEntryDate={journalEntryLog.snapshot.journalEntryDate}
                                        data={journalEntryLog.snapshot.lineItems}
                                    />
                                </div>
                            )
                        })}
                    </>
                }

            </ModalBody>
            <ModalFooter style={{backgroundColor: "#e4e4e4"}}>
                <button className="btn btn-white width-10ch" onClick={props.toggle}>
                    {journalEntryViewModeText[appContext.locale]["Close"]}
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default JournalEntryEditHistory;