import { loginUserWithToken } from '../api/userApi';
import { getCookie, removeCookie } from '../utils/handleCookies';
import { store } from '../store/store';
import { useContext } from 'react';

export const GetUser = () => {
  const token = getCookie('token');
  const globalState = useContext(store);
  const { dispatch } = globalState;

  if (token) {
    loginUserWithToken(token)
      .then((res) => {
        const user = {
          username: res.user.username,
          email: res.user.email,
          //   profile_image: res.user.profile_image,
        };
        dispatch({ type: 'SET_USER', payload: user });
        // Logged in with token
      })
      .catch(() => {
        // Token is corrupted
        removeCookie('token');
        dispatch({ type: 'RESET_APP' });
      });
  }
};
