import React from 'react';

export default class Signup extends React.Component{

    render() {
        return (
            <div className="signup">
                <form id="signup" name="signup" method="post" action="/signup">
                    <label for="email">Email Address</label>
                    <input class="text" name="email" type="email" />
                    <label for="username">User Name</label>
                    <input name="firstname" type="text" />
                    <label for="password">Password</label>
                    <input name="password" type="password" />
                    <input class="btn" type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}