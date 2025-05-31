import React, { useState, useEffect } from 'react';
import { User, Target } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../features/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import HealthSummary from '../features/profile/HealthSummary';

// zod schema for profile validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age seems too high").int("Age must be an integer"),
  gender: z.enum(['male', 'female']),
  height: z.number().min(50, "Height must be at least 50 cm").max(250, "Height seems too high").int("Height must be an integer"),
  currentWeight: z.number().min(1, "Current weight is required").max(300, "Weight seems too high"),
  goalWeight: z.number().min(1, "Goal weight is required").max(300, "Weight seems too high"),
  currentBodyFat: z.number().min(0, "Current body fat cannot be negative").max(100, "Body fat seems too high"),
  goalBodyFat: z.number().min(0, "Goal body fat cannot be negative").max(100, "Body fat seems too high"),
  goal: z.enum(['weight_loss', 'maintain', 'weight_gain']),
});

// profile page component
const ProfilePage = () => {
  const { user, signOut, updateProfileData, updateUserEmail, updateUserPassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [profileUpdateError, setProfileUpdateError] = useState(null);
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [currentPasswordForPassword, setCurrentPasswordForPassword] = useState(''); // NEW



  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      age: user?.profile?.age || '',
      gender: user?.profile?.gender || 'male',
      height: user?.profile?.height || '',
      currentWeight: user?.profile?.currentWeight || '',
      goalWeight: user?.profile?.goalWeight || '',
      currentBodyFat: user?.profile?.currentBodyFat || '',
      goalBodyFat: user?.profile?.goalBodyFat || '',
      goal: user?.profile?.goal || 'maintain'
    }
  });

  // reset form with user data when user object changes or editing stops
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || '',
        email: user.email || '',

        age: user.profile?.age || '',
        gender: user.profile?.gender || 'male',
        height: user.profile?.height || '',
        currentWeight: user.profile?.currentWeight || '',
        goalWeight: user.profile?.goalWeight || '',
        currentBodyFat: user.profile?.currentBodyFat || '',
        goalBodyFat: user.profile?.goalBodyFat || '',
        goal: user.profile?.goal || 'maintain'
      });
      setNewEmail(user.email || '');
    }
  }, [user, reset, isEditing]);

  const handleSave = async (data) => {
    setProfileUpdateError(null);
    try {
      // prepare profile data to save to AuthContext 
      const profileToSave = {
        name: data.name,
        age: parseFloat(data.age),
        gender: data.gender,
        height: parseFloat(data.height),
        currentWeight: parseFloat(data.currentWeight),
        goalWeight: parseFloat(data.goalWeight),
        currentBodyFat: parseFloat(data.currentBodyFat),
        goalBodyFat: parseFloat(data.goalBodyFat),
        goal: data.goal,
      };
      await updateProfileData(profileToSave);
      setIsEditing(false);
    } catch (error) {
      setProfileUpdateError(error.message || "Failed to update profile.");
      console.error("Profile update error:", error);
    }
  };

  const handleCancel = () => {
    reset(); // reset form to current user data
    setIsEditing(false);
    setProfileUpdateError(null);
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    if (!currentPasswordForPassword) {
      setPasswordError("Current password is required.");
      return;
    }
    try {
      await updateUserPassword(newPassword, currentPasswordForPassword); // UPDATED - now requires current password
      setNewPassword('');
      setConfirmNewPassword('');
      setCurrentPasswordForPassword('');
      setShowPasswordChange(false);
    } catch (error) {
      setPasswordError(error.message || "Failed to change password.");
      console.error("Password change error:", error);
    }
  };

  const handleChangeEmail = async () => {
    setEmailError(null);
    if (!newEmail) {
      setEmailError("New email is required.");
      return;
    }
    if (!currentPasswordForEmail) {
      setEmailError("Current password is required.");
      return;
    }
    if (newEmail === user?.email) {
      setEmailError("New email must be different from current email.");
      return;
    }
    try {
      await updateUserEmail(newEmail, currentPasswordForEmail); // Uses new signature
      setCurrentPasswordForEmail('');
      setShowEmailChange(false);
    } catch (error) {
      setEmailError(error.message || "Failed to change email.");
    }
  };

  return (
    <div className="space-y-6 font-poppins">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-lexend text-blue-text">Profile</h1>
        <Button onClick={signOut} variant="secondary">
          Sign Out
        </Button>
      </div>

      {/* Health summary card */}
      <HealthSummary/> 

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="secondary">
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSubmit(handleSave)} variant="success">
                  Save
                </Button>
                <Button onClick={handleCancel} variant="secondary">
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {profileUpdateError && <p className="text-red-500 text-sm mb-4">{profileUpdateError}</p>}

          <form onSubmit={handleSubmit(handleSave)}>
            <Input
              label="Name"
              disabled={!isEditing}
              register={register}
              name="name"
              error={errors.name}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <Button
                  onClick={() => setShowEmailChange(!showEmailChange)}
                  variant="secondary"
                  type="button"
                >
                  Change
                </Button>
              </div>
            </div>
            {showEmailChange && (
              <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <Input
                  label="New Email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                />
                <Input
                  label="Current Password"
                  type="password"
                  value={currentPasswordForEmail}
                  onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
                  placeholder="Enter current password"
                />
                {emailError && <p className="text-red-500 text-sm mb-4">{emailError}</p>}
                <div className="flex gap-2">
                  <Button
                    onClick={handleChangeEmail}
                    variant="primary"
                  >
                    Update Email
                  </Button>
                  <Button
                    onClick={() => setShowEmailChange(false)}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            <Input
              label="Age"
              type="number"
              disabled={!isEditing}
              register={register}
              name="age"
              error={errors.age}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                {...register("gender")}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>
            <Input
              label="Height (cm)"
              type="number"
              disabled={!isEditing}
              register={register}
              name="height"
              error={errors.height}
            />
          </form>

          <div className="mt-6">
            <Button onClick={() => setShowPasswordChange(!showPasswordChange)} variant="secondary" className="w-full">
              {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
            </Button>
            {showPasswordChange && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <Input
                  label="Current Password"
                  type="password"
                  value={currentPasswordForPassword}
                  onChange={(e) => setCurrentPasswordForPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
                <Button onClick={handleChangePassword} variant="primary" className="w-full">
                  Update Password
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Your Goals
          </h3>

          <form onSubmit={handleSubmit(handleSave)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
              <select
                {...register("goal")}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="maintain">Maintain Weight</option>
                <option value="weight_gain">Weight Gain</option>
              </select>
              {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal.message}</p>}
            </div>
            <Input
              label="Current Weight (kg)"
              type="number"
              disabled={!isEditing}
              register={register}
              name="currentWeight"
              error={errors.currentWeight}
            />
            <Input
              label="Goal Weight (kg)"
              type="number"
              disabled={!isEditing}
              register={register}
              name="goalWeight"
              error={errors.goalWeight}
            />
            <Input
              label="Current Body Fat (%)"
              type="number"
              disabled={!isEditing}
              register={register}
              name="currentBodyFat"
              error={errors.currentBodyFat}
            />
            <Input
              label="Goal Body Fat (%)"
              type="number"
              disabled={!isEditing}
              register={register}
              name="goalBodyFat"
              error={errors.goalBodyFat}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;