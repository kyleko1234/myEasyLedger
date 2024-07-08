import React from 'react';
import { useHistory } from 'react-router-dom';
import ReportRow from './report-row';
import { PageSettings } from '../../../config/page-settings';
import { formatCurrency } from '../../../utils/util-fns';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function AccountInReport({accountName, amounts, accountId, hasChildren, isChild, indentLevel}) {
    const appContext = React.useContext(PageSettings)
    const indentClassNames = ["", "indent", "indent-2", "indent-3", "indent-4"]

    return(
        <>
        <div className="d-none d-md-flex pseudo-tr ">
            <div className={"vertical-line "  + (indentLevel? indentClassNames[indentLevel] : "")}></div>
            {isChild
                ? <div className="vertical-line ms-2"></div>
                : null}
            {hasChildren
                ? <ReportRow
                    label={accountName}
                    values={amounts}
                    isCurrency
                    indentLevel={0}
                    className="border-top-0 w-100"
                />
                : <Link className="w-100" to={`/account-details/${accountId}`}>
                    <ReportRow
                        label={accountName}
                        values={amounts}
                        isCurrency
                        indentLevel={0}
                        className="clickable text-primary border-top-0"
                    />
                </Link>
            }
        </div>
        <div className="d-md-none d-flex pseudo-tr">
            <div className="vertical-line"></div>
            {isChild
                ? <div className="vertical-line ms-1"></div>
                : null
            }
            <ReportRow
                label={accountName}
                values={amounts}
                isCurrency
                indentLevel={0}
                className={"border-top-0 w-100  " + (isChild ? "ms-n2" : "ms-n1")}
            />
        </div>
        </>
    )
}

export default AccountInReport;