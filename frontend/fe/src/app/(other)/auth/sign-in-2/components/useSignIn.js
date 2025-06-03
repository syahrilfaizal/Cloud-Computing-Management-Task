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
    setLoading(true); // Start loading
    const res = await httpClient.post('https://be-cloud-computing-management-task-production.up.railway.app/api/login/', {
      username: values.username,
      password: values.password,
    });

    // Log response for debugging
    console.log(res);

    if (res.data.message === 'Login successful') {
      saveSession({
        ...(res.data ?? {}),
        username: res.data.username,
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
        message: e.response?.data?.error || 'An error occurred during login',
        variant: 'danger',
      });
    } else {
      showNotification({
        message: 'An unexpected error occurred',
        variant: 'danger',
      });
    }
  } finally {
    setLoading(false); // Reset loading state after process is done
  }
});


  return {
    loading,
    login,
    control
  };
};

export default useSignIn;
