import React from "react";
import "./dropdown.css";

export default function ProfileDropdown({ user }: any) {
  return (
    <div className="dropdown-menu profile-dropdown block">
      <div className="profile-header">
        <img src={user.avatar} className="profile-avatar" />
        <div className="profile-name">{user.name}</div>
      </div>
      <div className="profile-management">Profile Management</div>
      <div className="logout">Logout</div>
    </div>
  );
}
