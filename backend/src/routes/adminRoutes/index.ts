import express, { NextFunction, Response } from 'express';
import genreRoutes from './genreRoutes';
import theaterRoutes from './theaterRoutes';
import movieRoutes from './movieRoutes';
import customerRoutes from './customerRoutes';
import { verifyRole, verifyToken } from '../../middlewares/verifyToken';
import { CustomRequest } from '../../types/Request';

const adminRoutes = express.Router();

adminRoutes.use((req:CustomRequest, res:Response, next:NextFunction)=>{verifyToken(req, res, next)});
adminRoutes.use((req:CustomRequest, res:Response, next:NextFunction)=>{verifyRole('admin')(req, res, next)});
adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoutes);
adminRoutes.use(movieRoutes);
adminRoutes.use(customerRoutes)

export default adminRoutes;
