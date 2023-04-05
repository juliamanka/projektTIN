import { Link } from 'react-router-dom';
import FormMode from '../../helpers/FormHelper'
import {useTranslation} from "react-i18next";

function FormButtons(props) {

    const { t } = useTranslation();
    let submitButtonLabel = props.formMode === FormMode.NEW ? t('form.actions.add') : t('form.actions.edit')

    if(!props.formMode){
        submitButtonLabel = props.submitButtonLabel
    }

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default FormButtons