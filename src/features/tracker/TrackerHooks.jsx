import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { db } from "../../firebase.js";
import {
    collection,
    doc,
    setDoc,
    query,
    orderBy,
    onSnapshot,
    Timestamp
} from "firebase/firestore";


// To manage weight and body fat tracking

export const useTrackerData = () => {
    const { user, userId, loading: authLoading, updateProfileData } = useAuth();
    const [weightEntries, setWeightEntries] = useState([]);
    const [bodyFatEntries, setBodyFatEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) {
            setLoading(true);
            return;
        }

        if (!userId) {
            setWeightEntries([]);
            setBodyFatEntries([]);
            setLoading(false);
            return;
        }

        const weightQuery = query(
            collection(db, "users", userId, "weightEntries"),
            orderBy("date", "desc")
        );

        const bodyFatQuery = query(
            collection(db, "users", userId, "bodyFatEntries"),
            orderBy("date", "desc")
        );

        const unsubscribeWeight = onSnapshot(
            weightQuery,
            (snapshot) => {
                const weightData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date?.toDate() || new Date()
                }));
                setWeightEntries(weightData);
                console.log("Weight entries loaded:", weightData);
            },
            (error) => {
                console.error("Error fetching weight entries:", error);
                setError("Failed to load weight entries.");
            }
        );

        const unsubscribeBodyFat = onSnapshot(
            bodyFatQuery,
            (snapshot) => {
                const bodyFatData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date?.toDate() || new Date()
                }));
                setBodyFatEntries(bodyFatData);
                console.log("Body fat entries loaded:", bodyFatData);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching body fat entries:", error);
                setError("Failed to load body fat entries.");
                setLoading(false);
            }
        );

        return () => {
            unsubscribeWeight();
            unsubscribeBodyFat();
        };


        // const unsubscribeWeight = onSnapshot(...);
        // const unsubscribeBodyFat = onSnapshot(...);
        // return () => { unsubscribeWeight(); unsubscribeBodyFat(); };
    }, [authLoading, userId]); // depends on authLoading and userId to re-fetch

    const getTodayDateString = () => {
        const today = new Date();
        return today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');
    };

    const updateCurrentWeight = async (newWeight) => {
        try {
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, {
                currentWeight: parseFloat(newWeight),
                updatedAt: new Date().toISOString()
            }, { merge: true });

            if (updateProfileData) {
                await updateProfileData({ currentWeight: parseFloat(newWeight) });
            }

            console.log("Current weight updated in user profile:", newWeight);
        } catch (error) {
            console.error("Error updating current weight in profile:", error);
        }
    };


    // Helper function to update current body fat in user profile
    const updateCurrentBodyFat = async (newBodyFat) => {
        try {
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, {
                currentBodyFat: parseFloat(newBodyFat),
                updatedAt: new Date().toISOString()
            }, { merge: true });

            if (updateProfileData) {
                await updateProfileData({ currentBodyFat: parseFloat(newBodyFat) });
            }

            console.log("Current body fat updated in user profile:", newBodyFat);
        } catch (error) {
            console.error("Error updating current body fat in profile:", error);
        }
    };

    const addWeightEntry = async (weight) => {
        if (!user || !userId) {
            setError('Please log in first.');
            return;
        }

        try {
            setError(null);
            const todayDateString = getTodayDateString();

            // Use date string as document ID to ensure one entry per day
            const docRef = doc(db, "users", userId, "weightEntries", todayDateString);

            const entryData = {
                weight: parseFloat(weight),
                date: Timestamp.fromDate(new Date()),
                dateString: todayDateString // For easy querying
            };

            // This will create new document or overwrite existing one for today
            await setDoc(docRef, entryData);

            // Update current weight in user profile
            await updateCurrentWeight(weight);

            console.log('Weight entry added/updated for today:', todayDateString);
        } catch (error) {
            console.error('Error adding weight entry:', error);
            setError("Failed to add weight entry.");
        }
    };

    const addBodyFatEntry = async (bodyFat) => {
        if (!user || !userId) {
            setError("Please log in first.");
            return;
        }

        try {
            setError(null);
            const todayDateString = getTodayDateString();

            // Use date string as document ID to ensure one entry per day
            const docRef = doc(db, "users", userId, "bodyFatEntries", todayDateString);

            const entryData = {
                bodyFat: parseFloat(bodyFat),
                date: Timestamp.fromDate(new Date()),
                dateString: todayDateString // For easy querying
            };

            // This will create new document or overwrite existing one for today
            await setDoc(docRef, entryData);

            // Update current body fat in user profile
            await updateCurrentBodyFat(bodyFat);

            console.log("Body fat entry added/updated for today:", todayDateString);
        } catch (error) {
            console.error("Error adding body fat entry:", error);
            setError("Failed to add body fat entry.");
        }
    };

    const latestWeight = weightEntries.length > 0 ? weightEntries[0] : null;
    const latestBodyFat = bodyFatEntries.length > 0 ? bodyFatEntries[0] : null;

    const todayDateString = getTodayDateString();
    const hasTodayWeight = weightEntries.some(entry => entry.id === todayDateString);
    const hasTodayBodyFat = bodyFatEntries.some(entry => entry.id === todayDateString);

    return { weightEntries, latestWeight, latestBodyFat, bodyFatEntries, hasTodayWeight, hasTodayBodyFat, addWeightEntry, addBodyFatEntry, loading, error };
};