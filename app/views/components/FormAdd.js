import React from 'react';

var FormAdd = React.createClass({

    render : function () {
        return (
            <div className="formAdd">
                <form id="signin" name="signin" method="post" action="signin">
                    <label>Name of Job</label>
                    <input class="text" name="job" type="text" />
                    <label>Date</label>
                    <input type="date" id="myDate" value="2014-02-09"/>
                    <label>Priority</label>
                    <select>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <input type="submit" value="Save" />
                </form>
            </div>
        );
    }
});

export default FromAdd;