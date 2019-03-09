import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './SelectYear.scss'

class SelectYear extends React.PureComponent {

    static propTypes={
        data:PropTypes.array
    }

    constructor (props, context) {
        super(props, context)
        this.state = {
            list:null,
        }
    }

    componentWillMount =()=> {
        if(this.state.list == null) {
            let listYear = this.props.data.map((item)=> {
                return <NavLink key={item.id_year} to={"/info-song/"+(item.id_year)}  style={{ textDecoration: 'none' }} className="select-type--item" activeClassName="">
                            {item.id_year}
                        </NavLink>
            })
            this.setState({list:listYear})
        }
    }

    render () {
        console.log('render in SelectYear')
        return(
            <div className={this.props.ClasName}>
                {this.state.list}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return{
        data:state.data,
    }
}

export default connect(mapStateToProps)(SelectYear)