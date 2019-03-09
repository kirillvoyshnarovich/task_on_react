import React from 'react';

import { NavLink } from 'react-router-dom';

import SelectYear from './SelectYear.jsx'
import './Main.scss'

class Main extends React.PureComponent {

    static propTypes = {

    };

    constructor (props, context) {
        super(props, context)

        this.state = {
            displayList:0,
        }
    }

    changeDisplayList =()=> {

        if(this.state.displayList) {
            this.setState({displayList: 0})
        } else {
            this.setState({displayList: 1})
        }
    }


    render () {
        console.log('render in Main')
        return(
            <main className="conteiner-wrapper main-block">
                <h1 className="main-block__description">
                    <p className="main-block__description-salutation">Hello!</p>
                    Nomination Film Awards Oskor, Best Original Song has existed since 1934
                    On this resource, you can listen, read, vote, for each of these compositions, etc.
                </h1>
                <div className="main-block__controls">
                    <button className="main-block__controls--button" onClick={this.changeDisplayList}>Pick year</button>
                    <NavLink to="/gallery" style={{ textDecoration: 'none' }} className="main-block__controls--button--link" activeClassName="">
                        <button className="main-block__controls--button">
                            Gallery
                        </button>
                    </NavLink>
                    {(this.state.displayList == 1) ? <SelectYear ClasName={"select-type"}/> : <SelectYear ClasName={"select-type_hidden"}/>}
                    
                </div>
                
            </main>
        )
    }
}

export default Main;