import React, { Component } from "react";
import { FilmService} from "../../../service";
import './filmmanager.scss';
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import ModalAddFilm from "./ModalAddFilm";
import ModalUpdateFilm from "./ModalUpdateFilm";
export default class FilmManager1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: null,
      itemFilm:5,
      itemSearch:5,
      filmArray: [],
    };
  }

  componentDidMount() {
    this.getFilmOfPage()
  }

  getFilmOfPage = () => {
    FilmService.getFilmOfPage(this.state.currentPage, this.state.itemFilm)
      .then((res) =>
        this.setState({
            filmArray: res.data.items,
            totalPages: res.data.totalPages,
        })
      )
      .catch((err) => console.log(err));
  }

  handlePageChange = async (newPage) => {
    await this.setState({ currentPage: newPage });
    this.getFilmOfPage();
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
        this.deleteFilm(values)
      }
    })
  }
  deleteFilm = (values) => {
    FilmService.deleteFilm(values)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Xóa Thành Công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => window.location.reload())
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response?.data}`,
        })
      })
  }

  searchFilm = (values,) => {
    if(values.name.length)
    FilmService.searchFilm(values.name, this.state.itemSearch)
      .then((res) => (
        this.setState({ filmArray: res.data.items,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage
        })
      ))
      .catch(err => {
        console.log(err);
      })
    else{
      this.getFilmOfPage()
    }
  }
  render() {

    return (
      <div className="film__content">
        <div className="container">
          <div className="film__content-add">
            <button className="film__content-add-button" data-toggle="modal" data-target="#modelIdAddFilm">
              Thêm Phim
            </button>
            <ModalAddFilm />
            <div className="film__content-search">
              <Formik
                initialValues={{
                  name: "",
                }}
                onSubmit={this.searchFilm}
              >{(formikProps) => (
                <Form>
                  <Field
                    type="text"
                    name="name"
                    onChange={formikProps.handleChange}
                    className="field__group"
                    placeholder="Nhập Tên Phim"
                  />
                  <button type="submit">Tim</button>
                </Form>
              )}</Formik>
            </div>
          </div>
          <div className="film__content-body table-responsive">
             
            <table className="table">
              <caption >Danh Sách Phim</caption>
              <thead>
                <tr>
                  <th>Mã Phim</th>
                  <th>Tên Phim</th>
                  <th>Ngày Khởi Chiếu</th>
                  <th>Hình Ảnh</th>
                  <th>Mô Tả</th>
                  <th>Quản Lý</th>
                </tr>
              </thead>
              <tbody className="table__tbody">
                {this.state.filmArray?.map((phim, index) => (
                  <tr key={index}>
                    <th>{phim.maPhim}</th>
                    <th>{phim.tenPhim}</th>
                    <th>{phim.ngayKhoiChieu}</th>
                    <th><img src={phim.hinhAnh} alt="" onError={(evt) => {
                    evt.target.src = "img/error404.jpg"}}/></th>
                    <th>{phim.moTa}</th>
                    <th className="table__button">
                      <ModalUpdateFilm phim={phim} />
                      <button className="table__button-update" type="button" data-toggle="modal" data-target={`#film${phim.maPhim}`}
                      >Cập Nhật</button>
                      <button className="table__button-delete" onClick={() => this.confirmDelete(phim.maPhim)}>Xóa</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="film__content-page">
            <button className="btn" disabled={this.state.currentPage===1} onClick={() => {
              if (this.state.currentPage > 1) {
                this.handlePageChange(this.state.currentPage - 1);
              }

            }}>pre</button>
            <button className="btn btn-primary" disabled>{this.state.currentPage}/{this.state.totalPages}</button>
            <button className="btn" disabled={this.state.currentPage===this.state.totalPages} onClick={() => {
              if (this.state.currentPage < this.state.totalPages) {
                this.handlePageChange(this.state.currentPage + 1);
              }
            }}>next</button>
          </div>
        </div>
      </div>
    );
  }
}
