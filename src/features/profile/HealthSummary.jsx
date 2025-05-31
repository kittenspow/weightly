import React from "react";
import { useAuth } from '../../features/auth/AuthContext';
import { calculateBMI } from "../../lib/utils";
import { Heart } from 'lucide-react';
import Card from '../../components/Card';

const HealthSummary = () => {
    const { user } = useAuth();

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
        if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
        if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
        return { category: 'Obese', color: 'text-red-600' };
    };

    return (
        <Card className="font-poppins">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600" />
            Health Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-md">
                    <p className="text-md text-gray-600">Goal Type</p>
                    <p className="text-xl font-bold text-orange-600 capitalize">
                    {user?.profile?.goal?.replace('_', ' ')}
                    </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-md">
                    <p className="text-md text-gray-600">Current BMI</p>
                    <p className="text-xl font-bold text-blue-600">
                    {user?.profile?.currentWeight && user?.profile?.height
                        ? `${calculateBMI(user.profile.currentWeight, user.profile.height).toFixed(1)} (${getBMICategory(calculateBMI(user.profile.currentWeight, user.profile.height).toFixed(1)).category})`

                        : '-'
                    }
                    </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-md">
                    <p className="text-md text-gray-600">Current Weight</p>
                    <p className="text-xl font-bold text-green-600">
                    {user?.profile?.currentWeight && user?.profile?.goalWeight
                        ? `${user.profile.currentWeight.toFixed(1)} kg`
                        : '-'
                    }
                    </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-md">
                    <p className="text-md text-gray-600">Current Body Fat</p>
                    <p className="text-xl font-bold text-purple-600">
                    {user?.profile?.currentBodyFat && user?.profile?.goalBodyFat
                        ? `${user.profile.currentBodyFat.toFixed(1)}%`
                        : '-'
                    }
                    </p>
                </div>
            </div>
        </Card>
    )
};

export default HealthSummary;