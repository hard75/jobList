import React from 'react';
import GridJobs from './components/GridJobs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormAdd from './components/FormAdd';
import FormUpdate from './components/FormAdd';

import RaisedButton from 'material-ui/RaisedButton';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.updateJob = {
            id : null,
            name : '',
            priority : 'low',
            date : '00-00-0000'
        }
    }

    render() {
        return (
            <MuiThemeProvider>
            
                <RaisedButton  style={{ marginTop : '10px'}} label="Log Out"  href="/logout" primary={true} style={this.style} />
               <Card>
                    <CardTitle style={{textAlign : 'center', marginTop : '50px'}} title="Añade tu nueva tarea"/>
                    <FormAdd action={'/job/add'} job={this.updateJob}/>
                </Card>
                
                <Divider />
                <List style ={this.props.showNotification ? this.props.showNotification : {display : "none"}}>
                    <ListItem primaryText= "¡Tienes tareas para hoy!" rightIcon={<Badge badgeContent={this.props.countJobs} primary={true}><NotificationsIcon /></Badge>} />
                </List>
                <div style={ {marginLeft:'50px', marginRight:'50px'}}>
                    <GridJobs jobs={ this.props.jobs }/>
                </div>
               
               <Card style={this.props.showUpdate ? this.props.showUpdate : {display:'none'}}>
                    <CardTitle style={{textAlign : 'center', marginTop : '50px'}} title="Actualizar tarea"/>
                    <FormUpdate action = {'/job/update'} job={this.props.job ? this.props.job : this.updateJob}/>
                </Card>
            </MuiThemeProvider>
        );
    }
}