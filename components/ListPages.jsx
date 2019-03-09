import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


import { numberPages } from '../utilities/utilities.js'

import './ListPages.scss'

class ListPages extends React.PureComponent{

    static propTypes = {

    }

    constructor (props, context) {
        super(props, context)
        let list=[];
        let quantity = numberPages(this.props.data);

        for(let i=0; i< quantity; i++) {
            list.push(<NavLink className="link" to={"/gallery/"+(i+1)} key={i} style={{ textDecoration: 'none' }} activeClassName="active-link">
                            <span className="pageList__page" onClick={this.changeCurrentPage}>{i+1}</span>
                       </NavLink>) 
        }
        
        this.state ={
            listPage: list,
        }
    }

    render() {
        console.log('render in ListPage')
        return(
            <div className="pageList">{this.state.listPage}</div>
        )
    }
}

const mapStateToProps = function(state) {
    return{
        data:state.data,
    }
}

export default connect(mapStateToProps)(ListPages)
