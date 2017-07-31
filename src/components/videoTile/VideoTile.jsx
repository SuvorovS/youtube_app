import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './VideoTile.scss';

function VideoTile (props) {
        console.log(props.video)    
        return (
            <div>
                <Link className="videoLink" to={`/youtubeVideo/${props.id}`}>
                    <div className="promo">
                        <img src={props.video.snippet.thumbnails.high.url} alt="photo"/>
                    </div>
                    <div className="meta">
                        title: {props.video.snippet.title}
                    </div>
                </Link>
                
            </div>
        );
    
}

export default VideoTile;