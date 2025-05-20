import axios from "axios";

const getAccessTokenFromLocalStorage = () => {
    return localStorage.getItem('access_token');
};

const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    }
});

// Set the Bearer token when the access token is available
const accessToken = getAccessTokenFromLocalStorage();
console.log(accessToken);
if (accessToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export default axiosInstance;
