import React from 'react';
import PropTypes from 'prop-types';

//A flexbox row that alternates between light and dark.
//optional props: children, className
function StripedRow(props) {

    return(
        <div className={"striped-row " + props.className}>
            {props.children}
        </div>
    )

}

StripedRow.propTypes = {
    className: PropTypes.string
}

StripedRow.defaultProps = {
    className: ""
}

export default StripedRow;