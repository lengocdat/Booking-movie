
import React, { Component } from 'react'
import Header from '../Layout/Header/header';
import CarouselPage from '../Layout/Carousel/carousel';
import PhimList from './Film/FilmList';
import Footer from '../Layout/Footer/footer';
import CinemaList from './Cinema/CinemaList';
import News from '../Layout/News/news';
import Hometool from './HomeTool/Hometool';
import HomeApp from '../Layout/HomeApp/HomeApp';
export default class DuAnWebPhim extends Component {
    render() {
        return (
            <>
            <Header />
            <CarouselPage />
            <Hometool />
            <PhimList />
            <CinemaList />
            <News />
            <HomeApp />
            <Footer />
            </>
        )
    }
}

