import axiosClient from "../Utils/axiosClient";
import * as yup from "yup";
import { maNhom } from "../action/type";
export class UserServices {
  signUp=(data)=> axiosClient.post(`QuanLyNguoiDung/DangKy`, data)
  signIn=(user)=> axiosClient.post(`QuanLyNguoiDung/DangNhap`, user)
  getUser=(curentpage)=> axiosClient.get(`QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${curentpage}&soPhanTuTrenTrang=20`)
  addUser=(user)=> axiosClient.post(`QuanLyNguoiDung/ThemNguoiDung`, user)
  updateUser=(user)=> axiosClient.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user)
  deleteUser=(user)=> axiosClient.post(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`, user)
  searchUser=(tuKhoa)=> axiosClient.get(`QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${tuKhoa}&soTrang=1&soPhanTuTrenTrang=20`)
  getUserInfo=(taikhoan)=> axiosClient.post(`QuanLyNguoiDung/ThongTinTaiKhoan`, taikhoan)
}

export const signupUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("Mời nhập tài khoản"),
  matKhau: yup.string().required("Mời nhập mật khẩu"),
  email: yup
    .string()
    .required("Mời nhập email")
    .email("không đúng định dạng"),
  hoTen: yup
    .string()
    .required("Mời nhập Tên")
    .matches(/[a-zA-Z]+$/, "Tên Phải là chữ"),
  soDt: yup
    .string()
    .required("Mời nhập số điện thoại")
    .matches(/^(0|84)+([0-9]{9,10}\b)+$/, "Số điện thoại bắt đầu từ 0 và gồm 10 hoặc 11 số "),
});
export const userInfoSchema = yup.object().shape({
  matKhauCu: yup.string().required("Mời nhập mật khẩu hiện tại"),
  matKhau: yup.string().required("Mời nhập mật khẩu mới"),
  xacNhanMatKhau: yup
    .string()
    .required("Mời Nhập lại mật khẩu")
    .oneOf([yup.ref("matKhau")], "Mật khẩu không trùng khớp"),
});
