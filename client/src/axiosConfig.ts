import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();
    if (error.response.status === 401 || error.response.status === 400) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      Swal.fire({
        title: 'Sesión expirada',
        text: 'Tu sesión ha expirado, por favor inicia de nuevo.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión'
      }).then(() => {
        navigate('/login');
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
