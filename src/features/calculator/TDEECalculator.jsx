import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { calculateTDEE } from '../../lib/calculateTDEE'; 

// Zod schema for TDEE form validation
const tdeeSchema = z.object({
  weight: z.number().min(1, "Weight is required").max(300, "Weight seems too high"),
  height: z.number().min(50, "Height is required").max(250, "Height seems too high"),
  age: z.number().min(1, "Age is required").max(120, "Age seems too high"),
  gender: z.enum(['male', 'female']),
  activity: z.enum(['sedentary', 'light', 'moderate', 'active', 'extra']),
});


// tdee calculator component
const TDEECalculator = () => {
  const [calculatedTDEEResult, setCalculatedTDEEResult] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(tdeeSchema),
    defaultValues: { weight: '', height: '', age: '', gender: 'male', activity: 'sedentary' }
  });

  const onCalculateTDEE = (data) => {
    const tdeeValue = calculateTDEE(
        parseFloat(data.weight),
        parseFloat(data.height),
        parseFloat(data.age),
        data.gender,
        data.activity
    );
    setCalculatedTDEEResult(tdeeValue);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">TDEE Calculator</h3>
        <form onSubmit={handleSubmit(onCalculateTDEE)}>
          <Input
            label="Weight (kg)"
            type="number"
            placeholder="Enter your weight"
            register={register}
            name="weight"
            error={errors.weight}
          />
          <Input
            label="Height (cm)"
            type="number"
            placeholder="Enter your height"
            register={register}
            name="height"
            error={errors.height}
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
              {...register("gender", { valueAsNumber: false })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
            <select
              {...register("activity", { valueAsNumber: false })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (hard exercise 6-7 days/week)</option>
              <option value="extra">Extra Active (very hard exercise, physical job)</option>
            </select>
            {errors.activity && <p className="text-red-500 text-xs mt-1">{errors.activity.message}</p>}
          </div>
          <Button type="submit" className="w-full mt-4">Calculate TDEE</Button>
          {calculatedTDEEResult !== null && (
            <div className="mt-4 p-4 bg-purple-50 rounded-md">
              <h4 className="font-semibold text-lg">Your TDEE: {Math.round(calculatedTDEEResult)} calories/day</h4>
              <div className="mt-2 space-y-1 text-sm">
                <p>• Weight loss: {Math.round(calculatedTDEEResult - 500)} cal/day</p>
                <p>• Maintenance: {Math.round(calculatedTDEEResult)} cal/day</p>
                <p>• Weight gain: {Math.round(calculatedTDEEResult + 500)} cal/day</p>
              </div>
            </div>
          )}
        </form>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">About TDEE</h3>
        <div className="space-y-3 text-sm">
          <p><strong>Total Daily Energy Expenditure (TDEE)</strong> is the total number of calories you burn in a day.</p>

          <p><strong>Activity Levels:</strong></p>
          <ul className="ml-4 space-y-1 list-disc list-inside">
            <li><strong>Sedentary:</strong> Desk job, no exercise</li>
            <li><strong>Light:</strong> Light exercise 1-3 days/week</li>
            <li><strong>Moderate:</strong> Moderate exercise 3-5 days/week</li>
            <li><strong>Active:</strong> Hard exercise 6-7 days/week</li>
            <li><strong>Extra Active:</strong> Very intense exercise + physical job</li>
          </ul>

          <p><strong>Calorie Guidelines:</strong></p>
          <ul className="ml-4 space-y-1 list-disc list-inside">
            <li>500 cal deficit = ~1 lb/week loss</li>
            <li>500 cal surplus = ~1 lb/week gain</li>
            <li>1 lb fat = ~3,500 calories</li>
          </ul>

          <p className="text-gray-600 mt-3">
            This calculator uses the Harris-Benedict equation. Individual metabolism can vary by ±15%.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TDEECalculator;