import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from './Item.jsx';
import Preload from "./Preloder.jsx";
import { filterList } from '../utilities/utilities.js'
import Fragment from './Fragment.jsx';

import memoize from 'memoizee';

class Wrapper_Gallery extends React.PureComponent {

    static propTypes= {

    }

    constructor (props, context) {
        super(props, context)

        this.state ={
            list:null,
            renderСompleted:false
        }
    }

    componentWillMount =()=> {
        let newlist = this.memoListItem(this.props.listData);
        this.setState({list: newlist})
    }

    listItem =(list)=> {
        let newlist;
        newlist = list.map((item, index)=> {
            return <Item key={item.id_year} mode={1} object={item} ></Item>
        })
        return newlist
    }

    memoListItem = memoize(this.listItem)

    componentWillReceiveProps =(newProps)=> {
        if(newProps.listData != this.props.listData) {
            let newlist = this.memoListItem(newProps.listData);
            this.setState({list:newlist})
        }
    }

    componentDidMount =()=> {
        this.setState({renderСompleted:true})
    }


    render() {

        if (!this.state.renderСompleted){
            return <div className="wrapper-spinner">
                        <Preload/>
                    </div>;
        }


        return(
            <Fragment>
                <div className="gallery-wrapper">{ this.state.list }</div>
            </Fragment>
        )
    }
}


export default Wrapper_Gallery;