import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { getArtworkApiCall } from '../../apiCalls/ArtworkApiCalls'
import ArtworkListTable from "./ArtworkListTable";
import {useTranslation} from "react-i18next";


function ArtworkList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [arts, setArts] = useState([])
    const { t } = useTranslation();


    function fetchArtworkList() {
        getArtworkApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setArts(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchArtworkList()
    }, [])

    let content;

    if (error) {
        content = <p>{t('list.actions.error')} {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('list.actions.loading')}</p>
    } else {
        content = <ArtworkListTable artList={arts} />
    }

    return (
        <main>
            <h2>{t('arts.list.pageTitle')}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/artworks/add" className="button-add">{t('arts.list.addNew')}</Link>
            </p>
        </main>
    )
}

export default ArtworkList;