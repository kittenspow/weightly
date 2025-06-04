import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { calculateBodyFatNavy } from '../../lib/calculateBodyFatNavy';

// zod schema for Body Fat form validation
const bodyFatSchema = z.object({
  gender: z.enum(['male', 'female']),
  // preprocess untuk convert nilai input menjadi angka
  height: z.preprocess(
    (val) => Number(val), // convert string kosong menjadi 0 atau NaN
    z.number().min(1, "Height is required and must be a positive number (at least 1 cm)").max(250, "Height seems too high")
  ),
  waist: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Waist is required and must be a positive number (at least 1 cm)")
  ),
  neck: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Neck is required and must be a positive number (at least 1 cm)")
  ),
  // untuk hip opsional, convert string kosong menjadi undefined
  hip: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().optional()
  ),
}).superRefine((data, ctx) => {
  // validasi untuk hip for female
  if (data.gender === 'female' && (data.hip === undefined || data.hip === null)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Hip circumference is required for females",
      path: ['hip'],
    });
  }

  // validation untuk memastikan argumen logaritma positif
  if (data.gender === 'male') {
    if (data.waist - data.neck <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Waist circumference must be greater than neck circumference for calculation.",
        path: ['waist'], 
      });
    }
  } else { // female
    if (data.waist + (data.hip || 0) - data.neck <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Combined waist and hip circumference must be greater than neck circumference for calculation.",
        path: ['waist'], 
      });
    }
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
          These calculations offer a general estimate, relying on broad assumptions. For precise body fat measurements, specialized tools like bioelectric impedance analysis or hydrostatic density testing are recommended.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default BodyFatCalculator;
