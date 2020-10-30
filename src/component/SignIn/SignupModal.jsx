import { ErrorMessage, Field, Formik } from 'formik';
import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserService } from '../../service';
import { signupUserSchema } from '../../service/User';
import "./signup.scss";

export default class SignupModal extends Component {
  handleSubmit = (values) => {
    UserService
      .signUp(values)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Đăng Kí Thành Công',
          showConfirmButton: false,
          timer: 1500
        }).then(()=><Link to="/signin"></Link>)
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data}`,
        })
      });
  };
  renderinput = (name, handleChange, type) => (
    <div>
      <Field
        type={type}
        name={name}
        onChange={handleChange}
        className="field__group"
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="alert alert-danger signup__content__alert">
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );

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
      <>
        <div className="modal fade" id="modelIdSignUp" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <Formik
                initialValues={initialValues}
                validationSchema={signupUserSchema}
                onSubmit={this.handleSubmit}
              >
                {(formikProps) => (
                  <div className="modal-body signup" >
                    <Form id="signup-form">
                      <h3>Đăng Ký</h3>
                      <label>Tài Khoản</label>
                      {this.renderinput("taiKhoan", formikProps.handleChange, "text")}

                      <label>Mật Khẩu</label>
                      {this.renderinput("matKhau", formikProps.handleChange, "password")}

                      <label>Họ Tên </label>
                      {this.renderinput("hoTen", formikProps.handleChange, "text")}

                      <label>Số Điện Thoại</label>
                      {this.renderinput("soDt", formikProps.handleChange, "text")}

                      <label>Email</label>
                      {this.renderinput("email", formikProps.handleChange, "email")}

                      <label>Mã nhóm</label>
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
                      <div className="signup__content__button">
                        <button form="signup-form" type="submit">Đăng ký</button>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
    )
  }
}
