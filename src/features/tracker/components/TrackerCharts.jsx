import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../../components/Card';

/**
 * TrackerCharts component displays line charts for weight and body fat progress.
 * @param {object} props - Component props.
 * @param {Array} props.chartData - Data array for the charts.
 */
const TrackerCharts = ({ chartData }) => {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">Weight Progress</h3>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} /> {/* ddjust Y-axis for better visualization */}
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="weightGoal" stroke="#0637a2" strokeWidth={2} strokeDasharray="8 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Body Fat Progress</h3>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} /> {/* adjust Y-axis for better visualization */}
              <Tooltip />
              <Line type="monotone" dataKey="bodyFat" stroke="#16a34a" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="bodyFatGoal" stroke="#036327" strokeWidth={2} strokeDasharray="8 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default TrackerCharts;
