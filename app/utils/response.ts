import { Service } from 'typedi'

@Service()
export default class APIResponse {
    success<T>(data: T){
        return {
            code: 200,
            message: data,
        }
    }
}