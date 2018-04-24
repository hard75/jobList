import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends React.Component{
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
                    <form id="signin" name="signin" method="post" action="signin">
                        <label style={this.labelStyle} for="email">Email Address:</label>
                        <input class="text" name="email" type="text" />
                        <label style={this.labelStyle}>Password:</label>
                        <input name="password" type="password" />
                        <RaisedButton label="Sign In" type="submit" secondary={true} style={this.style} />
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }
}