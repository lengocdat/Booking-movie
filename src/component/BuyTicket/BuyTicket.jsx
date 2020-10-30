import React, { Component } from 'react';
import './buyticket.scss';
import { connect } from 'react-redux';
import { Schedule } from '../../service';
import Seat from './Seat';
import Swal from 'sweetalert2';
import Header from "../../Layout/Header/header";
import Footer from "../../Layout/Footer/footer";

class BuyTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seatArray: [],
            filmInfo: {},
            currentChair: [],
            tenGhe: [],
            time:"",
        };
    }
    componentDidMount() {
        this.CountDown(300);
        Schedule.getRomTicket(this.props.match.params.showtimeid)
            .then((res) => {
                this.setState({
                    seatArray: res.data.danhSachGhe,
                    filmInfo: res.data.thongTinPhim,
                })
            })
            .catch((err) => {
                console.log(err);
            });
        
    }

    datve = (values) => {
        Schedule.datVe(values)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Đặt Vé Thành Công',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => window.location.reload())
            })
            .catch(() => {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Đặt Vé Thất Bại',
                })
            })
    }

    addSeat = (seat) => {
        this.setState({ currentChair: [...this.state.currentChair, { maGhe: +seat.maGhe, giaVe: +seat.giaVe }], tenGhe: [...this.state.tenGhe, seat.tenGhe] })
    }
    removeSeat = (seat) => {
        let seatArray = [...this.state.currentChair];
        let nameArray = [...this.state.tenGhe]
        let index = seatArray.findIndex(danhSachVe => danhSachVe.maGhe === +seat.maGhe);
        let indexName = nameArray.findIndex(tenghe => tenghe === seat.tenGhe);
        if (index !== -1) {
            seatArray.splice(index, 1);
            this.setState({ currentChair: seatArray });
        };
        if (indexName !== -1) {
            nameArray.splice(index, 1);
            this.setState({ tenGhe: nameArray });
        };
    }
    //thoi gian giu ghe
    CountDown = (thoigian) =>{
        let time = thoigian,minutes, seconds;
        let interVal = setInterval(()=>{
            time -= 1;
            minutes = parseInt(time/60,10);
            seconds = parseInt(time%60,10);
            
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            this.setState({
                time:`${minutes}:${seconds}`
            })
            if (+time === 0) {
                clearInterval(interVal);
                time = thoigian
                Swal.fire({
                    title: 'Hết thời gian đặt vé',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Đặt Vé Lại'
                }).then(() => 
                    window.location.reload(true)
                )
            }
        },1000)
    }


    render() {
        const datVe = {
            maLichChieu: +this.props.match.params.showtimeid,
            danhSachVe: this.state.currentChair,
            taiKhoanNguoiDung: this.props.user.taiKhoan
        }
        return (
            <>
            <Header />
            <div className="buyticket">
                <div className="buyticket__left">
                    <div className="buyticket__left__content">
                        <div className="buyticket__left__content-header">
                            <div>
                                <div>
                                    <h4>{this.state.filmInfo.tenCumRap}</h4>
                                    <p>{this.state.filmInfo.ngayChieu}-{this.state.filmInfo.gioChieu}-{this.state.filmInfo.tenRap}</p>
                                </div>
                            </div>
                        </div>

                        <div className="buyticket__left__content-body">
                            <div className="buyticket__left__content-img">
                                <img src="/img/screen.png" alt="img" />
                            </div>
                            <div className="container">
                                <div className="buyticket__left__content-seat">
                                    <div className="row rowseat">
                                        {this.state.seatArray.map((seat, index) => (
                                            <Seat key={index} seat={seat} addSeat={this.addSeat} removeSeat={this.removeSeat} />
                                        ))
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="seatinfo">
                                        <button disabled className="seat-nomal"></button>
                                        <p>Ghế Thường</p>
                                    </div>
                                    <div className="seatinfo">
                                        <button disabled className="seat"></button>
                                        <p>Ghế Vip</p>
                                    </div>
                                    <div className="seatinfo">
                                        <button disabled className="seat-chose"></button>
                                        <p>Ghế Đang Chọn</p>
                                    </div>
                                    <div className="seatinfo">
                                        <button disabled className="seat-reserved"></button>
                                        <p>Ghế Đã Bán</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buyticket__right">
                    <div className="container">
                        <p>Tổng Tiền:</p>
                        <p className="buyticket__right__total">{this.state.currentChair?.reduce((tonggia, item) => tonggia + item.giaVe, 0)}đ</p>
                        <div className="buyticket__right__info">
                            <p><span>C16</span>{this.state.filmInfo.tenPhim}</p>
                            <img src={this.state.filmInfo.hinhAnh} alt="img"/>
                            <p>{this.state.filmInfo.tenCumRap}</p>
                            <p>{this.state.filmInfo.diaChi}</p>
                            <p>Suất chiếu: {this.state.filmInfo.ngayChieu}-{this.state.filmInfo.gioChieu}</p>
                            <p>Phòng Chiếu: {this.state.filmInfo.tenRap}</p>
                        </div>
                        <div className="buyticket__right_price">
                            <p>Ghế: {this.state.tenGhe?.reduce((tongghe, tenghe) => tongghe + tenghe + " ", "")}</p>
                            <p>{this.state.currentChair?.reduce((tonggia, item) => tonggia + item.giaVe, 0)}đ</p>
                            <p>Thời gian giữ ghế:{this.state.time}</p>
                        </div>
                        <div>
                            <button className="buyticket__right__book" onClick={() => { this.datve(datVe) }}>Đặt Vé</button>
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
    user: state.UserReducer.credentials
})
export default connect(mapstateToProps, null)(BuyTicket)