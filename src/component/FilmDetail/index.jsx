import React, { Component } from 'react';
import Header from '../../Layout/Header/header';
import Footer from '../../Layout/Footer/footer'
import './filmdetail.scss'
import { connect } from 'react-redux';
import { fetchCinemaSystem, fetchFilmDetail } from '../../action/phimActions'
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
class FilmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMaRap:"",
            isAtive: false,
            currentNgay:"01-01",
            selected: 0,
            ngaySelected:0,
        }
    }

    componentDidUpdate(){
        if(this.state.currentMaRap===""){
            this.setState({ currentMaRap:this.props.cinemaSystemList[0].maHeThongRap})
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchFilmDetail(this.props.match.params.filmid));
        this.props.dispatch(fetchCinemaSystem());
    }
    render() {
        const phimOfRap = this.props.filmDetail?.lichChieu?.filter((item => item.thongTinRap?.maHeThongRap === this.state.currentMaRap));
        const phimOfRapSet=[...new Set(phimOfRap?.map(rap => rap.thongTinRap.tenCumRap))]
        const ngayChieu =[...new Set(phimOfRap?.map(rap => rap.ngayChieuGioChieu.substring(5, 10)))]
        
        return (
            <>
                <Header />
                <div className="filmdetail">
                    <div className="filmdetail__position">

                    <div className="filmdetail__position__background">
                        <div className="filmdetail__position__background-img">
                            <img src="/img/detail.jpg" alt="" />
                        </div>
                        <div className="filmdetail__position__background-bubble">
                            <img src="/img/bubble.png" alt="img"/>
                            <img src="/img/bubble.png" alt="img"/>
                            <img src="/img/bubble.png" alt="img"/>
                            <img src="/img/bubble.png" alt="img"/>
                            <img src="/img/bubble.png" alt="img"/>
                            <img src="/img/bubble.png" alt="img"/>
                        </div>
                    </div>
                   
                    <div className="filmdetail__film">
                        <div className="container">
                            <div className="row">
                                <div className="col-6 col-md-3 col-sm-6 col-lg-3 col-xl-3 filmdetail__film-img">
                                    <img src={this.props.filmDetail.hinhAnh} alt="" />
                                </div>
                                <div className="col-6 col-md-5 col-sm-6 col-lg-5 col-xl-5 filmdetail__detail">
                                    <p>{this.props.filmDetail.ngayKhoiChieu?.substring(0, 10)}</p>
                                    <h6>{this.props.filmDetail.tenPhim}</h6>
                                    <p>{this.props.filmDetail?.lichChieu?.thoiLuong}</p>
                                    <button>MUA VÉ NGAY</button>
                                </div>
                                <div className="col-md-4 col-lg-4 col-xl-4 filmdetail__rating">
                                    <div className="filmdetail__rating__score">
                                        <span>{this.props.filmDetail.danhGia}</span>
                                    </div>
                                    <div className="filmdetail__rating__star">
                                    <StarRatings
                                    rating={this.props.filmDetail.danhGia?this.props.filmDetail.danhGia/2:0}
                                    starRatedColor="#FF8C00"
                                    numberOfStars={5}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="filmdetail__lichchieu">
                        <div className="container">
                            <div className="row">
                                <div className="col-5 col-md-4 col-sm-5 col-lg-3 col-xl-3">
                                    <ul>
                                        {this.props.cinemaSystemList.map((hethongrap, index) => (
                                        <li   
                                            key={index}
                                            onClick={() => {
                                            this.setState({ currentMaRap: hethongrap.maHeThongRap,
                                                selected:index
                                             });
                                            }}
                                            className={index===this.state.selected ? "active" : ""}
                                        >    
                                            <img src={hethongrap.logo} alt="img"/>
                                            <h3>{hethongrap.tenHeThongRap}</h3>
                                        </li>
                                        ))}  
                                    </ul>
                                </div>
                                <div className="col-7 col-md-8 col-sm-7 col-lg-9 col-xl-9">
                                    <div className="filmdetail__lichchieu__detail">
                                        <div className="filmdetail__lichchieu__day">
                                            {ngayChieu.map((ngay,index)=>(
                                                <div key={index} className={index===this.state.ngaySelected ? "filmdetail__lichchieu__day-item active" : "filmdetail__lichchieu__day-item"}onClick={() =>{this.setState({currentNgay:ngay,ngaySelected:index})}}>
                                                    <p>{ngay}</p>
                                                </div>
                                            ))}
                                        </div>
                                           {phimOfRapSet.map((item,index)=> 
                                            (<div key={index} className="filmdetail__lichchieu__detail-items">
                                                <div className="filmdetail__lichchieu__detail-item1">
                                                    <img src="/img/bhd-star-vincom-3-2-15379527367766.jpg" alt=""/>
                                                    <h3>{item}</h3>
                                                </div>
                                                <h3>2D Digitals</h3>
                                                {phimOfRap.filter(rap => rap.thongTinRap.tenCumRap===item && rap.ngayChieuGioChieu.substring(5,10)===this.state.currentNgay).map((rap,index)=>
                                                (<Link  key={index} to={`/buyticket/${rap.maLichChieu}`}>{rap.ngayChieuGioChieu.substring(11,19)}</Link>
                                                ))}
                                            </div>))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
const mapstateToProps = (state) => ({
    cinemaSystemList: state.CinemaReducer.cinemaSystemArray,
    filmDetail: state.FilmReducer.filmDetailArray
})
export default connect(mapstateToProps, null)(FilmDetail)