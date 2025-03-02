import express, { Request, Response } from 'express';
import { getMovies, getGenres, getMovieDetail, getMoviesFilter, getTheaters, getAvailableSeats } from '../../controllers/globalController';
import { getOrder, getOrderDetail, transactionTicket } from '../../controllers/ticketController';
import { CustomRequest } from '../../types/Request';

const globalRoutes = express.Router();

globalRoutes.get('/movies', (req:Request, res:Response) => {
    getMovies(req, res);
});
globalRoutes.get('/genres', (req: Request, res: Response) => {
    getGenres(req, res);
});
globalRoutes.get('/movies/:id', (req: Request, res: Response) => {
    getMovieDetail(req, res);
});
globalRoutes.get('/browse-movies/:genreId', (req: Request, res: Response) => {
    getMoviesFilter(req, res);
});

globalRoutes.post('/transaction/buy', (req: CustomRequest, res: Response) => {
    transactionTicket(req, res);
});

globalRoutes.get('/orders', (req: CustomRequest, res: Response) => {
    getOrder(req, res);
});
globalRoutes.get('/orders/:id', (req: CustomRequest, res: Response) => {
    getOrderDetail(req, res);
});

globalRoutes.get('/theaters', (req: Request, res: Response) => {
    getTheaters(req, res);
});

globalRoutes.get('/check-seats/:movieId', (req: Request, res: Response) => {
    getAvailableSeats(req, res);
});
export default globalRoutes;