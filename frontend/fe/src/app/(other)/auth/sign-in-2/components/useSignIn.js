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
    password: yup.string().required('Please enter your password'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) navigate(redirectLink); else navigate('/');
  };

  const login = handleSubmit(async (values) => {
    console.log('Login function called with values:', values);
    try {
      setLoading(true);
      const response = await fetch('https://be-cloud-computing-management-task-production.up.railway.app/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log('API response:', res);

      if (res.message === "Login successful") {
        console.log('Redirecting user...'); // Log before redirecting

        // Save session data
        saveSession({
          username: values.username,
          token: res.token, // Assuming the API returns a token
        });

        redirectUser();
        showNotification({
          message: 'Successfully logged in. Redirecting....',
          variant: 'success'
        });
      } else {
        showNotification({
          message: 'Login failed. Please check your credentials.',
          variant: 'error'
        });
      }
    } catch (e) {
      console.error('Error during login:', e);
      showNotification({
        message: 'An error occurred. Please try again.',
        variant: 'error'
      });
    } finally {
      setLoading(false); // Set loading state to false after completion
    }
  });

  return {
    loading,
    login,
    control
  };
};

export default useSignIn;
