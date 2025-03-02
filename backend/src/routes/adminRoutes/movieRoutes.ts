import express, { Request, Response } from "express";
import multer from "multer";
import { createMovies, deleteMovies, getMovieDetail, getMovies, updateMovies } from "../../controllers/movieController";
import { imageFilter, thumbnailStorage } from "../../utils/multer";

const upload = multer({ storage: thumbnailStorage(), fileFilter: imageFilter });

const movieRoutes = express.Router();

movieRoutes.get("/movies", (req:Request, res:Response) => {
    getMovies(req, res);
});

movieRoutes.post('/movies', upload.single('thumbnail'), (req: Request, res: Response) => {
    createMovies(req, res);
});

movieRoutes.put('/movies/:id', upload.single('thumbnail'), (req: Request, res: Response) => {
    updateMovies(req, res);
});
movieRoutes.delete('/movies/:id', (req: Request, res: Response) => {
   deleteMovies(req, res);
});

movieRoutes.get('/movies/:id', (req: Request, res: Response) => {
    getMovieDetail(req, res);
});


export default movieRoutes;