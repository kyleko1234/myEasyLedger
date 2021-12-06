import React from 'react';

function LoadingSpinner(props) {
    return(
        <i className={"fas fa-circle-notch fa-spin " + (props.big ? "fa-3x" : "")}></i>
    )
}

LoadingSpinner.defaultProps = {
    big: false
}
export default LoadingSpinner;