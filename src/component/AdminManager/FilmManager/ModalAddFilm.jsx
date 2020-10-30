import React, { Component } from "react";
import { signupUserSchema } from "../../../service/User";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { FilmService, UserService } from "../../../service";
import dayjs from "dayjs";
import "./modaladd.scss"
import { addFilmSchema } from "../../../service/film";
export default class ModalAddFilm extends Component {
  constructor(props) {
    super(props);
    this.state = { hinhAnh: {} };
  }

  handleChange = (e) => {
    let target = e.target;
    if (target.name === "hinhAnh") {
      this.setState({ hinhAnh: e.target.files[0] });
    }
  };

  handleSubmit = (values) => {
    let filmitem = {
      maPhim: values.maPhim,
      tenPhim: values.tenPhim,
      biDanh: values.biDanh,
      trailer: values.trailer,
      moTa: values.moTa,
      hinhAnh: this.state.hinhAnh,
      maNhom: values.maNhom,
      ngayKhoiChieu: dayjs(values.ngayKhoiChieu).format("DD/MM/YYYY"),
      danhGia: values.danhGia,
    };
    let form_data = new FormData();
    for (let key in filmitem) {
      form_data.append(key, filmitem[key]);
    }

    FilmService.addFilm(form_data)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thêm Thành Công",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data}`,
        });
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
          <div className="alert alert-danger addfilm__content__alert">
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
  render() {
    const initialValues = {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      moTa: "",
      hinhAnh: {},
      maNhom: "GP08",
      ngayKhoiChieu: "",
      danhGia: "",
    };
    return (
      <>
        <div
          className="modal fade"
          id="modelIdAddFilm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm Phim</h5>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                // validationSchema={addFilmSchema}
                onSubmit={this.handleSubmit}
              >
                {(formikProps) => (
                  <Form>
                    <div className="modal-body">
                    <label>Mã Phim</label>
                    {this.renderinput(
                      "maPhim",
                      formikProps.handleChange,
                      "number"
                    )}

                    <label>Tên Phim</label>
                    {this.renderinput(
                      "tenPhim",
                      formikProps.handleChange,
                      "text"
                    )}

                    <label>Bí Danh</label>
                    {this.renderinput(
                      "biDanh",
                      formikProps.handleChange,
                      "text"
                    )}

                    <label>Trailer </label>
                    {this.renderinput(
                      "trailer",
                      formikProps.handleChange,
                      "text"
                    )}

                    <label>Mô Tả </label>
                    {this.renderinput("moTa", formikProps.handleChange, "text")}

                    <label>Ngày Khởi Chiếu</label>
                    {this.renderinput(
                      "ngayKhoiChieu",
                      formikProps.handleChange,
                      "date"
                    )}

                    <label>Đánh Giá</label>
                    {this.renderinput(
                      "danhGia",
                      formikProps.handleChange,
                      "number"
                    )}

                    <label>Hình Ảnh</label>
                    <div>
                      <input
                        type="file"
                        name="hinhAnh"
                        onChange={this.handleChange}
                        className="field__group"
                      />
                      <ErrorMessage name="hinhAnh">
                        {(msg) => (
                          <div className="alert alert-danger addfilm__content__alert">
                            {msg}
                          </div>
                        )}
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
                   </div>
                   <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Thêm Phim</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
    );
  }
}
