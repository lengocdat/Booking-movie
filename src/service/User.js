import Axios from "axios";
import * as yup from "yup";
export class UserServices {
  signUp(data) {
    return Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      method: "POST",
      data
    });
  };

  signIn(user) {
    return Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data:user
    });
  }

  getUser(curentpage) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP08&soTrang=${curentpage}&soPhanTuTrenTrang=20`,
      method: "GET",
    });
  }
  addUser(user){
    return Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data:user
    });
  }
  updateUser(user){
    return Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data:user
    });
  }
  deleteUser(user){
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
      method: "DELETE",
      data:user
    })
  }
  searchUser(tuKhoa){
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP08&tuKhoa=${tuKhoa}&soTrang=1&soPhanTuTrenTrang=20`,
      method: "GET",
    })
  }
}

export const signupUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("Không được để trống"),
    matKhau: yup.string().required("Không được để trống"),
    email: yup
      .string()
      .required("Không được để trống")
      .email("không đúng định dạng"),
    hoTen: yup.string().required("Không được để trống").matches(/[a-zA-Z]+$/,"Tên Phải là chữ từ a-z,A-Z"),
    soDt: yup
      .string()
      .required("Không được để trống")
      .matches(/^(0|\+84)+([0-9]{9,10}\b)+$/,"Số điện thoại phải từ 0-9"),
    maNhom: yup.string().required("Không được để trống"),
  });

