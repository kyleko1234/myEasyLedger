import React from 'react';
import { Card, CardBody } from 'reactstrap';
import VendorsTitleBarSmallScreen from './vendors-title-bar-small-screen';
import VendorsTitleBarStandard from './vendors-title-bar-standard';
import { API_BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import { Link } from 'react-router-dom';
import VendorsListStandard from './vendors-list-standard';
import VendorsListSmallScreen from './vendors-list-small-screen';


function VendorsPage(props) {
    const appContext = React.useContext(PageSettings);
    const [vendors, setVendors] = React.useState([]);

    const fetchData = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/vendor`).then(response => {
            setVendors(response.data);
        })
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const handleAddButton = () => {

    }

    const handleEditVendorButton = vendor => {

    }

    return(
        <>
            <div className="d-none d-sm-block">
                <VendorsTitleBarStandard
                    handleAddButton={handleAddButton}
                />
            </div>
            <div className="d-sm-none">
                <VendorsTitleBarSmallScreen
                    handleAddButton={handleAddButton}
                />
            </div>
            <div>
                <VendorsListStandard
                    className="d-none d-lg-block"
                    vendors={vendors}
                    handleEditVendorButton={handleEditVendorButton}
                />
                <VendorsListSmallScreen
                    className="d-lg-none"
                    vendors={vendors}
                    handleEditVendorButton={handleEditVendorButton}
                />
            </div>
        </>
    )
}

export default VendorsPage;