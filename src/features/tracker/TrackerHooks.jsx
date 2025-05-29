import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

// To manage weight and body fat tracking

// hy karin ini msh pke dummy data hwhww ak gtw klo integrate ke firebase gmn jd tlong yh 
// atw klo mw ngerjain bareng bwleh

export const useTrackerData = () => {
    const { user, userId, loading: authLoading } = useAuth();
    const [weightEntries, setWeightEntries] = useState([]);
    const [bodyFatEntries, setBodyFatEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading){
            setLoading(true);
            return;
        }
        
        // mock data
        const weightData = [
            { id: 'w1', date: new Date('2024-01-01T12:00:00Z'), weight: 78 },
            { id: 'w2', date: new Date('2024-01-15T12:00:00Z'), weight: 77 },
            { id: 'w3', date: new Date('2024-02-01T12:00:00Z'), weight: 76 },
            { id: 'w4', date: new Date('2024-02-15T12:00:00Z'), weight: 75.5 },
            { id: 'w5', date: new Date('2024-03-01T12:00:00Z'), weight: 75 },
        ];

        const bodyFatData = [
            { id: 'bf1', date: new Date('2024-01-01T12:00:00Z'), bodyFat: 22 },
            { id: 'bf2', date: new Date('2024-01-15T12:00:00Z'), bodyFat: 21.5 },
            { id: 'bf3', date: new Date('2024-02-01T12:00:00Z'), bodyFat: 21 },
            { id: 'bf4', date: new Date('2024-02-15T12:00:00Z'), bodyFat: 20.5 },
            { id: 'bf5', date: new Date('2024-03-01T12:00:00Z'), bodyFat: 20 },
        ];

        setWeightEntries(weightData.sort((a,b) => b.date.getTime() - a.date.getTime()));
        setBodyFatEntries(bodyFatData.sort((a, b) => b.date.getTime() - a.date.getTime()));
        setLoading(false);

        // const unsubscribeWeight = onSnapshot(...);
        // const unsubscribeBodyFat = onSnapshot(...);
        // return () => { unsubscribeWeight(); unsubscribeBodyFat(); };
    }, [authLoading, userId]); // depends on authLoading and userId to re-fetch

    const addWeightEntry = async (weight) => {
        if (!user)  {
            setError('Log in or Sign up first.');
            return;
        }
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const newEntry = {
                id: `W${Date.now()}`,
                weight: parseFloat(weight),
                date: new Date(),
            };
            // set weight entry
            setWeightEntries(prev => [newEntry, ...prev].sort((a,b) => b.date.getTime() - a.date.getTime()));
            
            console.log('Weight entry added:', newEntry);
        } 
        catch (error){
            console.error('Error adding weight entry:', error);
            setError("Failed to add weight entry.");
        }
    };

    const addBodyFatEntry = async (bodyFat) => {
        if (!user) {
          setError("Log in or Sign up first.");
          return;
        }
        try {
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
          const newEntry = {
            id: `BF${Date.now()}`,
            bodyFat: parseFloat(bodyFat),
            date: new Date(),
          };
          setBodyFatEntries(prev => [newEntry, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
          
          console.log("Mock Body fat entry added:", newEntry);
        } catch (err) {
          console.error("Error adding body fat entry:", err);
          setError("Failed to add body fat entry.");
        }
      };

      return {weightEntries, bodyFatEntries, addWeightEntry, addBodyFatEntry, loading, error};
};