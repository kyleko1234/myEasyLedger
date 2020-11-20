import React from 'react';
import { Link } from 'react-router-dom';
import GeneralJournal from './components/general-journal'




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
						<GeneralJournal/>
					</div>
			</div>
		)
	}
}

export default Journals;