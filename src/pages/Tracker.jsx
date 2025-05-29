import React, { useState, useMemo } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useTrackerData } from '../features/tracker/TrackerHooks';
import TrackerOverview from '../features/tracker/components/TrackerOverview';
import WeightEntryForm from '../features/tracker/components/WeightEntryForm';
import BodyFatEntryForm from '../features/tracker/components/BodyFatEntryForm';
import TrackerCharts from '../features/tracker/components/TrackerCharts';
import TrackerHistory from '../features/tracker/components/TrackerHistory';

// tracker page component
const TrackerPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { weightEntries, bodyFatEntries, addWeightEntry, addBodyFatEntry, loading: trackerLoading, error: trackerError } = useTrackerData();
  const [activeTab, setActiveTab] = useState('overview');
  const [filterDate, setFilterDate] = useState('');

  const TabButton = ({ id, children, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        active ? 'bg-primary-blue text-white' : 'text-gray-600 hover:text-primary-blue'
      }`}
    >
      {children}
    </button>
  );

  // combine and sort entries for history table and charts
  const combinedEntries = useMemo(() => {
    const combined = {};
    weightEntries.forEach(entry => {
      const dateKey = entry.date.toISOString().split('T')[0];
      if (!combined[dateKey]) {
        combined[dateKey] = { date: entry.date, weight: null, bodyFat: null };
      }
      combined[dateKey].weight = entry.weight;
    });
    bodyFatEntries.forEach(entry => {
      const dateKey = entry.date.toISOString().split('T')[0];
      if (!combined[dateKey]) {
        combined[dateKey] = { date: entry.date, weight: null, bodyFat: null };
      }
      combined[dateKey].bodyFat = entry.bodyFat;
    });

    // Sort by date descending for history table (latest first)
    const sortedEntries = Object.values(combined).sort((a, b) => b.date.getTime() - a.date.getTime());

    // Filter by date if filterDate is set
    if (filterDate) {
      return sortedEntries.filter(entry => entry.date.toISOString().split('T')[0] === filterDate);
    }
    return sortedEntries;
  }, [weightEntries, bodyFatEntries, filterDate]);

  // Data for Recharts, sorted by date ascending for proper chart display
  const chartData = useMemo(() => {
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
        <h1 className="text-3xl font-bold text-primary-blue">Tracker</h1>
        <div className="flex gap-2">
          <TabButton id="overview" active={activeTab === 'overview'}>Overview</TabButton>
          <TabButton id="entry" active={activeTab === 'entry'}>New Entry</TabButton>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div>
            <TrackerOverview
                user={user}
                weightEntries={weightEntries}
                bodyFatEntries={bodyFatEntries}
            />
            <div className='mt-5'>
                <TrackerCharts chartData={chartData} />
            </div>
        </div>
        
      )}

      {activeTab === 'entry' && (
        <div>
            <div className='grid md:grid-cols-2 gap-6'>
                <WeightEntryForm onAddWeightEntry={addWeightEntry} />
                <BodyFatEntryForm onAddBodyFatEntry={addBodyFatEntry} />
            </div>
            <div className='mt-5'>
                <TrackerHistory
                    combinedEntries={combinedEntries}
                    filterDate={filterDate}
                    setFilterDate={setFilterDate}
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default TrackerPage;