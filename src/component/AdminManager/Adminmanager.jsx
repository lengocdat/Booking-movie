import React, { Component } from 'react';
import UserManager from './UserManager';
import './adminmanager.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../action/credentialActions';
import FilmManager1 from './FilmManager';
class AdminManager extends Component {
    constructor(props) {
        super(props);
        this.state = { changeComponent: "user", }
    }
    rendercomponent() {
        if(this.state.changeComponent==="film"){
            return <FilmManager1/>
        }
        if(this.state.changeComponent==="user"){
            return <UserManager/>
        }
    }
    handleNavigateUser = () => {
        if (!this.props.User) {
          this.props.history.push("/");
        }
    };
    componentDidMount() {
        this.handleNavigateUser();
      }
      componentDidUpdate() {
        this.handleNavigateUser();
      }
    isAtive = (name) => (this.state.changeComponent === name ? "active" : "");
    render() {
        return (
            <div className="user">
                <nav className="user__navbar">
                    <Link className="user__navbar-name" to="/"><span>{this.props.User.hoTen?.substring(0, 15)}</span></Link>
                    <div className="user__nav">
                        <ul>
                            <li className={this.isAtive("film")} onClick={() => this.setState({ changeComponent: "film" })}>
                                <i className="fa fa-film"></i>
                                <a>Quản lí Phim</a>
                            </li>
                            <li className={this.isAtive("user")} onClick={() => this.setState({ changeComponent: "user" })}>
                                <i className="fa fa-users"></i>
                                <a>Quản lí người dùng</a>
                            </li>
                            <li onClick={() => this.props.history.push('/')}>
                                <i className="fa fa-home"></i>
                                <a>Go Home</a>
                            </li>
                            <li onClick={() => { this.props.dispatch(logout()) }}>
                                <i className="fa fa-power-off"></i>
                                <a href="/#">LOGOUT</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="user__data">
                    {this.rendercomponent()}
                </div>
            </div>
        )
    }
}
const mapstateToProps = (state) => ({
    User: state.UserReducer.credentials
})
export default connect(mapstateToProps, null)(AdminManager)