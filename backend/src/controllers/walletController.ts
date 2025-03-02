import type { Request, Response } from "express";
import Wallet from "../models/Wallet";
import type { CustomRequest } from "../types/Request";
import WalletTransaction from "../models/WalletTransaction";
import { topupSchema } from "../utils/zodSchema";

export const getBalance = async (req: CustomRequest, res: Response) => {
  try {
    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });

    res.status(200).json({
      data: {
        balance: wallet?.balance ?? 0,
      },
      message: "Balance retrieved successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to get balance",
      status: "failed",
    });
  }
};

export const getTopupHistory = async (req: CustomRequest, res: Response) => {
  try {
    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });

    const data = await WalletTransaction.find({
      wallet: wallet?._id,
    }).select("wallet price createdAt status");

    return res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Failed to get data",
      status: "failed",
    });
  }
};

export const topupBalance = async (req: CustomRequest, res: Response) => {
  try {
    // Debug logging
    console.log("Full request:", {
      body: req.body,
      user: req.user,
      headers: req.headers,
    });

    const parse = topupSchema.safeParse({
      balance: req.body.balance,
    });

    if (!parse.success) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid request data",
        errors: parse.error.issues,
      });
    }

    // Check if user exists
    if (!req?.user?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized",
        data: null,
      });
    }

    const wallet = await Wallet.findOne({
      user: req.user.id,
    });

    if (!wallet) {
      return res.status(404).json({
        status: "failed",
        message: "Wallet not found",
        data: null,
      });
    }

    // Create pending transaction
    const topup = new WalletTransaction({
      wallet: wallet?.id,
      price: parse.data.balance,
      status: "pending",
    });

    // Generate Midtrans payment URL
    const midtransUrl = process.env.MIDTRANS_TRANSACTION_URL ?? "";
    const midtransAuth = process.env.MIDTRANS_AUTH_STRING ?? "";

    const midtransRequest = new Request(midtransUrl, {
      method: "POST",
      body: JSON.stringify({
        transaction_details: {
          order_id: topup.id,
          gross_amount: parse.data.balance,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user?.email,
        },
        callbacks: {
          finish: process.env.SUCCESS_PAYMENT_REDIRECT,
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `BASIC ${midtransAuth}`,
      },
    });

    const midtransResponse = await fetch(midtransRequest);
    const midtransJson = await midtransResponse.json();

    // Save transaction after getting Midtrans response
    await topup.save();

    return res.status(200).json({
      status: "pending",
      message: "Waiting for payment",
      data: {
        transaction: topup,
        midtrans: midtransJson,
      },
    });
  } catch (error) {
    console.error("Topup error:", error);
    return res.status(500).json({
      data: null,
      message: "Failed to topup",
      status: "failed",
    });
  }
};

export const handleTopupBalance = async (req: Request, res: Response) => {
  try {
    // Add more detailed logging
    console.log("=== Webhook Request Details ===");
    console.log("Headers:", req.headers);
    console.log("Body:", JSON.stringify(req.body, null, 2));
    console.log("Transaction Status:", req.body.transaction_status);
    console.log("Order ID:", req.body.order_id);
    console.log("Gross Amount:", req.body.gross_amount);
    console.log("============================");

    const orderId = req.body.order_id;
    const transactionStatus = req.body.transaction_status;

    if (!orderId) {
      console.error("Missing order ID in webhook request");
      return res.status(400).json({
        status: "failed",
        message: "Order ID is required",
      });
    }

    // Find and log transaction details
    const walletTransaction = await WalletTransaction.findById(orderId);
    if (!walletTransaction) {
      console.error(`Transaction not found for ID: ${orderId}`);
      return res.status(404).json({
        status: "failed",
        message: "Transaction not found",
      });
    }

    console.log("Found wallet transaction:", {
      id: walletTransaction._id,
      status: walletTransaction.status,
      price: walletTransaction.price,
      walletId: walletTransaction.wallet,
    });

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      // Find wallet
      const wallet = await Wallet.findById(walletTransaction.wallet);
      if (!wallet) {
        console.error(`Wallet not found: ${walletTransaction.wallet}`);
        return res.status(404).json({
          status: "failed",
          message: "Wallet not found",
        });
      }

      console.log("Current wallet state:", {
        id: wallet._id,
        currentBalance: wallet.balance,
        topupAmount: walletTransaction.price,
      });

      // Update transaction first
      const updatedTransaction = await WalletTransaction.findByIdAndUpdate(
        orderId,
        { status: "success" },
        { new: true }
      );
      console.log("Updated transaction:", updatedTransaction);

      // Then update wallet balance
      const updatedWallet = await Wallet.findByIdAndUpdate(
        wallet._id,
        { $inc: { balance: walletTransaction.price } },
        { new: true }
      );
      console.log("Updated wallet balance:", {
        id: updatedWallet?._id,
        newBalance: updatedWallet?.balance,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Payment ${transactionStatus} processed successfully`,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to process payment notification",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
