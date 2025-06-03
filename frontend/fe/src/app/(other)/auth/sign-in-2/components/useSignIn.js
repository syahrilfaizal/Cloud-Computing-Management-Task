import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import httpClient from '@/helpers/httpClient';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveSession } = useAuthContext();
  const [searchParams] = useSearchParams();
  const { showNotification } = useNotificationContext();

  const loginFormSchema = yup.object({
    username: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password')
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) navigate(redirectLink);
    else navigate('/');
  };

  const login = handleSubmit(async (values) => {
    try {
      setLoading(true); // Mulai loading
      const res = await httpClient.post('https://be-cloud-computing-management-task-production.up.railway.app/api/login', {
        username: values.username,  // Sesuaikan dengan nama input
        password: values.password,  // Sesuaikan dengan nama input
      });

      // Menggunakan `message` dari respons API untuk memverifikasi login berhasil
      if (res.data.message === 'Login successful') {
        saveSession({
          ...(res.data ?? {}),
          username: res.data.username,  // Menyimpan username jika tidak ada token
        });
        redirectUser();
        showNotification({
          message: 'Successfully logged in. Redirecting....',
          variant: 'success',
        });
      }
    } catch (e) {
      console.error(e); // Debugging error
      if (e.response?.data?.error) {
        showNotification({
          message: e.response?.data?.error,
          variant: 'danger',
        });
      }
    } finally {
      setLoading(false); // Reset loading state setelah proses selesai
    }
  });

  return {
    loading,
    login,
    control
  };
};

export default useSignIn;
