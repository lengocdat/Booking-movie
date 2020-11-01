import { maNhom } from "../action/type";
import axiosClient from "../Utils/axiosClient";
import * as yup from "yup";
export class FilmServices {
  getFilm = () => axiosClient.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`)
  getFilmOfPage = (curentpage, sophantu) => axiosClient.get(`QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${curentpage}&soPhanTuTrenTrang=${sophantu}`)
  getFilmDetail = (maphim) => axiosClient.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maphim}`)
  getFilmOfCinema = (marap) => axiosClient.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${marap}&maNhom=${maNhom}`)
  addFilm = (phim) => axiosClient.post(`QuanLyPhim/ThemPhimUploadHinh`, phim)
  deleteFilm = (maphim) => axiosClient.delete(`QuanLyPhim/XoaPhim?MaPhim=${maphim}`)
  searchFilm = (tenphim, sophantu, page) => axiosClient.get(`QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP08&tenPhim=${tenphim}&soTrang=${page}&soPhanTuTrenTrang=${sophantu}`)
  updateFilm =(phim)=>axiosClient.post(`QuanLyPhim/CapNhatPhimUpload`,phim)
}
export class CinemaServices {
  getCinemaSystem = () => axiosClient.get(`/QuanLyRap/LayThongTinHeThongRap`)
  getCinema = (marap) => axiosClient.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${marap}`)
}
export class Schedules {
  getShowtimes = (maphim) => axiosClient.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maphim}`)
  getRomTicket = (malichchieu) => axiosClient.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${malichchieu}`)
  datVe = (values) => axiosClient.post(`QuanLyDatVe/DatVe`, values)
}
export const addFilmSchema = yup.object().shape({
  matKhauCu: yup.string().required("Mời nhập mật khẩu hiện tại"),
  matKhau: yup.string().required("Mời nhập mật khẩu mới"),
  xacNhanMatKhau: yup
    .string()
    .required("Mời Nhập lại mật khẩu")
    .oneOf([yup.ref("matKhau")], "Mật khẩu không trùng khớp"),
});
