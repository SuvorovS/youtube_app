import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { refreshUserLists } from '../../actions/actions';


import './cabinet.scss';

import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';

class Cabinet extends Component {
    constructor(props){
        super(props)
        this.state = {
            styles : {
                headline: {
                    fontSize: 24,
                    paddingTop: 16,
                    marginBottom: 12,
                    fontWeight: 400,
                },
            }
        }
    }


    renderCabinet(){
        return (
            <div className="cabinet">
                <div className="cabinet_aside">

                    <p><Avatar src={this.props.userAvatar} /></p>
                    {/* <p>{this.props.userName}</p> */}
                    <p>this.props.userName</p>
                    {this.props.userListIsRefrating?
                        <CircularProgress size={50} thickness={3} />
                        :
                        <p><button onClick={this.props.refreshUserLists}>обновить списки</button></p>
                    }
                    <p>
                        <button>загрузить новое видео</button> 
                        {/* вывод модального окна */}
                    </p>
                    
                </div>
                <div className="cabinet_main">
                    <Tabs>
                        <Tab label="Item One" >
                            <div>
                                <h2 style={this.state.styles.headline}>Tab One</h2>
                                <p>
                                    This is an example tab.
                                </p>
                                <p>
                                    таблица со списком видео + кнопки удалить/изменить
                                </p>
                                {/* <Slider name="slider0" defaultValue={0.5} /> */}
                            </div>
                        </Tab>
                        <Tab label="Item Two" >
                            <div>
                                <h2 style={this.state.styles.headline}>Tab Two</h2>
                                <p>
                                    таблица со списком видео + кнопки удалить/изменить
                                    This is another example tab.
                                </p>
                            </div>
                        </Tab>
                        <Tab
                            label="onActive"
                            data-route="/home"
                        >
                            <div>
                                <h2 style={this.state.styles.headline}>Tab Three</h2>
                                <p>
                                    таблица со списком видео + кнопки удалить/изменить
                                    This is a third example tab.
                                </p>
                            </div>
                        </Tab>
                    </Tabs>

                    <div className="cabinet_all_Videos">
                        запрос на видео cabinet_user_data</div>
                    <div className="cabinet_all_Playlists">
                        <h3>тут плейлисты</h3>
                        запрос  на плейлисты cabinet_user_data
                    </div>
                    <div className="cabinet_all_Playlists">
                        <h3>тут плейлисты</h3>
                        запрос на что там еще есть? cabinet_user_data
                    </div>
                </div>
            </div>
        );
    }
    render() {
        if(this.props.userName !== ''){
            return this.renderCabinet()
        }
        else {
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default connect(
    state => ({
        userName : state.youtubePage.userName,
        userAvatar: state.youtubePage.userAvatar,
        userListIsRefrating: state.youtubePage.userListIsRefrating,
    }),
    
    dispatch => ({
        refreshUserLists : ()=>{
            dispatch(refreshUserLists());
        },
        
    }),

    

)(Cabinet) 