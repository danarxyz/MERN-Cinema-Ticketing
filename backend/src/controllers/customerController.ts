import { Request, Response } from "express";
import User from "../models/User";
import WalletTransaction from "../models/WalletTransaction";
import Transaction from "../models/Transaction";

export const getCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await User.find({ role: "customer" }).select("name email")

        return res.status(200).json({
            data: customer,
            message: "Customer retrieved successfully",
            status: "success"
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            message: "Failed to retrieve customer",
            status: "failed"
        });
    }
}

export const getWalletTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = await WalletTransaction.find().populate({
            path: "wallet",
            select:"user -_id",
            populate:{
                path: "user",
                select:"name"
            }
        })

        return res.status(200).json({
            data: transaction,
            message: "Wallet transaction retrieved successfully",
            status: "success"
        });

    } catch (error) {
        return res.status(500).json({
            data: null,
            message: "Failed to retrieve customer",
            status: "failed"
        });
    }
}

export const getTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = await Transaction.find().populate({
            path: "user",
            select:"name -_id",
        }).populate({
            path: "movie",
            select:"title -_id",
        }).populate({
            path: "theater",
            select:"name -_id",
        })

        return res.status(200).json({
            data: transaction,
            message: "Transaction retrieved successfully",
            status: "success"
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            message: "Failed to retrieve transaction",
            status: "failed"
        });
    }
}