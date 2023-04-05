import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {changeLanguage} from "i18next";
import {isAuthenticatedUser, isAuthenticated} from "../../helpers/authHelper";

function Navigation(props) {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lng) => {
        console.log(lng)
        i18n.changeLanguage(lng)
    }
    const loginLogoutLink = isAuthenticated() ? <button onClick={props.handleLogout}>{t('auth.logout')}</button> : <button><Link to="/login">{t('form.actions.login')}</Link></button>


    return (
        <nav>
            <div className="btn-group">
            <button type="button" onClick={() => changeLanguage('pl')}>PL</button>
            <button type="button" onClick={() => changeLanguage('en')}>EN</button>
            <ul className='lang'>{loginLogoutLink}</ul>
            </div>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/conservators">{t('nav.conservators')}</Link></li>
                <li><Link to="/artworks">{t('nav.artworks')}</Link></li>
                <li><Link to="/artcons">{t('nav.artcons')}</Link></li>
            </ul>

        </nav>
    )
}

export default Navigation