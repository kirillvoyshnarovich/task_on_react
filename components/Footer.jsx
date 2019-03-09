import React from 'react';

import './Footer.scss';

import facebook from './fonts/icon/facebook-footer.svg';
import github from './fonts/icon/github-footer.svg';
import linkedin from './fonts/icon/linkedin-footer.svg';
import telegram from './fonts/icon/telegram-footer.svg';

const Footer = (props) => {
    console.log('render in Footer')
    return (
        <footer className="footer">
            <div className="footer__social-media">
                <span className="social-media-wrapper footer__social-media--facebook"><img className="social-media-icon footer__social-media--facebook--image" src={facebook} alt="facebook icon"></img></span>
                <span className="social-media-wrapper footer__social-media--github"><img className="social-media-icon footer__social-media--github--image" src={github} alt="github icon"></img></span>
                <span className="social-media-wrapper footer__social-media--linkedin"><img className="social-media-icon footer__social-media--linkedin--image" src={linkedin} alt="linkedin icon"></img></span>
                <span className="social-media-wrapper footer__social-media--telegram"><img className="social-media-icon footer__social-media--telegram--image" src={telegram} alt="telegram icon"></img></span>
            </div>
            <div className="footer__copyright">
                ©  2019
            </div>
        </footer>
    )
}

export default Footer;