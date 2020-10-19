import React, { Component } from 'react';
import './buyticket.scss';
import { connect } from 'react-redux';
import { Schedule } from '../../service';
import Seat from './Seat';
import Swal from 'sweetalert2';

class BuyTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
          seatArray: [],
          filmInfo: {},
          currentChair:[],
        };
      }
    componentDidMount() {
        // this.props.dispatch(fetchRoomTicket(this.props.match.params.showtimeid))
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

    datve = (values) =>{
        console.log(values);
        Schedule.datVe(values)
        .then(()=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Đặt Vé Thành Công',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch((err)=>{
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Đặt Vé Thất Bại',
              })
        })
    }

    addSeat =(seat) => {
        console.log(typeof(+seat.tenGhe),typeof(+seat.giaVe),typeof(+this.props.match.params.showtimeid),typeof(this.props.user.taiKhoan));
        this.setState({currentChair: [...this.state.currentChair,{maGhe:+seat.tenGhe,giaVe:+seat.giaVe}]})
    }
    removeSeat = (seat) =>{
        console.log(seat);
        let seatArray = [...this.state.currentChair];
        console.log(seatArray);
        let index = seatArray.findIndex(danhSachVe => danhSachVe.maGhe === +seat.tenGhe);
        if (index !== -1) {
            seatArray.splice(index, 1);
            this.setState({currentChair: seatArray});
         };
    }
    render() {
        const datVe={
            maLichChieu:+this.props.match.params.showtimeid,
            danhSachVe:this.state.currentChair,
            taiKhoanNguoiDung:this.props.user.taiKhoan
        }
        console.log(datVe);
        return (
            <div className="buyticket">
                <div className="buyticket__left">
                    <div className="buyticket__left__control">
                        <ul>
                            <li>
                                1 CHỌN GHẾ VÀ THANH TOÁN
                            </li>
                            <li>
                                2 KẾT QUẢ ĐẶT VÉ
                            </li>
                            <li>
                                <span>{this.props.user.hoTen?.substring(0,1)}</span>{this.props.user.hoTen}
                            </li>
                        </ul>
                    </div>
                    <div className="buyticket__left__content">
                        <div className="buyticket__left__content-header">
                            <div>
                                <div>
                                    <h4>{this.state.filmInfo.tenCumRap}</h4>
                                    <p>{this.state.filmInfo.ngayChieu}-{this.state.filmInfo.gioChieu}-{this.state.filmInfo.tenRap}</p>
                                </div>
                                <img src="" alt="" />
                            </div>
                        </div>

                        <div className="buyticket__left__content-body">
                            <div className="buyticket__left__content-img">
                                <img src="/img/screen.png" alt="img" />
                            </div>
                            <div className="container">
                                <div className="buyticket__left__content-seat">
                                    <div className="row rowseat">
                                    {this.state.seatArray.map((seat,index)=> (
                                        <Seat key={index} seat={seat} addSeat={this.addSeat} removeSeat={this.removeSeat}/>
                                    ))
                                    }
                                    </div>
                                </div>
                                <div className="row seatinfo">
                                    <div>
                                        <button className="seat-nomal-1"></button>
                                        <p>Ghế Thường</p>
                                    </div>
                                    <div>
                                        <button className="seat-1"></button>
                                        <p>Ghế Vip</p>
                                    </div>
                                    <div>
                                        <button className="seat-choose"></button>
                                        <p>Ghế Đang Chọn</p>
                                    </div>
                                    <div>
                                        <button className="seat-chose"></button>
                                        <p>Ghế Đã Có Người Chọn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buyticket__right">
                    <div className="container">
                        <p className="buyticket__right__total">{this.state.currentChair?.reduce((tonggia, item)=>tonggia + item.giaVe,0)}đ</p>
                        <div className="buyticket__right__info">
                            <p><span>C16</span>{this.state.filmInfo.tenPhim}</p>
                            <p>{this.state.filmInfo.tenCumRap}</p>
                            <p>{this.state.filmInfo.diaChi}</p>
                            <p>{this.state.filmInfo.ngayChieu}-{this.state.filmInfo.gioChieu}-{this.state.filmInfo.tenRap}</p>
                            <p></p>
                        </div>
                        <div className="buyticket__right_price">
                                <p>Ghế: {this.state.currentChair?.reduce((tongghe, ghe)=>tongghe + ghe.maGhe +" ","")}</p>
                                <p>{this.state.currentChair?.reduce((tonggia, item)=>tonggia + item.giaVe,0)}đ</p>
                        </div>
                        <div>
                            <p>email</p>
                            <p>fadsdàdfa</p>
                        </div>
                        <div>
                            <p>phone</p>
                            <p>fadsdàdfa</p>
                        </div>
                        <div>
                            <p>Hình thức thanh toán</p>
                            <p>fadsdàdfa</p>
                        </div>
                        <div>
                            <button className="buyticket__right__book" onClick={() =>{this.datve(datVe)}}>Đặt Vé</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapstateToProps = (state) =>({
    user: state.UserReducer.credentials
  })
  export default connect(mapstateToProps,null)(BuyTicket)