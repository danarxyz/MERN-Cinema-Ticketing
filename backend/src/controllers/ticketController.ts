import type { Response } from "express";
import type { CustomRequest } from "../types/Request";
import { transactionSchema } from "../utils/zodSchema"
import Wallet from "../models/Wallet";
import Transaction from "../models/Transaction";
import TransactionSeat from "../models/TransactionSeat";

export const transactionTicket = async (req: CustomRequest, res: Response) => {
    try {
        const parse = transactionSchema.parse(req.body);

        const wallet = await Wallet.findOne({
            user: req.user?.id
        });

        if(!wallet || (wallet && wallet.balance < parse.total)) {
            return res.status(400).json({
                message: 'Insufficient balance, please topup your wallet',
                status: 'failed',
                data: null,
            })
        }

        const transaction = new Transaction({
            bookingFee: parse.bookingFee,
            total: parse.total,
            subtotal: parse.subtotal,
            theater: parse.theaterId,
            movie: parse.movieId,
            tax: parse.tax,
            user:req.user?.id,
            date: parse.date
        });

        // Changed: seat to seats to match model reference
        for(const seat of parse.seats) {
            const newSeat = new TransactionSeat({
                seats: seat, // Changed: seat to seats
                transaction: transaction._id
            });

            await newSeat.save();
        }

        const transactionSeats = await TransactionSeat.find({
            transaction: transaction._id
        });

        transaction.seats = transactionSeats.map((seat) => seat._id);

        const currentBalance = wallet.balance ?? 0

        await Wallet.findByIdAndUpdate(wallet._id, {
            balance: currentBalance - parse.total
        });

        await transaction.save();

        return res.status(201).json({
            message: 'Transaction success',
            status: 'success',
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            message: "Error while transaction",
            status: "failed"
        });
    }
}


export const getOrder = async (req: CustomRequest, res: Response) => {
    try {
       const transaction = await Transaction.find({
              user: req.user?.id
         }).select ('seats movie theater date status').populate({
            path:'movie',
            select:'title thumbnail genre -_id',
            populate:{
                path:'genre',
                select:'name -_id'
            }
         }).populate({
            path:'seats',
            select:'seats -_id'
         }).populate({
            path:'theater',
            select:'name city -_id'
            })
        return res.status(200).json({
            data: transaction,
            message: "Order retrieved successfully",
            status: "success"
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            message: "Failed to get order",
            status: "failed"
        });
    }
}

export const getOrderDetail = async (req: CustomRequest, res: Response) => {
    try {
        const {id} = req.params;

       const transaction = await Transaction.findById(id)
       .select('seats movie theater date subtotal total bookingFee tax status')
       .populate({
            path:'movie',
            select:'title thumbnail bonus price genre -_id',
            populate:{
                path:'genre',
                select:'name -_id'
            }
         }).populate({
            path:'seats',
            select:'seats -_id'
         }).populate({
            path:'theater',
            select:'name city -_id'
        })
        return res.status(200).json({
            data: transaction,
            message: "Order retrieved successfully",
            status: "success"
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            message: "Failed to get order",
            status: "failed"
        });
    }
}