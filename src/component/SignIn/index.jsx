import React, { Component } from "react";
import "./index.scss";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { fetchCredentials } from "../../action/credentialActions";
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
                  <Form >
                    <div className="field__group">
                      <i className="fa fa-user"></i>                     
                      <Field
                      type="text"
                      name="taiKhoan"
                      onChange={formikProps.handleChange}
                      placeholder="Tài Khoản"
                      />
                    </div>
                    <div className="field__group">
                      <i className="fa fa-lock"></i>
                      <Field
                        type="password"
                        name="matKhau"
                        onChange={formikProps.handleChange}
                        placeholder="Mật Khẩu"
                      />
                    </div>
                    <div className="signin__content__bottom__button">
                      <button type="submit">
                        Đăng Nhập
                      </button>
                    </div>
                    <ul className="signin__content__bottom__signup">
                      <li>
                        <Link to="/signup">Đăng Kí</Link>
                      </li>
                      <li className="signin__content__bottom__signup-right">
                        <Link to="/" >Trang Chủ</Link>
                      </li> 
                    </ul>
                  </Form>
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
