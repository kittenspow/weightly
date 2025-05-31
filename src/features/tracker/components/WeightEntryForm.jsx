import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Plus, Scale } from 'lucide-react';

// Zod schema for weight entry
const weightEntrySchema = z.object({
  weight: z.number().min(1, 'Weight is required').max(300, "Weight seems too high."),
});

/**
 * WeightEntryForm component handles the form for adding new weight entries.
 * @param {object} props - Component props.
 * @param {function} props.onAddWeightEntry - Callback function to add a new weight entry.
 */
const WeightEntryForm = ({ onAddWeightEntry }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(weightEntrySchema),
    defaultValues: { weight: '' }
  });

  const onSubmit = async (data) => {
    await onAddWeightEntry(data.weight);
    reset(); // clear form after submission
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Scale className="w-5 h-5 text-blue-600" />
        Weight Entry
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Weight (kg)"
          type="number"
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
  );
};

export default WeightEntryForm;
