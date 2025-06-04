import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

// Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// log in form component
export const LoginPage = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setError(null);
    setFormLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate('/home');
    }
    catch (err) {
      setError(err.message || 'Log in failed. Please check your credentials.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-4 mb-10">
      <Card className='py-6 max-w-xs sm:max-w-sm md:max-w-2xl font-poppins'>
        <h2 className='text-2xl font-bold mb-6 font-lexend text-blue-text text-center'>Log in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Email'
            type='email'
            placeholder='Enter your email'
            register={register}
            name='email'
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            name="password"
            error={errors.password}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button type="submit" className="w-full mb-4" disabled={formLoading}>
            {formLoading ? 'Logging In...' : 'Log in'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-600 hover:underline" disabled={formLoading}>
            Sign up
          </button>
        </p>
      </Card>
    </div>
  );
};
