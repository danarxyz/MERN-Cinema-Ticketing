import express, { Request, Response } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { authSchema } from '../utils/zodSchema';
import { login, register } from '../controllers/authController';
import multer from 'multer';
import { imageFilter, thumbnailStorage } from '../utils/multer';

const authRoutes = express.Router();

const upload = multer({
    storage: thumbnailStorage("public/uploads/photos"),
    fileFilter: imageFilter,
});

authRoutes.post('/auth/login', (req: Request, res: Response) => {
    validateRequest(authSchema.omit({name:true})),
    login(req, res);
}); 

authRoutes.post('/auth/register', upload.single('photo'), (req: Request, res: Response) => {
    register(req, res);
});

export default authRoutes;