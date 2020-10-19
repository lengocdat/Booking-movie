import Axios from "axios";
Axios.interceptors.request.use((config) => {
  const userInfo =
    localStorage.getItem("credentials") &&
    JSON.parse(localStorage.getItem("credentials"));
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }
  return config;
});
export class FilmServices {
  getFilm() {
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP08",
      method: "GET",
    });
  }

  getFilmOfPage(curentpage,sophantu) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP08&soTrang=${curentpage}&soPhanTuTrenTrang=${sophantu}`,
      method: "GET",
    });
  }

  getFilmDetail(maphim) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maphim}`,
      method: "GET",
    });
  }
  getFilmOfCinema(marap) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${marap}&maNhom=GP08`,
      method: "GET",
    });
  }
  addFilm(phim) {
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      method: "GET",
      data: phim,
    });
  }
  deleteFilm(phim) {
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      method: "GET",
      data: phim,
    });
  }
}
Axios.interceptors.request.use((config) => {
  const userInfo =
    localStorage.getItem("credentials") &&
    JSON.parse(localStorage.getItem("credentials"));
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }
  return config;
});
export class CinemaServices {
  getCinemaSystem() {
    return Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });
  }
  getCinema(marap) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${marap}`,
      method: "GET",
    });
  }
}
export class Schedules {
  getShowtimes(maphim) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maphim}`,
      method: "GET",
    });
  }

  getRomTicket(malichchieu) {
    return Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${malichchieu}`,
      method: "GET",
    });
  }
  datVe(values) {
    return Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      method: "POST",
      data: values
    });
  }
}
