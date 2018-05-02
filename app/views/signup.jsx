/**
 * Importación de componentes
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Vista para el registro en el sistema
 */
export default class Signup extends React.Component{
    /**
     * Construnctor
     * Define los estilos del formulario
     *  
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.labelStyle = {
           marginLeft : '5px',
           marginRight : '20px',
           paddingBottom : '20px'
        };

        this.style = {
            margin: 12,
        };
    }
    render() {
        return (
            <MuiThemeProvider>
                <div style={{textAlign : 'center', marginTop : '50px'}}>
                    <form id="signup" name="signup" method="post" action="/signup">
                        <label style={this.labelStyle} >Email Address</label>
                        <input class="text" name="email" type="email" />
                        <label style={this.labelStyle}>User Name</label>
                        <input name="firstname" type="text" />
                        <label style={this.labelStyle} >Password</label>
                        <input name="password" type="password" />
                        <RaisedButton label="Sign Up" type="submit" primary={true} style={this.style} />
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }
}