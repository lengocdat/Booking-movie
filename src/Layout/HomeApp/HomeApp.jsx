import React, { Component } from 'react'
import './homeapp.scss';
import Carousel from 'react-bootstrap/Carousel'
export default class HomeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    render() {
        const handleSelect = (selectedIndex, e) => {
            this.setState({index:selectedIndex});
          };
        return (
            <div className="homeapp" id="homeapp">
                <div className="container">
                    <div className="row">
                        <div className="homeapp__left col-md-6 col-sm-6 col-12 col-lg-6 col-xl-6">
                            <h3>Ứng dụng tiện lợi dành cho</h3>
                            <h3>người yêu điện ảnh</h3>
                            <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                            <button>App miễn phí - Tải về ngay!</button>
                            <p>TIX có hai phiên bản <a href="/#">IOS</a> và <a href="/#">ADROID</a></p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-12 col-lg-6 col-xl-6 homeapp__container">
                        <div className="homeapp__right">
                        <Carousel className="homeapp__right__carousel" activeIndex={this.state.index} onSelect={handleSelect} controls={false}>
                            <Carousel.Item className="homeapp__right__carousel-item">
                                <img src="/img/slide2.jpg" alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item className="homeapp__right__carousel-item">
                                <img src="/img/slide3.jpg" alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item className="homeapp__right__carousel-item">
                                <img src="/img/slide4.jpg" alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item className="homeapp__right__carousel-item">
                                <img src="/img/slide1.jpg" alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item className="homeapp__right__carousel-item">
                                <img src="/img/slide5.jpg" alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item className="homeapp__right__carousel-item">
                                <img src="/img/slide6.jpg" alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item className="homeapp__right__carousel-item">
                                <img src="/img/slide7.jpg" alt="First slide" />
                            </Carousel.Item>
                        </Carousel>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
