import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody } from "reactstrap";
import { PageSettings } from "../../../config/page-settings";
import axios from 'axios';
import { API_BASE_URL, PERSONAL_TRANSACTION_TYPES } from "../../../utils/constants";
import TransactionViewMode from "./transaction-view-mode";
import { journalEntryViewModeText } from "../../../utils/i18n/journal-entry-view-mode-text";

function TransactionEditHistory(props) {
//required props: journalEntryId, isOpen, toggle
//should be used for non-enterprise view only; enterprise should use JournalEntryEditHistory
    const appContext = React.useContext(PageSettings);
    const transactionTypeOptions = PERSONAL_TRANSACTION_TYPES(appContext.locale);

    const [loading, setLoading] = React.useState(true);
    const [journalEntryLogs, setJournalEntryLogs] = React.useState([]);

    const formatJournalEntryLog = journalEntryLog => {
        let parsedSnapshot = JSON.parse(journalEntryLog.snapshot);
        let firstLineItem = parsedSnapshot.lineItems.shift();
        parsedSnapshot.fromAccountId = firstLineItem.accountId;
        parsedSnapshot.fromAccountName = firstLineItem.accountName;
        let formattedLineItems = parsedSnapshot.lineItems.map(lineItem => {
            let transactionType = transactionTypeOptions.find(transactionType => transactionType.accountTypeIds.includes(lineItem.accountTypeId));
            return ({
                lineItemId: lineItem.lineItemId,
                accountName: lineItem.accountName,
                accountId: lineItem.accountId,
                description: lineItem.description,
                transactionType: transactionType,
                transactionTypeName: transactionType.label,
                amount: transactionType.isCredit == lineItem.isCredit ? lineItem.amount : lineItem.amount * -1            
            });
        });
        parsedSnapshot.lineItems = formattedLineItems;
        journalEntryLog.snapshot = parsedSnapshot;
        return journalEntryLog;
    } 

    React.useEffect(() => {
        setLoading(true);
        async function fetchData() {
            await axios.get(`${API_BASE_URL}/journalEntry/${props.journalEntryId}/log`).then(response => {
                console.log(response);
                response.data.forEach(journalEntryLog => {
                    formatJournalEntryLog(journalEntryLog);
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
        fetchData();
    }, [props.journalEntryId])

    return(
        <Modal
            scrollable
            isOpen={props.isOpen}
            toggle={props.toggle}
            size="lg" style={{ maxWidth: '1600px', width: '80%', margin: 'auto' }}
            centered={true}
        >
            <ModalHeader>
                {journalEntryViewModeText[appContext.locale]["Edit History"]}
            </ModalHeader>
            <ModalBody>
                {loading
                ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>
                :   <>
                        {journalEntryLogs.map(journalEntryLog => {
                            return (
                                <Card className="very-rounded shadow-sm mb-3" key={journalEntryLog.id}>
                                    <CardBody>
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
                                        <TransactionViewMode 
                                            fromAccountName={journalEntryLog.snapshot.fromAccountName}
                                            journalEntryDescription={journalEntryLog.snapshot.description}
                                            journalEntryDate={journalEntryLog.snapshot.journalEntryDate}
                                            data={journalEntryLog.snapshot.lineItems}
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
                    {journalEntryViewModeText[appContext.locale]["Close"]}
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default TransactionEditHistory;