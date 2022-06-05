import React from 'react';
import { Card, CardBody } from 'reactstrap';
import VendorsTitleBarSmallScreen from './vendors-title-bar-small-screen';
import VendorsTitleBarStandard from './vendors-title-bar-standard';

function VendorsPage(props) {
    

    const handleAddButton = () => {

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
                    HI
                </CardBody>
            </Card>
        </>
    )
}

export default VendorsPage;