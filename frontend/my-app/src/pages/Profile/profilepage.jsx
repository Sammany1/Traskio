import React, { useState } from 'react';
import '../../styles/globals.css';
import './profilepage.css';

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      setPassword(newPassword);
      alert("Password updated successfully!");
      setIsPasswordChange(false);
    } else {
      alert("Passwords do not match.");
    }
  };

  const handleSave = () => {
    alert("Profile Information Updated Successfully");
  };

  return (
    <div className="profilepageContainer">
        <div className="leftSection">
            <div className="profilePicContainer">
                <img
                    className="profilePic"
                    src={profilePic || 'mini baymax on my fingerrr.jpg'}
                    alt="Profile"
                />
                <input
                    type="file"
                    id="file-input"
                    className="fileInput"
                    onChange={handlePictureChange}
                />
            </div>
        </div>

        <div className="rightSection card">
            {/* Username */}
            <div className="form">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                />
            </div>

            {/* Email */}
            <div className="form">
                <label>Email</label>
                <input type="email" value={email} disabled />
            </div>

            {/* Password */}
            <div className="form">
                <label>Password</label>
                <input type="password" value={password} disabled />
                <a
                href="#"
                onClick={() => setIsPasswordChange(!isPasswordChange)}
                >
                Change Password
                </a>
            </div>

            {/* Change Password Section (shown when the link is clicked) */}
            {isPasswordChange && (
                <div className="changePasswordSection visible">
                    <div className="form">
                        <label>Old Password</label>
                        <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your old password"
                        />
                    </div>
                    <div className="form">
                        <label>New Password</label>
                        <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        />
                    </div>
                    <div className="form">
                        <label>Confirm Password</label>
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        />
                    </div>
                    <button className='passwordBtn' onClick={handlePasswordChange}>Update Password</button>
                </div>
            )}

            {/* Save Button */}
            <div className="saveButtonContainer">
                <button className='button' onClick={handleSave}>Save</button>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
