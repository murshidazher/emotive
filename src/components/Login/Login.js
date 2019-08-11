import React from 'react';
import './Login.css';


const Login = ({ onRouteChange }) => {
    return ( 
        <div className="middle br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
            <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                       
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                </fieldset>
                <div className="">
                <button className="btn" onClick={() => onRouteChange('home')}><span className="btn__content">Sign in</span></button>
                </div>
                <div className="lh-copy mt3">
                <a href="#0" className="f6 link dim black db">Sign up</a>
                </div>
            </form>
        </main>     
        </div>
    );

}

export default Login;