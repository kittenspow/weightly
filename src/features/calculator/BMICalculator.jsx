import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { calculateBMI } from '../../lib/utils';

// Zod schema for BMI form validation
const bmiSchema = z.object({
  weight: z.number().min(1, "Weight is required").max(300, "Weight seems too high"),
  height: z.number().min(50, "Height is required").max(250, "Height seems too high"),
});

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
  if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
  if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
  return { category: 'Obese', color: 'text-red-600' };
};

// bmi calculator component
const BMICalculator = () => {
  const [calculatedBMIResult, setCalculatedBMIResult] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bmiSchema),
    defaultValues: { weight: '', height: '' }
  });

  const onCalculateBMI = (data) => {
    const bmiValue = calculateBMI(parseFloat(data.weight), parseFloat(data.height));
    setCalculatedBMIResult(bmiValue);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">BMI Calculator</h3>
        <form onSubmit={handleSubmit(onCalculateBMI)}>
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
          <Button type="submit" className="w-full mt-4">Calculate BMI</Button>
          {calculatedBMIResult !== null && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold text-lg">Your BMI: {calculatedBMIResult.toFixed(1)}</h4>
              <p className={`${getBMICategory(calculatedBMIResult).color} font-medium`}>
                Category: {getBMICategory(calculatedBMIResult).category}
              </p>
            </div>
          )}
        </form>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">About BMI</h3>
        <div className="space-y-3 text-sm">
          <p><strong>BMI Categories:</strong></p>
          <ul className="space-y-1 ml-4 list-disc list-inside">
            <li>Underweight: Less than 18.5</li>
            <li>Normal weight: 18.5-24.9</li>
            <li>Overweight: 25-29.9</li>
            <li>Obese: 30 or greater</li>
          </ul>
          <p className="text-gray-600 mt-3">
            BMI is a screening tool but doesn't measure body fat directly.
            Athletes with high muscle mass may have a high BMI but low body fat.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BMICalculator;