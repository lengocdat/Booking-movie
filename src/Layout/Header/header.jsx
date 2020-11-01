import React, { Component } from "react";
import './header.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from "../../action/credentialActions";

class Header extends Component {
  render() {
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-md navbar-light">
            <Link className="navbar-brand header__logo" to="/">
              <img src="/img/web-logo.png" alt="img"/>
            </Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse header__nav" id="collapsibleNavId">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/#filmlist">
                    Lịch chiếu
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#cinema">
                    Cụm rạp
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#news">
                    Tin tức
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#homeapp">
                    Ứng dụng
                  </a>
                </li>
              </ul>
              <div className="header__login">
                <div className="header__login__user">
                    {this.props.User ? 
                    <div className="header__login__true">
                      <p>{this.props.User.hoTen.substring(0,1)}</p>
                      <span>Hi, {this.props.User.hoTen?.substring(0,8)}</span>
                      <div className="header__login__logout">
                        <Link to="/userinfo" >Thông Tin Người Dùng</Link>
                        <Link to="/" onClick={()=>{this.props.dispatch(logout())}}>Đăng Xuất</Link>
                      </div>
                    </div> :
                    <Link to="/signin" className="header__login__false">
                      <img src="/img/avatar.png" alt="img"/>
                      <span>Đăng nhập</span>
                    </Link>
                  }  
                  
                </div>
                <div className="header__login__admin">
                  {this.props.User.maLoaiNguoiDung === "QuanTri"?<Link to="/admin">Admin</Link>:<div className="header__login__content"></div>}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }
}
const mapstateToProps = (state) =>({
  User: state.UserReducer.credentials
  
})
export default connect(mapstateToProps,null)(Header)
