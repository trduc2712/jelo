import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const refreshAccessToken = async () => {
  try {
    console.log('Refreshing token...');
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = res.data.newAccessToken;
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
      onTokenRefreshed(newAccessToken);
      return newAccessToken;
    } else {
      throw new Error('Cannot get new access token');
    }
  } catch (err) {
    localStorage.clear();
    window.location.href = '/auth/login';
    throw err;
  }
};

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!err.response) return Promise.reject(err);

    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        isRefreshing = false;

        return axiosClient({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return err.response;
  }
);

export default axiosClient;
