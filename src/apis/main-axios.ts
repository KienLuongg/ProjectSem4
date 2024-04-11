import axios from 'axios';
import { getCookie, setCookie } from '../utils/storage/cookie-storage';
import { Storage } from '../contstants/storage';
import { deleteLocalData } from '../utils/local-data-handler';

const baseURL = 'http://14.248.97.203:4869';

const mainAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const handleRefreshToken = async (
//   refreshToken: string,
//   isRequest: boolean,
//   originalConfig?: any
// ) => {
//   if (refreshToken && !isRefreshing) {
//     isRefreshing = true;

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/general/auth/refresh-token`,
//         { refreshToken }
//       );

//       const newToken = response?.data?.data?.accessToken;
//       const newRefreshToken = response?.data?.data?.refreshToken;

//       if (!newToken) {
//         deleteLocalData();
//       }

//       setCookie(Storage.token, newToken);
//       setCookie(Storage.refresh_token, newRefreshToken);

//       onTokenRefreshed(newToken);

//       if (isRequest) {
//         const config = {
//           ...originalConfig,
//           headers: {
//             ...originalConfig.headers,
//             Authorization: `Bearer ${response.data.data.accessToken}`,
//           },
//         };

//         return mainAxios(config);
//       }
//     } catch (error) {
//       deleteLocalData();
//       return Promise.reject(error);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// };
// nterceptor Phản Hồi để xử lý token hết hạn
mainAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie(Storage.refresh_token);
      try {
        const response = await mainAxios.post('/api/v1/auth/refresh-token', {
          refresh_token: refreshToken,
        });
        if (response.status === 200) {
          setCookie(Storage.token, response.data.token);
          setCookie(Storage.refresh_token, response.data.refresh_token);

          // Cập nhật header trong originalRequest
          originalRequest.headers['Authorization'] =
            `Bearer ${response.data.token}`;
          // Gửi lại yêu cầu với token mới
          return mainAxios(originalRequest);
        }
      } catch (refreshError) {
        console.log('Refresh token error:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default mainAxios;
