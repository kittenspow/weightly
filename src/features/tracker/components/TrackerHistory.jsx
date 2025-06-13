import React from 'react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

/**
 * TrackerHistory component displays separate tables for weight and body fat entries,
 * each within its own card, arranged responsively.
 * @param {object} props - Component props.
 * @param {Array} props.combinedEntries - Array of combined weight and body fat entries.
 * @param {string} props.filterDate - Current date filter string.
 * @param {function} props.setFilterDate - Function to set the date filter.
 */
const TrackerHistory = ({ combinedEntries, filterDate, setFilterDate }) => {
  const weightHistory = combinedEntries.filter(entry => entry.weight !== null);
  const bodyFatHistory = combinedEntries.filter(entry => entry.bodyFat !== null);

  const dateFormatOptions = {
    day: '2-digit',  
    month: '2-digit', 
    year: 'numeric'   
  };

  return (
    <div> 
      <div className="mb-6 mt-10"> {/* Card untuk filter */}
        <h3 className="text-xl font-semibold mb-4">Entry History Overview</h3>
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
      </div>

      <div className="grid sm:grid-cols-2 gap-6"> 
        {/* Weight History Card */}
        <Card>
          <h4 className="text-lg font-bold mb-4 text-blue-text">Weight History</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                {weightHistory.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center py-4 text-gray-500">No weight entries found.</td>
                  </tr>
                ) : (
                  weightHistory.map((entry, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2">{entry.date.toLocaleDateString('en-GB', dateFormatOptions)}</td>
                      <td className="py-2">{entry.weight.toFixed(1)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Body Fat History Card */}
        <Card>
          <h4 className="text-lg font-bold mb-4 text-blue-text">Body Fat History</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Body Fat (%)</th>
                </tr>
              </thead>
              <tbody>
                {bodyFatHistory.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center py-4 text-gray-500">No body fat entries found.</td>
                  </tr>
                ) : (
                  bodyFatHistory.map((entry, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2">{entry.date.toLocaleDateString('en-GB', dateFormatOptions)}</td>
                      <td className="py-2">{entry.bodyFat.toFixed(1)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrackerHistory;
