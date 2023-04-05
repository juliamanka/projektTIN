import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getConservatorByIdApiCall} from '../../apiCalls/ConservatorApiCalls'
import {getFormattedDate} from '../../helpers/DateHelper'
import ConservatorDetailsData from "./ConservatorDetailsData";
import {useTranslation} from "react-i18next";

function ConservatorDetails() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [conservator, setConservator] = useState([])
    const [message, setMessage] = useState(false);
    const {consId} = useParams();

    const { t } = useTranslation();


    function fetchConservatorDetails() {
        getConservatorByIdApiCall(consId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setConservator(null)
                        setMessage(data.message)
                    } else {
                        setConservator(data)
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
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>Ładowanie danych kosnerwatorów ...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <ConservatorDetailsData consData={conservator} />
    }
    return (
        <main>
            <h2>{t('cons.details.pageTitle')}</h2>
            {content}
            <div className="details-buttons">
                <Link to="/conservators" className="details-buttons-return">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
}
export default ConservatorDetails
