/**
 * Importación de componentes
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

/**
 * La vista principal del programa con introducción
 */
export default class Login extends React.Component {
    
    render() {
        return (
            <MuiThemeProvider>
                <Card>
                    <CardHeader/>
                    <CardMedia
                    overlay={<CardTitle title="Prueba React-Node" />}
                    >
                    </CardMedia>
                    <CardTitle title="Bienvenidos" subtitle="Practica de react" />
                    <CardText>
                        Practica de de React-node con sequelize y passport. Este programa carga los componentes de react 
                        desde Node.
                    </CardText>
                    <CardActions>
                    <FlatButton href="/signin" label="Sign In" />
                    <FlatButton href= "/signup" label="Sign Up" />
                    </CardActions>
                </Card>
            </MuiThemeProvider>
        );
    }
}