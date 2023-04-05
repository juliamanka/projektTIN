import ArtConservatorListTableRow from './ArtConservatorsListTableRow'
import {useTranslation} from "react-i18next";

function ArtConservatorListTable(props) {
    const artCons = props.artConsList
    const {t}=useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('arts.fields.title')}</th>
                <th>{t('artcons.fields.price')}</th>
                <th>{t('artcons.fields.dateFrom')}</th>
                <th>{t('artcons.fields.dateTo')}</th>
                <th>{t('artcons.fields.comment')}</th>
                <th>{t('artcons.fields.firstAndLast')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {artCons.map(artCons =>
                <ArtConservatorListTableRow artConsData={artCons} key={artCons.artConsId} />
            )}
            </tbody>
        </table>
    )
}

export default ArtConservatorListTable