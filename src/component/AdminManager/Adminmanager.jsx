import React, { Component } from 'react';
import UserManager from './UserManager';
import './adminmanager.scss';
import { Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../action/credentialActions';
import FilmManager from './FilmManager/Filmmanager';
class AdminManager extends Component {
    constructor(props) {
        super(props);
        this.state = { changeComponent: "user", }
    }
    rendercomponent() {
        if(this.state.changeComponent==="film"){
            return <FilmManager/>
        }
        if(this.state.changeComponent==="user"){
            return <UserManager/>
        }
    }
    render() {
        console.log(this.state.changeComponent);
        return (
            <div className="user">
                <nav className="user__navbar">
                    <Link className="user__navbar-name" to="/"><span>{this.props.User.hoTen?.substring(0, 15)}</span></Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse user__nav" id="collapsibleNavId">
                        <ul>
                            <li onClick={() => this.setState({ changeComponent: "film" })}>
                                <i className="fa fa-film"></i>
                                <a>Quản lí Phim</a>
                            </li>
                            <li onClick={() => this.setState({ changeComponent: "user" })}>
                                <i className="fa fa-users"></i>
                                <a>Quản lí người dùng</a>
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