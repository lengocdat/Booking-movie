import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFilmOfPage } from "../../action/phimActions";
import "./filmlist.scss";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
class FilmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      srcModal: "",
      changeComponent:"dangchieu",
      disabled:"disabled"
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchFilmOfPage(1,8));
  }

  handlePageChange = (newPage) => {
    this.props.dispatch(fetchFilmOfPage(newPage,8));
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
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
  render() {
    const { totalPages, currentPage, items } = this.props.filmList;
    return (
      <div className="filmlist" id="filmlist">
        <img
          className="filmlist__previous"
          src="/img/back-session.png"
          alt="img"
          onClick={() => {
            if (currentPage >= 2) {
              this.handlePageChange(currentPage - 1);
            }
          }}
        />
        <img
          className="filmlist__next"
          src="/img/next-session.png"
          alt="img"
          onClick={() => {
            if (currentPage < totalPages - 1) {
              this.handlePageChange(currentPage + 1);
            }
          }}
        />
        <div className="container">
          <div className="filmlist__status">
            <Link to="/" className={this.state.changeComponent==="dangchieu"?"filmlist__status-active":""} onClick={() =>this.setState({changeComponent:"dangchieu"})}>
              Đang Chiếu
            </Link>
            <Link to="/" className={this.state.changeComponent==="sapchieu"?"filmlist__status-active":""} onClick={() =>this.setState({changeComponent:"sapchieu"})}>Sắp Chiếu</Link>
          </div>
          <div className="row">
            {this.renderModal()}
            {items?.map((item, index) => (
              <div
                className="col-md-3 col-sm-6 col-6 col-lg-3 col-xl-3 filmList__content"
                key={index}
              >
                <Link to={`/detail/${item.maPhim}`}>
                  <div className="card card__config">
                    <div className="card__config__img">
                      <img src={item.hinhAnh} alt="img" onError={(evt) => {
                 evt.target.src = "img/error404.jpg"}}/>
                    </div>
                    <div className="card__body">
                      <h6 className="card-title">
                        <span>C16</span> {item.tenPhim}
                      </h6>
                    </div>
                    <div className="filmlist__hide">
                      <div className="filmlist__content__buy">
                        <button type="button">MUA VÉ </button>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="filmlist__content__play">
                  <img
                    src="/img/play-video.png"
                    alt="img"
                    onClick={() =>
                      this.setState({
                        show: true,
                        srcModal: item.trailer,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapstateToProps = (state) => ({
  filmList: state.FilmReducer.filmArray,
});
export default connect(mapstateToProps)(FilmList);
