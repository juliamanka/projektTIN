import { getFormattedDate } from '../../helpers/DateHelper';
import React from "react";
import {useTranslation} from "react-i18next";

function ArtConservatorDetailsData(props) {
    const artCons = props.artConsData
    const dateFrom = artCons.dateFrom ? getFormattedDate(artCons.dateFrom) : ""
    const dateTo = artCons.dateTo ? getFormattedDate(artCons.dateTo) : ""
    const {t} = useTranslation();
    return (
        <>
            <p>{t('cons.fields.firstName')}: {artCons.conservator.firstName}</p>
            <p>{t('cons.fields.lastName')}: {artCons.conservator.lastName} </p>
            <p>{t('artcons.fields.dateFrom')}: {dateFrom} </p>
            {dateTo && <p>{t('artcons.fields.dateTo')}: {dateTo} </p>}
            <p>{t('artcons.fields.price')}: {artCons.price} </p>
            <p>{t('artcons.fields.comment')}: {artCons.comment}</p>
            <h2>{t('artcons.form.arts')}</h2>

            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('arts.fields.title')}</th>
                    <th>{t('arts.fields.dimensions')}</th>
                    <th>{t('arts.fields.type')}</th>
                    <th>{t('arts.fields.price')}</th>
                </tr>
                </thead>
                <tbody>

                        <tr key={artCons.artId}>
                            <td>{artCons.artwork.title}</td>
                            <td>{artCons.artwork.dimensions}</td>
                            <td>{artCons.artwork.type}</td>
                            <td>{artCons.artwork.price}</td>
                        </tr>

                </tbody>
            </table>
        </>
    )
}

export default ArtConservatorDetailsData