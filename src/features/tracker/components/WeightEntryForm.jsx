import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Scale, CheckCircle, X } from 'lucide-react';

// Zod schema for weight entry
const weightEntrySchema = z.object({
  weight: z.number().min(1, 'Weight is required').max(300, "Weight seems too high."),
});

const WeightEntryForm = ({ onAddWeightEntry }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedWeight, setSubmittedWeight] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(weightEntrySchema),
    defaultValues: { weight: '' }
  });

  const onSubmit = async (data) => {
    await onAddWeightEntry(data.weight);
    setSubmittedWeight(data.weight);
    setShowConfirmation(true);
    reset(); // clear form after submission
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setSubmittedWeight(null);
  };

  return (
    <>
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          Weight Entry
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Weight (kg)"
            type="number"
            step="0.01"
            placeholder="Enter your current weight"
            register={register}
            name="weight"
            error={errors.weight}
          />
          <Button type="submit" className="w-full">
            Add Weight Entry
          </Button>
        </form>
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
            <p className="text-gray-600 mb-4">
              Your weight entry of <span className="font-semibold">{submittedWeight} kg</span> has been successfully recorded.
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

export default WeightEntryForm;