import { BaseResponse } from "@/types/response";
import { TopupResponse, WalletTransaction } from "./wallet.type";
import { privateInstance } from "@/lib/axios";

export const getWalletTransaction = async (): Promise<BaseResponse<WalletTransaction[]>> =>
  privateInstance.get("/customer/topup-history").then((res) => res.data);

export const topupWallet = async (data: {balance:number}): Promise<BaseResponse<TopupResponse>> =>
  privateInstance.post("/customer/topup", data).then((res) => res.data);