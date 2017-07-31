import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading, youtubeAuthOut, youtubeAuthIn, youtubeSearchVideo, test } from '../../actions/actions';
import { STORE } from '../../store/store'; // импорт стора, чтоб вызвать dispatch внутри класса реaкт компонентa

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import VideoTile from '../videoTile/VideoTile';
import CircularProgress from 'material-ui/CircularProgress';







import './style.scss';

class CustomComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : 'mom',
            searchQuantity : '2',
        }
    }
    componentDidMount() {
        this.props.login();
    }
    
   
    youtubeSearchVideoTEST(e){ // временная функция, пока не доработаю #1, см. mapDispatchToProps
        e.preventDefault();
        // STORE.dispatch(youtubeSearchVideo(this.state.searchText, this.state.searchQuantity)); //еще один способ вызов action
        this.props.youtubeSearchVideo(this.state.searchText, this.state.searchQuantity);
    }

    handleSearchText(e){ // обработчик поля поиска в локальный стейт
        this.setState({
            searchText : e.target.value,
        })
    }
    handleSearchQuantity(e){ // обработчик селекта количестка видео в запросе в локальный стейт
        this.setState({
            searchQuantity : e.target.value,
        })
    }
    
    
    /// рендеринг
    showLoader(){ // рендеринг прелодера загрузки
        return(
            <div className="loader">
                <CircularProgress size={80} thickness={3} />
            </div>
        )
    }
    showYoutubePage(){ //рендеринг страницы после агрузки
        return (
            <div className='main'>
                <div>

                       {this.props.videos.map((element, index)=>{ 
                            return(
                                <VideoTile key={index} id={index} video={element} />
                                
                            )
                        })}
                </div>
            </div>
        );
    }

    render() {
        
        if (this.props.isLoading) {
            return this.showLoader();
        }
        else{
            return this.showYoutubePage();
        }
    }
}

export default connect(
    state => ({
        videos : state.youtubePage.data,
        isLoading : state.youtubePage.isLoading,
    }),
    dispatch => ({
        login : () => {
            dispatch(Loading());
        },
        youtubeAuthIn : () => {
            dispatch(youtubeAuthIn());
        },
        youtubeAuthOut : () => {
            dispatch(youtubeAuthOut());
        },
        youtubeSearchVideo : (searchQuerryTitle, searchQuerryQuantity) => { //#1 данная функция не подключена, требует доработк! 
            // как в эту функцию передать параметр из redux или локального стейта компонента? альтернативы: создать подобную функцию как метод в react компоненте
            // console.log('searchQuerryTitle', searchQuerryTitle);
            // console.log('searchQuerryQuantity', searchQuerryQuantity);
            dispatch(youtubeSearchVideo(searchQuerryTitle, searchQuerryQuantity));
        },


    })
)(CustomComponent);

//  <iframe key={index} src={`http://www.youtube.com/embed/${element.id.videoId}`}></iframe>