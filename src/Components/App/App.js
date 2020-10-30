import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import Playlist from '../Playlist/Playlist.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../../util/Spotify.js';
Spotify.getAccessToken();
class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
    };
  }
  addTrack(track) {
    let inList = false;
    this.state.playlistTracks.forEach( i => {
      if(i.id === track.id) {
        inList = true;
      }
    });
    if(!inList) {
      this.setState(prevState => ({ playlistTracks: [...prevState.playlistTracks, track]}));
    };
  }
  removeTrack(track) {
    this.setState((prevState) => ({
      playlistTracks: prevState.playlistTracks.filter(i => i.id !== track.id)
    }));
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(i => {
      trackURIs.push(i.uri);
    });
    //console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName,trackURIs);
    this.setState({playlistName: ''});
    this.setState({playlistTracks: [] });
  }
  search(term) {
    Spotify.search(term).then(
      track => {
        this.setState({searchResults: track})
      }
    );
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              rmvTrack={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
