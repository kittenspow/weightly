// src/pages/Tracker.jsx
import React, { useState, useMemo } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useTrackerData } from '../features/tracker/TrackerHooks';
import TrackerOverview from '../features/tracker/components/TrackerOverview';
import WeightEntryForm from '../features/tracker/components/WeightEntryForm';
import BodyFatEntryForm from '../features/tracker/components/BodyFatEntryForm';
import TrackerCharts from '../features/tracker/components/TrackerCharts';
import TrackerHistory from '../features/tracker/components/TrackerHistory';

/**
 * Helper function to format a Date object to YYYY-MM-DD local string.
 * This is crucial for consistent date key generation and filtering.
 * @param {Date} date - The Date object to format.
 * @returns {string} The date formatted as 'YYYY-MM-DD' in local timezone.
 */
const toLocalYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// tracker page component
const TrackerPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { weightEntries, bodyFatEntries, addWeightEntry, addBodyFatEntry, loading: trackerLoading, error: trackerError } = useTrackerData();
  const [activeTab, setActiveTab] = useState('overview');
  const [filterDate, setFilterDate] = useState('');

  const TabButton = ({ id, children, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${active ? 'bg-primary-blue text-white' : 'text-gray-600 hover:text-primary-blue'
        }`}
    >
      {children}
    </button>
  );

  // combine and sort entries for history table and charts
  const combinedEntries = useMemo(() => {
    const combined = {};
    const latestWeightsByDate = {};
    const latestBodyFatByDate = {};

    // Urutkan entri berdasarkan tanggal MENAIK untuk memastikan 'latest' benar
    const sortedWeightEntries = [...weightEntries].sort((a, b) => a.date.getTime() - b.date.getTime());
    const sortedBodyFatEntries = [...bodyFatEntries].sort((a, b) => a.date.getTime() - b.date.getTime());

    // Memproses untuk mendapatkan entri terbaru per tanggal LOKAL
    sortedWeightEntries.forEach(entry => {
      const dateKey = toLocalYYYYMMDD(entry.date); // KUNCI PERBAIKAN: Gunakan tanggal lokal
      if (!latestWeightsByDate[dateKey] || entry.date.getTime() > latestWeightsByDate[dateKey].date.getTime()) {
        latestWeightsByDate[dateKey] = entry;
      }
    });
    sortedBodyFatEntries.forEach(entry => {
      const dateKey = toLocalYYYYMMDD(entry.date); // KUNCI PERBAIKAN: Gunakan tanggal lokal
      if (!latestBodyFatByDate[dateKey] || entry.date.getTime() > latestBodyFatByDate[dateKey].date.getTime()) {
        latestBodyFatByDate[dateKey] = entry;
      }
    });

    // Menggabungkan entri, mengisi dengan nilai terakhir yang diketahui jika tidak ada entri spesifik
    const allDateKeys = new Set([
        ...Object.keys(latestWeightsByDate),
        ...Object.keys(latestBodyFatByDate)
    ]);
    const sortedUniqueDateKeys = Array.from(allDateKeys).sort(); // Urutkan tanggal unik secara kronologis

    const finalResultEntries = [];
    let lastKnownWeight = user?.profile?.currentWeight; // Nilai awal dari profil
    let lastKnownBodyFat = user?.profile?.currentBodyFat; // Nilai awal dari profil

    sortedUniqueDateKeys.forEach(dateKey => {
        const weightEntry = latestWeightsByDate[dateKey];
        const bodyFatEntry = latestBodyFatByDate[dateKey];

        const dateObject = (weightEntry ? weightEntry.date : bodyFatEntry ? bodyFatEntry.date : null);
        if (!dateObject) return; // Seharusnya tidak terjadi

        const currentWeight = weightEntry ? weightEntry.weight : lastKnownWeight;
        const currentBodyFat = bodyFatEntry ? bodyFatEntry.bodyFat : lastKnownBodyFat;

        finalResultEntries.push({
            date: dateObject, // Gunakan objek Date asli
            weight: currentWeight,
            bodyFat: currentBodyFat,
            originalWeight: weightEntry ? weightEntry.weight : null,
            originalBodyFat: bodyFatEntry ? bodyFatEntry.bodyFat : null,
        });

        // Perbarui nilai terakhir yang diketahui
        if (weightEntry) lastKnownWeight = weightEntry.weight;
        if (bodyFatEntry) lastKnownBodyFat = bodyFatEntry.bodyFat;
    });


    // Urutkan hasil akhir berdasarkan tanggal MENURUN untuk tabel riwayat (terbaru dulu)
    let sortedForDisplay = finalResultEntries.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Filter by date if filterDate is set
    if (filterDate) {
      // KUNCI PERBAIKAN FILTER: Bandingkan string tanggal lokal yang sudah dikonversi secara konsisten
      sortedForDisplay = sortedForDisplay.filter(entry => {
        return toLocalYYYYMMDD(entry.date) === filterDate;
      });
    }
    return sortedForDisplay;
  }, [weightEntries, bodyFatEntries, filterDate, user]);

  const dateFormatOptions = {
    day: '2-digit',   
    month: '2-digit', 
    year: 'numeric'   
  };

  // Data for Recharts, sorted by date ascending for proper chart display
  const chartData = useMemo(() => {
    return [...combinedEntries].sort((a, b) => a.date.getTime() - b.date.getTime()).map(entry => ({
      date: entry.date.toLocaleDateString('en-GB', dateFormatOptions), // Gunakan en-GB untuk format DD/MM/YYYY
      weight: entry.weight,
      bodyFat: entry.bodyFat,
      weightGoal: user?.profile?.goalWeight,
      bodyFatGoal: user?.profile?.goalBodyFat,
    }));
  }, [combinedEntries]);

  if (authLoading || trackerLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tracker data...</p>
        </div>
      </div>
    );
  }

  if (trackerError) {
    return <div className="text-red-500 text-center py-8">{trackerError}</div>;
  }

  return (
    <div className="space-y-6 font-poppins px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex justify-between items-center grid grid-row-2 sm:grid-cols-2">
        <h1 className="text-3xl font-bold font-lexend text-blue-text">Tracker</h1>
        <div className="flex gap-2 justify-end mt-3 sm:mt-0">
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
