import React, { Component } from 'react';
import { signupUserSchema } from "../../../service/User";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FilmService } from '../../../service';
import './filmmanager.scss';
import Swal from 'sweetalert2';
export default class Filmmanager extends Component {
  constructor(props) {
    super(props);
    this.state = { hinhAnh: {} }
  }
  _handleChange = (e) => {
    let target = e.target
    if (target.name === 'hinhAnh') {
      this.setState({ hinhAnh: e.target.files[0] })
    }
  }
  _handleSubmit = (values) => {
    var form_data = new FormData();
    for (var key in values) {
      form_data.append(key, values[key])
    }
    FilmService
      .addFilm(form_data)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Đăng Kí Thành Công',
          showConfirmButton: false,
          timer: 1500
        })
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
      maPhim: "",
      tenPhim: "",
      trailer: "",
      maNhom: "GP08",
      moTa: "",
      hinhAnh: {}
    }
    return (
      <>
        <div className="addfilm">
          <div className="addfilm__content">
          <h3 className="text-center">Thêm Phim</h3>
              <Formik
                initialValues={initialValues}

                onSubmit={this._handleSubmit}
              >
                {(formikProps) => (
                  <Form>
                    <label>Mã Phim</label>
                    <div >
                      <Field
                        type="text"
                        name="maPhim"
                        onChange={formikProps.handleChange}
                        className="field__group"
                      />
                      <ErrorMessage name="maPhim">
                        {(msg) => <div className="alert alert-danger addfilm__content__alert">{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <label>Tên Phim</label>
                    <div >
                      <Field
                        type="text"
                        name="tenPhim"
                        onChange={formikProps.handleChange}
                        className="field__group"
                      />
                      <ErrorMessage name="tenPhim">
                        {(msg) => <div className="alert alert-danger addfilm__content__alert">{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <label>Trailer </label>
                    <div >
                      <Field
                        type="text"
                        name="trailer"
                        onChange={formikProps.handleChange}
                        className="field__group"
                      />
                      <ErrorMessage name="trailer">
                        {(msg) => <div className="alert alert-danger addfilm__content__alert">{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <label>Hình Ảnh</label>
                    <div >
                      <input
                        type="file"
                        name="hinhAnh"
                        onChange={this._handleChange}
                        className="field__group"
                      />
                      {/* <ErrorMessage name="hinhAnh" >
                        {(msg) => <div className="alert alert-danger addfilm__content__alert">{msg}</div>}
                      </ErrorMessage> */}
                    </div>

                    <label>Mô Tả</label>
                    <div >
                      <Field
                        type="text"
                        name="moTa"
                        onChange={formikProps.handleChange}
                        className="field__group"
                      />
                      <ErrorMessage name="moTa" >
                        {(msg) => <div className="alert alert-danger addfilm__content__alert">{msg}</div>}
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
                    <div className="addfilm__content__button">
                      <button type="submit">Thêm Phim</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
        </div>
      </>
    );
  }
}
