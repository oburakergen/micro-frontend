import React, { useState } from "react";
import "./navbar.css";
import ServicesDropdown from "./ServicesDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { servicesData } from "../data/servicesData";
import { useNavigate, useLocation } from "react-router-dom";
import {useAppSelector} from "@micro-frontend/store";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(null);
    const { user } = useAppSelector((state) => state.global);

  const user2 = {
    name: "Yavuz Olgun",
    avatar:
      "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=360",
  };

  console.log("navbar", user);

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
            <button className={location.pathname === '/app1' ? 'active' : ''} onClick={() => navigate('/app1')}>Home</button>

            <button className={location.pathname === '/' ? 'active' : ''} onClick={() => navigate('/')}>
            Phr
          </button>

          <div
            className="dropdown-trigger"
            onMouseEnter={() => handleOpen("services")}
          >
            <button className={location.pathname === '/services' ? 'active' : ''} onClick={() => navigate('/services')}>SERVICES</button>
            {open === "services" && <ServicesDropdown data={servicesData} />}
          </div>
        </nav>
        <div className="nav-right">
          <div
            className="profile-trigger"
            onMouseEnter={() => handleOpen("profile")}
          >
            <img
              src={user2.avatar}
              alt={user2.name}
              onMouseLeave={handleClose}
              className="avatar-mini"
            />
              <ProfileDropdown user={user2} />
          </div>
        </div>
      </div>
    </header>
  );
}
