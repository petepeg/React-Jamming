const clientID = '9069a4bcd5b14ceebc7db04a6284526c';
const redirect = 'http://localhost:3000/';
const reToken = /access_token=([^&]*)/;
const reExpiresIn = /expires_in=([^&]*)/;
let accessToken = '';
let expiresIn = '';
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else if (reToken.test(window.location.href)) {
            accessToken = window.location.href.match(reToken)[1];
            expiresIn = window.location.href.match(reExpiresIn)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect}`;
        }
    },
    search(term) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then(response => { return response.json(); }
        ).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                });
            } else {
                return [];
            }
        });
    },
    savePlaylist(playlistName, tracks) {
        if (!playlistName || !tracks) {
            return
        } else { 
            fetch('https://api.spotify.com/v1/me',
                { headers: { Authorization: `Bearer ${accessToken}` } }
            ).then(response => response.json().then(data => ({
                id: data.id
            })
            )).then(res => {
                fetch(`https://api.spotify.com/v1/users/${res.id}/playlists`, {
                method: 'POST',
                body: JSON.stringify({ name: playlistName }),
                headers: {Authorization: `Bearer ${accessToken}`,
                "Content-Type":"application/json"} 
            }).then(response => response.json().then(data => ({
                name: data.name,
                owner: data.owner.id,
                id: data.id
            })
            )).then(res2 => {
             console.log(res2.owner, res2.id, tracks);
             fetch(`https://api.spotify.com/v1/users/${res2.owner}/playlists/${res2.id}/tracks`, {
                    method: 'POST',
                    body: JSON.stringify({ uris: tracks }),
                    headers: {Authorization: `Bearer ${accessToken}`,
                    "Content-Type":"application/json"}
                })
            } ) } );
        }
    }
};

export default Spotify;