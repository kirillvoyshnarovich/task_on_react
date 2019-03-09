import React from 'react';
import Fragment from './Fragment.jsx'

import './Header.scss';
import logo from './image/logo.png';
import search_icon from './fonts/icon/Header_component/search.svg'

class Header extends React.PureComponent {

    static propTypes = {

    };


    render () {
        console.log('render in Header')
        return (
            <Fragment>
                <header className="header">
                    <div className="conteiner-wrapper header-wrapper">
                        <div className="header__logo">
                            <img className="header__logo--image" src={logo}></img>
                            <span className="header__logo--text">LOGO</span>
                        </div>
                        <div className="header-controls">
                            <div className="header__search-wrapper">
                                <input type="search" id="header-search" className="header__search-wrapper--search-input" name="header-search"></input>
                                <img src={search_icon} className="header__search-wrapper--search-button"></img>
                            </div>
                            <div className="header__log">
                                Log in
                            </div>
                        </div>
                    </div>
                </header>
            </Fragment>
        )
    }
}

export default Header;