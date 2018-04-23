import React from 'react';

export default class Login extends React.Component{

    render() {
        return (
            <div className="login">
                <form id="signin" name="signin" method="post" action="signin">
                    <label for="email">Email Address</label>
                    <input class="text" name="email" type="text" />
                    <label for="password">Password</label>
                    <input name="password" type="password" />
                    <input class="btn" type="submit" value="Sign In" />
                </form>
            </div>
        );
    }
}