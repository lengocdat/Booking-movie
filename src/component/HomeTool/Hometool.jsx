import React, { Component } from 'react'
import './hometool.scss'
import { FilmService, Schedule } from '../../service';
import { connect } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
class Hometool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: [],
      currentMaPhim: "",
      filmDropdown: "Phim",
      currentRap: "",
      rapDropdown: "Rạp",
      currentMaCumRap: "",
      ngayDropdown: "Ngày Xem",
      gioDropdown: "Giờ Xem",
      maLichChieu: "",
      currentNgay: "",
    }

  }
  componentDidUpdate(prevState) {
    if (prevState.currentMaPhim !== this.state.currentMaPhim) {
      Schedule.getShowtimes(this.state.currentMaPhim)
        .then((res) => {
          this.setState({
            currentRap: res.data

          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    FilmService.getFilm()
      .then((res) => {
        this.setState({ film: res.data })
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <div className="hometool">
          <div className="container">
            <div className="hometool__dropdown">
              <div className="hometool__dropdown-film">
                <DropdownButton id="dropdown-basic-button" title={this.state.filmDropdown} >
                  {this.state?.film?.map((film, index) => (
                    <Dropdown.Item
                      key={index} onClick={() => {
                        this.setState({
                          currentMaPhim: film.maPhim,
                          filmDropdown: film.tenPhim,
                          rapDropdown:"Rạp",
                          ngayDropdown:"Ngày Xem",
                          gioDropdown:"Giờ Xem"
                        })
                      }}>{film.tenPhim}</Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>

              <div className="hometool__dropdown-config">
                <DropdownButton id="dropdown-basic-button" title={this.state.rapDropdown}>
                  {this.state?.currentRap?.heThongRapChieu?.map((rapChieu) => (
                    rapChieu.cumRapChieu?.map((rap, index) => (
                      <Dropdown.Item key={index} onClick={() => {
                        this.setState({
                          rapDropdown: rap.tenCumRap,
                          currentMaCumRap: rap.maCumRap,
                          ngayDropdown:"Ngày Xem",
                          gioDropdown:"Giờ Xem"
                        })
                      }}>{rap.tenCumRap}</Dropdown.Item>
                    ))
                  ))}
                </DropdownButton>
              </div>
              {/* setngayntn */}
              <div className="hometool__dropdown-config">
                <DropdownButton id="dropdown-basic-button" title={this.state.ngayDropdown}>
                  {this.state?.currentRap?.heThongRapChieu?.map((rapchieu) => {
                    const lichChieuTheoRap = rapchieu.cumRapChieu?.find((item) => item.maCumRap === this.state.currentMaCumRap)
                    ?.lichChieuPhim?.map(rap => rap.ngayChieuGioChieu.substring(0, 10));
                    if (lichChieuTheoRap) {
                      const lichChieuTheoRapSet = [...new Set(lichChieuTheoRap)];
                      return lichChieuTheoRapSet.map((ngay, index) => (
                        <Dropdown.Item key={index} onClick={() => {
                          this.setState({
                            ngayDropdown: ngay,
                            currentNgay: ngay,
                            gioDropdown:"Giờ Xem"
                          })
                        }}>
                          {ngay}
                        </Dropdown.Item>
                      ))
                    }
                  })}
                </DropdownButton>
              </div>
              {/* setgiontn */}
              <div className="hometool__dropdown-config">
                <DropdownButton id="dropdown-basic-button" title={this.state.gioDropdown}>
                  {this.state?.currentRap?.heThongRapChieu?.map((rapChieu) => (
                    rapChieu.cumRapChieu?.find((item) => item.maCumRap === this.state.currentMaCumRap)?.lichChieuPhim?.filter(rap=>rap.ngayChieuGioChieu.substring(0, 10)===this.state.currentNgay)
                      ?.map((rap, index) =>
                        (<Dropdown.Item key={index} onClick={() => {
                          
                          this.setState({
                            gioDropdown: rap.ngayChieuGioChieu.substring(11, 19),
                            maLichChieu: rap.maLichChieu
                          })
                        }}>{rap.ngayChieuGioChieu.substring(11, 19)}</Dropdown.Item>)
                      )
                  ))}
                </DropdownButton>
              </div>
              <div className="hometool__dropdown-button">
                { this.state.gioDropdown !== "Giờ Xem" ?
                  <Link to={`/buyticket/${this.state.maLichChieu}`}><button>MUA VÉ NGAY</button></Link>
                  : <button onClick={() =>{Swal.fire({
                    imageUrl:"/img/Post-notification.png",
                    imageHeight: 100,
                    imageWidth: 150,
                    text: 'Vui lòng chọn rạp và giờ',
                  })}}>MUA VÉ NGAY</button>}
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
}
const mapstateToProps = (state) => ({
  filmDetail: state.FilmReducer.filmDetailArray
})

export default connect(mapstateToProps)(Hometool)