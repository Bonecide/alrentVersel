import axios from "axios";
export const baseUrl = "http://ovz1.j27349654.wmekm.vps.myjino.ru/api/v1/"

const createInstance = (token) => {
    return axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const MainApi = {
    async getData(token, endpoint) {
        const instance = createInstance(token);
        try {
            const response = await instance.get(`${endpoint}`);
            return {data: response.data, status: response.status};
        } catch (error) {
            return {data: error.response.data, status: error.status};
        }
    },
}