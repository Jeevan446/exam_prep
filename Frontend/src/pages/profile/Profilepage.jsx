import React, { useEffect, useState } from 'react';
import { Mail, Calendar, Edit2, Save, X, Lock } from 'lucide-react';
import { useUser } from "../../context/userContext";
import NotFoundPage from '../NotFoundPage';
import axios from 'axios';
import toast from "react-hot-toast";

export default function ProfilePage() {
   
    const { user, setUser } = useUser();

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [tempProfile, setTempProfile] = useState(null);

    // Change password state
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });

    useEffect(() => {
        if (!user) return;

        const mappedProfile = {
            name: user.username || '',
            title: user.title || '',
            email: user.email || '',
            joinDate: user.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
                : '',
        };
        setProfile(mappedProfile);
        setTempProfile(mappedProfile);
    }, [user]);

    
    if (!user) return <NotFoundPage />;
    if (!profile || !tempProfile) return null;

    // Profile handlers
    const handleEdit = () => {
        setTempProfile(profile);
        setIsEditing(true);
    };


const handleSave = async () => {
  if (!tempProfile.name.trim()) {
    toast.error("username cannot be empty");
    return;
  }

  try {
    const response = await axios.put('/api/user/updateprofile', {
      username: tempProfile.name
    });
    
    if (response.data.success) {

      // Update local state with the response from server
      setProfile(tempProfile);
      setUser(prev => ({ 
        ...prev, 
        username: tempProfile.name 
      }));
      setIsEditing(false);
      toast.success("username updated successfully");
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    setTempProfile(profile);
     toast.error(err.response?.data?.message || "Failed to update username");
    
    setIsEditing(true);
  }
};




    const handleCancel = () => {
        setTempProfile(profile);
        setIsEditing(false);
    };

    const handleChange = (field, value) => {
        setTempProfile(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    // Password handlers
    const handlePasswordChange = (field, value) => {
        setPasswords(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSavePassword = async () => {
        console.log(passwords);
        try {
            const response = await axios.put('/api/user/changepassword', {
                currentPassword: passwords.oldPassword,
                newPassword: passwords.newPassword,
            });

            toast.success(response.data.message || "Password changed successfully");

             setPasswords({ oldPassword: '', newPassword: '' });
            setShowChangePassword(false);
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            toast.error(err.response?.data?.message || "Failed to change password");
        }
    };

    return (
        <div className="min-h-screen bg-base p-4 sm:p-8">
            <div className="max-w-4xl mx-auto bg-base">
                {/* Profile Card */}
                <div className="bg-base border-2 border-primary rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="h-48 bg-base-100 relative">
                        <div className="absolute inset-0  opacity-10"></div>
                    </div>

                    <div className="relative px-6 pb-6 border-t border-primary">
                        {/* Avatar */}
                        <div className="absolute -top-16 left-6 bg-black ">
                            <div className="w-32 h-32 rounded-full  border-4 border-primary bg- flex items-center justify-center text-ghost text-4xl font-bold shadow-lg">
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>

                        {/* Edit buttons */}
                        <div className="flex justify-end pt-4 gap-2">
                            {!isEditing ? (
                                <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-ghost rounded-lg">
                                    <Edit2 size={16} /> Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded-lg">
                                        <X size={16} /> Cancel
                                    </button>
                                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-ghost rounded-lg">
                                        <Save size={16} /> Save
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Profile info */}
                        <div className="mt-12 space-y-2">
                            {isEditing ? (
                                <>
                                    <input
                                        value={tempProfile.name}
                                        onChange={e => handleChange('name', e.target.value)}
                                        className="block w-full text-xl border border-primary rounded p-1 outline: boder focus:border-secondary outline-none "
                                    />
                
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                                    <p className="text-gray-600">{profile.title}</p>
                                </>
                            )}

                            <div className="flex items-center gap-2 text-primary mt-2">
                                <Mail size={16} /> {profile.email}
                            </div>

                            <div className="flex items-center gap-2  text-primary">
                                <Calendar size={16} /> Joined {profile.joinDate}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Change Password Section */}
                <div className="bg-base border border-primary rounded-2xl shadow-lg p-6">
                    <button
                        onClick={() => setShowChangePassword(prev => !prev)}
                        className="flex items-center gap-2 text-primary font-medium"
                    >
                        <Lock size={18} />
                        Change Password
                    </button>

                    {showChangePassword && (
                        <div className="mt-4 space-y-3">
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={passwords.oldPassword}
                                onChange={e => handlePasswordChange('oldPassword', e.target.value)}
                                className="w-full border p-2 rounded  outline: boder border-primary focus:border-secondary outline-none"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={passwords.newPassword}
                                onChange={e => handlePasswordChange('newPassword', e.target.value)}
                                className="w-full border p-2 rounded outline: boder border-primary focus:border-secondary outline-none "
                            />
                            <button
                                onClick={handleSavePassword}
                                className="px-4 py-2 bg-green-500 text-ghost rounded-lg"
                            >
                                Save Password
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
