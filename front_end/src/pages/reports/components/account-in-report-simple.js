import React from 'react';
import ReportRow from './report-row';
import { PageSettings } from '../../../config/page-settings';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function AccountInReportSimple({accountName, amounts, accountId, hasChildren, isChild, indentLevel, className, nonNumeric, category}) {
    const appContext = React.useContext(PageSettings)
    const indentClassNames = ["", "indent", "indent-2", "indent-3", "indent-4"]

    return(
        <>
        <div className={"d-none d-md-flex pseudo-tr " + className}>
            <div className={" "  + ((indentLevel && isChild) ? indentClassNames[indentLevel] : "")}></div>
            {isChild
                ? <div className="vertical-line ms-2"></div>
                : null}
            {hasChildren
                ? <ReportRow
                    label={accountName}
                    values={amounts}
                    isCurrency={!nonNumeric}
                    indentLevel={indentLevel}
                    className="border-top-0 w-100"
                />
                : <Link className="w-100" to={category ? `/category-details/${accountId}` : `/account-details/${accountId}`} target="_blank">
                    <ReportRow
                        label={accountName}
                        values={amounts}
                        isCurrency={!nonNumeric}
                        indentLevel={isChild ? 0 : indentLevel}
                        className={"clickable border-top-0 "}
                    />
                </Link>
            }
        </div>
        <div className={"d-md-none d-flex pseudo-tr " + className}>
            {isChild
                ? <div className="vertical-line"></div>
                : null
            }
            <ReportRow
                label={accountName}
                values={amounts}
                isCurrency={!nonNumeric}
                indentLevel={0}
                className={"border-top-0 w-100  " + (isChild ? "ms-n1" : "")}
            />
        </div>
        </>
    )
}

export default AccountInReportSimple;