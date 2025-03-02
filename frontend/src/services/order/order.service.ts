import type { BaseResponse } from "@/types/response";
import type { Order } from "./order.type";
import { privateInstance } from "@/lib/axios";

export const getOrder = async (): Promise<BaseResponse<Order[]>> => privateInstance.get('/customer/orders').then(res => res.data);

export const getOrderDetail = async ( orderId:string ): Promise<BaseResponse<Order>> => privateInstance.get(`/customer/orders/${orderId}`).then(res => res.data);