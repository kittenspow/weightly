import React, { createContext, useContext, useState, useEffect } from 'react';

// hy karin, ini masih data dummy yeah
// pls ak ga ngerti firebase, tolong yh hiks
import { auth, db } from '../../firebase.js';
// firebase function
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut as firebaseSignOut,
    updateEmail,
    updatePassword,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';


// firestore function
import {
    doc,
    setDoc,
    getDoc,
} from 'firebase/firestore';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const docRef = doc(db, "users", firebaseUser.uid);
                const docSnap = await getDoc(docRef);
                const profile = docSnap.exists() ? docSnap.data() : null;

                setUser({ ...firebaseUser, profile, displayName: firebaseUser.displayName || profile?.name || firebaseUser.email });
                setUserId(firebaseUser.uid);
            } else {
                setUser(null);
                setUserId(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const profile = docSnap.exists() ? docSnap.data() : null;

        const userData = {
            ...user,
            profile,
            displayName: user.displayName || profile?.name || user.email
        };

        setUser(userData);
        setUserId(user.uid);
        return user;
    };

    const signUp = async (email, password, profileData) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (profileData.name) {
            await updateProfile(user, {
                displayName: profileData.name
            });
        }

        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
            ...profileData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        const updatedUser = {
            ...user,
            displayName: profileData.name,
            profile: profileData
        };

        setUser(updatedUser);
        setUserId(user.uid);
        return user;
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
        setUserId(null);
    };

    const updateProfileData = async (newProfileData) => {
        if (user) {
            try {
                const docRef = doc(db, "users", user.uid);
                await setDoc(docRef, {
                    ...newProfileData,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
                // update user profile in state
                if (newProfileData.name && newProfileData.name !== user.displayName) {
                    await updateProfile(auth.currentUser, {
                        displayName: newProfileData.name
                    });
                }
                setUser(prev => ({
                    ...prev, profile: { ...prev.profile, ...newProfileData },
                    displayName: newProfileData.name || prev.displayName
                }));
                console.log('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
                throw error;
            }
        } else {
            console.warn('No user logged in to update profile.');
        }
    };

    const reauthenticateUser = async (currentPassword) => {
        const user = auth.currentUser;
        if (!user || !user.email) {
            throw new Error('No user logged in');
        }

        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
    };

    const updateUserEmail = async (newEmail, currentPassword) => {
        if (!auth.currentUser) {
            throw new Error('No user logged in');
        }

        try {
            // Re-authenticate first
            await reauthenticateUser(currentPassword);

            // Update email
            await updateEmail(auth.currentUser, newEmail);

            // Update local state
            setUser(prev => ({ ...prev, email: newEmail }));

            console.log('Email updated successfully!');
        } catch (error) {
            console.error('Error updating email:', error);
            throw error;
        }
    };


    const updateUserPassword = async (newPassword, currentPassword) => {
        if (!auth.currentUser) {
            throw new Error('No user logged in');
        }

        try {
            // Re-authenticate first
            await reauthenticateUser(currentPassword);

            // Update password
            await updatePassword(auth.currentUser, newPassword);

            console.log('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    };


    return (
        <AuthContext.Provider value={{ user, userId, signIn, signUp, signOut, loading, updateProfileData, updateUserEmail, updateUserPassword, reauthenticateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);