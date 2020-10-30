import React, { Component } from "react";
import "./news.scss";

export default class News extends Component {
  render() {
    return (
      <div className="news" id ="news">
        <div className="container">
          <div className="news__nav">
            <span className="news__nav__active">Điện Ảnh 24h</span>           
          </div>
          <div className="row news__content">
            <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="news__img-top">
                  <img src="/img/new1.png" alt="img" />
                </div>
                <h3>
                  Bán Đảo Peninsula là bom tấn xác sống không thể bỏ lỡ!
                </h3>
                <p>
                  Là phần phim khép lại bộ ba xác sống (Seoul Station, Train to Busan - 2016) của đạo diễn Yeon Sang Ho, mới đây, bom tấn Bán Đảo (Train to Busan 2/Peninsula) vừa chính thức tung trailer hé lộ những tình tiết mới cực hấp dẫn.
                </p>
              </div>
              <div className="col-6">
              <div className="news__img-top">
                <img src="/img/new2.png" alt="img"/>
              </div>
                <h3>
                  ‘Tôi sẽ làm tất cả ngỡ ngàng bởi phiên bản tà ác của mình’ - Song Ji Hyo
                </h3>
                <p>
                  Nhân dịp tác phẩm “Kẻ Xâm Nhập” giữ vững ngôi vương phòng vé suốt gần một tuần trình chiếu tại quê nhà, ekip sản xuất liền cho đăng tải poster cùng trailer đặc biệt, đồng thời chia sẻ không ít thông tin lý thú xoay quanh nội dung bộ phim.
                </p>
              </div>
            </div>
            </div>
            <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-12 col-12 col-lg-8 col-xl-8">
                <div className="row">
                  <div className="col-6">
                    <div className="news__img-bottom">
                      <img src="/img/new3.jpg" alt="img"/>
                    </div>
                    <h3>
                      Hành trình của Ròm và câu chuyện đằng sau đề tài số đề
                    </h3>
                    <p>
                      Đạo diễn Trần Thanh Huy hé lộ nguyên cớ đằng sau đề tài gần gũi nhưng mới đối với điện ảnh Việt của bộ phim Việt mang về giải cao nhất tại Liên hoan phim quốc tế Busan năm 2019.
                    </p>
                  </div>
                  <div className="col-6">
                  <div className="news__img-bottom">
                    <img src="/img/new4.jpg" alt="img"/>
                  </div>
                    <h3>
                      Cùng ôn lại 'Tình đầu' với phim điện ảnh kinh điển của chị đẹp Son Ye-jin được Thái Lan làm lại
                    </h3>
                    <p>
                      Mùa hè 2020 đánh dấu sự bùng nổ của hàng loạt phim điện ảnh quay trở lại “chữa lành” những tâm hồn đang “khát” phim. Cơn Mưa Tình Đầu hứa hẹn sẽ mang tới những cảm xúc trong trẻo và thuần khiết về những rung động đầu đời, về tình bạn, tình yêu, tuổi trẻ tới với khán giả Việt.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12 col-lg-4 col-xl-4">
                <div className="news__config">
                  <div className="news__img-left">
                    <img src="/img/new5.jpg" alt="img"/>
                  </div>
                  <h4>Quẩy cùng sói 'nguyên chất 100%' có suất chiếu sớm vào 20 và 21.06.2020</h4>
                </div>
                <div className="news__config">
                  <div className="news__img-left">
                    <img src="/img/new6.jpg" alt="img"/>
                  </div>
                  <h4>Tự tin tiến ra rạp, Bằng Chứng Vô Hình hứa hẹn khuấy đảo phòng vé sau mùa dịch</h4>
                </div>
                <div className="news__config">
                  <div className="news__img-left">
                    <img src="/img/new7.jpg" alt="img"/>
                  </div>
                  <h4>Những nhân vật có thể quay trở lại trong The Matrix 4</h4>
                </div>
                <div className="news__config">
                  <div className="news__img-left">
                    <img src="/img/new8.png" alt="img"/>
                  </div>
                  <h4>Xem Căn Phòng Đẫm Máu trước khi quyết định đi chơi hè tại vùng quê hẻo lánh!</h4>
                </div>
              </div>
            </div>
            </div>
            <div className="news__btn">
              <button type="button">XEM THÊM</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
