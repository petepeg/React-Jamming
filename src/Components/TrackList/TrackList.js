import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class Tracklist extends Component {
    render() {
        return(
            <div className="TrackList">
            {
                this.props.tracks.map((track) => {
                    return <Track track={track} key={track.id}
                        onAdd={this.props.onAdd}
                        rmvTrack={this.props.rmvTrack}
                        isRemoval={this.props.isRemoval} />
                })
            }
            </div> 
        );
    }
}

export default Tracklist;