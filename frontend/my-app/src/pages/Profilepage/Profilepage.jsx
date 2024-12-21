"use client";

import React, { useState } from "react";
import "./Profilepage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "user name",
    birthday: "date of birth",
    phone: "phone number",
    email: "@@@@@@",
    password: "********",
    profilePicture: "anyyyyy",
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showUploadInput, setShowUploadInput] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      alert("Password successfully updated!");
      setUser({ ...user, password: "********" });
      setNewPassword("");
      setConfirmPassword("");
      setShowChangePassword(false);
    } else {
      alert(
        "Passwords do not match or are less than 8 characters. Please try again."
      );
    }
  };
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, profilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
      setShowUploadInput(false); 
    }
  };
  

  return (
    <div className="profile-page">
      <div className="profile-header">
      <div className="profile-picture-container">
  <img src={user.profilePicture} alt="Profile" className="profile-picture" />
  <button
    className="change-picture-btn"
    onClick={() => setShowUploadInput(!showUploadInput)}
  >
    <i className="fas fa-camera"></i> +
  </button>
  {showUploadInput && (
    <input
      type="file"
      className="change-picture-input"
      accept="image/*"
      onChange={handleProfilePictureChange}
    />
  )}
</div>
        <h1 className="profile-name">{user.name}</h1>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <img
            src="/icons/1564504_email_letter_mail_message_icon.png"
            alt="Email Icon"
            className="detail-icon"
          />
          <span>{user.email}</span>
        </div>
        <div className="detail-item">
          <img
            src="/icons/8683096_calendar_party_birthday_celebration_time_icon.png"
            alt="Birthday Icon"
            className="detail-icon"
          />
          <span>{user.birthday}</span>
        </div>
        <div className="detail-item">
          <img
            src="/icons/8666632_phone_icon.png"
            alt="Phone Icon"
            className="detail-icon"
          />
          <span>{user.phone}</span>
        </div>
        <div className="detail-item">
          <img
            src="/icons/1564520_code_open_password_icon.png"
            alt="Password Icon"
            className="detail-icon"
          />
          <span>{user.password}</span>
          <button
            className="change-password-btn"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Change Password
          </button>
        </div>
      </div>

      {showChangePassword && (
        <div className="change-password-section">
          <h3>Change Password</h3>
          <div className="password-input-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="password-input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <button className="save-password-btn" onClick={handlePasswordChange}>
            Save Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
