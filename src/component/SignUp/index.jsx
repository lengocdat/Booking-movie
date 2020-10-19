import React, { Component } from "react";
import "./signup.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UserService } from "../../service";
import { signupUserSchema } from "../../service/User";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
class SignUp extends Component {

  _handleSubmit = (values, { resetForm }) => {
    UserService
      .signUp(values)
      .then(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Đăng Kí Thành Công',
          showConfirmButton: false,
          timer: 1500
        })
        resetForm({ values: "" });
        this.props.history.push("/signin");
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Đăng Kí thất bại',
        })
      });
  };
  render() {
    const initialValues = {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP08",
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    }
    return (
      <div className="signup">
        <div className="signup__content">
          <h3 className="text-center">Đăng kí</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={signupUserSchema}
            onSubmit={this._handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <label>Tài Khoản</label>
                <div >
                  <Field
                    type="text"
                    name="taiKhoan"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="taiKhoan">
                    {(msg) => <div className="alert alert-danger signup__content__alert">{msg}</div>}
                  </ErrorMessage>
                </div>

                <label>Mật Khẩu</label>
                <div >
                  <Field
                    type="password"
                    name="matKhau"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="matKhau">
                    {(msg) => <div className="alert alert-danger signup__content__alert">{msg}</div>}
                  </ErrorMessage>
                </div>

                <label>Họ Tên </label>
                <div >
                  <Field
                    type="text"
                    name="hoTen"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="hoTen">
                    {(msg) => <div className="alert alert-danger signup__content__alert">{msg}</div>}
                  </ErrorMessage>
                </div>

                <label>Số Điện Thoại</label>
                <div >
                  <Field
                    type="text"
                    name="soDt"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="soDt" >
                    {(msg) => <div className="alert alert-danger signup__content__alert">{msg}</div>}
                  </ErrorMessage>
                </div>

                <label>Email</label>
                <div >
                  <Field
                    type="email"
                    name="email"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="email" >
                    {(msg) => <div className="alert alert-danger signup__content__alert">{msg}</div>}
                  </ErrorMessage>
                </div>

                <label>Mã nhóm</label>
                <div>
                  <Field
                    component="select"
                    name="maNhom"
                    onChange={formikProps.handleChange}
                    className="field__group-select"
                    
                  >
                    <option>GP08</option>
                    <option>GP09</option>
                    <option>GP010</option>
                  </Field>
                  <ErrorMessage name="maNhom" />
                </div>
                <div className="signup__content__button">
                  <button type="submit">Đăng kí</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default withRouter(SignUp);
