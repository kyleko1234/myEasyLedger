import React from 'react';
import { Card, CardBody } from 'reactstrap';
import VendorsTitleBarSmallScreen from './vendors-title-bar-small-screen';
import VendorsTitleBarStandard from './vendors-title-bar-standard';
import { API_BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import { Link } from 'react-router-dom';


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
        console.log(vendors);
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
            <Card className="mt-4 very-rounded shadow-sm">
                <CardBody>
                    {vendors.map(vendor => {
                        return (
                            <Link key={vendor.vendorId} to="#" className="pseudo-tr d-flex justify-content-between align-items-center">
                                <div className="pseudo-td" >
                                    {vendor.vendorName}
                                </div>
                                
                            </Link>
                        )
                    })}
                </CardBody>
            </Card>
        </>
    )
}

export default VendorsPage;