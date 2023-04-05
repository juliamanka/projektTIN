import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {isAuthenticated, isAuthenticatedUser} from "../../helpers/authHelper";

function ArtWorkListTableRow(props){
    const arts=props.artData
    const {t}=useTranslation();
    return (
        <tr>
            <td>{arts.title}</td>
            <td>{arts.price}</td>
            <td>{arts.type}</td>
            <td>{arts.dimensions}</td>
            {isAuthenticated() &&
                <td>

                    <ul className="listActions">
                        <li><Link to={`/artworks/details/${arts.artId}`}
                                  className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`/artworks/edit/${arts.artId}`}
                                  className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><Link to={`/artworks/delete/${arts.artId}`}
                                  className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            }
        </tr>
    )
}
export default ArtWorkListTableRow