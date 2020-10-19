import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import ChartOfAccountsOverview from './components/chart-of-accounts-overview.js';
import AccountDetails from './components/account-details';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CONTEXT = {
    apiUrl: 'http://localhost:8080/v0.1',
    organizationId: 1,
    personId: 1,
    localization: {
        locale: 'en-US',
        currency: 'USD'
    }
}
class ChartOfAccounts extends React.Component {
    //This component essentially acts as a controller for accounts. It declares Routes for the "Accounts" tab, and maintains the state of all operations in the accounts tab.
    //One is redirected to the AccountOverview component by default. Through the AccountOverview component, one can select a specific account to view details.
    //Utilities for account and category selection are passed as props into the AccountOverview component, and allow the AccountOverview component to communicate selection information
    //to the detailed-view components.
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            accountSubtypes: [],
            categories: [],

            selectedAccountSubtypeId: 0,
            
            accountNameInput: '',
            accountNameAlert: false,

            addAnAccountFromSubtypeModal: false,

            utils: {
                setSelectedAccountSubtypeId: this.setSelectedAccountSubtypeId.bind(this),
                setAccountNameInput: this.setAccountNameInput.bind(this),
                toggleAddAnAccountFromSubtypeModal: this.toggleAddAnAccountFromSubtypeModal.bind(this),
                deleteAccount: this.deleteAccount.bind(this)
            }
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const url = `${CONTEXT.apiUrl}/organization/${CONTEXT.organizationId}/accountBalance`;
        axios.get(url).then(response => {
            this.setState({ accounts: response.data });
        });
        axios.get(`${CONTEXT.apiUrl}/organization/${CONTEXT.organizationId}/categoryBalance`).then(response => {
            this.setState({ categories: response.data });
        })
        axios.get(`${CONTEXT.apiUrl}/organization/${CONTEXT.organizationId}/accountSubtype`).then(response => {
            this.setState({ accountSubtypes: response.data });
        })
    }
    

    setSelectedAccountSubtypeId(i) {
        this.setState({selectedAccountSubtypeId: i});
    }

    setAccountNameInput( formInputText ) {
        this.setState({accountNameInput: formInputText});
    }

    toggleAddAnAccountFromSubtypeModal() {
        this.setState({addAnAccountFromSubtypeModal: !this.state.addAnAccountFromSubtypeModal});
    }
    
    postAccountWithSubtype() {
        const url = `${CONTEXT.apiUrl}/account`;
        let data = {
            accountName: this.state.accountNameInput,
            accountSubtypeId: this.state.selectedAccountSubtypeId,
            accountTypeId: this.state.accountSubtypes.slice()
                .find(accountSubtype => accountSubtype.accountSubtypeId === this.state.selectedAccountSubtypeId).accountTypeId,
            organizationId: CONTEXT.organizationId
        };
        axios.post(url, data).then( response => {
            console.log(response);
            this.fetchData();
        })
    }

    deleteAccount(accountId) {
        const url = `${CONTEXT.apiUrl}/account/${accountId}`
        axios.delete(url).then(response => {
            console.log(response)
            this.fetchData();
        }).catch(console.log)
    }

    handleSaveNewAccountWithSubtype() {
        if (!this.state.accountNameInput) {
            this.setState({accountNameAlert: true})
        } else {
            this.postAccountWithSubtype();
            this.toggleAddAnAccountFromSubtypeModal();
            this.setState({accountNameInput: '', accountNameAlert: false});
        }
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.path}/accountDetails/:id`}>
                        <AccountDetails
                            context={CONTEXT}
                            parentPath={this.props.match.path}
                            parentName="Chart of Accounts"
                            utils={this.state.utils}
                        />
                    </Route>
                    <Route path={`${this.props.match.path}`} exact={true}>
                        <ChartOfAccountsOverview
                            accounts={this.state.accounts}
                            accountSubtypes={this.state.accountSubtypes}
                            categories={this.state.categories}
                            context={CONTEXT}
                            parentPath={this.props.match.path}
                            utils={this.state.utils}
                        />
                    </Route> 
                </Switch>
                <Modal isOpen={this.state.addAnAccountFromSubtypeModal} toggle={() => this.toggleAddAnAccountFromSubtypeModal()} centered={true}>
                    <ModalHeader> Add an Account </ModalHeader>
                    <ModalBody>
                        {
                            this.state.accountNameAlert ? 
                                <Alert color="danger">
                                    Please provide a name for your account.
                                </Alert>
                            : null
                        }
                        <form>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">
                                    Account Name
                                </label>
                                <div className="col-md-9">
                                    <input 
                                        className="form-control" 
                                        value={this.state.accountNameInput ? this.state.accountNameInput : ''}
                                        onChange={event => {
                                            this.setAccountNameInput(event.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => this.handleSaveNewAccountWithSubtype()} 
                            style={{width: "10ch"}}
                        >
                            Save
                        </button>
                        <button 
                            className="btn btn-white" 
                            onClick={() => {
                                this.toggleAddAnAccountFromSubtypeModal();
                                this.setState({accountNameInput: '', accountNameAlert: false});
                            }} 
                            style={{width: "10ch"}}
                        >
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}

export default ChartOfAccounts;