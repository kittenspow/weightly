import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Activity, CheckCircle, X } from 'lucide-react';
import { calculateBodyFatNavy } from '../../../lib/calculateBodyFatNavy';
import { useAuth } from '../../auth/AuthContext'; // to get user's data (height, age, gender)

// Zod schema for body fat manual entry
const bodyFatManualEntrySchema = z.object({
  bodyFat: z.number().min(1, "Body Fat is required").max(100, "Body Fat seems too high"),
});

// Zod schema for body fat US navy method
const bodyFatNavyEntrySchema = z.object({
  waist: z.number().min(1, "Waist is required"),
  neck: z.number().min(1, "Neck is required"),
  hip: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().optional()
  ), // optional for males
}).superRefine((data, ctx) => {
  if (data.gender === 'female' && !data.hip) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Hip circumference is required for females",
      path: ['hip'],
    });
  }
});

/**
 * BodyFatEntryForm component handles the form for adding new body fat entries.
 * Allows selection between manual input and US Navy method.
 * @param {object} props - Component props.
 * @param {function} props.onAddBodyFatEntry - Callback function to add a new body fat entry.
 */
const BodyFatEntryForm = ({ onAddBodyFatEntry }) => {
  const { user } = useAuth(); // Get user profile for gender and height
  const [bodyFatMethod, setBodyFatMethod] = useState('manual');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedBodyFat, setSubmittedBodyFat] = useState(null);
  const [submissionMethod, setSubmissionMethod] = useState(null);

  // Form for Body Fat Manual Entry
  const { register: bfManualRegister, handleSubmit: handleBfManualSubmitForm, reset: resetBfManualForm, formState: { errors: bfManualErrors } } = useForm({
    resolver: zodResolver(bodyFatManualEntrySchema),
    defaultValues: { bodyFat: '' }
  });

  // Form for Body Fat US Navy Method Entry
  const { register: bfNavyRegister, handleSubmit: handleBfNavySubmitForm, watch: watchBfNavy, reset: resetBfNavyForm, formState: { errors: bfNavyErrors } } = useForm({
    resolver: zodResolver(bodyFatNavyEntrySchema),
    defaultValues: { waist: '', neck: '', hip: '' }
  });
  const bfNavyWaist = watchBfNavy('waist');
  const bfNavyNeck = watchBfNavy('neck');
  const bfNavyHip = watchBfNavy('hip');
  const bfNavyGender = user?.profile?.gender || 'male'; // get gender from user profile

  const calculatedNavyBodyFat = bfNavyWaist && bfNavyNeck && user?.profile?.height && (bfNavyGender === 'male' || bfNavyHip)
    ? calculateBodyFatNavy(
      bfNavyGender,
      parseFloat(bfNavyWaist),
      parseFloat(bfNavyNeck),
      parseFloat(bfNavyHip) || 0,
      user.profile.height
    )
    : null;

  const handleBodyFatEntry = async (data) => {
    let bodyFatValue;
    let method;
    if (bodyFatMethod === 'navy') {
      if (calculatedNavyBodyFat === null) {
        console.error("Cannot add body fat entry: US Navy calculation incomplete or invalid inputs.");
        return;
      }
      bodyFatValue = Math.round(calculatedNavyBodyFat * 10) / 10; // 25.784... → 25.8
      method = 'US Navy Method';
      resetBfNavyForm();
    } else {
      bodyFatValue = Math.round(data.bodyFat * 10) / 10;
      method = 'Manual Input';
      resetBfManualForm();
    }
    await onAddBodyFatEntry(bodyFatValue);
    setSubmittedBodyFat(bodyFatValue);
    setSubmissionMethod(method);
    setShowConfirmation(true);
  };
  const closeConfirmation = () => {
    setShowConfirmation(false);
    setSubmittedBodyFat(null);
    setSubmissionMethod(null);
  };


  return (
    <>
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          Body Fat Entry
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
          <select
            value={bodyFatMethod}
            onChange={(e) => setBodyFatMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="manual">Manual Input</option>
            <option value="navy">US Navy Method</option>
          </select>
        </div>

        {bodyFatMethod === 'manual' ? (
          // manual input
          <form onSubmit={handleBfManualSubmitForm(handleBodyFatEntry)}>
            <Input
              label="Body Fat Percentage (%)"
              type="number"
              step="0.01"
              placeholder="Enter your body fat percentage"
              register={bfManualRegister}
              name="bodyFat"
              error={bfManualErrors.bodyFat}
            />
            <Button type="submit" className="w-full">
              Add Body Fat Entry
            </Button>
          </form>
        ) : ( // calculate using US navy method first
          <form onSubmit={handleBfNavySubmitForm(handleBodyFatEntry)}>
            <div className="space-y-4">
              <Input
                label="Waist Circumference (cm)"
                type="number"
                step="0.1"
                placeholder="Measure at narrowest point"
                register={bfNavyRegister}
                name="waist"
                error={bfNavyErrors.waist}
              />
              <Input
                label="Neck Circumference (cm)"
                type="number"
                step="0.1"
                placeholder="Measure below Adam's apple"
                register={bfNavyRegister}
                name="neck"
                error={bfNavyErrors.neck}
              />
              {bfNavyGender === 'female' && (
                <Input
                  label="Hip Circumference (cm)"
                  type="number"
                  step="0.1"
                  placeholder="Measure at widest point"
                  register={bfNavyRegister}
                  name="hip"
                  error={bfNavyErrors.hip}
                />
              )}
              {calculatedNavyBodyFat !== null && (
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    Calculated Body Fat: {calculatedNavyBodyFat.toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
            <Button type="submit" className="w-full mt-4">
              Add Body Fat Entry
            </Button>
          </form>
        )}
      </Card>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">Success!</h4>
              </div>
              <button
                onClick={closeConfirmation}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-2">
              Your body fat entry of <span className="font-semibold">{submittedBodyFat}%</span> has been successfully recorded.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Method: {submissionMethod}
            </p>
            <Button
              onClick={closeConfirmation}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default BodyFatEntryForm;