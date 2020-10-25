import React, { Component } from "react";
import { UserService } from "../../../service";
import './usermanager.scss';
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import { ModalAdd, ModalUpdate } from "./ModalUpdate";
export default class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: null,
      userArray: [],
    };
  }

  componentDidMount() {
    this.getUserOfPage()
  }

  getUserOfPage = () => {
    UserService.getUser(this.state.currentPage)
      .then((res) =>
        this.setState({
          userArray: res.data.items,
          totalPages: res.data.totalPages
        })
      )
      .catch((err) => console.log(err));
  }

  handlePageChange = async (newPage) => {
    await this.setState({ currentPage: newPage });
    this.getUserOfPage();
  };

  confirmDelete = (values) => {
    Swal.fire({
      title: 'Bạn muốn xóa?',
      text: "Bạn Không thể hoàn tác thao tác này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, Xóa Người Này!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(values)
      }
    })
  }
  deleteUser = (values) => {
    UserService.deleteUser(values)
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Xóa Thành Công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => window.location.reload())
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Người dùng đã đặt vé',
        })
      })
  }

  searchUser = (values) => {
    if(values.name.length)
    UserService.searchUser(values.name)
      .then((res) => (
        this.setState({ userArray: res.data.items })
      ))
      .catch(err => {
        console.log(err);
      })
    else{
      this.getUserOfPage()
    }
  }
  render() {

    return (
      <div className="user__content">
        <div className="container">
          <div className="user__content-add">
            <button className="user__content-add-button" type="button" data-toggle="modal" data-target="#modelId1">
              Thêm Người Dùng
            </button>
            <ModalAdd />
            <div className="user__content-search">
              <Formik
                initialValues={{
                  name: "",
                }}
                onSubmit={this.searchUser}
              >{(formikProps) => (
                <Form>
                  <Field
                    type="text"
                    name="name"
                    onChange={formikProps.handleChange}
                    className="field__group"
                    placeholder="Nhập Họ Tên"
                  />
                  <button type="submit">Tim</button>
                </Form>
              )}</Formik>
            </div>
          </div>
          <div className="user__content-body table-responsive">
             <p>Danh Sách Người Dùng</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Tài Khoản</th>
                  <th>Họ Tên</th>
                  <th>Email</th>
                  <th>Số Điện Thoại</th>
                  <th>Người Dùng</th>
                  <th>Quản Lý</th>
                </tr>
              </thead>
              <tbody className="table__tbody">
                {this.state.userArray?.map((user, index) => (
                  <tr key={index}>
                    <th>{user.taiKhoan}</th>
                    <th>{user.hoTen}</th>
                    <th>{user.email}</th>
                    <th>{user.soDt}</th>
                    <th>{user.maLoaiNguoiDung}</th>
                    <th className="table__button">
                      <ModalUpdate user={user} />
                      <button className="table__button-update" type="button" data-toggle="modal" data-target={`#${user.taiKhoan}`}
                      >Cập Nhật</button>
                      <button className="table__button-delete" onClick={() => this.confirmDelete(user.taiKhoan)}>Xóa</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn" onClick={() => {
            if (this.state.currentPage > 1) {
              this.handlePageChange(this.state.currentPage - 1);
            }

          }}>pre</button>
          <button className="btn btn-primary">{this.state.currentPage}/{this.state.totalPages}</button>
          <button className="btn" onClick={() => {
            if (this.state.currentPage < this.state.totalPages) {
              this.handlePageChange(this.state.currentPage + 1);
            }
          }}>next</button>
        </div>
      </div>
    );
  }
}
