export interface APIResponse {
    error?: string;
    message?: string;
    data?: { [key: string]: any };
}