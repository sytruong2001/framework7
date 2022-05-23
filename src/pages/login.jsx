import React, { useState, useEffect } from "react";
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
} from "framework7-react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLogin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    localStorage.removeItem("user");
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = [
      {
        username: "ST2001",
        password: "123",
      },
      {
        username: "ST2002",
        password: "123123",
      },
    ];
    if (this.state.username === "") {
      f7.dialog.alert("Bạn chưa nhập username & password");
      return;
    }
    const user = data.find((data) => data.username === this.state.username);

    if (user) {
      if (user.password === this.state.password) {
        this.setState({ isLogin: true });
        // console.log(this.state.username);
        const user = JSON.stringify(this.state.username);
        sessionStorage.setItem("user", user);
        // console.log(user);
        this.props.f7router.navigate("/product");
        return;
        // f7router.navigate("/home/");
      } else {
        f7.dialog.alert("Sai password vui lòng nhập lại");
      }
    } else {
      f7.dialog.alert("Sai username vui lòng nhập lại");
    }
  }

  // Logout screen
  handleSignOut(event) {
    event.preventDefault();
    this.setState({
      isLogin: false,
      username: "",
      password: "",
    });
  }

  render() {
    return (
      <Page name="login">
        <div className="login-form">
          <LoginScreenTitle>Login</LoginScreenTitle>
          <List form>
            <ListInput
              type="text"
              name="username"
              placeholder="Enter your username"
              value={this.state.username}
              onChange={this.handleChange}
            ></ListInput>
            <ListInput
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleChange}
            ></ListInput>
          </List>
          <List>
            <ListButton
              title="Sign In"
              onClick={(event) => this.handleSubmit(event)}
            />
          </List>
        </div>
      </Page>
    );
  }
}

export default Login;
