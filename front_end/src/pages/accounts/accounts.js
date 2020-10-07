import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';



const API_URL = 'http://localhost:8080/v0.1';
const ORGANIZATION_ID = 1;
const PERSON_ID = 1;
const localization = {
	locale: 'en-US',
	currency: 'USD'
}
const accountTypes = [
    {id: 1, name: "Assets"},
    {id: 2, name: "Liabilities"},
    {id: 3, name: "Owner's Equity"},
    {id: 4, name: "Income"},
    {id: 5, name: "Expenses"},
]

class Accounts extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
            accounts: [],
            accountSubtypes: [],
            categories: [],
            activeTab: '1'
        };
	}
    
    componentDidMount() {
        const url = `${API_URL}/organization/${ORGANIZATION_ID}/accountBalance`;
        axios.get(url).then(response => {
            this.setState({accounts: response.data});
        });
        axios.get(`${API_URL}/organization/${ORGANIZATION_ID}/categoryBalance`).then(response => {
            this.setState({categories: response.data});
        })
 //       axios.get(`${API_URL}/organization/${ORGANIZATION_ID}/accountSubtype`).then(response => {
  //          this.setState({accountSubtypes: response.data});
     //   })

    }
   	
	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
    }
    
	render() {


		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/">Home</Link></li>
					<li className="breadcrumb-item active">Accounts</li>
				</ol>

				<h1 className="page-header">Accounts </h1>

				<div className="rounded" style={{backgroundColor: "#e4e4e4", border:"0.5px solid silver"}}>
                    <Nav tabs className="d-flex px-2">
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1'})}
                                onClick={() => {this.toggleTab('1'); }}
                            >
                                <span className="d-sm-block px-3">Assets</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2'})}
                                onClick={() => {this.toggleTab('2'); }}
                            >
                                <span className="d-sm-block px-3">Liabilities</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3'})}
                                onClick={() => {this.toggleTab('3'); }}
                            >
                                <span className="d-sm-block px-3">Owner's Equity</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4'})}
                                onClick={() => {this.toggleTab('4'); }}
                            >
                                <span className="d-sm-block px-3">Income</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '5'})}
                                onClick={() => {this.toggleTab('5'); }}
                            >
                                <span className="d-sm-block px-3">Expenses</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <p>content</p>
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <p>content</p>
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <p>content</p>
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <p>content</p>
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <p>content</p>
                        </TabPane>
                    </TabContent>

                </div>
			</div>
		)
	}
}

export default Accounts;