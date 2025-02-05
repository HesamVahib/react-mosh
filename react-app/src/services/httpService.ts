import apiClient from "./api-client";

interface Entity {
    id: number
}

class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController()
        const request = apiClient
            .get<T[]>(this.endpoint, { signal: controller.signal })
        return { request, cancel: () => controller.abort() }
    }

    post<T>(entity: T) {
        return apiClient.post(this.endpoint, entity)
    }

    delete(id: number) {
        return apiClient.delete(`${this.endpoint}/${id}`)
    }

    update<T extends Entity>(entity: T) {
        return apiClient.patch<T>(`${this.endpoint}/${entity.id}`, entity)
    }
}

const createHttpService = (endpoint: string) => new HttpService(endpoint)

export default createHttpService;
