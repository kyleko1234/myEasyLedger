import React from 'react';
import { API_BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import CustomersTitleBarSmallScreen from './customers-title-bar-small-screen';
import CustomersTitleBarStandard from './customers-title-bar-standard';
import CustomersListStandard from './customers-list-standard';
import CustomersListSmallScreen from './customers-list-small-screen';
import EditCustomerModal from './edit-customer-modal';

function CustomersPage(props) {
    const appContext = React.useContext(PageSettings);
    const [customers, setCustomers] = React.useState([]);

    const [editCustomerModal, setEditCustomerModal] = React.useState(false);
    const toggleEditCustomerModal = () => setEditCustomerModal(!editCustomerModal);
    const [selectedCustomerId, setSelectedCustomerId] = React.useState(null);
    const [customerNameInput, setCustomerNameInput] = React.useState('');
    const [contactNameInput, setContactNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');


    const fetchData = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/customer`).then(response => {
            setCustomers(response.data);
        })
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const handleAddButton = () => {
        setSelectedCustomerId(null);
        setCustomerNameInput('');
        setContactNameInput('');
        setEmailInput('');
        toggleEditCustomerModal();
    }

    const handleEditCustomerButton = customer => {
        setSelectedCustomerId(customer.customerId);
        setCustomerNameInput(customer.customerName);
        setContactNameInput(customer.contactName);
        setEmailInput(customer.email);
        toggleEditCustomerModal();
    }

    return(
        <>
            <div className="d-none d-sm-block">
                <CustomersTitleBarStandard
                    handleAddButton={handleAddButton}
                />
            </div>
            <div className="d-sm-none">
                <CustomersTitleBarSmallScreen
                    handleAddButton={handleAddButton}
                />
            </div>
            <div>
                <CustomersListStandard
                    className="d-none d-lg-block"
                    customers={customers}
                    handleEditCustomerButton={handleEditCustomerButton}
                />
                <CustomersListSmallScreen
                    className="d-lg-none"
                    customers={customers}
                    handleEditCustomerButton={handleEditCustomerButton}
                />
            </div>
            <EditCustomerModal 
                isOpen={editCustomerModal}
                toggle={toggleEditCustomerModal}
                selectedCustomerId={selectedCustomerId} setSelectedCustomerId={setSelectedCustomerId}
                customerNameInput={customerNameInput} setCustomerNameInput={setCustomerNameInput}
                contactNameInput={contactNameInput} setContactNameInput={setContactNameInput}
                emailInput={emailInput} setEmailInput={setEmailInput}
                fetchData={fetchData} 
            />
        </>
    )
}

export default CustomersPage;