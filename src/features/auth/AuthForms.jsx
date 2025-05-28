import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from './AuthContext';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

// Zod schema for login form validation
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    age: z.number().min(1, "Age must be at least 1").max(120, "Age seems too high").int("Age must be an integer"),
    gender: z.enum(['male', 'female']),
    height: z.number().min(50, "Height must be at least 50 cm").max(250, "Height seems too high").int("Height must be an integer"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// log in form component
export const LoginForm = ({ onSwitch }) => {
    const { signIn } = useAuth();
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        setError(null); // clear previous errors
        try {
            await signIn(data.email, data.password);
        }
        catch (err){
            setError(err.message || 'Log in failed. Please check your credentials.');
        }
    };

    return (
        <Card className='max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label='Email'
                    type='email'
                    placeholder='Enter your email'
                    register={register}
                    name ='email'
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
                <Button type="submit" className="w-full mb-4">
                Log In
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={onSwitch} className="text-blue-600 hover:underline">
                Login
                </button>
            </p>
        </Card>
    );
};

// register form component
export const RegisterForm = ({ onSwitch }) => {
    const { signUp } = useAuth();
    const [error, setError] = useState(null);
  
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(registerSchema),
    });
  
    const onSubmit = async (data) => {
      setError(null); // Clear previous errors
      try {
        const { email, password, name, age, gender, height } = data;
        await signUp(email, password, {
          name,
          age: parseFloat(age), // Pastikan age di-parse sebagai number
          gender,
          height: parseFloat(height), // Pastikan height di-parse sebagai number
          currentWeight: 0,
          goalWeight: 0,
          currentBodyFat: 0,
          goalBodyFat: 0,
          goal: 'maintain'
        });
      } catch (err) {
        setError(err.message || 'Registration failed. Please try again.');
      }
    };
  
    return (
      <Card className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            placeholder="Enter your name"
            register={register}
            name="name"
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            name="email"
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
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            register={register}
            name="confirmPassword"
            error={errors.confirmPassword}
          />
          <Input
            label="Age"
            type="number"
            placeholder="Enter your age"
            register={register}
            name="age"
            error={errors.age}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              {...register("gender")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          <Input
            label="Height (cm)"
            type="number"
            placeholder="Enter your height in cm"
            register={register}
            name="height"
            error={errors.height}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button type="submit" className="w-full mb-4">
            Sign Up
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={onSwitch} className="text-blue-600 hover:underline">
            Login
          </button>
        </p>
      </Card>
    );
  };