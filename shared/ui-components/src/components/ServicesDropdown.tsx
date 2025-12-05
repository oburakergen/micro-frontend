import React from "react";
import "./dropdown.css";

export default function ServicesDropdown({ data }: any) {
  return (
    <div className="dropdown-menu services-dropdown">
      {data.map((group:any, idx: any) => (
        <div key={idx} className="services-group">
          <div className="services-title">{group.category}</div>

          <ul className="services-list">
            {group.items.map((item:any, i2: any) => (
              <li key={i2} className="services-item">
                <img src={item.icon} className="icon-img" alt={item.label} />
                <span className="label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
