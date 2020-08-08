import React from 'react';

const LineItemTable = ({lineItems}) => {
    console.log(lineItems);
    return (
        <div className="table-responsive">
            <table className="table m-b-0">
                <thead>
                    <tr>
                        <th>lineItemId</th>
                        <th>amount</th>
                        <th>description</th>
                        <th>categoryId</th>
                        <th>accountId</th>
                        <th>isCredit</th>
                    </tr>
                </thead>
                <tbody>
                    { (lineItems.length > 0) ? lineItems.map( (lineItem, index) => {
                        return (
                            <tr key={ index }>
                                <td>{lineItem.lineItemId}</td>
                                <td>{lineItem.amount}</td>
                                <td>{lineItem.description}</td>
                                <td>{lineItem.categoryId}</td>
                                <td>{lineItem.accountId}</td>
                                <td>{lineItem.isCredit}</td>
                            </tr>
                        )
                    }) : <tr><td colSpan="5">Loading...</td></tr> }
                </tbody>
            </table>
        </div>
    );
}

export default LineItemTable