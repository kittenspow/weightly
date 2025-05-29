import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { calculateBodyFatNavy } from '../../lib/utils';

// Zod schema for Body Fat form validation
const bodyFatSchema = z.object({
  gender: z.enum(['male', 'female']),
  height: z.number().min(50, "Height is required").max(250, "Height seems too high"),
  waist: z.number().min(1, "Waist is required"),
  neck: z.number().min(1, "Neck is required"),
  hip: z.number().optional(), // optional for males
}).superRefine((data, ctx) => {
  if (data.gender === 'female' && !data.hip) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Hip circumference is required for females",
      path: ['hip'],
    });
  }
});

// body fat calculator component
const BodyFatCalculator = () => {
  const [calculatedBodyFatResult, setCalculatedBodyFatResult] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(bodyFatSchema),
    defaultValues: { gender: 'male', height: '', waist: '', neck: '', hip: '' }
  });

  const bfWatchGender = watch('gender'); // Watch gender to conditionally show hip input

  const onCalculateBodyFat = (data) => {
    const bodyFatValue = calculateBodyFatNavy(
        data.gender,
        parseFloat(data.waist),
        parseFloat(data.neck),
        parseFloat(data.hip) || 0, // hip is optional for males, so default to 0
        parseFloat(data.height)
    );
    setCalculatedBodyFatResult(bodyFatValue);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">Body Fat Calculator (US Navy Method)</h3>
        <form onSubmit={handleSubmit(onCalculateBodyFat)}>
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
          <Input
            label="Height (cm)"
            type="number"
            placeholder="Enter your height"
            register={register}
            name="height"
            error={errors.height}
          />
          <Input
            label="Waist Circumference (cm)"
            type="number"
            placeholder="Measure at narrowest point"
            register={register}
            name="waist"
            error={errors.waist}
          />
          <Input
            label="Neck Circumference (cm)"
            type="number"
            placeholder="Measure below Adam's apple"
            register={register}
            name="neck"
            error={errors.neck}
          />
          {bfWatchGender === 'female' && (
            <Input
              label="Hip Circumference (cm)"
              type="number"
              placeholder="Measure at widest point"
              register={register}
              name="hip"
              error={errors.hip}
            />
          )}
          <Button type="submit" className="w-full mt-4">Calculate Body Fat</Button>
          {calculatedBodyFatResult !== null && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <h4 className="font-semibold text-lg">Your Body Fat: {calculatedBodyFatResult.toFixed(1)}%</h4>
            </div>
          )}
        </form>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">About Body Fat Percentage</h3>
        <div className="space-y-3 text-sm">
          <p><strong>Healthy Body Fat Ranges:</strong></p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Men:</p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>Essential fat: 2-5%</li>
                <li>Athletes: 6-13%</li>
                <li>Fitness: 14-17%</li>
                <li>Average: 18-24%</li>
                <li>Obese: 25%+</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Women:</p>
              <ul className="ml-4 space-y-1 list-disc list-inside">
                <li>Essential fat: 10-13%</li>
                <li>Athletes: 14-20%</li>
                <li>Fitness: 21-24%</li>
                <li>Average: 25-31%</li>
                <li>Obese: 32%+</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-600 mt-3">
            The US Navy method is more accurate than BMI for assessing body composition,
            but DEXA scans and hydrostatic weighing are more precise.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BodyFatCalculator;
