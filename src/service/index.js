import {FilmServices,CinemaServices, Schedules} from './film';
import {UserServices} from './User'
export const FilmService = new FilmServices();
export const CinemaService = new CinemaServices();
export const UserService = new UserServices();
export const Schedule = new Schedules();
