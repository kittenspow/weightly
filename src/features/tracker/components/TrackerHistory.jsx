import React from 'react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import { calculateBMI } from '../../../lib/calculateBMI';
import { useAuth } from '../../auth/AuthContext'; // to get user's data (height)

/**
 * TrackerHistory component
 * @param {object} props - Component props.
 * @param {Array} props.combinedEntries - Array of combined weight and body fat entries.
 * @param {string} props.filterDate - Current date filter string.
 * @param {function} props.setFilterDate - Function to set the date filter.
 */
const TrackerHistory = ({ combinedEntries, filterDate, setFilterDate }) => {
  const { user } = useAuth(); // get user profile for bmi calculation

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-4">Entry History</h3>
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
                      : '-'
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TrackerHistory;
