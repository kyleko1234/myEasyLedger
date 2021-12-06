import React from 'react';

//optional prop: big
function LoadingSpinner(props) {
    return(
        <i className={"fas fa-circle-notch fa-spin " + (props.big ? "fa-3x" : "")}></i>
    )
}

LoadingSpinner.defaultProps = {
    big: false
}
export default LoadingSpinner;