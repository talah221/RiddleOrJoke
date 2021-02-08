import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/joke'
    : '//localhost:3030/api/joke'



export default () => {
    const getAll = async () => {
        const { data } = await axios.get(BASE_URL);
        return data;
    };

    const create = async (data) => await axios.post(`${BASE_URL}`, data);
    const like = async (item) => axios.put(`${BASE_URL}/${item._id}`,item);
    const update = async (item) => axios.put(`${BASE_URL}/${item._id}`,item);

    return { getAll, create, like,update };
};