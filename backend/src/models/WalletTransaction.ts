import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: true
    },
    price: {  // Changed from 'balance' to 'price' to match controller
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("WalletTransaction", walletTransactionSchema, "walletTransactions");