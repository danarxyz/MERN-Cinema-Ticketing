import { topupSchema } from './../../utils/zodSchema';
import express, { Response } from 'express';
import { getBalance, getTopupHistory, topupBalance } from '../../controllers/walletController';
import { CustomRequest } from '../../types/Request';
import { validateRequest } from '../../middlewares/validateRequest';

const walletRoutes = express.Router();

walletRoutes.get('/check-balance', (req:CustomRequest, res:Response) => {
    getBalance(req, res);
});
walletRoutes.get('/topup-history', (req:CustomRequest, res:Response) => {
    getTopupHistory(req, res);
});
walletRoutes.post('/topup', (req:CustomRequest, res:Response) => {
    validateRequest(topupSchema);
    topupBalance(req, res);
});

export default walletRoutes;