import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getConsArtByIdApiCall } from '../../apiCalls/ConsArtApiCalls'
import ArtConservatorDetailsData from './ArtConservatorDetailsData'
import {useTranslation} from "react-i18next";

function ArtConservatorDetails() {
    const [artCons, setArtCons] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)
    const {t}=useTranslation();

    let { artConsId } = useParams()
    artConsId = parseInt(artConsId)

    function fetchArtConsDetails() {
        getConsArtByIdApiCall(artConsId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setArtCons(null)
                        setMessage(data.message)
                    } else {
                        setArtCons(data)
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
        fetchArtConsDetails()
    }, [])

    let content
    if (error) {
        content = <p>{t('list.actions.error')} {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('list.actions.loading')}</p>
    } else {
        content = <ArtConservatorDetailsData artConsData={artCons} />
    }

    return (
        <main>
            <h2>{t('artcons.details.pageTitle')}</h2>
            { content }
            <div className="details-buttons">
                <Link to="/artcons" className="details-buttons-return">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
}

export default ArtConservatorDetails