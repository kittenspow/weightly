import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Scale, Activity, Target, TrendingUp, Plus, Calendar } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../features/auth/AuthContext'; 
import { useTrackerData } from '../features/tracker/TrackerHooks'; 
import { calculateBMI, calculateBodyFatNavy } from '../lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// weight entry
const weightEntrySchema = z.object({
    weight: z.number().min(1, 'Weight is requered').max(300, "Weight seems too high.")
});

// body fat manual entry
const bodyFatManualEntrySchema = z.object({
    bodyFat: z.number().min(1, "Body Fat is required").max(100, "Body Fat seems too high"),
  });

// body fat US navy method
const bodyFatNavyEntrySchema = z.object({
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

// tracker page
const TrackerPage = () => {
    const { user, loading: authLoading } = useAuth();
    const { weightEntries, bodyFatEntries, addWeightEntry, addBodyFatEntry, loading: trackerLoading, error: trackerError } = useTrackerData();
    const [activeTab, setActiveTab] = useState('overview');
    const [bodyFatMethod, setBodyFatMethod] = useState('manual');
    const [filterDate, setFilterDate] = useState('');

    // weight entry form
    const { register: weightRegister, handleSubmit: handleWeightSubmitForm, reset: resetWeightForm, formState: { errors: weightErrors } } = useForm({
        resolver: zodResolver(weightEntrySchema),
        defaultValues: { weight: '' }
    });

    // body fat manual entry
    const { register: bfManualRegister, handleSubmit: handleBfManualSubmitForm, reset: resetBfManualForm, formState: { errors: bfManualErrors } } = useForm({
        resolver: zodResolver(bodyFatManualEntrySchema),
        defaultValues: { bodyFat: '' }
    });

    // body fat US navy method entry
    const { register: bfNavyRegister, handleSubmit: handleBfNavySubmitForm, watch: watchBfNavy, reset: resetBfNavyForm, formState: { errors: bfNavyErrors } } = useForm({
        resolver: zodResolver(bodyFatNavyEntrySchema),
        defaultValues: { waist: '', neck: '', hip: '' }
    });
    const bfNavyWaist = watchBfNavy('waist');
    const bfNavyNeck = watchBfNavy('neck');
    const bfNavyHip = watchBfNavy('hip');
    const bfNavyGender = user?.profile?.gender || 'male'; // get gender from user profile

    const calculateNavyBodyFat = bfNavyWaist & bfNavyNeck && user?.profile?.height && (bfNavyGender === 'male' || bfNavyHip)
        ? calculateBodyFatNavy(
            bfNavyGender,
            parseFloat(bfNavyWaist),
            parseFloat(bfNavyNeck),
            parseFloat(bfNavyHip) || 0,
            user.profile.height
        )
        : null;

    const handleWeightEntry = async (data) => {
        await addWeightEntry(data.weight);
        resetWeightForm();
    };

    const handleBodyFatEntry = async (data) => {
        let bodyFatValue;
        if (bodyFatMethod === 'navy') {
            if (!calculateBodyFatNavy){
                console.log('Cannot add body fat entry: US Navy calculation incomplete.');
                return;
            }
            bodyFatValue = calculateNavyBodyFat;
            resetBfNavyForm();
        }
        else {
            bodyFatValue = data.bodyFat;
            resetBfManualForm();
        }
        await addBodyFatEntry(bodyFatValue);
    };

    const TabButton = ({ id, children, active }) => (
        <button onClick={() => setActiveTab(id)}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
            active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
        }`}>
            {children}
        </button>
    );

    // combine and sort entries for history table and charts
    const combinedEntries = useMemo(() => {
        const combined = {};

        weightEntries.forEach(entry => {
            const dateKey = entry.date.toISOString().split('T')[0];
            if (!combined[dateKey]){
                combined[dateKey] = { date: entry.date, weight: null, bodyFat: null};
            }
            combined[dateKey].weight = entry.weight;
        });
        bodyFatEntries.forEach(entry => {
            const dateKey = entry.date.toISOString().split('T')[0];
            if (!combined[dateKey]){
                combined[dateKey] = { date: entry.date, weight: null, bodyFat: null};
            }
            combined[dateKey].bodyFat = entry.bodyFat;
        });

        const sortedEntries = Object.values(combined).sort((a,b) => b.date.getTime() - a.date.getTime());

        if (filterDate){
            return sortedEntries.filter(entry => entry.date.toISOString().split('T')[0] === filterDate);
        }
        return sortedEntries;
    }, [weightEntries, bodyFatEntries, filterDate]);

    // data for recharts, sorted by date (asc)
    const chartData = useMemo(() => {
        // ensuring data is sorted by date
        return [...combinedEntries].sort((a, b) => a.date.getTime() - b.date.getTime()).map(entry => ({
            date: entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            weight: entry.weight,
            bodyFat: entry.bodyFat,
          }));
    }, [combinedEntries]);

    if (authLoading || trackerLoading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600">Loading tracker data...</p>
          </div>
        );
    }
    
    if (trackerError) {
    return <div className="text-red-500 text-center py-8">{trackerError}</div>;
    }

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Health Tracker</h1>
            <div className="flex gap-2">
            <TabButton id="overview" active={activeTab === 'overview'}>Overview</TabButton>
            <TabButton id="entry" active={activeTab === 'entry'}>New Entry</TabButton>
            <TabButton id="history" active={activeTab === 'history'}>History</TabButton>
            <TabButton id="progress" active={activeTab === 'progress'}>Progress</TabButton>
            </div>
        </div>

        {activeTab === 'overview' && (
            <div className="grid md:grid-cols-3 gap-6">
            <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Goals
                </h3>
                <div className="space-y-3">
                <div>
                    <p className="text-sm text-gray-600">Goal Type</p>
                    <p className="font-medium capitalize">{user?.profile?.goal?.replace('_', ' ')}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Current Weight</p>
                    <p className="font-medium">{user?.profile?.currentWeight} kg</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Target Weight</p>
                    <p className="font-medium">{user?.profile?.goalWeight} kg</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="font-medium text-blue-600">
                    {Math.abs(user?.profile?.currentWeight - user?.profile?.goalWeight).toFixed(1)} kg to go
                    </p>
                </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Body Composition
                </h3>
                <div className="space-y-3">
                <div>
                    <p className="text-sm text-gray-600">Current Body Fat</p>
                    <p className="font-medium">{user?.profile?.currentBodyFat}%</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Target Body Fat</p>
                    <p className="font-medium">{user?.profile?.goalBodyFat}%</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">BMI</p>
                    <p className="font-medium">
                    {calculateBMI(user?.profile?.currentWeight, user?.profile?.height).toFixed(1)}
                    </p>
                </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Recent Progress
                </h3>
                <div className="space-y-3">
                <div>
                    <p className="text-sm text-gray-600">Last Weight Entry</p>
                    <p className="font-medium">
                    {weightEntries.length > 0 ? `${weightEntries[0].weight} kg on ${weightEntries[0].date.toLocaleDateString()}` : 'N/A'}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Last Body Fat Entry</p>
                    <p className="font-medium">
                    {bodyFatEntries.length > 0 ? `${bodyFatEntries[0].bodyFat}% on ${bodyFatEntries[0].date.toLocaleDateString()}` : 'N/A'}
                    </p>
                </div>
                {/* Add more dynamic progress metrics here based on actual data */}
                </div>
            </Card>
            </div>
        )}

        {activeTab === 'entry' && (
            <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                Weight Entry
                </h3>
                <form onSubmit={handleWeightSubmitForm(handleWeightEntry)}>
                <Input
                    label="Weight (kg)"
                    type="number"
                    placeholder="Enter your current weight"
                    register={weightRegister}
                    name="weight"
                    error={weightErrors.weight}
                />
                <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Weight Entry
                </Button>
                </form>
            </Card>

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
                <form onSubmit={handleBfManualSubmitForm(handleBodyFatEntry)}>
                    <Input
                    label="Body Fat Percentage (%)"
                    type="number"
                    placeholder="Enter your body fat percentage"
                    register={bfManualRegister}
                    name="bodyFat"
                    error={bfManualErrors.bodyFat}
                    />
                    <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Body Fat Entry
                    </Button>
                </form>
                ) : (
                <form onSubmit={handleBfNavySubmitForm(handleBodyFatEntry)}>
                    <div className="space-y-4">
                    <Input
                        label="Waist Circumference (cm)"
                        type="number"
                        placeholder="Measure at narrowest point"
                        register={bfNavyRegister}
                        name="waist"
                        error={bfNavyErrors.waist}
                    />
                    <Input
                        label="Neck Circumference (cm)"
                        type="number"
                        placeholder="Measure below Adam's apple"
                        register={bfNavyRegister}
                        name="neck"
                        error={bfNavyErrors.neck}
                    />
                    {bfNavyGender === 'female' && (
                        <Input
                        label="Hip Circumference (cm)"
                        type="number"
                        placeholder="Measure at widest point"
                        register={bfNavyRegister}
                        name="hip"
                        error={bfNavyErrors.hip}
                        />
                    )}
                    {calculateNavyBodyFat && (
                        <div className="p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                            Calculated Body Fat: {calculateNavyBodyFat.toFixed(1)}%
                        </p>
                        </div>
                    )}
                    </div>
                    <Button type="submit" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Body Fat Entry
                    </Button>
                </form>
                )}
            </Card>
            </div>
        )}

        {activeTab === 'progress' && (
            <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-semibold mb-4">Weight Progress</h3>
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} /> {/* Adjust Y-axis for better visualization */}
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold mb-4">Body Fat Progress</h3>
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} /> {/* Adjust Y-axis for better visualization */}
                    <Tooltip />
                    <Line type="monotone" dataKey="bodyFat" stroke="#16a34a" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </Card>
            </div>
        )}

        {activeTab === 'history' && (
            <Card>
            <h3 className="text-lg font-semibold mb-4">Entry History</h3>
            <div className="mb-4 flex items-center gap-2">
                <label htmlFor="filterDate" className="text-sm font-medium text-gray-700">Filter by Date:</label>
                <input
                type="date"
                id="filterDate"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {filterDate && (
                <Button onClick={() => setFilterDate('')} variant="secondary">Clear Filter</Button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Weight (kg)</th>
                    <th className="pb-2">Body Fat (%)</th>
                    <th className="pb-2">BMI</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedEntries.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500">No entries found.</td>
                    </tr>
                    ) : (
                    combinedEntries.map((entry, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                        <td className="py-2">{entry.date.toLocaleDateString()}</td>
                        <td className="py-2">{entry.weight ? entry.weight.toFixed(1) : '-'}</td>
                        <td className="py-2">{entry.bodyFat ? entry.bodyFat.toFixed(1) : '-'}</td>
                        <td className="py-2">
                            {entry.weight && user?.profile?.height
                            ? calculateBMI(entry.weight, user.profile.height).toFixed(1)
                            : '-'}
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            </Card>
        )}
        </div>
    );
};

export default TrackerPage;