import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { calculateBMI, calculateBodyFatNavy, calculateTDEE } from '../lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod schemas for calculator forms
const bmiSchema = z.object({
  weight: z.number().min(1, "Weight is required").max(300, "Weight seems too high"),
  height: z.number().min(50, "Height is required").max(250, "Height seems too high"),
});

const bodyFatSchema = z.object({
  gender: z.enum(['male', 'female']),
  height: z.number().min(50, "Height is required").max(250, "Height seems too high"),
  waist: z.number().min(1, "Waist is required"),
  neck: z.number().min(1, "Neck is required"),
  hip: z.number().optional(), // Optional for males
}).superRefine((data, ctx) => {
  if (data.gender === 'female' && !data.hip) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Hip circumference is required for females",
      path: ['hip'],
    });
  }
});

const tdeeSchema = z.object({
  weight: z.number().min(1, "Weight is required").max(300, "Weight seems too high"),
  height: z.number().min(50, "Height is required").max(250, "Height seems too high"),
  age: z.number().min(1, "Age is required").max(120, "Age seems too high"),
  gender: z.enum(['male', 'female']),
  activity: z.enum(['sedentary', 'light', 'moderate', 'active', 'extra']),
});

/**
 * Calculator Page component for BMI, Body Fat, and TDEE calculations.
 */
const CalculatorPage = () => {
  const [activeCalculator, setActiveCalculator] = useState('bmi');

  // BMI Calculator state and form
  const [calculatedBMIResult, setCalculatedBMIResult] = useState(null); // State untuk menyimpan hasil BMI
  const { register: bmiRegister, handleSubmit: handleBmiFormSubmit, watch: watchBmi, formState: { errors: bmiErrors } } = useForm({
    resolver: zodResolver(bmiSchema),
    defaultValues: { weight: '', height: '' }
  });
  const bmiWatchWeight = watchBmi('weight');
  const bmiWatchHeight = watchBmi('height');

  const onCalculateBMI = (data) => {
    const bmiValue = calculateBMI(parseFloat(data.weight), parseFloat(data.height));
    setCalculatedBMIResult(bmiValue);
  };

  // Body Fat Calculator state and form
  const [calculatedBodyFatResult, setCalculatedBodyFatResult] = useState(null); // State untuk menyimpan hasil Body Fat
  const { register: bodyFatRegister, handleSubmit: handleBodyFatFormSubmit, watch: watchBodyFat, formState: { errors: bodyFatErrors } } = useForm({
    resolver: zodResolver(bodyFatSchema),
    defaultValues: { gender: 'male', height: '', waist: '', neck: '', hip: '' }
  });
  const bfWatchGender = watchBodyFat('gender');
  const bfWatchHeight = watchBodyFat('height');
  const bfWatchWaist = watchBodyFat('waist');
  const bfWatchNeck = watchBodyFat('neck');
  const bfWatchHip = watchBodyFat('hip');

  const onCalculateBodyFat = (data) => {
    const bodyFatValue = calculateBodyFatNavy(
        data.gender,
        parseFloat(data.waist),
        parseFloat(data.neck),
        parseFloat(data.hip) || 0,
        parseFloat(data.height)
    );
    setCalculatedBodyFatResult(bodyFatValue);
  };

  // TDEE Calculator state and form
  const [calculatedTDEEResult, setCalculatedTDEEResult] = useState(null); // State untuk menyimpan hasil TDEE
  const { register: tdeeRegister, handleSubmit: handleTdeeFormSubmit, watch: watchTdee, formState: { errors: tdeeErrors } } = useForm({
    resolver: zodResolver(tdeeSchema),
    defaultValues: { weight: '', height: '', age: '', gender: 'male', activity: 'sedentary' }
  });
  const tdeeWatchWeight = watchTdee('weight');
  const tdeeWatchHeight = watchTdee('height');
  const tdeeWatchAge = watchTdee('age');
  const tdeeWatchGender = watchTdee('gender');
  const tdeeWatchActivity = watchTdee('activity');

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


  const TabButton = ({ id, children, active }) => (
    <button
      onClick={() => {
        setActiveCalculator(id);
        // Reset results when switching tabs
        setCalculatedBMIResult(null);
        setCalculatedBodyFatResult(null);
        setCalculatedTDEEResult(null);
      }}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      {children}
    </button>
  );

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Health Calculators</h1>

      <div className="flex gap-2 mb-6">
        <TabButton id="bmi" active={activeCalculator === 'bmi'}>BMI Calculator</TabButton>
        <TabButton id="bodyfat" active={activeCalculator === 'bodyfat'}>Body Fat Calculator</TabButton>
        <TabButton id="tdee" active={activeCalculator === 'tdee'}>TDEE Calculator</TabButton>
      </div>

      {activeCalculator === 'bmi' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">BMI Calculator</h3>
            <form onSubmit={handleBmiFormSubmit(onCalculateBMI)}>
              <Input
                label="Weight (kg)"
                type="number"
                placeholder="Enter your weight"
                register={bmiRegister}
                name="weight"
                error={bmiErrors.weight}
              />
              <Input
                label="Height (cm)"
                type="number"
                placeholder="Enter your height"
                register={bmiRegister}
                name="height"
                error={bmiErrors.height}
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
      )}

      {activeCalculator === 'bodyfat' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Body Fat Calculator (US Navy Method)</h3>
            <form onSubmit={handleBodyFatFormSubmit(onCalculateBodyFat)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  {...bodyFatRegister("gender", { valueAsNumber: false })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {bodyFatErrors.gender && <p className="text-red-500 text-xs mt-1">{bodyFatErrors.gender.message}</p>}
              </div>
              <Input
                label="Height (cm)"
                type="number"
                placeholder="Enter your height"
                register={bodyFatRegister}
                name="height"
                error={bodyFatErrors.height}
              />
              <Input
                label="Waist Circumference (cm)"
                type="number"
                placeholder="Measure at narrowest point"
                register={bodyFatRegister}
                name="waist"
                error={bodyFatErrors.waist}
              />
              <Input
                label="Neck Circumference (cm)"
                type="number"
                placeholder="Measure below Adam's apple"
                register={bodyFatRegister}
                name="neck"
                error={bodyFatErrors.neck}
              />
              {bfWatchGender === 'female' && (
                <Input
                  label="Hip Circumference (cm)"
                  type="number"
                  placeholder="Measure at widest point"
                  register={bodyFatRegister}
                  name="hip"
                  error={bodyFatErrors.hip}
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
      )}

      {activeCalculator === 'tdee' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">TDEE Calculator</h3>
            <form onSubmit={handleTdeeFormSubmit(onCalculateTDEE)}>
              <Input
                label="Weight (kg)"
                type="number"
                placeholder="Enter your weight"
                register={tdeeRegister}
                name="weight"
                error={tdeeErrors.weight}
              />
              <Input
                label="Height (cm)"
                type="number"
                placeholder="Enter your height"
                register={tdeeRegister}
                name="height"
                error={tdeeErrors.height}
              />
              <Input
                label="Age"
                type="number"
                placeholder="Enter your age"
                register={tdeeRegister}
                name="age"
                error={tdeeErrors.age}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  {...tdeeRegister("gender", { valueAsNumber: false })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {tdeeErrors.gender && <p className="text-red-500 text-xs mt-1">{tdeeErrors.gender.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <select
                  {...tdeeRegister("activity", { valueAsNumber: false })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (light exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                  <option value="active">Active (hard exercise 6-7 days/week)</option>
                  <option value="extra">Extra Active (very hard exercise, physical job)</option>
                </select>
                {tdeeErrors.activity && <p className="text-red-500 text-xs mt-1">{tdeeErrors.activity.message}</p>}
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
      )}

      {/* Information Section */}
      <Card className="mt-8">
        <h3 className="text-xl font-semibold mb-4">How These Calculations Work</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">BMI Formula</h4>
            <p className="text-gray-600">
              BMI = weight (kg) / height (m)²
            </p>
            <p className="mt-2 text-gray-600">
              Simple but doesn't distinguish between muscle and fat mass.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">US Navy Body Fat Formula</h4>
            <p className="text-gray-600 mb-2"><strong>Men:</strong></p>
            <p className="text-xs text-gray-500">%BF = 86.010×log₁₀(waist - neck) - 70.041×log₁₀(height) + 36.76</p>
            <p className="text-gray-600 mb-2 mt-2"><strong>Women:</strong></p>
            <p className="text-xs text-gray-500">%BF = 163.205×log₁₀(waist + hip - neck) - 97.684×log₁₀(height) - 78.387</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Harris-Benedict BMR</h4>
            <p className="text-gray-600 mb-2"><strong>Men:</strong></p>
            <p className="text-xs text-gray-500">BMR = 88.362 + (13.397×weight) + (4.799×height) - (5.677×age)</p>
            <p className="text-gray-600 mb-2 mt-2"><strong>Women:</strong></p>
            <p className="text-xs text-gray-500">BMR = 447.593 + (9.247×weight) + (3.098×height) - (4.330×age)</p>
            <p className="text-gray-600 mt-2">TDEE = BMR × Activity Factor</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalculatorPage;
