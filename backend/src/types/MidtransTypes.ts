export interface MidtransNotification {
  transaction_time: string;
  transaction_status: "capture" | "settlement" | "deny" | "cancel" | "expire" | "failure" | "pending";
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status: string;
  currency: string;
}