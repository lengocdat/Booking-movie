import React, { Component } from "react";
import "./index.scss";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { fetchCredentials } from "../../action/credentialActions";
import  SignupModal  from "./SignupModal";
class SignIn extends Component {
  handleNavigateUser = () => {
    if (this.props.User) {
      this.props.history.push("/");
    }
  };
  
  componentDidMount() {
    this.handleNavigateUser();
  }
  componentDidUpdate() {
    this.handleNavigateUser();
  }
  renderinput = (name, handleChange, type, placeholder) => (
    <div>
      <Field
        type={type}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="alert alert-danger">
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
  
  render() {
    return (
      <>
      <div className="signin">
        <div className="signin__content">
          <div className="signin__content__top" >
            <img src="/img/group@2x.png" alt=""/>
          </div>
          <div className="signin__content__bottom">
            <Formik
              initialValues={{
                taiKhoan: "",
                matKhau: "",
              }}
              onSubmit={(values) => {
                this.props.dispatch(fetchCredentials(values));
              }}
            >
              {(formikProps) => (
                <>
                  <Form id="signin-form">
                    <div className="field__group">
                      <i className="fa fa-user"></i>                     
                     {this.renderinput("taiKhoan", formikProps.handleChange, "text", "Tài Khoản")}
                    </div>
                    <div className="field__group">
                      <i className="fa fa-lock"></i>
                      {this.renderinput("matKhau", formikProps.handleChange, "password", "Mật Khẩu")}
                    </div>
                    <div className="signin__content__bottom__button">
                      <button form="signin-form" type="submit">
                        Đăng Nhập
                      </button>
                    </div>
                  </Form>
                  <SignupModal />
                    <ul>
                      <li>
                        <a data-toggle="modal" data-target="#modelIdSignUp">Đăng Kí</a>
                      </li>
                      <li >
                        <Link to="/" >Trang Chủ</Link>
                      </li> 
                    </ul>
                </>
              )}
            </Formik>
          </div> 
        </div>
        
      </div>
      </>
    );
  }
}
const mapstateToProps = (state) => ({
  User: state.UserReducer.credentials,
});
export default withRouter(connect(mapstateToProps, null)(SignIn));
