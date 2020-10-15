import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import ChartOfAccountsOverview from './components/chart-of-accounts-overview.js';
import AccountDetails from './components/account-details';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
            context: {
                apiUrl: 'http://localhost:8080/v0.1',
                organizationId: 1,
                personId: 1,
                localization: {
                    locale: 'en-US',
                    currency: 'USD'
                }
            },
            selectedAccountId: 0,
            selectedCategoryId: 0,
            addAnAccountModal: false,
            utils: {
                setSelectedAccountId: this.setSelectedAccountId.bind(this),
                toggleAddAnAccountModal: this.toggleAddAnAccountModal.bind(this),
                fetchData: this.fetchData.bind(this)
            }
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const url = `${this.state.context.apiUrl}/organization/${this.state.context.organizationId}/accountBalance`;
        axios.get(url).then(response => {
            this.setState({ accounts: response.data });
        });
        axios.get(`${this.state.context.apiUrl}/organization/${this.state.context.organizationId}/categoryBalance`).then(response => {
            this.setState({ categories: response.data });
        })
        axios.get(`${this.state.context.apiUrl}/organization/${this.state.context.organizationId}/accountSubtype`).then(response => {
            this.setState({ accountSubtypes: response.data });
        })
    }
    
    setSelectedAccountId(i) {
        this.setState({selectedAccountId: i});
    }
    
    setSelectedCategoryId(i) {
        this.setState({selectedCategoryId: i});
    }

    toggleAddAnAccountModal() {
        this.setState({addAnAccountModal: !this.state.addAnAccountModal});
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.path}/accountDetails`}>
                        <AccountDetails
                            accounts={this.state.accounts}
                            selectedAccountId={this.state.selectedAccountId}
                            context={this.state.context}
                        />
                    </Route>
                    <Route path={`${this.props.match.path}`} exact={true}>
                        <ChartOfAccountsOverview
                            accounts={this.state.accounts}
                            accountSubtypes={this.state.accountSubtypes}
                            categories={this.state.categories}
                            context={this.state.context}
                            parentPath={this.props.match.path}
                            utils={this.state.utils}
                        />
                    </Route> 
                </Switch>
                <Modal isOpen={this.state.addAnAccountModal} toggle={() => this.toggleAddAnAccountModal()} centered={true}>
                    <ModalHeader> Header </ModalHeader>
                    <ModalBody>Body</ModalBody>
                    <ModalFooter>Footer</ModalFooter>
                </Modal>
            </div>

        )
    }
}

export default ChartOfAccounts;