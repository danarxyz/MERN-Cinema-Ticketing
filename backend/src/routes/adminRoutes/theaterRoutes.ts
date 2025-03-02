import express, { Request, Response } from 'express';
import { getTheater, getTheaterDetail, postTheater, putTheaters, deleteTheater } from '../../controllers/theaterController';
import { validateRequest } from '../../middlewares/validateRequest';
import { theaterSchema } from '../../utils/zodSchema';

const theaterRoutes = express.Router();

theaterRoutes.get('/theaters', (req: Request, res: Response) => {
    getTheater(req, res);
});

theaterRoutes.get('/theaters/:id', (req: Request, res: Response) => {
    getTheaterDetail(req, res);
});

theaterRoutes.post('/theaters', (req: Request, res: Response) => {
    validateRequest(theaterSchema),
    postTheater(req, res);
});

theaterRoutes.put('/theaters/:id', (req: Request, res: Response) => {
    validateRequest(theaterSchema),
    putTheaters(req, res);
});

theaterRoutes.delete('/theaters/:id', (req: Request, res: Response) => {
    deleteTheater(req, res);
});

export default theaterRoutes;