import React from 'react';
import namor from "namor";
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader } from './../../components/panel/panel.jsx';
import 'react-table/react-table.css';


const range = len => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newPerson = () => {
	const statusChance = Math.random();
	return {
		firstName: namor.generate({ words: 1, numbers: 0 }),
		lastName: namor.generate({ words: 1, numbers: 0 }),
		age: Math.floor(Math.random() * 30),
		visits: Math.floor(Math.random() * 100),
		progress: Math.floor(Math.random() * 100),
		status:
			statusChance > 0.66
			? "relationship"
			: statusChance > 0.33 ? "complicated" : "single"
	};
};

function makeData(len = 5553) {
	return range(len).map(d => {
		return {
			...newPerson(),
			children: range(10).map(newPerson)
		};
	});
}

class TableData extends React.Component {
	constructor(props) {
		super(props);
		
		this.data = makeData();
		this.defaultSorted = [
			{
				id: "firstName",
				desc: false
			}
		];
		this.tableColumns = [
			{
				Header: "Name",
				columns: [
					{
						Header: "First Name",
						accessor: "firstName"
					},
					{
						Header: "Last Name",
						id: "lastName",
						accessor: d => d.lastName
					}
				]
			},
			{
				Header: 'Stats',
				columns: [
					{
						Header: "Visits",
						accessor: "visits"
					}
				]
			},
			{
				Header: 'Info',
				columns: [{
					Header: 'Profile Progress',
					accessor: 'progress',
					Cell: row => (
						<div className="progress rounded-corner">
							<div className="progress-bar progress-bar-striped f-s-10 f-w-600" style={{
									width: `${row.value}%`,
									backgroundColor: row.value > 66 ? '#00acac'
										: row.value > 33 ? '#f59c1a'
										: '#ff5b57',
									transition: 'all .2s ease-out',
									minWidth: '30px'
								}}
							>{row.value}%</div>
						</div>
					)
				}, {
					Header: 'Status',
					accessor: 'status',
					Cell: row => (
						<span>
							<i className="fa fa-circle f-s-7 fa-fw m-r-10 pull-left m-t-5" style={{
								color: row.value === 'relationship' ? '#ff5b57'
									: row.value === 'complicated' ? '#f59c1a'
									: '#00acac',
								transition: 'all .3s ease'
							}}>
							</i> {
								row.value === 'relationship' ? 'In a relationship'
								: row.value === 'complicated' ? `It's complicated`
								: 'Single'
							}
						</span>
					)
				}]
			}
		]
	}
	
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/table/data">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/table/data">Tables</Link></li>
					<li className="breadcrumb-item active">Data Tables</li>
				</ol>
				<h1 className="page-header">React Table <small>official documentation <a href="https://react-table.js.org/#/story/readme" target="_blank" rel="noopener noreferrer">here</a></small></h1>
				<Panel>
					<PanelHeader>
						React Table
					</PanelHeader>
					<ReactTable filterable data={this.data} columns={this.tableColumns} defaultPageSize={10} defaultSorted={this.defaultSorted} className="-highlight" />
				</Panel>
			</div>
		)
	}
}

export default TableData;