import React, {Component} from 'react';
import {connect} from 'react-redux';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import Header from './components/header/Header';
import CustomComponent from './components/CustomComponent/CustomComponent';
import Cabinet from './components/cabinet/Cabinet';

import YoutubeVideo from './components/YoutubeVideo/YoutubeVideo';
import VideoTile from './components/videoTile/VideoTile';


class App extends Component {
    render(){
        return (
            <Router>
                <div>

                    <Header />
                    <Switch>
                        <Route exact path='/' component={CustomComponent} />
                        <Route exact path='/youtubeVideo' component={YoutubeVideo} />
                        <Route path='/youtubeVideo/:videoId' component={YoutubeVideo} />
                        <Route path='/cabinet' component={Cabinet} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;