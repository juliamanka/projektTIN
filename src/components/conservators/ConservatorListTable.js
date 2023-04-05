import React from 'react';
import ConservatorListTableRow from './ConservatorListTableRow'
import {useTranslation} from "react-i18next";

function ConservatorListTable(props) {
    const conservators = props.consList
    const {t}=useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('cons.fields.firstName')}</th>
                <th>{t('cons.fields.lastName')}</th>
                <th>{t('cons.fields.date')}</th>
                <th>{t('cons.fields.email')}</th>
                <th>{t('list.actions.title')}</th>
            </tr>
            </thead>
            <tbody>
                {conservators.map( cons =>
                    <ConservatorListTableRow consData={cons} key={cons.consId} />
                )}
            </tbody>
        </table>
    )
}
export default ConservatorListTable