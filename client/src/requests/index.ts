import axios from "axios";

const instance = axios. create({ baseURL: 'http://localhost:3000' , headers: {'Content-Type': 'application/json'} });

export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
}