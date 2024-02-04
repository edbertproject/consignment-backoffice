import './style.less'
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const WuiFooter: React.FC<any> = () => {
    const { t } = useTranslation();

    return (
        <footer className="main-footer">
            <div className="copyright">
                © PT. WAVE CONSULTING INDONESIA 2021 Made with <img className="icon" src={'/images/heart.gif'} alt={'heart'}/> by Wave
            </div>
            <ul className="links">
                <li className="item">
                    <Link to={'/'}>{ t('auth.footer.links.license') }</Link>
                </li>
                <li className="item">
                    <Link to={'/'}>{ t('auth.footer.links.log') }</Link>
                </li>
                <li className="item">
                    <Link to={'/'}>{ t('auth.footer.links.help') }</Link>
                </li>
            </ul>
        </footer>
    )
}

export default WuiFooter

