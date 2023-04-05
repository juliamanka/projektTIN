import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { getConservatorsApiCall } from '../../apiCalls/ConservatorApiCalls'
import ConservatorListTable from "./ConservatorListTable";
import { useTranslation } from 'react-i18next';



function ConservatorList() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [conservators, setConservators] = useState([])

    const { t } = useTranslation();


    function fetchConservatorList() {
        getConservatorsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setConservators(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchConservatorList()
    }, [])

    let content;

    if (error) {
        content = <p>{t('list.actions.error')} {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('list.actions.loading')}</p>
    } else {
        content = <ConservatorListTable consList={conservators} />
    }

    return (
        <main>
            <h2>{t('cons.list.pageTitle')}</h2>
            { content}
            <p className="section-buttons">
                <Link to="/conservators/add" className="button-add">{t('cons.list.addNew')}</Link>
            </p>
        </main>
    )
}

export default ConservatorList;