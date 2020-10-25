import React, { Component } from "react";
import "./footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer>
            <div className="footer__partner">
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <p>TIX</p>
                    <div className="row footer__partner__info">
                      <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <a href="/#">FAQ</a>
                        <a href="/#">Brand Guidelines</a>
                      </div>
                      <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <a href="/#">Thỏa thuận sử dụng</a>
                        <a href="/#">Chính sách bảo mật</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 footer__partner__logo">
                    <p>ĐỐI TÁC</p>
                    <div className="row footer__partner__logo-lines">
                      <a href="/#">
                        <img src="/img/ft1.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft2.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft3.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft4.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft5.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft6.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft7.jpg" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft8.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft9.png" alt="img" />
                      </a>
                      <a href="/#">
                        <img src="/img/ft10.jpg" alt="img" />
                      </a>
                    </div>
                  </div>
                  <div className="col-4 footer__partner__app">
                    <div className="row">
                      <div className="col-6">
                        <p>MOBILE APP</p>
                        <a href="/#">
                          <img src="/img/apple-logo.png" alt="img" />
                        </a>
                        <a href="/#">
                          <img src="/img/android-logo.png" alt="img" />
                        </a>
                      </div>
                      <div className="col-6">
                        <p>SOCIAL APP</p>
                        <a href="/#">
                          <img src="/img/facebook-logo.png" alt="img" />
                        </a>
                        <a href="/#">
                          <img src="/img/zalo-logo.png" alt="img" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="footer__adress">
              <div className="container">
                <div className="row">
                  <div className="col-2 footer__adress__logo">
                    <img src="/img/zion-logo.jpg" alt="img" />
                  </div>
                  <div className="col-12 col-sm-12 col-xl-8 col-md-8">
                    <p>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</p>
                    <span>
                      Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp.
                      Hồ Chí Minh, Việt Nam.
                  </span>
                    <span>
                      Giấy chứng nhận đăng ký kinh doanh số: 0101659783,<span>đăng ký
                      thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
                    hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</span>
                    </span>
                    <span>Số Điện Thoại (Hotline): 0964660843</span>
                    <span>Email: <a href="/#">phiaxaxa@gmail.com </a></span>
                  </div>
                  <div className="col-2 footer__adress__certify">
                    <a href="/#">
                      <img src="/img/d1e6bd560daa9e20131ea8a0f62e87f8.png" alt="img" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </footer>
      </>
    );
  }
}
