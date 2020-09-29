import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const API_URL = 'http://localhost:8080/v0.1';
const ORGANIZATION_ID = 1;
const PERSON_ID = 1;
const localization = {
	locale: 'en-US',
	currency: 'USD'
}


class Categories extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
            accounts: [],
            accountTypes: []
        };
	}
    
    componentDidMount() {
        const url = `${API_URL}/organization/${ORGANIZATION_ID}/account`;
        axios.get(url).then(response => {
            this.setState({accounts: response.data});
        });
        axios.get(`${API_URL}/accountType`).then(response => {
            this.setState({accountTypes: response.data});
        })
    }

	render() {


		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/">Home</Link></li>
					<li className="breadcrumb-item active">Accounts</li>
				</ol>
				<h1 className="page-header">Accounts </h1>
				<div>
                    {this.state.accountTypes.map((accountType, i) => {
                        return (
                            <div key={accountType.id}>
                                <h3>{accountType.name}</h3>
                                <ul>
                                    {this.state.accounts.filter(account => account.accountTypeId == accountType.id).map(account => {
                                        return(
                                            <li key={account.accountId}><Link to='#'>{account.accountName}</Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
			</div>
		)
	}
}

export default Categories;