import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props) {
        super(props);
        //this.addTrack = this.addTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    renderAction(isRemoval){
        let trackAction = (isRemoval) ? '-':'+';
        return trackAction;
    }
    /*addTrack() {
        this.props.onAdd(this.props.track);
    }*/
    handleClick() {
        if(this.props.isRemoval){
            this.props.rmvTrack(this.props.track);
        } else {
            this.props.onAdd(this.props.track);
        }
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action" onClick={this.handleClick}>
                 {this.renderAction(this.props.isRemoval)} 
                </a>
            </div>
        );
    }
}

export default Track;