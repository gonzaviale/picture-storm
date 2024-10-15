import axios from 'axios';
import Swal from 'sweetalert2';


axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      Swal.fire({
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado, por favor inicia de nuevo.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión'
      }).then(() => {
        window.location.href = '/login';
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
