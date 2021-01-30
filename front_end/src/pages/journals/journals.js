import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import GeneralJournal from './components/general-journal';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';
import {journalsText} from './journals-text.js';



class Journals extends React.Component {
	static contextType = PageSettings;

    componentDidMount() {

    }
	render() {


		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/">{journalsText[this.context.locale]["Home"]}</Link></li>
					<li className="breadcrumb-item active">{journalsText[this.context.locale]["Journals"]}</li>
				</ol>
				<h1 className="page-header">
					{journalsText[this.context.locale]["Journals"]}
					<ToggleMobileSidebarButton className="d-md-none float-right "/>
				</h1>
					<div>
						<GeneralJournal/>
					</div>
			</div>
		)
	}
}

export default Journals;