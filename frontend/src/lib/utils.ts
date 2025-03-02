import type { LoginResponse } from "@/services/auth/auth.type"
import { clsx, type ClassValue } from "clsx"
import secureLocalStorage from "react-secure-storage"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"


export const SESSION_KEY = 'SESSION_KEY'

export const LOCATION_OPTIONS = [
  "Banda Aceh", 
  "Denpasar", 
  "Serang", 
  "Bengkulu", 
  "Gorontalo", 
  "Jakarta", 
  "Jambi", 
  "Bandung", 
  "Semarang", 
  "Surabaya", 
  "Pontianak", 
  "Banjarmasin", 
  "Palangkaraya", 
  "Samarinda", 
  "Tanjung Pinang", 
  "Bandar Lampung", 
  "Ambon", 
  "Mataram", 
  "Kupang", 
  "Jayapura", 
  "Manokwari", 
  "Pekanbaru", 
  "Mamuju", 
  "Makassar", 
  "Palu", 
  "Kendari", 
  "Padang", 
  "Palembang", 
  "Medan", 
  "Yogyakarta"
];


export function rupiahFormat(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function dateFormat(val:Date|string, format="DD-MM-YYYY HH:mm"){
  return dayjs(val).format(format)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSession(){
  const session = secureLocalStorage.getItem(SESSION_KEY) as LoginResponse

  if(!session) return null

  return session
}