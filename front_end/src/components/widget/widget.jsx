import React from 'react';
import { Link } from 'react-router-dom';
import {Collapse} from 'reactstrap';

/**
 * props:
 * rounded (optional boolean), default=true
 * className (string), default=""
 */
export function Widget(props) {
    return (
        <div className={" widget " + (props.rounded ? " widget-rounded " : " ") + props.className}>
            {props.children}
        </div>
    )
}
Widget.defaultProps = {
    rounded: true,
    className: ""
}


/**
 * props:
 * rounded (optional boolean), default=true
 * className (string), default=""
 */
export function WidgetList(props) {
    return(
        <div className={"widget widget-list " + (props.rounded? " widget-rounded widget-list-rounded " : " ") + props.className}>
            {props.children}
        </div>
    )
}
WidgetList.defaultProps = {
    rounded: true,
    className: ""
}

/**
 * props:
 * className: string, default=""
 * 
 */
export function WidgetHeader(props) {
    return(
        <div className={" widget-header border-bottom " + props.className}>
            <h4 className="widget-header-title d-flex justify-content-between">
                {props.children}
            </h4>
        </div>
    )
}
WidgetHeader.defaultProps = {
    className: ""
}

/**
 * props:
 * link (boolean), default=false
 * onClick(optional function),
 * to (optional String), default="#",
 * replace (boolean), default=false
 * className(string), default=""
 */
export function WidgetListItem(props) {
    if (props.link) {
        return(
            <Link className={" widget-list-item " + props.className} onClick={props.onClick} to={props.to} replace={props.replace}>
                {Array.isArray(props.children)? props.children.map((child, i) => {
                    return(
                        <div className="widget-list-content" key={i}>
                            {child}
                        </div>
                    )
                }): <div className="widget-list-content">{props.children}</div>}
                <div className="m-r-10 widget-list-action text-right">
                    <i className="fa fa-angle-right fa-lg text-muted"></i>
                </div>

            </Link>
        )
    } else {
        return(
            <div className={" widget-list-item " + props.className}>
                {Array.isArray(props.children)? props.children.map((child, i) => {
                    return(
                        <div className="widget-list-content" key={i}>
                            {child}
                        </div>
                    )
                }): <div className="widget-list-content">{props.children}</div>}
                <div className="m-r-10 widget-list-action text-right">
                    <i className="fa fa-angle-right fa-lg text-muted invisible"></i>
                </div>
            </div>
        )
    }
}
WidgetListItem.defaultProps = {
    className: "",
    link: false,
    to: "#",
    replace: false
}

/**
 * props:
 * parentText (string),
 * parentClassName (string), default=""
 * bold (boolean), default=true
 * forceExpandToken optional(number)
 * forceCollapseToken optional(number)
 * defaultIsOpen (boolean), default=false
 */
export function ExpandableWidgetListItem(props) {
    const [isOpen, setIsOpen] = React.useState(props.defaultIsOpen);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    const refreshRef = React.useRef(0);

    React.useEffect(() => {
        if (refreshRef.current > 0) {
            setIsOpen(true);
        }
        refreshRef.current++;
    }, [props.forceExpandToken])

    React.useEffect(() => {
        if (refreshRef.current > 0) {
            setIsOpen(false);
        }
        refreshRef.current++;
    }, [props.forceCollapseToken])


    return(
        <>
            <Link replace className={"widget-list-item border-top-d5d5d5 " + (isOpen? " border-bottom-d5d5d5 " : "") + props.parentClassName} to="#" onClick={toggleIsOpen}>
                <div className="widget-list-content d-flex">
                    <b className={"rotating-caret align-self-center " + (isOpen? " expand ": "")} ></b>
                    <div className={"align-self-center m-l-5 " + (props.bold? " font-weight-600 " : "")}>{props.parentText}</div>
                </div>
            </Link>
            <Collapse isOpen={isOpen}>
                {props.children}
            </Collapse>
        </>
    )
}
ExpandableWidgetListItem.defaultProps = {
    parentClassName: "",
    bold: true,
    defaultIsOpen: false
}
