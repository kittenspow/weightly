import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { db } from "../../firebase.js";
import {
    collection,
    doc,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    Timestamp,
    setDoc
} from "firebase/firestore";


// To manage weight and body fat tracking

// hy karin ini msh pke dummy data hwhww ak gtw klo integrate ke firebase gmn jd tlong yh 
// atw klo mw ngerjain bareng bwleh

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


    const updateCurrentWeight = async (newWeight) => {
        try {
            // Update user profile document
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, {
                currentWeight: parseFloat(newWeight),
                updatedAt: new Date().toISOString()
            }, { merge: true });

            // Also update local auth context
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
            // Update user profile document
            const userRef = doc(db, "users", userId);
            await setDoc(userRef, {
                currentBodyFat: parseFloat(newBodyFat),
                updatedAt: new Date().toISOString()
            }, { merge: true });

            // Also update local auth context
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
            const newEntry = {
                weight: parseFloat(weight),
                date: Timestamp.fromDate(new Date()),
                createdAt: Timestamp.fromDate(new Date())
            };

            // Add to user's weightEntries subcollection
            const docRef = await addDoc(collection(db, "users", userId, "weightEntries"), newEntry);

            // Update current weight in user profile
            await updateCurrentWeight(weight);

            console.log('Weight entry added with ID:', docRef.id);

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
            const newEntry = {
                bodyFat: parseFloat(bodyFat),
                date: Timestamp.fromDate(new Date()),
                createdAt: Timestamp.fromDate(new Date())
            };

            // Add to user's bodyFatEntries subcollection
            const docRef = await addDoc(collection(db, "users", userId, "bodyFatEntries"), newEntry);

            // Update current body fat in user profile
            await updateCurrentBodyFat(bodyFat);

            console.log("Body fat entry added with ID:", docRef.id);
            // No need to update local state - onSnapshot will handle it
        } catch (error) {
            console.error("Error adding body fat entry:", error);
            setError("Failed to add body fat entry.");
        }
    };

    const updateWeightEntry = async (entryId, newWeight) => {
        if (!userId) {
            setError("Please log in first.");
            return;
        }

        try {
            setError(null);
            const entryRef = doc(db, "users", userId, "weightEntries", entryId);
            await updateDoc(entryRef, {
                weight: parseFloat(newWeight),
                updatedAt: Timestamp.fromDate(new Date())
            });
            // Update current weight in user profile if this is the latest entry
            if (weightEntries.length > 0 && weightEntries[0].id === entryId) {
                await updateCurrentWeight(newWeight);
            }

            console.log("Weight entry updated:", entryId);
        } catch (error) {
            console.error("Error updating weight entry:", error);
            setError("Failed to update weight entry.");
        }
    };

    const updateBodyFatEntry = async (entryId, newBodyFat) => {
        if (!userId) {
            setError("Please log in first.");
            return;
        }

        try {
            setError(null);
            const entryRef = doc(db, "users", userId, "bodyFatEntries", entryId);
            await updateDoc(entryRef, {
                bodyFat: parseFloat(newBodyFat),
                updatedAt: Timestamp.fromDate(new Date())
            });
            // Update current body fat in user profile if this is the latest entry
            if (bodyFatEntries.length > 0 && bodyFatEntries[0].id === entryId) {
                await updateCurrentBodyFat(newBodyFat);
            }

            console.log("Body fat entry updated:", entryId);
        } catch (error) {
            console.error("Error updating body fat entry:", error);
            setError("Failed to update body fat entry.");
        }
    };

    const latestWeight = weightEntries.length > 0 ? weightEntries[0] : null;
    const latestBodyFat = bodyFatEntries.length > 0 ? bodyFatEntries[0] : null;

    return { weightEntries, latestWeight, latestBodyFat, bodyFatEntries, addWeightEntry, addBodyFatEntry, updateWeightEntry, updateBodyFatEntry, loading, error };
};