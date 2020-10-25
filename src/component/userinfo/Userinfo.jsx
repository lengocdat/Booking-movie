import React, { Component } from "react";
import Swal from "sweetalert2";
import { signupUserSchema, userInfoSchema } from "../../service/User";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { UserService } from "../../service";
import "./userinfo.scss";
import Header from "../../Layout/Header/header";
import Footer from "../../Layout/Footer/footer";

class Userinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeRender: "userinfo",
      userInfo: [],
    };
  }

  updateUser = (values) => {
    console.log(values);
    UserService.updateUser(values)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update Thành Công",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Cập Nhật thất bại",
        });
      });
  };

  updatePassword = (values) => {
    const datauser = {
      taiKhoan: values.taiKhoan,
      matKhau: values.matKhau,
      email: values.email,
      soDt: values.soDt,
      maNhom: values.maNhom,
      maLoaiNguoiDung:
        values.maLoaiNguoiDung.charAt(0).toUpperCase() +
        values.maLoaiNguoiDung.slice(1),
      hoTen: values.hoTen,
    };
    if (values.matKhauCu === this.state.userInfo.matKhau) {
      UserService.updateUser(datauser)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update Thành Công",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => window.location.reload());
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cập Nhật thất bại",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mật Khẩu Hiện Tại Không Chính Xác",
      });
    }
  };

  getUserInfo = (taikhoan) => {
    UserService.getUserInfo(taikhoan)
      .then((res) => this.setState({ userInfo: res.data }))
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidUpdate(prevProps) {
    if (this.props.user.taiKhoan !== prevProps.user.taiKhoan) {
      this.getUserInfo({ taiKhoan: this.props.user.taiKhoan });
    }
  }
  componentDidMount() {
    this.getUserInfo({ taiKhoan: this.props.user.taiKhoan });
  }

  renderUserinfo = () => {
    return (
      <>
        <h3>Thông Tài Khoản</h3>
        <Formik
          enableReinitialize={true}
          initialValues={{
            taiKhoan: this.state.userInfo.taiKhoan,
            matKhau: this.state.userInfo.matKhau,
            email: this.state.userInfo.email,
            soDt: this.props.user.soDT,
            maNhom: "GP08",
            maLoaiNguoiDung:
              this.props.user.maLoaiNguoiDung?.charAt(0).toUpperCase() +
              this.props.user.maLoaiNguoiDung?.slice(1),
            hoTen: this.state.userInfo.hoTen,
          }}
          validationSchema={signupUserSchema}
          onSubmit={this.updateUser}
        >
          {(formikProps) => (
            <Form>
              <div className="userinfo__right__form">
                <label>Tài Khoản</label>
                <div>
                  <Field
                    type="text"
                    name="taiKhoan"
                    className="field__group"
                    disabled
                  />
                  <ErrorMessage name="taiKhoan">
                    {(msg) => (
                      <div className="alert alert-danger userinfo__right__alert">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <label>Họ Tên </label>
                <div>
                  <Field
                    type="text"
                    name="hoTen"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="hoTen">
                    {(msg) => (
                      <div className="alert alert-danger userinfo__right__alert">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <label>Số Điện Thoại</label>
                <div>
                  <Field
                    type="text"
                    name="soDt"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="soDt">
                    {(msg) => (
                      <div className="alert alert-danger userinfo__right__alert">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <label>Email</label>
                <div>
                  <Field
                    type="email"
                    name="email"
                    onChange={formikProps.handleChange}
                    className="field__group"
                    disabled
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="alert alert-danger userinfo__right__alert">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <button>Cập Nhật</button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  };
  renderPassword = () => {
    return (
      <>
        <h3>Đổi Mật Khẩu</h3>
        <Formik
          enableReinitialize={true}
          initialValues={{
            taiKhoan: this.state.userInfo.taiKhoan,
            matKhau: "",
            email: this.state.userInfo.email,
            soDt: this.props.user.soDT,
            maNhom: "GP08",
            maLoaiNguoiDung: this.props.user.maLoaiNguoiDung,
            hoTen: this.state.userInfo.hoTen,
            matKhauCu: "",
            xacNhanMatKhau: "",
          }}
          validationSchema={userInfoSchema}
          onSubmit={this.updatePassword}
        >
          {(formikProps) => (
            <Form>
              <div className="userinfo__right__form">
                <label>Mật Khẩu Hiện Tại</label>
                <div>
                  <Field
                    type="password"
                    name="matKhauCu"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="matKhauCu">
                    {(msg) => (
                      <div className="alert alert-danger userinfo__right__alert">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <label>Mật Khẩu Mới </label>
                <div>
                  <Field
                    type="password"
                    name="matKhau"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="matKhau">
                    {(msg) => (
                      <div className="alert alert-danger userinfo__right__alert">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <label>Xác Nhận Mật Khẩu Mới</label>
                <div>
                  <Field
                    type="password"
                    name="xacNhanMatKhau"
                    onChange={formikProps.handleChange}
                    className="field__group"
                  />
                  <ErrorMessage name="xacNhanMatKhau">
                    {(msg) => (
                      <div className="alert alert-danger userinfo__right__alert">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <button type="submit">Cập Nhật</button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  };
  renderHistorybooking = () => {
    return (
      <>
        <h3>Lịch sử đặt vé</h3>
        <table className="table userinfo__right__table">
          <thead>
            <tr>
              <th>Phim</th>
              <th>Thời Gian</th>
              <th>Rạp</th>
              <th>Số Ghế</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userInfo.thongTinDatVe === [] ? (
              this.state.userInfo.thongTinDatVe?.map((item, index) => (
                <tr key={index}>
                  <th>{item.tenPhim}</th>
                  <th>
                    {item.ngayDat.substring(11, 15) +
                      "~" +
                      item.ngayDat.substring(5, 9)}
                  </th>
                  <th>{item.danhSachGhe[0].tenHeThongRap}</th>
                  <th>
                    {item.danhSachGhe.reduce(
                      (tongghe, ghe) => tongghe + ghe.tenGhe + ", ",
                      ""
                    )}
                  </th>
                  <th>{item.giaVe}</th>
                </tr>
              ))
            ) : (
              <tr>
                <th className="userinfo__right__table_massage">
                  Không có lịch sử đặt vé
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  };
  rendernavigation = () => {
    if (this.state.changeRender === "userinfo") {
      return this.renderUserinfo();
    }
    if (this.state.changeRender === "password") {
      return this.renderPassword();
    }
    if (this.state.changeRender === "historybooking") {
      return this.renderHistorybooking();
    }
  };
  isAtive = (index) => (this.state.changeRender === index ? "active" : "");
  render() {
    const { user } = this.props;
    console.log(this.props.user);
    console.log(this.state.userInfo);
    return (
      <>
        <Header />
        <div className="userinfo">
          <div className="container">
            <div className="row">
              <div className="col-3 userinfo__left">
                <img src="" alt="" />
                <h4>ID: {user?.taiKhoan}</h4>
                <p
                  className={this.isAtive("userinfo")}
                  onClick={() => {
                    this.setState({ changeRender: "userinfo" });
                  }}
                >
                  Thông Tin Tài Khoản
                </p>
                <p
                  className={this.isAtive("password")}
                  onClick={() => {
                    this.setState({ changeRender: "password" });
                  }}
                >
                  Đổi Mật Khẩu
                </p>
                <p
                  className={this.isAtive("historybooking")}
                  onClick={() => {
                    this.setState({ changeRender: "historybooking" });
                  }}
                >
                  Lịch Sử Đặt Vé
                </p>
              </div>
              <div className="col-9 userinfo__right">
                {this.rendernavigation()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const mapstateToProps = (state) => ({
  user: state.UserReducer.credentials,
});
export default connect(mapstateToProps, null)(Userinfo);
