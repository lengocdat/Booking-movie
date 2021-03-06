import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import './carousel.scss';

export default class CarouselPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            srcModal:""
        }
    }
    renderModal = () => (
        <Modal
          size="xl"
          show={this.state.show}
          onHide={this.handleClose}
          dialogClassName="custom-dialog"
        >
          <Modal.Body className="modal__body">
            <iframe src={this.state.srcModal} title="myFrame" />
            <img src="/img/close.png" alt="" onClick={this.handleClose}/>
          </Modal.Body>
        </Modal>
      );
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
    render() {
        const handleSelect = (selectedIndex) => {
            this.setState({index:selectedIndex});
          };
        return (
            <div className="carousel">
                {this.renderModal()}
                <Carousel  activeIndex={this.state.index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/img/ban-dao-15954792351353.jpg" alt="First slide" />
                                <div className="carousel-caption carousel-caption__fix">
                                    <img src="/img/play-video.png" alt = "img"  onClick={() =>
                                    this.setState({
                                    show: true,
                                    srcModal:"https://www.youtube.com/embed/J8riYadR3Nk"
                                    })
                                } />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/img/cau-be-nguoi-go-15961359597877.jpg" alt="Second slide" />
                                <div className="carousel-caption carousel-caption__fix">
                                    <img src="/img/play-video.png" alt = "img" onClick={() =>
                                    this.setState({
                                    show: true,
                                    srcModal:"//www.youtube.com/embed/-nYmaSu952o"
                                    })
                                    } />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/img/mortal-15961360468025.png" alt="3rd slide" />
                                <div className="carousel-caption carousel-caption__fix">
                                    <img src="/img/play-video.png" alt = "img" onClick={() =>
                                    this.setState({
                                    show: true,
                                    srcModal:"https://www.youtube.com/embed/wwVwt6-QOUM"
                                    })
                                    }  />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src="/img/du-lich-chet-choc-15961360123636.jpg" alt="4th slide" />
                                <div className="carousel-caption carousel-caption__fix">
                                    <img src="/img/play-video.png" alt = "img" onClick={() =>
                                    this.setState({
                                    show: true,
                                    srcModal:"https://www.youtube.com/embed/o3Q9LETlHqk"
                                    })
                                    }  />
                                </div>
                            </Carousel.Item>
                        </Carousel>
            </div>
        )
    }
}
