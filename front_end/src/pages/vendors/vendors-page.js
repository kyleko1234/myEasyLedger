import React from 'react';
import VendorsTitleBarSmallScreen from './vendors-title-bar-small-screen';
import VendorsTitleBarStandard from './vendors-title-bar-standard';
import { API_BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import VendorsListStandard from './vendors-list-standard';
import VendorsListSmallScreen from './vendors-list-small-screen';
import EditVendorModal from './edit-vendor-modal';


function VendorsPage(props) {
    const appContext = React.useContext(PageSettings);
    const [vendors, setVendors] = React.useState([]);

    const [editVendorModal, setEditVendorModal] = React.useState(false);
    const toggleEditVendorModal = () => setEditVendorModal(!editVendorModal);
    const [selectedVendorId, setSelectedVendorId] = React.useState(null);
    const [vendorNameInput, setVendorNameInput] = React.useState('');
    const [contactNameInput, setContactNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [phoneNumberInput, setPhoneNumberInput] = React.useState('');


    const fetchData = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/vendor`).then(response => {
            setVendors(response.data);
        })
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const handleAddButton = () => {
        setSelectedVendorId(null);
        setVendorNameInput('');
        setContactNameInput('');
        setEmailInput('');
        setPhoneNumberInput('');
        toggleEditVendorModal();
    }

    const handleEditVendorButton = vendor => {
        setSelectedVendorId(vendor.vendorId);
        setVendorNameInput(vendor.vendorName);
        setContactNameInput(vendor.contactName);
        setEmailInput(vendor.email);
        setPhoneNumberInput(vendor.phoneNumber);
        toggleEditVendorModal();
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
            <EditVendorModal 
                isOpen={editVendorModal}
                toggle={toggleEditVendorModal}
                selectedVendorId={selectedVendorId} setSelectedVendorId={setSelectedVendorId}
                vendorNameInput={vendorNameInput} setVendorNameInput={setVendorNameInput}
                contactNameInput={contactNameInput} setContactNameInput={setContactNameInput}
                emailInput={emailInput} setEmailInput={setEmailInput}
                phoneNumberInput={phoneNumberInput} setPhoneNumberInput={setPhoneNumberInput}
                fetchData={fetchData} 
            />
        </>
    )
}

export default VendorsPage;