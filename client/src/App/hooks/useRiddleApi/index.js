import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/riddle'
    : '//localhost:3030/api/riddle'

export default () => {
    const getAll = async () => {
        const { data } = await axios.get(BASE_URL);
        return data;
    };

    const create = async (data) => axios.post(`${BASE_URL}`, data);

    const like = async (item) => axios.put(`${BASE_URL}/${item._id}`, item);
    const update = async (item) => axios.put(`${BASE_URL}/${item._id}`, item);
    const verifyAnswer = async ({ _id, }, selectedAnswer) => {
        const { data } = await axios.get(`${BASE_URL}/${_id}/verify?answer=${selectedAnswer}`);
        return data;
    };

    return { getAll, create, like, verifyAnswer,update };
};