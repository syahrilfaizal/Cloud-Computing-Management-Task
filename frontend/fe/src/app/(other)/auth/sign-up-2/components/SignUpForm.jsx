import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { Button, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useSignUp from './useSignUp';

const SignUpForm = () => {
  const { loading, signUp, control } = useSignUp();

  return (
    <form className="authentication-form" onSubmit={signUp}>
      <TextFormInput 
        control={control} 
        name="username" 
        containerClassName="mb-3" 
        label="Username" 
        id="username-id" 
        placeholder="Enter your username" 
      />

      <PasswordFormInput 
        control={control} 
        name="password" 
        containerClassName="mb-3" 
        placeholder="Enter your password" 
        id="password-id" 
        label="Password"
      />

      <div className="mb-3">
        <FormCheck label="I accept the Terms and Conditions" id="sign-up" />
      </div>

      <div className="mb-1 text-center d-grid">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </div>
      
      <div className="text-center mt-3">
        <span>Already have an account? </span>
        <Link to="/auth/sign-in">Sign In</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
