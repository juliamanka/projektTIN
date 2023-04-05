import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsArtApiCall } from '../../apiCalls/ConsArtApiCalls'
import ArtConservatorsListTable from './ArtConservatorsListTable'
import {useTranslation} from "react-i18next";

function ArtConservatorList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [artCons, setArtCons] = useState([])
    let content;
    const {t}=useTranslation();

    function fetchArtConsList() {
        getConsArtApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setArtCons(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchArtConsList()
    }, [])

    if (error) {
        content = <p>{t('list.actions.error')} {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('list.actions.loading')}</p>
    } else if (artCons.length === 0) {
        content = <p>Brak zleceń.</p>
    } else {
        content = <ArtConservatorsListTable artConsList={artCons} />
    }

    return (
        <main>
            <h2>{t('artcons.list.pageTitle')}</h2>
            { content }
            <p className="section-buttons">
                <Link to="/artcons/add" className="button-add">{t('artcons.list.addNew')}</Link>
            </p>
        </main>
    )
}

export default ArtConservatorList