import React from 'react';
import namor from "namor";
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader } from '../../components/panel/panel.jsx';
import LineItemTable from '../../components/table/line-item-table'
import 'react-table/react-table.css';
import axios from 'axios';


const API_URL = 'http://localhost:8080/v0.1';


class Journals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            lineItems: []
        };
		
	}
    
    componentDidMount() {
        const url = `${API_URL}/lineItem/`;
        axios.get(url).then(response => {
            this.setState({ 'lineItems': response.data })
        })
        .catch(console.log)
    }
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/">Home</Link></li>
					<li className="breadcrumb-item active">Journals</li>
				</ol>
				<h1 className="page-header">Journals </h1>
				<Panel>
					<PanelHeader noButton={true}>
						Accounting Entries
					</PanelHeader>
					
                    <LineItemTable lineItems={ this.state.lineItems }/>
				</Panel>
			</div>
		)
	}
}

export default Journals;