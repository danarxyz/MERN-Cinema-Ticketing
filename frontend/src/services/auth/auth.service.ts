import type { BaseResponse } from "@/types/response";
import { z } from "zod";
import type { LoginResponse } from "./auth.type";
import { globalInstance } from "@/lib/axios";

export const authSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "customer"]),
});

export const registerSchema = authSchema.omit({ role: true }).extend({
  photo: z
    .any()
    .refine((file: File) => file?.name, { message: "Photo is required" }),
});

export const loginSchema = authSchema.omit({ name: true });

export type RegisterValues = z.infer<typeof registerSchema>;

export type LoginValues = z.infer<typeof loginSchema>;

export const authRegister = async (data: FormData) =>
  globalInstance
    .post("/auth/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const login = async (
  data: LoginValues
): Promise<BaseResponse<LoginResponse>> =>
  globalInstance.post("/auth/login", data).then((res) => res.data);
