interface Transaction {
  wallet: string;
  price: number;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MidtransResponse {
  token: string;
  redirect_url: string;
}

export interface TopupResponse {
  transaction: Transaction;
  midtrans: MidtransResponse;
}

export interface WalletTransaction {
  _id: string;
  wallet: string;
  price: number;
  status: string;
  createdAt: string;
}
