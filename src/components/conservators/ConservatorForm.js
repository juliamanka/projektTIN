import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import FormMode from "../../helpers/FormHelper";
import {addConsApiCall, getConservatorByIdApiCall, updateConsApiCall} from "../../apiCalls/ConservatorApiCalls";
import {checkDate, checkEmail, checkRequired, checkTextLengthRange} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import React from 'react';
import { formValidationKeys } from '../../helpers/formValidation'
import {useTranslation} from "react-i18next";

function ConservatorForm() {
    const { t } = useTranslation();

    const [cons, setCons] = useState({
        'firstName': '',
        'lastName': '',
        'date': '',
        'email': '',
        'password':''
    })
    const [errors, setErrors] = useState({
        'firstName': '',
        'lastName': '',
        'date': '',
        'email': '',
        'password':''

    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { consId } = useParams()
    const currentFormMode = consId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchConservatorDetails() {
        getConservatorByIdApiCall(consId)
            .then(res => res.json())
            .then(
                (data) => {
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
    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchConservatorDetails()
        }
    }, [])

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'firstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage =formValidationKeys.notEmpty
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
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = formValidationKeys.len_5_60;
            } else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }
        }
        if (fieldName === 'date') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.isDate
            }
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
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
        setCons({
            ...cons,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addConsApiCall(cons)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateConsApiCall(consId, cons)
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
        Object.entries(cons).forEach(([key, value]) => {
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
            navigate('/conservators')
        }
    }, [redirect])

    const pageTitle = currentFormMode === FormMode.NEW ? t('cons.form.add.pageTitle') : t('cons.form.edit.pageTitle')
    const errorsSummary = hasErrors() ? 'Formularz zawiera błędy.' : ''
    const fetchError = error ? `Błąd: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message

    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('cons.fields.firstName')}
                    required
                    error={errors.firstName}
                    name='firstName'
                    placeholder={t('cons.fields.firstName')}
                    onChange={handleChange}
                    value={cons.firstName}
                />
                <FormInput
                    type="text"
                    label={t('cons.fields.lastName')}
                    required
                    error={errors.lastName}
                    name='lastName'
                    placeholder={t('cons.fields.lastName')}
                    onChange={handleChange}
                    value={cons.lastName}
                />
                <FormInput
                    type="date"
                    label={t('cons.fields.date')}
                    required
                    error={errors.date}
                    name='date'
                    placeholder={t('cons.fields.date')}
                    onChange={handleChange}
                    value={cons.date}
                />
                <FormInput
                    type="text"
                    label={t('cons.fields.email')}
                    required
                    error={errors.email}
                    name='email'
                    placeholder={t('cons.fields.email')}
                    onChange={handleChange}
                    value={cons.email}
                />
                <FormInput
                    type="password"
                    label={t('auth.password')}
                    required
                    error={errors.password}
                    name='password'
                    placeholder={t('auth.password')}
                    onChange={handleChange}
                    value={cons.password}
                />
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/conservators"
                    />
                </div>
            </form>
        </main >
    )

}

export default ConservatorForm