import React from 'react';
import namor from "namor";
import { Link } from 'react-router-dom';
import { Panel, PanelHeader } from '../../components/panel/panel.jsx';
import JournalTable from '../../components/table/journal-table'
import axios from 'axios';


const API_URL = 'http://localhost:8080/v0.1';


class Journals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
        };
		
	}
    
    componentDidMount() {
        const url = `${API_URL}/entryViewModel/`;
        axios.get(url).then(response => {
			this.setState({ 'data': response.data.content })
			console.log(this.state.data)
        })
		.catch(console.log);
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
					<JournalTable data={this.state.data}/>
				</Panel>
			</div>
		)
	}
}

export default Journals;