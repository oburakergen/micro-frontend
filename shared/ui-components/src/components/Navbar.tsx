import React, { useState } from "react";
import "./navbar.scss";
import ServicesDropdown from "./ServicesDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { servicesData } from "../data/servicesData";
import {useAppSelector} from "@micro-frontend/store";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(null);

  const user = {
    name: "Yavuz Olgun",
    avatar:
      "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=360",
  };

  const handleOpen = (type: any) => {
    setOpen(type);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo">
            <img src="/moph/logo-white.svg" alt="Matias Logo" className="logo-icon" />
          </div>
        </div>
        <nav className="nav-links" onMouseLeave={handleClose}>
          <button className="active" onClick={() => navigate('/')}>
            HOME
          </button>
          <button onClick={() => navigate('/about')}>ABOUT</button>

          <div
            className="dropdown-trigger"
            onMouseEnter={() => handleOpen("services")}
          >
            <button onClick={() => navigate('/services')}>SERVICES</button>
            {open === "services" && <ServicesDropdown data={servicesData} />}
          </div>
        </nav>
        <div className="nav-right">
          <div
            className="profile-trigger"
            onMouseEnter={() => handleOpen("profile")}
          >
            <img
              src={user.avatar}
              alt={user.name}
              onMouseLeave={handleClose}
              className="avatar-mini"
            />
            {open === "profile" && <ProfileDropdown user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
}
