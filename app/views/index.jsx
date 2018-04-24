import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Login extends React.Component {
    
    render() {
        return (
            <MuiThemeProvider>
                <Card>
                    <CardHeader/>
                    <CardMedia
                    overlay={<CardTitle title="e-volution" />}
                    >
                    </CardMedia>
                    <CardTitle title="Bienvenidos" subtitle="Prueba técnica" />
                    <CardText>
                        Esta es la prueba técnica para ser parte del equipo de evolution, aprendí un monton haciendola
                        y aunque no fue tan fácil, estoy satisfecho con el resultado, espero que a ustedes les guste.
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