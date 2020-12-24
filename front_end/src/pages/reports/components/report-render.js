import React from 'react';
import { Link } from 'react-router-dom';

function ReportRender(props) {
//required props: title
    return (
        <div className="widget widget-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">{props.title}</h4>
            </div>
            <div className="px-5">
                PLEASE SEND HELP
            </div>
        </div>


    )
}

export default ReportRender;