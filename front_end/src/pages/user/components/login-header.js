import React from 'react';

//optional props: className
function LoginHeader(props) {
    return(
        <div className={"login-header " + props.className}>
            my<b>Easy</b>Ledger
        </div>
    )
}

LoginHeader.defaultProps = {
    className: ""
}
export default LoginHeader;