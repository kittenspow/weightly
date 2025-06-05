import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  age: z.number().refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 1 && parseInt(val) <= 120, "Age must be an integer between 1 and 120"),
  gender: z.enum(['male', 'female'], { message: "Gender is required" }),
  height: z.number().refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 50 && parseInt(val) <= 250, "Height must be an integer between 50 and 250 cm"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// register form component
export const RegisterPage = () => {
  const { signUp } = useAuth();
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setError(null); // Clear previous errors
    setFormLoading(true); // Mulai loading
    try {
      const { email, password, name, age, gender, height } = data;
      await signUp(email, password, {
        name,
        age: parseInt(age), // Pastikan age di-parse sebagai integer
        gender,
        height: parseInt(height), // Pastikan height di-parse sebagai integer
        currentWeight: 0,
        goalWeight: 0,
        currentBodyFat: 0,
        goalBodyFat: 0,
        goal: 'maintain'
      });
      // Jika register sukses, navigasi ke halaman utama
      navigate('/home'); // Atau '/' jika Anda ingin default ke WelcomePage setelah register
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setFormLoading(false); // Selesai loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mb-10">
      <Card className="py-6 max-w-xs sm:max-w-sm md:max-w-2xl font-poppins">
        <h2 className="text-2xl font-bold mb-6 font-lexend text-blue-text text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mb-6'>
            <div className="space-y-4">
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
            </div>
            <div className='space-y-4'>
              <Input
                label="Age"
                type="number" // Menggunakan type="number" di input
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
                  <option value="">Select Gender</option> {/* Tambahkan opsi default */}
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
              <Input
                label="Height (cm)"
                type="number" // Menggunakan type="number" di input
                placeholder="Enter your height in cm"
                register={register}
                name="height"
                error={errors.height}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button type="submit" className="w-full mb-4" disabled={formLoading}>
            {formLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline" disabled={formLoading}>
            Log in
          </button>
        </p>
      </Card>
    </div>
  );
};
