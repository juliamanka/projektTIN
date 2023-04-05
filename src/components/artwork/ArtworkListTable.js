import React from 'react';
import ArtworkListTableRow from './ArtworkListTableRow'
import {useTranslation} from "react-i18next";

function ConservatorListTable(props) {
    const arts = props.artList
    const {t}=useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('arts.fields.title')}</th>
                <th>{t('arts.fields.price')}</th>
                <th>{t('arts.fields.type')}</th>
                <th>{t('arts.fields.dimensions')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
            {arts.map( arts =>
                <ArtworkListTableRow artData={arts} key={arts.artId} />
            )}
            </tbody>
        </table>
    )
}
export default ConservatorListTable