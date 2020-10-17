import React from 'react';
import { Link } from 'react-router-dom';
import GeneralJournal from './components/general-journal'



const CONTEXT = {
	apiUrl: 'http://localhost:8080/v0.1',
	organizationId: 1,
	personId: 1,
	localization: {
		locale: 'en-US',
		currency: 'USD'
	}
}

class Journals extends React.Component {
    
    componentDidMount() {

    }
	render() {


		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/">Home</Link></li>
					<li className="breadcrumb-item active">Journals</li>
				</ol>
				<h1 className="page-header">Journals </h1>
					<div>
						<GeneralJournal context={CONTEXT}/>
					</div>
			</div>
		)
	}
}

export default Journals;