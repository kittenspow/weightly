import React, { useState, useEffect } from 'react';
import { User, Target, AlertTriangle, CheckCircle, X } from 'lucide-react';
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
  height: z.number().min(50, "Height must be at least 50 cm").max(250, "Height seems too high"),
  goalWeight: z.number().min(1, "Goal weight is required").max(300, "Weight seems too high"),
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
  const [currentPasswordForPassword, setCurrentPasswordForPassword] = useState('');
  const [showGoalWarning, setShowGoalWarning] = useState(false);// NEW
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState('');
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);



  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      age: user?.profile?.age || '',
      gender: user?.profile?.gender || 'male',
      height: user?.profile?.height || '',
      goalWeight: user?.profile?.goalWeight || '',
      goalBodyFat: user?.profile?.goalBodyFat || '',
      goal: user?.profile?.goal || 'maintain'
    }
  });

  const goalWeight = watch('goalWeight');
  const goalBodyFat = watch('goalBodyFat');

  // Check if user is missing current data
  const hasGoalWeight = goalWeight && goalWeight !== '';
  const hasGoalBodyFat = goalBodyFat && goalBodyFat !== '';
  const hasCurrentWeight = user?.profile?.currentWeight || user?.latestWeight;
  const hasCurrentBodyFat = user?.profile?.currentBodyFat || user?.latestBodyFat;

  useEffect(() => {
    if (isEditing && ((hasGoalWeight && !hasCurrentWeight) || (hasGoalBodyFat && !hasCurrentBodyFat))) {
      setShowGoalWarning(true);
    } else {
      setShowGoalWarning(false);
    }
  }, [isEditing, hasGoalWeight, hasGoalBodyFat, hasCurrentWeight, hasCurrentBodyFat]);

  // reset form with user data when user object changes or editing stops
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || '',
        email: user.email || '',

        age: user.profile?.age || '',
        gender: user.profile?.gender || 'male',
        height: user.profile?.height || '',
        goalWeight: user.profile?.goalWeight || '',
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
        goalWeight: parseFloat(data.goalWeight),
        goalBodyFat: parseFloat(data.goalBodyFat),
        goal: data.goal,
      };
      await updateProfileData(profileToSave);
      setIsEditing(false);
      setConfirmationType('profile');
      setShowConfirmation(true);
    } catch (error) {
      setProfileUpdateError(error.message || "Failed to update profile.");
      console.error("Profile update error:", error);
    }
  };

  const handleCancel = () => {
    reset(); // reset form to current user data
    setIsEditing(false);
    setProfileUpdateError(null);
    setShowGoalWarning(false);
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
      setConfirmationType('password');
      setShowConfirmation(true);
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
      setConfirmationType('email');
      setShowConfirmation(true);
      setConfirmationType('email');
      setShowConfirmation(true);
    } catch (error) {
      setEmailError(error.message || "Failed to change email.");
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationType('');
  };

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  const confirmSignOut = () => {
    signOut();
    setShowSignOutConfirm(false);
  };

  const cancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  const getConfirmationMessage = () => {
    switch (confirmationType) {
      case 'profile':
        return 'Your profile has been successfully updated!';
      case 'email':
        return 'Your email address has been successfully changed!';
      case 'password':
        return 'Your password has been successfully changed!';
      default:
        return 'Changes saved successfully!';
    }
  };

  return (
    <>
      <div className="space-y-6 font-poppins px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-lexend text-blue-text">Profile</h1>
          <div className='flex gap-4 items-center'>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="secondary">
                Edit Profile
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
            <Button onClick={handleSignOutClick} variant="danger">
              Sign Out
            </Button>
          </div>
        </div>

        {showGoalWarning && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Missing Current Measurements</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  We recommend logging your current weight and body fat using the tracker before setting goals.
                  This helps you track your progress more effectively.
                </p>
                <div className="mt-2">
                  <Button
                    onClick={() => window.location.href = '/tracker'}
                    variant="secondary"
                    size="sm"
                    className="text-yellow-800 border-yellow-300 hover:bg-yellow-100"
                  >
                    Go to Tracker
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health summary card */}
        <HealthSummary />

        {/* User information  */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>
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
                label="Goal Weight (kg)"
                type="number"
                step="0.01"
                disabled={!isEditing}
                register={register}
                name="goalWeight"
                error={errors.goalWeight}
              />
              <Input
                label="Goal Body Fat (%)"
                type="number"
                step="0.01"
                disabled={!isEditing}
                register={register}
                name="goalBodyFat"
                error={errors.goalBodyFat}
              />
            </form>
          </Card>
        </div>
      </div>
      {
        showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Success!</h4>
                </div>
                <button
                  onClick={closeConfirmation}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                {getConfirmationMessage()}
              </p>
              <Button
                onClick={closeConfirmation}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                OK
              </Button>
            </div>
          </div>
        )
      }
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h4 className="text-lg font-semibold text-gray-900">Confirm Sign Out</h4>
              </div>
              <button
                onClick={cancelSignOut}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out? You'll need to log in again to access your account.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={confirmSignOut}
                variant="danger"
                className="flex-1"
              >
                Yes, Sign Out
              </Button>
              <Button
                onClick={cancelSignOut}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;