import React, { createContext, useContext, useState, useEffect} from 'react';

// hy karin, ini masih data dummy yeah
// pls ak ga ngerti firebase, tolong yh hiks

// mock firebase function
const mockAuth = {
    // user sign in
    signIn: async (email, password) => {
        // delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (email === 'test@example.com' && password === 'password'){
            return { uid: 'mockUser123', email, displayName: 'Mock User' };
        }
        throw new Error('Invalid email or password');
    },

    // user sign up
    signUp: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { uid: 'mockUser123', email, displayName: 'New Mock User' };
    },

    // user sign out
    signOut: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
    },

    // update profile display name
    updateProfile: async (user, { displayName }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {...user, displayName};
    },

    // update email
    updateEmail: async (user, newEmail ) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {...user, email: newEmail};
    },

    // update password
    updatePassword: async (user, newPassword) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
    },
};

// mock firestore function
const mockFirestore = {
    // getting a document
    getDoc: async (docRef) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const mockProfileData = {
            name: 'John Doe',
            age: 30,
            gender: 'male',
            height: 175, // cm
            currentWeight: 75, // kg
            goalWeight: 70,
            currentBodyFat: 20,
            goalBodyFat: 15,
            goal: 'weight_loss'
        };
        return {
            exists: () => true, // always exists for mock
            data: () => mockProfileData,
        };
    },

    // setting/updating a document
    setDoc: async (docRef, data, options) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log('mock firestore: profile updated', data);
        return;
    },
};

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('mockUser123');

    useEffect(() => {
        // Simulate initial authentication check
        const mockUser = {
          uid: 'mockUser123',
          email: 'test@example.com',
          displayName: 'John Doe',
          profile: {
            name: 'John Doe',
            age: 30,
            gender: 'male',
            height: 175, // cm
            currentWeight: 75, // kg
            goalWeight: 70,
            currentBodyFat: 20,
            goalBodyFat: 15,
            goal: 'weight_loss'
          }
        };
        setUser(mockUser);
        setLoading(false);
      }, []);

      const signIn = async (email, password) => {
        try {
            const mockUserCredential = await mockAuth.signIn(email, password);
            // fetching profile after login
            const profileData = (await mockFirestore.getDoc()).data();
            setUser({ ...mockUserCredential, profile: profileData });
            return mockUserCredential;
        } catch (error) {
            console.error('Log in error:', error);
            throw error;
        }
      };

      const signUp = async (email, password, profileData) => {
        try {
            const mockUserCredential = await mockAuth.signUp(email, password);

            // saving profile data
            await mockFirestore.setDoc(null, profileData); // set null for mock
            setUser({ ...mockUserCredential, profile: profileData });
            return mockUserCredential;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
      };

      const signOut = async () => {
        try {
            await mockAuth.signOut();
            setUser(null);
        } catch (error){
            console.error('Sign out error:', error);
            throw error;
        }
      };

      // update user profile data

      const updateProfileData = async (newProfileData) => {
        if (user) {
            try {
                await mockFirestore.setDoc(null, newProfileData, {merge: true});
                setUser(prev => ({ ...prev, profile: { ...prev.profile, ...newProfileData }}));
                console.log('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
                throw error;
            }
        }
        else {
            console.warn('No user logged in to update profile.');
        }
      };
      // update user email
      const updateUserEmail = async (newEmail) => {
        if (user) {
            try {
                await mockAuth.updateEmail(user, newEmail);
                setUser(prev => ({ ...prev, email: newEmail }));
                console.log('Email updated successfully!');
            } catch (error) {
                console.error('Error updating email:', error);
                throw error;
            }
        }
      };

      // update user password
      const updateUserPassword = async (newPassword) => {
        if (user) {
            try {
                await mockAuth.updatePassword(user, newPassword);
                console.log('Password changed successfully!');
            } catch (error) {
                console.error('Error changed password:', error);
                throw error;
            }
        }
      };

      return (
        <AuthContext.Provider value ={{ user, userId, signIn, signUp, signOut, loading, updateProfileData, updateUserEmail, updateUserPassword}}>
            {children}
        </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);