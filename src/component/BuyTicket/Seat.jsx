import React, { Component } from 'react'

export default class Seat extends Component {
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
                <button  className={`${seat.loaiGhe === "Thuong"?"seat-nomal ": "seat "} + ${this.state.status?"seat-chose":""}`} onClick={()=>
                    {this.handleClick()}}><span>{seat.tenGhe}</span></button>
            </>
        )
    }
}
