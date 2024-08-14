import { jwtDecode } from 'jwt-decode';

export const checkToken = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);
    const timeInS = Date.now() / 1000;
    return decoded && decoded.exp && decoded.exp > timeInS;
  } catch (e) {
    return false;
  }

  //   console.log(timeInS);
  //   console.log(decoded);
};
export const getRole = () => {
  const token = localStorage.getItem('token');
  try {
    const decoded = jwtDecode(token);

    return decoded.role;
  } catch (e) {
    return null;
  }
};
