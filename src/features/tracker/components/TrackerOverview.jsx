import React from 'react';
import Card from '../../../components/Card';
import { Target, Activity, TrendingUp } from 'lucide-react';
import { calculateBMI } from '../../../lib/calculateBMI';

/**
 * TrackerOverview component
 * displays user's goals, body composition, and recent progress.
 * @param {object} props - Component props.
 * @param {object} props.user - User object from AuthContext.
 * @param {Array} props.weightEntries - Array of weight entries for recent progress.
 * @param {Array} props.bodyFatEntries - Array of body fat entries for recent progress.
 */
const TrackerOverview = ({ user, weightEntries, bodyFatEntries }) => {
  return (
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
  );
};

export default TrackerOverview;
