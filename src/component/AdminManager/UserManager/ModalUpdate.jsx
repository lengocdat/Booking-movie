import React, { Component } from 'react'
import { signupUserSchema } from "../../../service/User";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { UserService } from '../../../service';
export class ModalAdd extends Component {
  addUser = (values, { resetForm }) => {
    UserService
      .addUser(values)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm Thành Công',
          showConfirmButton: false,
          timer: 1500
        })
        resetForm({ values: "" });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tài khoản đã tồn tại',
        })
      });

  };
  render() {
    return (
      <>
        <div className="modal fade" id="modelId1" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm Người Dùng</h5>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  taiKhoan: "",
                  matKhau: "",
                  email: "",
                  soDt: "",
                  maNhom: "GP08",
                  maLoaiNguoiDung: "KhachHang",
                  hoTen: "",
                }}
                validationSchema={signupUserSchema}
                onSubmit={this.addUser}
              >
              {(formikProps) => (
                  <Form>
                    <div className="modal-body">
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
                          autoComplete="on"
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
                      <label>Mã Loại Người Dùng</label>
                      <div>
                        <Field
                          component="select"
                          name="maLoaiNguoiDung"
                          onChange={formikProps.handleChange}
                          className="field__group-select"
                        >
                          <option>KhachHang</option>
                          <option>QuanTri</option>
                        </Field>
                        <ErrorMessage name="maNhom" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Thêm Người Dùng</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </Form>
                )}  
              </Formik>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export class ModalUpdate extends Component {
  updateUser = (values) => {
    console.log(values);
    UserService.updateUser(values)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Update Thành Công',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cập Nhật thất bại',
        })
      })
  }
  render() {
    const {user}= this.props;
    return (
      <>
        <div className="modal fade" id={user?.taiKhoan} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cập Nhật</h5>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  taiKhoan: user?.taiKhoan,
                  matKhau: user?.matKhau,
                  email: user?.email,
                  soDt: user?.soDt,
                  maNhom: "GP08",
                  maLoaiNguoiDung: user?.maLoaiNguoiDung,
                  hoTen: user?.hoTen,
                }}
                validationSchema={signupUserSchema}
                onSubmit={this.updateUser}
              >
                {(formikProps) => (
                  <Form>
                    <div className="modal-body">
                      <label>Tài Khoản</label>
                      <div >
                        <Field
                          type="text"
                          name="taiKhoan"
                          onChange={formikProps.handleChange}
                          className="field__group"
                          disabled
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
                          autoComplete="on"
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
                      <label>Mã Loại Người Dùng</label>
                      <div>
                        <Field
                          component="select"
                          name="maLoaiNguoiDung"
                          onChange={formikProps.handleChange}
                          className="field__group-select"
                        >
                          <option>KhachHang</option>
                          <option>QuanTri</option>
                        </Field>
                        <ErrorMessage name="maNhom" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Cập Nhật</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
    )
  }
}