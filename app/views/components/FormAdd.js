import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default class FormAdd extends React.Component {
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
                <div style={{textAlign : 'center', marginTop : '50px'}} className="formAdd">
                    <form name="add" method="post" action={this.props.action}>
                        <input name="id" type="text" style= {{display: 'none'}} value={ this.props.job.id }/>
                        <label style={this.labelStyle}>Name</label>
                        <input class="text" name="name" type="text" value={this.props.job.name}/>
                        <label style={this.labelStyle}>Priority</label>
                        <select  name="priority"  value={this.props.job.priority} >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <label style={this.labelStyle} >Date</label>
                        <input type="date" name="date"  value={this.props.job.date} />

                        <RaisedButton label="Save" type="submit" secondary={true} style={this.style} />
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }
}