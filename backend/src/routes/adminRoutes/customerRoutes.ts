import express, { Request, Response } from 'express';
import { getCustomer, getTransaction, getWalletTransaction } from '../../controllers/customerController';

const customerRoutes = express.Router();

customerRoutes.get('/customers', (req: Request, res: Response) => {
    getCustomer(req, res);
});
customerRoutes.get('/wallet-transaction', (req: Request, res: Response) => {
    getWalletTransaction(req, res);
});
customerRoutes.get('/ticket-transaction', (req: Request, res: Response) => {
    getTransaction(req, res);
});

export default customerRoutes;