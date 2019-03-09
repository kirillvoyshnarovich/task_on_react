import React from 'react';
import PropTypes from 'prop-types';
import Fragment from './Fragment.jsx';

import { connect } from 'react-redux';

import { filterList } from '../utilities/utilities.js'

import ListPages from './ListPages.jsx'
import Wrapper_Gallery from './Wrapper_Gallery.jsx'
import Wrapper_Gallery_Grid from './Wrapper_Gallery_Grid.jsx'

import memoize from 'memoizee';

import './Gallery.scss'
import './controls.scss'

class Gallery extends React.PureComponent {
    static propTypes={
        data:PropTypes.array
    }

    constructor (props, context) {
        super(props, context)

        this.state = {
            list:this.props.data,
            mode:1,
            checkboxGrid:false,
            checkboxFilter:false,
            activeItem:this.props.infoPlayer
        }
    }

    filterData = memoize(filterList);

    componentDidMount =()=> {

        let page = parseFloat(this.props.match.params.number)

        if(this.props.mode == undefined && page) {
            this.setState({mode:2, checkboxGrid:true, list:this.props.data})
        }
        if(this.props.data.length) {
            this.setState({list:this.props.data})
        }
    }

    changeCheckBoxGrid =()=> {
        if(this.state.checkboxGrid) {
            this.setState({checkboxGrid: false, mode:1})
            this.props.match.params.number = undefined
        } else {
            this.setState({checkboxGrid: true, mode:2})
            this.props.match.params.number = 1
        }
    }

    changeCheckBoxFilter =()=> {
        if(this.state.checkboxFilter) {
            this.setState({checkboxFilter: false, list:this.props.data})

        } else {
            let newList = this.filterData(this.props.data)
            this.setState({checkboxFilter: true, list:newList})
        }
    }

    componentWillReceiveProps =(newProps)=> {
        let page = parseFloat(newProps.match.params.number)
        if(this.props.mode == undefined && page) {
            this.setState({mode:2, checkboxGrid:true, list:newProps.data})
        }
        if(newProps.data.length) {
            this.setState({list:newProps.data})
        }

        if(newProps.data != this.state.list) {
            if(this.state.checkboxFilter) {
                let newList = this.filterData(newProps.data)
                this.setState({list:newList})
            } else {
                this.setState({list:newProps.data})
            } 
        }
 
    }

    render() {
        console.log('render in Gallery')
        let indexPage = (this.props.match.params.number == undefined) ? 0 : (this.props.match.params.number - 1) ;

        return(
            <Fragment>
                <main className="conteiner-wrapper">
                    <div className="controls">
                        <p className="controls__wrapper">
                            <input className="controls__grid" type="checkbox" checked={this.state.checkboxGrid} id="test1" ref={(ref) => {this.linkElementGrig = ref}} onChange={this.changeCheckBoxGrid}/>
                            <label htmlFor="test1">display grid</label>
                        </p>
                        <p className="controls__wrapper">
                            <input className="controls__grid" type="checkbox" checked={this.state.checkboxFilter} id="test2" ref={(ref) => {this.linkElementFilter = ref}} onChange={this.changeCheckBoxFilter}/>
                            <label htmlFor="test2">filter by rating</label>
                        </p>
                    </div>
                    {(this.state.mode == 1) ? <Wrapper_Gallery listData={this.state.list} valueFilter={this.state.checkboxFilter}/> : <Wrapper_Gallery_Grid  listData={this.state.list} numberPage={indexPage} valueFilter={this.state.checkboxFilter}/>}

                    {(this.state.mode != 1) ? <ListPages numberPage={indexPage}/> : null}  
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = function(state) {

    return{
        data:state.data,
        infoPlayer: state.playSong
    }
}

export default connect(mapStateToProps)(Gallery)