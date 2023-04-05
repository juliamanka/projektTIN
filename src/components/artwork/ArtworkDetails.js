import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getArtworkByIdApiCall} from '../../apiCalls/ArtworkApiCalls'
import ArtworkDetailsData from "./ArtworkDetailsData";
import {useTranslation} from "react-i18next";

function ArtworkDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [art, setArt] = useState([])
    const [message, setMessage] = useState(false);
    const {artId} = useParams();

    const {t} = useTranslation();

    function fetchConservatorDetails() {
        getArtworkByIdApiCall(artId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setArt(null)
                        setMessage(data.message)
                    } else {
                        setArt(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchConservatorDetails()
    }, [])

    let content;

    if (error) {
        content = <p>{t('list.actions.error')} {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('list.actions.loading')}</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <ArtworkDetailsData artData={art} />
    }
    return (
        <main>
            <h2>{t('arts.details.pageTitle')}</h2>
            {content}
            <div className="details-buttons">
                <Link to="/artworks" className="details-buttons-return">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
}
export default ArtworkDetails
