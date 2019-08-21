import React from 'react';
import './Login.css';


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            loginEmail: '',
            loginPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({loginEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({loginPassword: event.target.value});
    }

    onSubmitLogin = () => {
        fetch('http://localhost:4000/signin', { 
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.loginEmail,
                password: this.state.loginPassword,
            })
        })
        .then( resp => resp.json())
        .then( user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })    
    }

    render() {
        const {onRouteChange} = this.props;
        return ( 
            <div className="middle br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                           
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                    <button type="submit" className="btn" onClick={this.onSubmitLogin}><span className="btn__content">Sign in</span></button>
                    </div>
                    <div className="lh-copy mt3">
                    <span onClick={() => onRouteChange('signup')} className="f6 link dim black db">Sign up</span>
                    </div>
                </div>
            </main>     
            </div>
        );
    }
  
}

export default Login;