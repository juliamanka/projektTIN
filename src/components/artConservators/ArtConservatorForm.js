import {Link, useNavigate, useParams} from 'react-router-dom'
import {
    addArtConsApiCall,
    getConsArtApiCall,
    getConsArtByIdApiCall,
    updateArtConsApiCall
} from '../../apiCalls/ConsArtApiCalls'
import { getArtworkApiCall } from '../../apiCalls/ArtworkApiCalls'
import FormMode from '../../helpers/FormHelper'
import React, {useEffect, useState} from "react";
import { checkRequired, checkTextLengthRange, checkEmail, checkDate, checkNumber} from '../../helpers/validationCommon'
import FormButtons from "../form/FormButtons";
import FormInput from "../form/FormInput";
import {useTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formValidation";
import {getConservatorsApiCall} from "../../apiCalls/ConservatorApiCalls";

function ArtConservatorForm() {

    const {t}=useTranslation();

    const { artConsId }=useParams();

    const [cons, setCons] = useState([])
    const [arts, setArts] = useState([])
    const[consId,setConsId]=useState([])
    const [artsId,setArtsId]=useState([])

    const [artCons, setArtCons] = useState({
        "consId": '',
        "artId": '',
        "price": '',
        "dateFrom": '',
        "dateTo": '',
        "comment": ''
    })
    const [errors, setErrors] = useState({
        "consId": '',
        "artId": '',
        "price": '',
        "dateFrom": '',
        "dateTo": '',
        "comment": ''
    })
    const [error, setError] = useState(null)

    const [isLoaded, setIsLoaded] = useState(false)

    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const currentFormMode = artConsId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchArtConsDetails() {
        getConsArtByIdApiCall(artConsId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
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
                })
    }

    function fetchCons(){
        getConservatorsApiCall()
            .then(res=> res.json())
            .then((data) => {
                if (data.message) {
                    setMessage(data.message)
                } else {
                    setCons(data)
                    setMessage(null)
                }
                setIsLoaded(true)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            })
    }
    function fetchArts(){
        getArtworkApiCall()
            .then(res=> res.json())
            .then((data) => {
                if (data.message) {
                    setMessage(data.message)
                } else {
                    setArts(data)
                    setMessage(null)
                }
                setIsLoaded(true)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            })

    }

    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchArtConsDetails()
        }
        fetchCons();
        fetchArts();

    }, [])

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'firstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'lastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'dateFrom') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isDate
            }
        }
        if (fieldName === 'price') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber
            }
        }

            if (fieldName === 'comment') {
                if (!checkRequired(fieldValue)) {
                    errorMessage = formValidationKeys.notEmpty
                } else if (!checkTextLengthRange(fieldValue, 10, 150)) {
                    errorMessage = formValidationKeys.len_10_150
                }
            }
        return errorMessage;
    }

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setArtCons({
            ...artCons,
            [name]: value
        })

    }

    function handleSubmit(event) {
        artCons.consId = parseInt(artCons.consId);
        artCons.artId = parseInt(artCons.artId);
        if(artCons.dateTo===""){
            artCons.dateTo=null;
        }
        console.log(currentFormMode);
        console.log(artCons);
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addArtConsApiCall(artCons)
                console.log(promise)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateArtConsApiCall(artConsId, artCons)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }
    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        if(name === 'consId'){
            setConsId(value);
        }else {
            setArtsId(value);
        }
    }
    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(artCons).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                return true
            }
        })
        return false
    }
    useEffect(() => {
        if (redirect) {
            navigate('/artcons')
        }
    }, [redirect])

    const pageTitle = currentFormMode === FormMode.NEW ? t('artcons.form.add.pageTitle') : t('artcons.form.edit.pageTitle')
    const errorsSummary = hasErrors() ? t('validation.messages.formErrors') : ''
    const fetchError = error ? t('list.actions.error') + error.message : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="consId">:{t('artcons.fields.firstAndLast')}<abbr title="required" aria-label="required">*</abbr></label>
                <select id="consId" name="consId" required onChange={handleChange}>
                    <option value="">{ t('artcons.form.choose.chooseConservator') }</option>
                    {cons.map(con =>
                        (<option key={con.consId} value={con.consId} label={con.firstName + " " + con.lastName} selected={artCons.consId === con.consId} ></option>)
                    )}
                </select>
                <span id="errorConservator" className="errors-text"></span>

                <label htmlFor="artId">:{t('arts.fields.title')}<abbr title="required" aria-label="required">*</abbr></label>
                <select id="artId" name="artId" required onChange={handleChange}>
                    <option value="">{ t('artcons.form.choose.chooseArtwork') }</option>
                    {arts.map(art =>
                        (<option key={art.artId} value={art.artId} label={art.title} selected={artCons.artId === art.artId} ></option>)
                    )}
                </select>
                <span id="errorArtwork" className="errors-text"></span>
                {/*<label htmlFor='consId'>{ t('artcons.fields.firstAndLast') }:</label>*/}
                {/*{!artConsId && <select name='consId' onChange={handleSelectChange} >*/}
                {/*    <option value="">{ t('artcons.form.choose.chooseConservator') }</option>*/}
                {/*    {*/}
                {/*        cons.map(user => (*/}
                {/*            <option key={user.consId} value={user.consId}>{user.firstName} {user.lastName}</option>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</select>}*/}
                {/*{*/}
                {/*    artConsId && <select name='user_id' onChange={handleSelectChange} className={''}>*/}
                {/*        <option value={cons.find(x => x.artConsId === artCons.consId)?.artConsId}>{cons.find(x => x.id === artCons.consId)?.firstName} {cons.find(x => x.id === artCons.consId)?.lastName}</option>*/}
                {/*        {*/}
                {/*            cons.filter(x => x.id !== artCons.consId).map(user => (*/}
                {/*                <option key={user.consId} value={user.consId}>{user.firstName} {user.lastName}</option>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </select>*/}
                {/*}*/}
                {/*<span id='errorConservator' className='errors-text'>{''}</span>*/}
                {/*<label htmlFor="consId">{t('artcons.fields.firstAndLast')} <abbr title="required" aria-label="required">*</abbr></label>*/}
                {/*<select value={cons.consId} onChange={handleChange} required>*/}
                {/*    <option value="">{t('artcons.form.choose.chooseConservator')}</option>*/}
                {/*    {*/}
                {/*        cons.map(con => (*/}
                {/*            <option key={con.consId} value={con.consId}>{con.firstName} {con.lastName}</option>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</select>*/}
                {/*<span id="errorConservator" className="errors-text"></span>*/}

                {/*<label htmlFor="artId">{t('arts.fields.title')} <abbr title="required" aria-label="required">*</abbr></label>*/}
                {/*<select value={arts.artId} onChange={handleChange} required>*/}
                {/*    <option value="">{t('artcons.form.choose.chooseArtwork')}</option>*/}
                {/*    {*/}
                {/*        arts.map(art => (*/}
                {/*            <option key={art.artId} value={art.artId}>{art.title}</option>*/}
                {/*        ))*/}
                {/*    }*/}

                {/*</select>*/}
                {/*<span id="errorArtwork" className="errors-text"></span>*/}

                <FormInput
                    type="number"
                    label={t('artcons.fields.price')}
                    required
                    error={errors.price}
                    name='price'
                    placeholder={t('artcons.fields.price')}
                    onChange={handleChange}
                    value={artCons.price}
                />
                <FormInput
                    type="date"
                    label={t('artcons.fields.dateFrom')}
                    required
                    error={errors.dateFrom}
                    name='dateFrom'
                    placeholder={t('artcons.fields.dateFrom')}
                    onChange={handleChange}
                    value={artCons.dateFrom}
                />
                <FormInput
                    type="date"
                    label={t('artcons.fields.dateTo')}
                    error={errors.dateTo}
                    name='dateTo'
                    placeholder={t('artcons.fields.dateTo')}
                    onChange={handleChange}
                    value={artCons.dateTo}
                />
                <FormInput
                    type="text"
                    label={t('artcons.fields.comment')}
                    required
                    error={errors.comment}
                    name='comment'
                    placeholder={t('artcons.fields.comment')}
                    onChange={handleChange}
                    value={artCons.comment}
                />
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/artcons"
                    />
                </div>
            </form>
        </main>
    )
}

export default ArtConservatorForm