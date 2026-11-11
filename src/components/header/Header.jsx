import React from "react";
import "./Header.css";
import { Search, Bell, LogOut } from "lucide-react";

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUnlocked");
    window.location.href = "/";
  };

  return (
    <header className="ds-header">
      <div className="ds-search">
        <Search size={16} />
        <input type="text" placeholder="Search" />
      </div>

      <div className="ds-header-right">
        <button className="ds-icon-btn" type="button">
          <Bell size={18} />
          <span className="ds-badge" />
        </button>

        <button className="ds-lang" type="button">
          <span className="ds-flag">🇬🇧</span>
          English
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#9098A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="ds-profile">
          <img src="https://img.magnific.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80" alt="Admin" />
          <div className="ds-profile-text">
            <div className="ds-profile-name">Admin</div>
            <div className="ds-profile-role">Administrator</div>
          </div>
        </div>

        <button type="button" className="ds-header-logout" onClick={handleLogout}>
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
}
