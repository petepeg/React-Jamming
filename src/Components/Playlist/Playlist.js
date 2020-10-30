import React, { Component } from 'react';
import './Playlist.css';
import Tracklist from '../TrackList/TrackList.js';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} placeholder="New Playlist"/>
                <Tracklist tracks={this.props.playlistTracks} isRemoval={true}
                    rmvTrack={this.props.rmvTrack} />
                <a className="Playlist-save" onClick={this.props.onSave}>
                    SAVE TO SPOTIFY
                </a>
            </div>
        );
    }
}

export default Playlist;