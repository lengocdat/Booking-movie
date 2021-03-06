import React, { PureComponent } from 'react'

export default class Seat extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            status:false,
        }
    }

    handleClick = async () => {
        await this.setState({status:!this.state.status});
        this.state.status?this.props.addSeat(this.props.seat):this.props.removeSeat(this.props.seat)
    }

    render() {
        const {seat} = this.props
        return (
            <>
                {this.props.seat.daDat?
                <button  className="seat-reserved" disabled><span>{seat.tenGhe}</span></button>
                :<button  className={`${seat.loaiGhe === "Thuong"?"seat-nomal ": "seat "} + ${this.state.status?"seat-chose":""}`} onClick={()=>
                    {this.handleClick()}}><span>{seat.tenGhe}</span></button>}
            </>
        )
    }
}
