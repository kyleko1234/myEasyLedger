import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { formatCurrency } from '../../../utils/util-fns';

{}
function ReportRow({label, values, className, indentLevel, isCurrency}) {
    const appContext = React.useContext(PageSettings);

    const indentClassNames = ["", "indent", "indent-2", "indent-3", "indent-4"]
    return(
        <>
            <div className={"pseudo-tr d-none d-md-flex justify-content-between align-items-center " + (className? className : "") + " " + (indentLevel? indentClassNames[indentLevel] : "")}>
                <div className="pseudo-td">
                    {label}
                </div>
                <div className="pseudo-td text-end d-flex">
                    {values 
                        ? values.map((value, i) => {
                            return(
                                <div key={i} className="width-175">
                                    {isCurrency 
                                        ? formatCurrency(appContext.locale, appContext.currency, value)
                                        : value    
                                    }
                                </div>
                            )})
                        : null
                    }
                </div>
            </div>
            <div className={"pseudo-tr d-md-none " + (className? className : "")}>
                <div className="pseudo-td">
                    <div>
                        {label}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {values
                            ? values.map((value, i) => {
                                return(
                                    <div key={i} className="font-size-compact">
                                        {isCurrency
                                            ? formatCurrency(appContext.locale, appContext.currency, value)
                                            : value
                                        }
                                    </div>
                                )
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportRow;