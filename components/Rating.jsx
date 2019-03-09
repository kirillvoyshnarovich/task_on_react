import React from 'react';
import star_rating from './fonts/icon/star-rating.svg';
import { change_rating, reset_rating  } from '../redux/actions.js';
import { connect } from 'react-redux';

import './Rating.scss';

class Rating extends React.PureComponent {

    constructor(props, context) {
        super(props, context)
        this.state={
            activated:false
        }
    }

    ratingIncrease =()=> {
        if(!this.state.activated) {
            this.setState({activated: true})
            this.props.dispatch(change_rating(this.props.id))
        } else {
            this.setState({activated: false})
            this.props.dispatch(reset_rating(this.props.id))
        }
    }


    render() {
        console.log('render in Rating')
        return(
            <div className={(this.state.activated) ? "gallery-wrapper__info-song--counter-like gallery-wrapper__info-song--counter-like_active" : "gallery-wrapper__info-song--counter-like"}>
                <span className="category-rating" onClick={this.ratingIncrease}>
                    <img className="category__rating" src={star_rating}></img>
                </span>
                {this.props.rating}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return{
    }
}

export default connect(mapStateToProps)(Rating)