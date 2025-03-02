export type BaseResponse<T> = {
    message: string
    status: string
    data: T
}