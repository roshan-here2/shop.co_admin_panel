
import React, { useState } from 'react';
import { adminAPI } from '../../api/client';
import './SecretGate.css';

export default function SecretGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await adminAPI.login(password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUnlocked', 'true');
      onUnlock();
    } catch (err) {
      setError(err.message || 'Incorrect secret password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="secret-gate">
      <div className="admin-login-card">

        <div className="login-illustration">
          <div className="illustration-circle circle-one"></div>
          <div className="illustration-circle circle-two"></div>

          <div className="illustration-content">
            <div className="illustration-logo">SHOP.CO</div>
            <div className="illustration-icon">✦</div>
            <h2>Welcome<br />Administrator!</h2>
            <p>Manage your store, products and orders from one place.</p>
            <div className="illustration-dots">● ● ●</div>
          </div>
        </div>

        <div className="login-form-area">
          <form className="secret-form" onSubmit={handleSubmit}>
            <div className="form-top-label">SHOP.CO ADMIN PANEL</div>

            <h1>Admin Login</h1>
            <p className="form-description">
              Please enter your details to access your dashboard.
            </p>

            <label>ADMIN</label>
            <div className="login-input-box">
              <span>♙</span>
              <input
                type="text"
                value="admin"
                readOnly
                aria-label="Admin username"
              />
            </div>

            <label>EMAIL / USER ID</label>
            <div className="login-input-box">
              <span>@</span>
              <input
                type="text"
                value="@admin"
                readOnly
                aria-label="Admin user ID"
              />
            </div>

            <label>SECRET PASSWORD</label>
            <div className="login-input-box">
              <span>♙</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secret password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div className="secret-error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'LOGIN TO DASHBOARD'}
              <span>→</span>
            </button>

            <div className="form-bottom">
              <span className="secure-dot"></span>
              Secure Admin Authentication
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
