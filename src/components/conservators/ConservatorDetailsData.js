import React from 'react'
import {getFormattedDate} from "../../helpers/DateHelper";
import {useTranslation} from "react-i18next";

function ConservatorDetailsData(props) {
    const cons = props.consData;
    const {t} = useTranslation();
    return (
        <>
            <p>{t('cons.fields.firstName')}: {cons.firstName}</p>
            <p>{t('cons.fields.lastName')}: {cons.lastName}</p>
            <p>{t('cons.fields.date')}: {cons.date}</p>
            <p>{t('cons.fields.email')}: {cons.email}</p>
            <h2>{t('cons.form.artcons')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('arts.fields.title')}</th>
                    <th>{t('artcons.fields.dateFrom')}</th>
                    <th>{t('artcons.fields.dateTo')}</th>
                    <th>{t('artcons.fields.price')}</th>
                    <th>{t('artcons.fields.comment')}</th>
                </tr>
                </thead>
                <tbody>
                {cons.artConservators.map(
                    artCons =>
                    <tr key={artCons.consId}>
                        <td>{artCons.artwork.title}</td>
                        <td>{artCons.dateFrom ? getFormattedDate(artCons.dateFrom) : ""}</td>
                        <td>{artCons.dateTo ? getFormattedDate(artCons.dateTo) : ""}</td>
                        <td>{artCons.price}</td>
                        <td>{artCons.comment}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
)

}

export default ConservatorDetailsData