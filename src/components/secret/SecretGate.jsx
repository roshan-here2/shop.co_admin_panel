
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
      <div className="login-wrapper">

        <div className="login-brand">
          <div className="brand-content">
            <div className="brand-logo">SHOP<span>.CO</span></div>
            <div className="brand-line"></div>
            <h2>CONTROL YOUR<br />STORE WITH EASE.</h2>
            <p>Welcome to your store management dashboard.</p>
            <div className="brand-footer">SHOP.CO ADMINISTRATION</div>
          </div>
        </div>

        <div className="login-panel">
          <form className="secret-form" onSubmit={handleSubmit}>
            <div className="mobile-logo">SHOP<span>.CO</span></div>

            <div className="login-heading">
              <span className="login-tag">SECURE ACCESS</span>
              <h1>Admin Login</h1>
              <p>Enter your credentials to continue.</p>
            </div>

            <div className="field-group">
              <label>USERNAME</label>
              <div className="username-box">
                <span className="user-icon">@</span>
                <span>admin</span>
                <span className="verified">✓</span>
              </div>
            </div>

            <div className="field-group">
              <label>SECRET PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your secret password"
                autoFocus
                required
              />
            </div>

            {error && <div className="secret-error">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'VERIFYING...' : 'ACCESS DASHBOARD'}
              <span>→</span>
            </button>

            <div className="login-security">
              <span>●</span> Secure administrator access
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
