import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import FormMode from "../../helpers/FormHelper";
import {getArtworkByIdApiCall, addArtApiCall, updateArtApiCall} from "../../apiCalls/ArtworkApiCalls";
import {
    checkEmail,
    checkRequired,
    checkNumber,
    checkDimensions,
    checkTextLengthRange
} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import React from 'react';
import {useTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formValidation";

function ArtworkForm() {
    const {t}=useTranslation();
    const [art, setArt] = useState({
        'title': '',
        'price': '',
        'type': '',
        'dimensions': ''
    })
    const [errors, setErrors] = useState({
        'title': '',
        'price': '',
        'type': '',
        'dimensions': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { artId } = useParams()
    const currentFormMode = artId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchConservatorDetails() {
        getArtworkByIdApiCall(artId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
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
                })
    }
    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchConservatorDetails()
        }
    }, [])

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'title') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'price') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber
            }
        }
        if (fieldName === 'type') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = formValidationKeys.len_5_60
            }
        }
        if (fieldName === 'dimensions') {
            if (!checkRequired(fieldValue)) {
                errorMessage =formValidationKeys.notEmpty
            } else if (!checkDimensions(fieldValue)) {
                errorMessage = formValidationKeys.isDimensions
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
        setArt({
            ...art,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addArtApiCall(art)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateArtApiCall(artId, art)
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

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(art).forEach(([key, value]) => {
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
            navigate('/artworks')
        }
    }, [redirect])

    const pageTitle = currentFormMode === FormMode.NEW ? t('arts.form.add.pageTitle'): t('arts.form.edit.pageTitle')
    const errorsSummary = hasErrors() ? 'Formularz zawiera błędy.' : ''
    const fetchError = error ? `Błąd: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
        return(
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('arts.fields.title')}
                    required
                    error={errors.title}
                    name='title'
                    placeholder={t('arts.fields.title')}
                    onChange={handleChange}
                    value={art.title}
                />
                <FormInput
                    type="number"
                    label={t('arts.fields.price')}
                    required
                    error={errors.price}
                    name='price'
                    placeholder={t('arts.fields.price')}
                    onChange={handleChange}
                    value={art.price}
                />
                <FormInput
                type="text"
                label={t('arts.fields.type')}
                required
                error={errors.type}
                name='type'
                placeholder={t('arts.fields.type')}
                onChange={handleChange}
                value={art.type}
            />
                <FormInput
                type="text"
                label={t('arts.fields.dimensions')}
                required
                error={errors.dimensions}
                name='dimensions'
                placeholder={t('arts.fields.dimensions')}
                onChange={handleChange}
                value={art.dimensions}
            />
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/artworks"
                    />
                </div>
            </form>
        </main >
    )

}

export default ArtworkForm