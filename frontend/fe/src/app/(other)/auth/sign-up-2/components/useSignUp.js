import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import httpClient from '@/helpers/httpClient';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showNotification } = useNotificationContext();

  const signUpFormSchema = yup.object({
    username: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) navigate(redirectLink); else navigate('/');
  };

  const signUp = handleSubmit(async (values) => {
    console.log('SignUp function called with values:', values);
    try {
      setLoading(true);
      const response = await fetch('https://be-cloud-computing-management-task-production.up.railway.app/api/users/', {
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

      if (res.message === "User created successfully") {
        console.log('Redirecting user...'); // Log before redirecting
        redirectUser();
        showNotification({
          message: 'Successfully signed up. Redirecting....',
          variant: 'success',
        });
      } else {
        showNotification({
          message: 'Sign up failed. Please try again.',
          variant: 'error',
        });
      }
    } catch (e) {
      console.error('Error during sign up:', e);
      showNotification({
        message: 'An error occurred. Please try again.',
        variant: 'error',
      });
    } finally {
      setLoading(false); // Set loading state to false after completion
    }
  });

  return {
    loading,
    signUp,
    control,
  };
};

export default useSignUp;
