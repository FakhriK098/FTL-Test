import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  UserData,
} from '../../slice/authSlice/authSlice';
import { AppDispatch, RootState } from '../../store/store';

// Interface untuk struktur error dari API (sesuaikan jika berbeda)
interface ErrorResponse {
  message: string;
}

export const useSignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const signIn = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      // Menambahkan generic type <UserData> pada axios.post agar response.data otomatis strongly-typed
      const response = await axios.post<UserData>(
        'https://uat-api.ftlgym.com/api/v1/test/login',
        {
          email,
          password,
        },
      );
      const userData = response.data;
      console.log('Data user dari API:', userData);
      dispatch(loginSuccess(userData));

      return { success: true, data: userData };
    } catch (err) {
      // Type casting err menjadi AxiosError dengan format body response error
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Gagal terhubung ke server';

      dispatch(loginFailure(errorMessage));

      return { success: false, error: errorMessage };
    }
  };

  return { signIn, isLoading, error, isAuthenticated, user };
};
