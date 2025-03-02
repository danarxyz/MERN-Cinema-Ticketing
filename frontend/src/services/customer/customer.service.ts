import { privateInstance } from "@/lib/axios"
import type { BaseResponse } from "@/types/response";
import { Transaction, User, Wallet, WalletTransaction } from "./customer.type";

export const getCustomers = (): Promise<BaseResponse<User[]>> => privateInstance.get('/admin/customers').then(res => res.data);

export const getTransaction = (): Promise<BaseResponse<Transaction[]>> => privateInstance.get('/admin/ticket-transaction').then(res => res.data);

export const getWalletTransaction = (): Promise<BaseResponse<WalletTransaction[]>> => privateInstance.get('/admin/wallet-transaction').then(res => res.data);