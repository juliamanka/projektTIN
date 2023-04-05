import { Link } from "react-router-dom"
import {useTranslation} from "react-i18next";
import {isAuthenticated, isAuthenticatedUser} from "../../helpers/authHelper";

function ArtConservatorsListTableRow(props) {
    const artCons = props.artConsData
    const {t}=useTranslation();
    return (
        <tr>
            <td>{artCons.artwork.title}</td>
            <td>{artCons.price}</td>
            <td>{artCons.dateFrom}</td>
            <td>{artCons.dateTo}</td>
            <td>{artCons.comment}</td>
            <td>{artCons.conservator.firstName + " " + artCons.conservator.lastName}</td>
            {isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li><Link to={`/artcons/details/${artCons.artConsId}`}
                                  className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                        <li><Link to={`/artcons/edit/${artCons.artConsId}`}
                                  className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                        <li><Link to={`/artcons/delete/${artCons.artConsId}`}
                                  className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                    </ul>
                </td>
            }
        </tr>
    )
}

export default ArtConservatorsListTableRow