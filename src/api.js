import axios from 'axios';
    
    const api = axios.create({
        baseURL: 'https://api.github.com' // api do github
    });

    export default api;