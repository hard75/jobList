/**
 * Importación de componentes
 */
import React from 'react';
import GridTasks from './components/GridTasks';
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


/**
 * Vista de dashboard solo disponible despues de logueo
 */
export default class Dashboard extends React.Component{
    /**
     * Construnctor
     *  
     * @param {*} props 
     */
    constructor(props){
        super(props);

        this.updateTask = {
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
                    <FormAdd action={'/task/add'} task={this.updateTask}/>
                </Card>
                
                <Divider />
                <List style ={this.props.showNotification ? this.props.showNotification : {display : "none"}}>
                    <ListItem primaryText= "¡Tienes tareas para hoy!" rightIcon={<Badge badgeContent={this.props.countTasks} primary={true}><NotificationsIcon /></Badge>} />
                </List>
                <div style={ {marginLeft:'50px', marginRight:'50px'}}>
                    <GridTasks tasks={ this.props.tasks }/>
                </div>
               
               <Card style={this.props.showUpdate ? this.props.showUpdate : {display:'none'}}>
                    <CardTitle style={{textAlign : 'center', marginTop : '50px'}} title="Actualizar tarea"/>
                    <FormUpdate action = {'/task/update'} task={this.props.task ? this.props.task : this.updateTask}/>
                </Card>
            </MuiThemeProvider>
        );
    }
}