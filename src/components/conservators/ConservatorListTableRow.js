import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/DateHelper";
import {useTranslation} from "react-i18next";
import {isAuthenticatedUser, isAuthenticatedAdmin, isAuthenticated} from '../../helpers/authHelper'
import {deleteConsApiCall} from "../../apiCalls/ConservatorApiCalls";

function ConservatorListTableRow(props){
    const cons=props.consData
    const {t}=useTranslation();
    return (
        <tr>
            <td>{cons.firstName}</td>
            <td>{cons.lastName}</td>
            <td>{cons.date}</td>
            <td>{cons.email}</td>
            {isAuthenticated() &&

                <td>
                    <ul className="listActions">
                        <li><Link to={`/conservators/details/${cons.consId}`}
                                  className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`/conservators/edit/${cons.consId}`}
                                  className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        {isAuthenticatedAdmin() &&
                            <li><Link to={`/conservators/delete/${cons.consId}`}
                                      className="list-actions-button-delete" onClick={() => {
                                deleteConsApiCall(cons.consId)
                                window.location.reload();
                            }
                            }>{t('list.actions.delete')}</Link></li>
                        }
                    </ul>
                </td>
            }
        </tr>
    )
}
export default ConservatorListTableRow