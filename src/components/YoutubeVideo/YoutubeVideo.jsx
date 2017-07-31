import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import { connect } from 'react-redux';
function YoutubeVideo(props) {
    const videoId = +props.match.params.videoId;
    const video = props.videos[videoId];//.filter((video, index)=>{return video === props.match.params.id});
    return (
                <div>
                      {
                        video !== undefined?  
                          <iframe src={`http://www.youtube.com/embed/${video.id.videoId}`}/>  
                          : 'видео не найдено'   
                     } 
                </div>
        );
}

export default connect (
    state => ({
        videos : state.youtubePage.data,
    })
)(YoutubeVideo);