import React, { Component } from "react";
import { fetchCinemaSystem, fetchCinema, fetchFilmOfCinema } from "../../action/phimActions";
import { connect } from "react-redux";
import "./cinemaList.scss";
import { Link} from "react-router-dom";
class CinemaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMaRap: "",
      currentMaCumRap: "",
      selected: 0,
      rapselected: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentMaRap !== this.state.currentMaRap) {
      this.props.dispatch(fetchCinema(this.state.currentMaRap));
      this.props.dispatch(fetchFilmOfCinema(this.state.currentMaRap));
    }

    if(prevProps.cinemaSystemList !== this.props.cinemaSystemList){
      this.props.dispatch(fetchCinema(this.props.cinemaSystemList[0]?.maHeThongRap)) 
      this.props.dispatch(fetchFilmOfCinema(this.props.cinemaSystemList[0]?.maHeThongRap))
    }

    if(prevProps.cinema !== this.props.cinema){
      this.setState({currentMaCumRap: this.props.cinema[0]?.maCumRap})
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchCinemaSystem());    
  }
  
  render() {
    return (
      <div className="cinema" id="cinema">
        <div className="container">
          <div className="row">
            <div className="cinema__img-top">
              <img src="/img/back-news.png" className="col-12" alt="img" />
            </div>
            <div className="col-12 col-md-1 col-sm-12 col-lg-1 col-xl-1 cinema__systems">
              <ul>
                {this.props.cinemaSystemList.map((hethongrap, index) =>   
                  (
                  <li
                    className={(index===this.state.selected ? "active" : "") }
                    key={index}
                    onClick={() => {
                      this.setState({ currentMaRap: hethongrap.maHeThongRap,
                        selected:index,
                        rapselected:0
                       });
                    }}
                  >
                    <div className="cinema__systems-logo">
                      <img src={hethongrap.logo} alt="img"/>
                      <p className="active1 active2"></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 col-md-5 col-sm-6 col-lg-5 col-xl-5 cinema__cinemalist">
              {this.props.cinema.map((rap, index) => (
                <div className={index===this.state.rapselected ? "active cinema__cinemalist-item" : "cinema__cinemalist-item"} key={index} 
                onClick={() => {
                  this.setState({ currentMaCumRap: rap.maCumRap,
                    rapselected:index, });
                  
                }}>
                  <img src="/img/cgv-crescent-mall-15380174094679.jpg" alt="img" />
                  <div>
                    <h4>{rap.tenCumRap}</h4>
                    <p>{rap.diaChi}</p>
                    <span>[chi tiết]</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6  cinema__film">
              {this.props.filmOfCinema[0]?.lstCumRap.find((item) => item.maCumRap ===this.state.currentMaCumRap)
              ?.danhSachPhim?.map((phim,index)=>(
                   <div key={index}>
                     <div className="cinema__film-film">
                        <img src={phim.hinhAnh}alt="img"/>
                        <h4><span>C16</span> {phim.tenPhim}</h4>
                      </div>
                      <h3>2D Digitals</h3>
                      <div className="cinema__film-time">
                        {phim?.lstLichChieuTheoPhim.filter(item => item.ngayChieuGioChieu.substring(0,10)==="2019-01-01" )
                        .map((lichchieu,index) => {
                          if(this.props.User){
                            return (
                            <Link  key={index} to={`/buyticket/${lichchieu.maLichChieu}`}>
                              {lichchieu.ngayChieuGioChieu.substring(11,19)}
                              </Link>)
                          }
                          return <Link  key={index} to="/signin">{lichchieu.ngayChieuGioChieu.substring(11,19)}</Link>
                        })}
                      </div>
                    </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => ({
  cinemaSystemList: state.CinemaReducer.cinemaSystemArray,
  loadinganderror:state.CinemaReducer,
  cinema: state.CinemaReducer.cinemaArray,
  filmOfCinema: state.FilmReducer.filmOfCinemaArray,  
  User: state.UserReducer.credentials,
});
export default connect(mapstateToProps, null)(CinemaList);
