import React, { PropTypes } from 'react'
import YoutubePlayer from 'react-youtube-player';

const Player = React.createClass({
  getInitialState() {
    return {
      player: false,
      playbackState: 'paused'
    };
  },

  activatePlayer(){
    if (this.props.youtubeUrl) {
      this.setState({
        player: true,
        playbackState: 'playing'
      });
    }
  },

  togglePlayback(){
    this.setState({
      playbackState: (this.state.playbackState === 'paused') ? 'playing' : 'paused'
    });
  },

  componentWillReceiveProps(newProps) {
    if ((this.props.albumCover !== newProps.albumCover)
          || (this.props.youtubeUrl !== newProps.youtubeUrl)) {
      this.setState({
        player: false
      });
    }
  },

  render () {
    const albumStyle = {
      backgroundImage: 'url(' + this.props.albumCover + ')',
    };
    let coverOrPlayer;
    if (this.state.player && this.props.youtubeUrl) {
      const videoId = this.props.youtubeUrl.split("v=")[1];
      coverOrPlayer = (
        <div className="player-box">
          <div className="spinner" />
          <div className="player">
            <YoutubePlayer
              key={videoId}
              videoId={videoId}
              playbackState={this.state.playbackState}
              configuration={
                {
                  showinfo: 0,
                  controls: 1,
                }
              }
              />
            <div className="player-overlay" onClick={this.togglePlayback}/>
          </div>
        </div>
      );
    } else {
      coverOrPlayer = (
        <div className="album-cover"
          style={albumStyle}
          onClick={this.activatePlayer}>
          <div className="album-cover-overlay" onClick={this.togglePlayback}/>
        </div>
      );
    }

    return (
      <div class="song-info">
        {coverOrPlayer}
      </div>
    );
  }
})

module.exports = Player;