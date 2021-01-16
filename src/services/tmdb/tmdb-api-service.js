import axios from 'axios';

const BASE_URI = 'https://api.themoviedb.org/3/';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGY4NjliNjNiMTM3M2UwMGNiZDBkYzA0MGY0Mjg4YyIsInN1YiI6IjYwMDEwMGUyMjIzZTIwMDAzZGI0ODY5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T1aXaX2hCQbR5DkhXZcNRZkmLbURrM4uOm6SzSPOSgY';

export default {
    get(path, params = {}) {
        params = { ...params };
        const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };
        return axios.get(`${BASE_URI}${path}`, { params, headers }).then(res => res.data);
    },
}