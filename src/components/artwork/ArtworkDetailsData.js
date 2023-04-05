import React from 'react'
import {getFormattedDate} from "../../helpers/DateHelper";
import {useTranslation} from "react-i18next";

function ArtworkDetailsData(props) {
    const art = props.artData;
    const {t} = useTranslation();
    return (
       <>
            <p>{t('arts.fields.title')}: {art.title}</p>
            <p>{t('arts.fields.price')}: {art.price} </p>
            <p>{t('arts.fields.type')}: {art.type}</p>
            <p>{t('arts.fields.dimensions')}: {art.dimensions} </p>
            <h2>{t('arts.form.artcons')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('cons.fields.firstName')}</th>
                    <th>{t('cons.fields.lastName')}</th>
                    <th>{t('artcons.fields.dateFrom')}</th>
                    <th>{t('artcons.fields.dateTo')}</th>
                    <th>{t('artcons.fields.price')}</th>
                </tr>
                </thead>
                <tbody>
                {art.artConservators.map(
                    artCons =>
                        <tr key={artCons.artConsId}>
                            <td>{artCons.conservator.firstName}</td>
                            <td>{artCons.conservator.lastName}</td>
                            <td>{artCons.dateFrom}</td>
                            <td>{artCons.dateTo}</td>
                            <td>{artCons.price}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )

}

export default ArtworkDetailsData