import { Service } from 'typedi'

@Service()
export default class APIResponse {
    success<T>(data: T): { code: number; message: T }{
        return {
            code: 200,
            message: data,
        }
    }
}
