import React from 'react'

const AuthContext = React.createContext();

const initialUser = {
  id: 0,
  name: "",
  email: "",
  entries: 0,
  city: "",
  joined: "MM/DD/YYYY",
  code: "+1",
  phone: "",
  url: "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png",
  date: "MM.DD.YYYY — HH:MM",
  group_id: "",
  user_role_id: ""
};

class AuthProvider extends React.Component {
  state = {
    isAuthenticated: false,
    user: initialUser
  }

  constructor() {
    super();
    this.authenticate(() => console.log("run  self auth"))
  }

  componentDidMount() {

  }

  authenticate = (cb) => {

    console.log('authenticate')

    const token = window.sessionStorage.getItem('token');

    if (token) {
      setTimeout(cb, 0)
      fetch('http://localhost:8080/signin', {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": 'Bearer ' + token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:8080/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(true, user);

                }
              })
          }
        })
        .catch(console.log);
    }
  }

  signup = (name, email, password) => {
    fetch("http://localhost:8080/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data.userId && data.success === 'true') {
          this.saveAuthTokenInSession(data.token)

          fetch(`http://localhost:8080/profile/${data.userId}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + data.token
            }
          })
            .then(resp => resp.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user);
                this.setAuthenticated(true);
              }
          })
        }
      });
  }

  signin = (email, password, cb) => {
    fetch("http://localhost:8080/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data.userId && data.success === 'true') {

          this.saveAuthTokenInSession(data.token)

          fetch(`http://localhost:8080/profile/${data.userId}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + data.token
            }
          })
            .then(resp => resp.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(true, user);
                setTimeout(cb, 100)
              }
          })
        }
      });
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  signout = () => {

    console.log('signout')
    fetch("http://localhost:8080/signout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + window.sessionStorage.getItem('token')
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.logout === 'true') {
          window.sessionStorage.removeItem('token');
          this.loadUser(initialUser);
          this.setAuthenticated(false);

        }
      });
  }

  loadUser = (authState, data) => {
    console.log('load user')
    this.setState(Object.assign(this.state, {
      isAuthenticated: authState,
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        city: data.city,
        phone: data.phone,
        url: data.url,
        date: data.date,
        group_id: data.group_id,
        user_role_id: data.user_role_id
      }}));
  }

  setAuthenticated = (val) => {
      this.setState(Object.assign(this.state.isAuthenticated, val));
  }

  isClient = () => {
    return this.state.user_role_id === 2;
  }

  isAdmin = () => {
    return this.state.user_role_id === 0;
  }

  isCustomer = () => {
    return this.state.user_role_id === 3;
  }

  isAnnotator = () => {
    return this.state.user_role_id === 1;
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.state.isAuthenticated,
          user: this.state.user,
          signin: this.signin,
          signout: this.signout,
          loadUser: this.loadUser,
          signup: this.signup,
          authenticate: this.authenticate,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }
