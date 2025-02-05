import apiClient from "./api-client";
import createHttpService from "./httpService";

export interface User {
    id: number
    name: string
}

export default createHttpService('/users');