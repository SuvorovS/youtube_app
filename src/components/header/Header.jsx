import React from 'react';

import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Loading, youtubeAuthOut, youtubeAuthIn, youtubeSearchVideo, test } from '../../actions/actions';


import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import './header.scss';



class ToolbarExamplesSimple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText : 'mom',
            searchQuantity : 5,
            open1: false,
            open: false,
        }
    }

    handleChange(event, index, ){
        console.log(event.target);
        
        this.setState({searchQuantity: event.target.innerHTML});
        this.handleRequestClose();
    }
    handleChange1(event, index, ){
        console.log(event.target);
        
        this.setState({searchQuantity: event.target.innerHTML});
        this.handleRequestClose1();
    }

    handleSearchText(e){ // обработчик поля поиска в локальный стейт
        this.setState({
            searchText : e.target.value,
        })
    }

    youtubeSearchVideoTEST(e){ // временная функция, пока не доработаю #1, см. mapDispatchToProps
        e.preventDefault();
        // STORE.dispatch(youtubeSearchVideo(this.state.searchText, this.state.searchQuantity)); //еще один способ вызов action
        this.props.youtubeSearchVideo(this.state.searchText, this.state.searchQuantity);
    }
    handleTouchTap1 (event){
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl1: event.currentTarget,
        });
    };
    handleTouchTap (event){
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open1: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose () {
        this.setState({
            open: false,
        });
    };
    handleRequestClose1 () {
        this.setState({
            open1: false,
        });
    };

    logout(){
        this.handleRequestClose ();
        this.props.youtubeAuthOut()
    }

    render() {
        return (
            <div id="header">
                
        <Toolbar>
            <ToolbarGroup firstChild={false}>
                <RaisedButton label={`количество: ${this.state.searchQuantity}`} onTouchTap={this.handleTouchTap.bind(this)} />
                <Popover
                    open={this.state.open1}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose1.bind(this)}
                >
                    <Menu>
                        <MenuItem primaryText="5" onClick={this.handleChange1.bind(this)} />
                        <MenuItem primaryText="10" onClick={this.handleChange1.bind(this)} />
                        <MenuItem primaryText="15" onClick={this.handleChange1.bind(this)} />
                    </Menu>
                </Popover>
            </ToolbarGroup>
            <TextField onChange={this.handleSearchText.bind(this)} hintText="Hint Text" />
            <ToolbarGroup>
                <FontIcon className="muidocs-icon-custom-sort" />
                <RaisedButton onClick={this.youtubeSearchVideoTEST.bind(this)}  label="Search" primary={true} />
                
                {this.props.userName !== ''?
                    <div>
                        <ToolbarGroup>
                        
                                <Avatar src={this.props.userAvatar} />
                        
                                <RaisedButton label={this.props.userName} onTouchTap={this.handleTouchTap1.bind(this)} />
                                <Popover
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl1}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose.bind(this)}
                                >
                                    <Menu>
                                        <Link to="/cabinet"><MenuItem primaryText="cabinet" onClick={this.handleRequestClose.bind(this)} /></Link>
                                        <MenuItem primaryText="logout" onClick={this.logout.bind(this)} />
                                    </Menu>
                                </Popover>
                        
                        </ToolbarGroup>
                    </div>
                     
                    :
                    <RaisedButton label="Авторизация" primary={true} onClick={this.props.youtubeAuthIn} />
                }

            </ToolbarGroup>
        </Toolbar>
            </div>
        );
    }
}


export default connect(
    state => ({
        userName : state.youtubePage.userName,
        userAvatar: state.youtubePage.userAvatar,
        videos : state.youtubePage.data,
        isLoading : state.youtubePage.isLoading,
    }),
    dispatch => ({
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
)( ToolbarExamplesSimple )