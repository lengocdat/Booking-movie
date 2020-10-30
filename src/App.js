import React, { Component } from "react";
import "./App.css";
import DuAnWebPhim from "./component/DuAnWebPhim";
import SignIn from "./component/SignIn";
import FilmDetail from "./component/FilmDetail";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Userinfo from "./component/UserInfo/Userinfo";
import { connect } from "react-redux";
import { createAction } from "./action";
import { FETCH_CREDENTIALS } from "./action/type";
import Adminmanager from "./component/AdminManager/Adminmanager";
import BuyTicket from "./component/BuyTicket/BuyTicket";
import AdminRoute from "./component/Route/AdminRoute";
import UserRoute from "./component/Route/UserRoute";
import Filmmanager from "./component/AdminManager/FilmManager";
import UserManager from "./component/AdminManager/UserManager";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={DuAnWebPhim} />
          <Route path="/signin" component={SignIn} />
          <Route path="/userinfo" component={Userinfo} />
          <Route path="/detail/:filmid" component={FilmDetail} />
          <AdminRoute path="/admin" component={Adminmanager} />
          <UserRoute path="/buyticket/:showtimeid" component={BuyTicket} />
          <AdminRoute path="/admin/usermanager" component={Filmmanager} />
          <AdminRoute path="/admin/filmmanager" component={UserManager} />
        </Switch>
      </BrowserRouter>
    );
  }
  getCredentialsFromLocal = () => {
    const credentialsString = localStorage.getItem("credentials");
    if (credentialsString) {
      this.props.dispatch(
        createAction(FETCH_CREDENTIALS.SUCCESS, JSON.parse(credentialsString))
      );
    }
  };
  componentDidMount() {
    this.getCredentialsFromLocal();
  }
  componentDidUpdate() {
    this.getCredentialsFromLocal();
  }
}

export default connect()(App);
