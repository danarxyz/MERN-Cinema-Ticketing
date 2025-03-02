import express, { NextFunction, Response } from 'express';
import globalRoutes from './globalRoutes';
import { CustomRequest } from '../../types/Request';
import { verifyRole, verifyToken } from '../../middlewares/verifyToken';
import walletRoutes from './walletRoutes';
import { getTheater } from '../../controllers/theaterController';

const customerRoutes = express.Router();

customerRoutes.use((req:CustomRequest, res:Response, next:NextFunction)=>{verifyToken(req, res, next)});
customerRoutes.use((req:CustomRequest, res:Response, next:NextFunction)=>{verifyRole('customer')(req, res, next)});
customerRoutes.use(globalRoutes);
customerRoutes.use(walletRoutes);

export default customerRoutes;