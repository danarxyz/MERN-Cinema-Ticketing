import express, { Request, Response } from 'express';
import { getGenres, postGenres, putGenres, deleteGenres, getGenreDetail } from '../../controllers/genreController';
import { validateRequest } from '../../middlewares/validateRequest';
import { genreSchema } from '../../utils/zodSchema';

const genreRoutes = express.Router();

genreRoutes.get('/genres', (req: Request, res: Response) => {
    getGenres(req, res);
});

genreRoutes.get('/genres/:id', (req: Request, res: Response) => {
    getGenreDetail(req, res);
});

genreRoutes.post('/genres', (req: Request, res: Response) => {
    validateRequest(genreSchema),
    postGenres(req, res);
});

genreRoutes.put('/genres/:id', (req: Request, res: Response) => {
    validateRequest(genreSchema),
    putGenres(req, res);
});

genreRoutes.delete('/genres/:id', (req: Request, res: Response) => {
    deleteGenres(req, res);
});

export default genreRoutes;