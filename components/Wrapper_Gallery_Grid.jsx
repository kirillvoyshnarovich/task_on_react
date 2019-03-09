import React from 'react';

import Item from './Item.jsx';
import Preload from "./Preloder.jsx";
import { cutPages } from '../utilities/utilities.js';

import memoize from 'memoizee';

class Wrapper_Gallery_Grid extends React.PureComponent {

    static propTypes= {

    }

    constructor (props, context) {
        super(props, context)

        

        this.state ={
            list:null,
            mode:2,
            renderСompleted:false
        }
    }

    cuttingPages = memoize(cutPages)

    componentWillMount =()=> {
        let ListPage = this.cuttingPages(this.props.listData)
        this.setState({list: ListPage})
    }



    componentWillReceiveProps =(newProps)=> {

        if(newProps.valueFilter != this.props.valueFilter) {
            let ListPage = this.cuttingPages(newProps.listData)
            this.setState({list:ListPage})
        }

        if(newProps.listData != this.props.listData) {
            let ListPage = this.cuttingPages(newProps.listData)
            this.setState({list:ListPage})
        }
        
    }

    componentDidMount =()=> {
        this.setState({renderСompleted:true})
    }




    render() {
        console.log('render in Wrapper-Gallery-Grid')
        let list
            let indexPage = this.props.numberPage;
            list = this.state.list[indexPage].map((item)=> {
                // return <Item key={item.id_year} id={item.id_year} mode={this.state.mode} nameSong={item.name_song} performers={item.performers} nameFilm={item.name_film} counterLike={item.counter_like} srcImage={item.src_image}></Item>
                return <Item key={item.id_year} mode={2} object={item} ></Item>
        })

        if (!this.state.renderСompleted){
            return <div className="wrapper-spinner">
                        <Preload/>
                    </div>;
          }
            
        return(
            <div className="gallery-wrapper_mode-1">
                { list }
            </div>
        )
    }
}


export default Wrapper_Gallery_Grid;